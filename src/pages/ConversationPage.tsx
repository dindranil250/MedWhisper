/** @format */

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mic, MicOff, Send, ArrowLeft, Loader2, FileText } from "lucide-react";
import { RenderJsonAsHtml } from "../utils/util";

const ConversationPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversations, setConversations] = useState<
    { type: "user" | "ai"; text: any }[]
  >([
    {
      type: "ai",
      text: "Hello doctor, I’m ready to assist. Start speaking or type your notes.",
    },
  ]);
  const [soapNote, setSoapNote] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    document.title = "Generate SOAP note and differential diagnosis";
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcriptText = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setTranscript(transcriptText);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      alert(
        "Your browser does not support speech recognition. Try using Chrome."
      );
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      recognitionRef.current?.stop();
      handleSendMessage();
    } else {
      setIsRecording(true);
      recognitionRef.current?.start();
    }
  };

  const handleSendMessage = async () => {
    if (transcript.trim()) {
      setIsProcessing(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/generate-response`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transcript }),
          }
        );

        const data = await response.json();
        console.log(data);

        // ✅ Store raw JSON instead of JSX
        setConversations([
          ...conversations,
          { type: "user", text: transcript },
        ]);
        setSoapNote(data.soap);
        setDiagnosis(data.diagnosis);
      } catch (error) {
        console.error("Error sending transcription:", error);
      }

      setTranscript("");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-700 flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Home
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">
            MedWhisper Conversation
          </h1>
          <Link
            to="/reports"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <FileText className="h-5 w-5 mr-1" /> View Reports
          </Link>
        </div>
      </header>

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {conversations.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md rounded-lg px-4 py-2 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center">
                  <Loader2 className="h-5 w-5 text-blue-500 animate-spin mr-2" />
                  <p className="text-gray-600">Processing your speech...</p>
                </div>
              </div>
            )}
          </div>

          {isRecording && (
            <div className="bg-blue-50 p-4 border-t border-blue-100">
              <p className="text-gray-700 font-medium">
                Transcribing: {transcript}
              </p>
            </div>
          )}

          <div className="border-t border-gray-200 p-4 flex items-center">
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-full text-white ${
                isRecording ? "bg-red-500" : "bg-blue-500"
              }`}
            >
              {isRecording ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </button>
            <input
              type="text"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Type or press mic to speak..."
              className="flex-1 border border-gray-300 rounded-full py-2 px-4 mx-3 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!transcript.trim()}
              className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              <Send className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* SOAP Note Section */}
        {soapNote && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-900">SOAP Note</h2>
            <RenderJsonAsHtml data={soapNote} />
          </div>
        )}

        {/* Differential Diagnosis Section */}
        {diagnosis && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Differential Diagnosis
            </h2>
            <RenderJsonAsHtml data={diagnosis} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationPage;
