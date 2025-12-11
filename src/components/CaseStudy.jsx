import React, { useState, useEffect } from 'react';

function CaseStudy() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);

  const itemsPerPage = 10;
  const BASE_URL = "https://69305d77778bbf9e0071110b.mockapi.io/casestudies";

  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching case studies data:", error);
    }
  };

  async function handleDelete(caseStudyId) {
    try {
      await fetch(`${BASE_URL}/${caseStudyId}`, {
        method: 'DELETE',
      });
      setData(data.filter(caseStudy => caseStudy.id !== caseStudyId));
    } catch (error) {
      console.error("Error deleting case study:", error);
    }
  }

  function handleSearch(event) {
    const value = event.target.value;

    if (value === "") {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) =>
      item.Name.toLowerCase().includes(value.toLowerCase()) ||
      item.Email.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  }

  const StartPage = (currentpage - 1) * itemsPerPage;
  const EndPage = currentpage * itemsPerPage;

  const finaldata = filteredData.length > 0 ? filteredData : data;

  const currentItems = finaldata.slice(StartPage, EndPage);

  const totalPages = Math.ceil(finaldata.length / itemsPerPage);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white p-8">

      <div className="max-w-full mx-auto space-y-6">
        
        {/* Header + Search */}
        <div className="bg-white  p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-slate-800">
            Case <span className="text-red-600">Studies</span>
          </h1>

          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search by Name or Email..."
            className="w-full md:w-72 px-4 py-2 border border-slate-300 shadow-sm focus:ring-2 focus:ring-red-600 outline-none bg-white text-black"
          />
        </div>

        {/* Table */}
        <div className="bg-whitel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left text-lg font-semibold text-black">
                    Name
                  </th>
                  <th className="py-3 px-4 border-b text-left text-lg font-semibold text-black">
                    Email
                  </th>
                  <th className="py-3 px-4 border-b text-left text-lg font-semibold text-black">
                    Message
                  </th>
                  <th className="py-3 px-4 border-b text-center text-lg font-semibold text-black">
                    Delete
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 text-base text-black">{item.Name}</td>
                    <td className="py-3 px-4 text-base text-black">{item.Email}</td>
                    <td className="py-3 px-4 text-base text-black">{item.Message}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 text-white px-3 py-1.5  text-xs font-semibold shadow hover:bg-rose-600 active:bg-rose-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {currentItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-6 text-center text-slate-500 text-sm"
                    >
                      No case studies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 py-3 bg-slate-50 border-t border-slate-200">
            <button
              onClick={() => setCurrentpage((p) => Math.max(p - 1, p))}
              disabled={currentpage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                currentpage === 1
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-500 shadow"
              }`}
            >
              Previous
            </button>

            <span className="text-sm text-slate-700">
              Page{" "}
              <span className="font-bold">{currentpage}</span> of{" "}
              <span className="font-bold">{totalPages}</span>
            </span>

            <button
              onClick={() => setCurrentpage((p) => Math.min(p + 1, totalPages))}
              disabled={currentpage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                currentpage === totalPages
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-500 text-white hover:bg-indigo-600 shadow"
              }`}
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CaseStudy;
