import React, { useState } from "react";
import axios from "axios";

export default function ApplicationForm({ jobId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeBase64, setResumeBase64] = useState("");
  const [resumeName, setResumeName] = useState("");

  const BASE_URL = "https://69247d9f3ad095fb8474688f.mockapi.io/applications";

  // Convert file to Base64
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setResumeName(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setResumeBase64(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prepare data object
    const newApplication = {
      applicantName: name,
      email: email,
      phone: phone,
      coverLetter: coverLetter,
      resumeUrl: resumeBase64,
      resumeName: resumeName,
      jobId: jobId,
      status: "pending",
      appliedAt: new Date().toISOString()
    };

    try {
      await axios.post(BASE_URL, newApplication);
      alert("Application submitted successfully!");

      // clear form
      setName("");
      setEmail("");
      setPhone("");
      setCoverLetter("");
      setResumeBase64("");
      setResumeName("");

    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Apply for this Job</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <textarea
        placeholder="Cover Letter"
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleResumeUpload}
        className="mb-3"
      />

      {resumeName && (
        <p className="text-green-600 mb-3">
          File selected: {resumeName}
        </p>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Application
      </button>
    </form>
  );
}
