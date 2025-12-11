import React, { useState } from 'react';
import axios from 'axios';

function CaseStudies() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const Base_URL = "https://69305d77778bbf9e0071110b.mockapi.io/casestudies";

  async function handleSubmit(event) {
    event.preventDefault();

    const newCaseStudy = {
      Name: formData.name,
      Email: formData.email,
      Message: formData.message,
    };

    try {
      await axios.post(Base_URL, newCaseStudy);
      alert("Case study submitted successfully!");

      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error("Error submitting case study:", error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-100 p-8 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-slate-200"
      >
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          Case <span className="text-red-600">Studies</span>
        </h1>

        {/* NAME */}
        <label className="block mb-4">
          <span className="text-black font-semibold">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-black"
            required
          />
        </label>

        {/* EMAIL */}
        <label className="block mb-4">
          <span className="text-black font-semibold">Email:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-black"
            required
          />
        </label>

        {/* MESSAGE */}
        <label className="block mb-6">
          <span className="text-black font-semibold">Message:</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            className="mt-1 w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-black h-32"
            required
          />
        </label>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CaseStudies;
