/** @format */

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Clock,
  Clipboard,
  CheckCircle,
} from "lucide-react";
import { RenderJsonAsHtml } from "../utils/util";

interface Report {
  id: string;
  transcript: string;
  soapNote: string;
  diagnosis: string;
  timestamp: string;
  title: string;
}

const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      document.title = "Patient Report";
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/reports/${id}`
        ); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch report");
        }

        const data = await response.json();
        console.log(data.title);
        setReport(data); // Assuming the API returns the report object
      } catch (error) {
        console.error("Error fetching report:", error);
        setReport(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-blue-200 rounded mb-2"></div>
          <div className="h-3 w-36 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
            <Link
              to="/reports"
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back to Reports</span>
            </Link>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Report Not Found
          </h2>
          <p className="text-gray-500 mb-8">
            The report you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/reports"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Reports
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/reports"
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back to Reports</span>
            </Link>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            Medical Report
          </h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {report.title}
                </h2>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(report.timestamp)}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatTime(report.timestamp)}</span>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(report.soapNote)}
                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Clipboard className="h-5 w-5 mr-2 text-gray-500" />
                    Copy SOAP Note
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  SOAP Note
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 prose max-w-none">
                  <RenderJsonAsHtml data={JSON.parse(report.soapNote)} />
                </div>
              </div>

              <div className="">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Diagnosis
                </h3>
                <div className="bg-blue-50 text-blue-800 rounded-lg p-4">
                  <RenderJsonAsHtml data={JSON.parse(report.diagnosis)} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Original Transcript
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
                <p className="text-gray-700">{report.transcript}</p>
              </div>

              <div className="mt-6 bg-yellow-50 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Note</h4>
                <p className="text-yellow-700 text-sm">
                  This report was generated using AI technology and should be
                  reviewed by a healthcare professional before making clinical
                  decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportDetailPage;
