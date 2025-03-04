/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash,
  ArrowLeft,
  FileText,
  Calendar,
  Clock,
  Search,
} from "lucide-react";

interface Report {
  id: string;
  transcript: string;
  soapNote: string;
  diagnosis: string;
  timestamp: string;
  title: string;
}

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      document.title = "Reports";
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/reports`
        );
        const data = await response.json();
        console.log(data);
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
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

  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.transcript.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteReport = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/reports/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete report");
      }

      console.log(`Report with ID ${id} deleted successfully`);

      // Remove the deleted report from the UI state
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== id)
      );
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handleDeleteConfirm = (id) => {
    setReports(filteredReports.filter((report) => report.id !== id));
    deleteReport(id);
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back to Home</span>
            </Link>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            Previous Reports
          </h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                Your Medical Reports
              </h2>
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
                <div className="h-4 w-48 bg-blue-200 rounded mb-2"></div>
                <div className="h-3 w-36 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="p-8 text-center">
              {searchTerm ? (
                <div>
                  <p className="text-gray-500 text-lg">
                    No reports match your search.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-4 text-blue-600 hover:text-blue-800"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div>
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    You don't have any reports yet.
                  </p>
                  <Link
                    to="/conversation"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Create your first report
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div>
              <ul className="divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <li
                    key={report.id}
                    className="hover:bg-gray-50 flex justify-between items-center px-6 py-4"
                  >
                    {/* Left Side - Icon, Title, and Transcript */}
                    <Link
                      to={`/report/${report.id}`}
                      className="flex-1 flex items-center"
                    >
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {report.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {report.transcript.substring(0, 100)}...
                        </div>
                      </div>
                    </Link>

                    {/* Right Side - Date, Time, and Delete Button */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(report.timestamp)}
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatTime(report.timestamp)}
                        </div>
                      </div>

                      {/* Delete Button - Right Side */}
                      <button
                        onClick={() => setDeleteId(report.id)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Confirmation Modal */}
              {deleteId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-lg font-semibold">
                      Are you sure you want to delete this report?
                    </p>
                    <div className="mt-4 flex justify-end space-x-4">
                      <button
                        onClick={() => setDeleteId(null)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDeleteConfirm(deleteId)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
