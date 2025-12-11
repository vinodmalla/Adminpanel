import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobDashboard = () => {
  const [JobDetails, setJobDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterJobdetails, setfilterJobdetails] = useState([]);
  const ItemsperPage = 10;

  const BASE_URL = "https://6933d2894090fe3bf01e1697.mockapi.io/Jobs";

  async function fetchDetails() {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setJobDetails(data);
    } catch (error) {
      console.log("unable to fetch data", error);
    }
  }

  async function searchfilter(event) {
    const value = event.target.value;

    if (value === "") {
      setfilterJobdetails(JobDetails);
      return;
    } else {
      const filtered = JobDetails.filter(
        (app) =>
          app.id.includes(value) ||
          app.title.toLowerCase().includes(value.toLowerCase())
      );
      setfilterJobdetails(filtered);
    }
  }

  const startPage = (currentPage - 1) * ItemsperPage;
  const endPage = currentPage * ItemsperPage;
  const finalList = filterJobdetails.length > 0 ? filterJobdetails : JobDetails;
  const currentDetails = finalList.slice(startPage, endPage);
  const totalPage = Math.ceil(JobDetails.length / ItemsperPage);

  async function handledelete(Jobid) {
    try {
      await fetch(`${BASE_URL}/${Jobid}`, { method: "DELETE" });
      const filtered = JobDetails.filter((details) => details.id !== Jobid);
      setJobDetails(filtered);
    } catch (error) {
      console.log("Error ", error);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className=" bg-white flex justify-center items-start py-10">
      <div className="w-full max-w-full p-6 sm:p-8 space-y-6">
        {/* Header + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              Job Dashboard
            </h1>
            <p className="text-sm text-slate-600">
              View, search, edit and delete job postings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              type="text"
              placeholder="Search by ID or Title"
              onChange={searchfilter}
              className="w-full sm:w-64 px-3 py-2  border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <Link to="/jobpost">
              <button className="w-full sm:w-auto px-4 py-2  bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800 transition shadow-sm">
                Add New Job
              </button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-200">
          <table className="min-w-full table-auto">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                  Job Id
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentDetails.map((details, key) => (
                <tr
                  key={key}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-black">
                    {details.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-black">
                    {details.title}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-row gap-2">
                      <Link to={`/jobpost/${details.id}`}>
                        <button className="px-3 py-1.5 text-xs  bg-green-500 text-white font-medium hover:bg-green-600 active:bg-emerald-700 transition shadow-sm">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handledelete(details.id)}
                        className="px-3 py-1.5 text-xs  bg-red-600 text-white font-medium hover:bg-rose-600 active:bg-red-700 transition shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {currentDetails.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-sm text-balck"
                  >
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, p))}
            disabled={currentPage === 1}
            className={`px-4 py-2  text-sm font-medium border transition ${
              currentPage === 1
                ? "border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50"
                : "border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
            }`}
          >
            Previous
          </button>

          <span className="text-sm text-black">
            Page{" "}
            <span className="font-semibold text-black">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-black">
              {totalPage || 1}
            </span>
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPage))}
            disabled={currentPage === totalPage || totalPage === 0}
            className={`px-4 py-2  text-sm font-medium border transition ${
              currentPage === totalPage || totalPage === 0
                ? "border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50"
                : "border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDashboard;
