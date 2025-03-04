import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MediWhisper API",
      version: "1.0.0",
      description: "API documentation for MediWhisper",
    },
    servers: [
      {
        url: "https://med-whisper-backend-280871509489.us-central1.run.app/api",
      },
    ],
  },
  apis: ["./server.js"], // Make sure this file contains API documentation comments
};

// Generate API documentation
const specs = swaggerJsdoc(options);

// Export correctly for ES Modules
export { swaggerUi, specs };
