import React, { useEffect, useState } from 'react';

function Contact() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [startIndex, setStartIndex] = useState(1);
  const itemsPerPage = 10;

  const BASE_URL = "https://69305d77778bbf9e0071110b.mockapi.io/contact";

  const fetchContacts = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts data:", error);
    }
  };

  async function handleDelete(contactId) {
    try {
      await fetch(`${BASE_URL}/${contactId}`, {
        method: 'DELETE',
      });
      setContacts(contacts.filter(contact => contact.id !== contactId));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }

  function searchContacts(event) {
    const value = event.target.value;
    if (value === "") {
      setFilteredContacts(contacts);
      return;
    } else {
      const filtered = contacts.filter((contact) =>
        contact.Name.toLowerCase().includes(value.toLowerCase()) ||
        contact.Email.toLowerCase().includes(value.toLowerCase()) ||
        contact.Mobile.toString().includes(value)
      );
      setFilteredContacts(filtered);
    }
  }

  const StartPage = (startIndex - 1) * itemsPerPage;
  const EndPage = startIndex * itemsPerPage;

  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const totadata = filteredContacts.length > 0 ? filteredContacts : contacts;
  const currentItems = totadata.slice(StartPage, EndPage);

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className=" bg-white p-8">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header + Search */}
        <div className="bg-white p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 text-center md:text-left">
              Contact Forms
            </h1>
            <p className="text-sm text-slate-500 mt-1 text-center md:text-left">
              View and manage all contact form submissions.
            </p>
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-slate-300 text-sm transition bg-white"
              placeholder="Search by Name, Email, or Mobile..."
              onChange={searchContacts}
            />
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 text-left text-lg font-semibold text-black uppercase tracking-wide border-b">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-lg font-semibold text-black uppercase tracking-wide border-b">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left text-lg font-semibold text-black uppercase tracking-wide border-b">
                    Mobile
                  </th>
                  <th className="py-3 px-4 text-left text-lg font-semibold text-black uppercase tracking-wide border-b">
                    Object
                  </th>
                  <th className="py-3 px-4 text-left text-lg font-semibold text-black uppercase tracking-wide border-b">
                    Message
                  </th>
                  <th className="py-3 px-4 text-center text-lg font-semibold text-black uppercase tracking-wide border-b">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-base text-black">
                      {contact.Name}
                    </td>
                    <td className="py-3 px-4 text-base text-black">
                      {contact.Email}
                    </td>
                    <td className="py-3 px-4 text-base text-black">
                      {contact.Mobile}
                    </td>
                    <td className="py-3 px-4 text-base text-black">
                      {contact.Find}
                    </td>
                    <td className="py-3 px-4 text-base text-black max-w-xs break-words">
                      {contact.Message}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold  bg-red-600 text-white shadow-sm hover:bg-rose-600 active:bg-rose-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {currentItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-6 px-4 text-center text-sm text-black"
                    >
                      No contacts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 py-3 border-t border-slate-200 bg-slate-50">
            <button
              disabled={startIndex === 1}
              onClick={() => setStartIndex((p) => Math.max(p - 1, p))}
              className={`mx-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                startIndex === 1
                  ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-500 shadow-sm"
              }`}
            >
              Previous
            </button>

            <span className="text-sm text-black">
              Page{" "}
              <span className="font-semibold text-black">{startIndex}</span>{" "}
              of{" "}
              <span className="font-semibold text-black">
                {totalPages || 1}
              </span>
            </span>

            <button
              disabled={startIndex === totalPages || totalPages === 0}
              onClick={() => setStartIndex((p) => Math.min(p + 1, totalPages))}
              className={`mx-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                startIndex === totalPages || totalPages === 0
                   ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-500 shadow-sm"
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

export default Contact;
