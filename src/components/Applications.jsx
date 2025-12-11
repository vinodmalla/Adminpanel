import React, { useState, useEffect } from 'react';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const BASE_URL = "https://69247d9f3ad095fb8474688f.mockapi.io/applications";

  const fetchApplications = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications data:", error);
    }
  };

  async function handleDelete(applicationId) {
    try {
      await fetch(`${BASE_URL}/${applicationId}`, {
        method: 'DELETE',
      });
      setApplications(applications.filter(app => app.id !== applicationId));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  }

  async function handlechangeStatus(applicationId, newStatus) {
    try {
      await fetch(`${BASE_URL}/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
      // existing behavior kept (no local state update)
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  function searchApplications(event) {
    const value = event.target.value;

    if (value === "") {
      setFilteredApplications(applications);
      return;
    } else {
      const filtered = applications.filter((app) =>
        app.applicantName.toLowerCase().includes(value.toLowerCase()) ||
        app.email.toLowerCase().includes(value.toLowerCase()) ||
        app.jobId.toString().includes(value)
      );
      setFilteredApplications(filtered);
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const finalList = filteredApplications.length > 0 ? filteredApplications : applications;

  const currentItems = finalList?.slice(startIndex, endIndex) || [];
  const totalPages = Math.ceil(finalList.length / itemsPerPage) || 1;

  return (
    <div className="bg-white p-8">
      <div className="max-w-full mx-auto space-y-6">

        {/* Header + Search */}
        <div className="bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Applications
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              View, filter and manage all job applications.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search by applicant name, email, job id..."
            className="w-full md:w-80 px-4 py-2.5  border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-white"
            onChange={searchApplications}
          />
        </div>

        {/* Table */}
        <div className="bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 text-black">
                <tr>
                  <th className="py-3 px-4 border-b text-left text-lg font-semibold uppercase tracking-wide">
                    Applicant Name
                  </th>
                  <th className="py-3 px-4 border-b text-left text-lg font-semibold uppercase tracking-wide">
                    Email
                  </th>
                  <th className="py-3 px-4 border-b text-left text-lg font-semibold uppercase tracking-wide">
                    Phone Number
                  </th>
                  <th className="py-3 px-4 border-b text-left text-lg font-semibold uppercase tracking-wide">
                    Job ID
                  </th>
                  <th className="py-3 px-4 border-b text-left text-lg font-semibold uppercase tracking-wide">
                    Status
                  </th>
                  <th className="py-3 px-4 border-b text-left text-lg font-semibold uppercase tracking-wide">
                    Resume
                  </th>
                  <th className="py-3 px-4 border-b text-left text-lg font-semibold uppercase tracking-wide">
                    Applied At
                  </th>
                  <th className="py-3 px-4 border-b text-center text-lg font-semibold uppercase tracking-wide">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((application) => (
                    <tr
                      key={application.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3 px-4 border-b text-base text-black">
                        {application.applicantName}
                      </td>
                      <td className="py-3 px-4 border-b text-base text-black">
                        {application.email}
                      </td>
                      <td className="py-3 px-4 border-b text-base text-black">
                        {application.phone}
                      </td>
                      <td className="py-3 px-4 border-b text-base text-black">
                        {application.jobId}
                      </td>
                      <td className="py-3 px-4 border-b text-base text-black">
                        <select
                          value={application.status}
                          onChange={(e) =>
                            handlechangeStatus(application.id, e.target.value)
                          }
                          className="p-2 w-full  bg-slate-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                          <option className='hover:bg-red-600' value="pending">Pending</option>
                          <option className='hover:bg-red-600' value="Selected">Selected</option>
                          <option className='hover:bg-red-600' value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 border-b text-base text-black">
                        {application.resumeName}
                      </td>
                      <td className="py-3 px-4 border-b text-base text-black">
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 border-b text-center">
                        <button
                          onClick={() => handleDelete(application.id)}
                          className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold shadow-sm hover:bg-rose-600 active:bg-rose-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-6 px-4 text-center text-sm text-slate-500"
                    >
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-center px-4 py-3 bg-slate-50 border-t border-slate-200 gap-3">
            <button
              className={`px-4 py-2  text-sm font-medium transition ${
                currentPage === 1
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-500 shadow"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="px-4 py-1 text-sm text-slate-700">
              Page <span className="font-semibold">{currentPage}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </span>

            <button
              className={`px-4 py-2  text-sm font-medium transition ${
                currentPage === totalPages
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-500 shadow"
              }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applications;
