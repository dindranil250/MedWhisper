import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { stringify } from "postcss";
import { v4 as uuidv4 } from "uuid"; 

dotenv.config();

const system_prompt_SOAP = `
You are an expert medical assistant. Your task is to generate a structured SOAP (Subjective, Objective, Assessment, Plan) report in JSON format from a given patient-doctor conversation.  

### **Instructions:**
1. Extract relevant medical details from the conversation.
2. Organize the information into the SOAP format.
3. Ensure the output is **strictly JSON** without any additional text.
4. Use proper medical terminology.

### **Expected JSON Structure:**
{
  "Subjective": {
    "Chief_Complaint": "",
    "History_of_Present_Illness": {
      "Duration": "",
      "Symptoms": [],
      "Aggravating_Factors": [],
      "Relieving_Factors": [],
      "Associated_Symptoms": []
    },
    "Past_Medical_History": [],
    "Social_History": {
      "Smoking_Status": "",
      "Alcohol_Use": "",
      "Occupation": "",
      "Other_Relevant_Habits": ""
    },
    "Review_of_Systems": {
      "General": [],
      "Respiratory": [],
      "Cardiovascular": [],
      "Gastrointestinal": [],
      "Neurological": [],
      "Other": []
    }
  },
  "Objective": {
    "Vital_Signs": {
      "Temperature": "",
      "Blood_Pressure": "",
      "Heart_Rate": "",
      "Respiratory_Rate": "",
      "Oxygen_Saturation": ""
    },
    "Physical_Exam": {
      "General": "",
      "Respiratory": "",
      "Cardiac": "",
      "Lymph_Nodes": "",
      "Other_Findings": ""
    },
    "Initial_Diagnostic_Workup_Ordered": [
      "Test_Name"
    ]
  },
  "Assessment_and_Plan": {
    "Assessment": "",
    "Plan": {
      "Diagnosis": "",
      "Treatment_Plan": [],
      "Follow_Up": ""
    }
  }
}
`
const system_prompt_daig=  `
You are an expert medical assistant. Your task is to generate a structured Differential Diagnosis report in JSON format from a given patient-doctor conversation in SOAP note format.  

### **Instructions:**
1. Extract relevant medical details from the SOAP note report.
2. Ensure the output is **strictly JSON** without any additional text.
3. Use proper medical terminology.

### **Expected JSON Structure:**
{
  "Differential_Diagnosis": {
    "Primary_Diagnosis": {
      "Condition": "",
      "Next_Steps": []
    },
    "Alternative_Diagnoses": [
      {
        "Condition": "",
        "Next_Steps": []
      },
      {
        "Condition": "",
        "Next_Steps": []
      },
      {
        "Condition": "",
        "Next_Steps": []
      },
      {
        "Condition": "",
        "Next_Steps": []
      }
    ]
  }
}
`

const system_prompt_title = `
  Provide a single, concise title that accurately describes the patient's condition based on the following transcript:`

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define a Schema and Model
const ReportSchema = new mongoose.Schema({
  id: String,
  title: String,
  transcript: String,
  soapNote: String,
  diagnosis: String,
  timestamp: String
});

const Report = mongoose.model("Report", ReportSchema);

const gemini_api_key = process.env.GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
 
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  geminiConfig,
});
 
const generate = async (prompt) => {
  try {
    console.log("Sending prompt to Gemini:", prompt);

    const result = await geminiModel.generateContent(prompt);
    // console.log("Full API Response:", JSON.stringify(result, null, 2)); // 🔹 Debug: Log the full response

    // Extracting the response correctly
    const responseText =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

    return responseText;
  } catch (error) {
    console.error("Response error:", error);
    return "Error generating response.";
  }
};


// Custom API Endpoint
app.post("/api/generate-response", async (req, res) => {
    const { transcript } = req.body;
    // console.log(transcript);
    if (!transcript) {
        return res.status(400).json({ error: "Transcription is required" });
    }

    // Example: Send transcription to Gemini (You can replace this with actual API logic)
    try {
        let soap = await generate( system_prompt_SOAP + transcript);
        let diagnosis = await generate(system_prompt_daig + soap);
        let title = await generate(system_prompt_title + transcript);
        soap = soap.replace(/```json|```/g, "").trim();
        diagnosis = diagnosis.replace(/```json|```/g, "").trim();

        // console.log("Generated response:", reply);
        const soap_JSON = JSON.parse(soap);
        const diagnosis_JSON = JSON.parse(diagnosis);
        const response = {
            "soap": soap_JSON,
            "diagnosis": diagnosis_JSON
        };

        console.log("Saving to DB");

        const newReport = new Report({
          id: uuidv4(), // Unique ID
          transcript,
          soapNote: soap,
          diagnosis: diagnosis,
          title: title,
          timestamp: new Date().toISOString(),
        });
    
        await newReport.save();
        console.log("Saving completed")

        res.json(response);
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Failed to process request" });
    }
});

app.get("/api/generate-response", async (req, res) => {
  res.json({ message: "OK" });
});

app.get("/api/reports/:id", async (req, res) => {
  try {
    const report = await Report.findOne({ id: req.params.id }); // Find report by id field

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/reports", async (req, res) => {
  try {
    const reports = await Report.find(); // Fetch all reports
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/reports/:id", async (req, res) => {
  try {
    const deletedReport = await Report.findOneAndDelete({ id: req.params.id }); // Find and delete by id field

    if (!deletedReport) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




// app.post("/api/reports", async (req, res) => {
//   const newReport = new Report(req.body);
//   await newReport.save();
//   res.json({ message: "Report saved successfully!" });
// });

// Start the server
import { swaggerUi, specs } from "./swagger.js"; // Import Swagger configuration

const App = express();

App.use(express.json()); // Middleware to parse JSON

// API Endpoints
App.post("/api/generate-response", (req, res) => {
  res.json({ response: "LLM response generated successfully." });
});

App.get("/api/reports", (req, res) => {
  res.json([{ id: "12345", diagnosis: "Hypertension" }]);
});

App.get("/api/reports/:id", (req, res) => {
  res.json({ id: req.params.id, diagnosis: "Diabetes" });
});

app.delete("/api/reports/:id", (req, res) => {
  res.json({ message: `Report ${req.params.id} deleted successfully.` });
});

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});

