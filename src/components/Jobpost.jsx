import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Jobpost() {
    const BASE_URL = "https://6933d2894090fe3bf01e1697.mockapi.io/Jobs"; 
    const {id}=useParams()

  const [formData, setFormData] = useState({
    title: "",
    level: "",
    location: [],          // multi-select or checkbox array
    responsibility: "",
    details: {
      responsibilities: [""], // array of strings
      specifications: [""],   // array of strings
      type: "",
      workplace: "",
      experience: "",
      salary: "",
      jobLocation: [],        // array of strings
    },
  });

  // Handle input change
const handleInputChange = (e, field, nestedField = null, index = null) => {
  const value = e.target.value;

  if (nestedField) {
    // 🟦 CASE A: details[nestedField] is an array (responsibilities, specifications, jobLocation)
    if (Array.isArray(formData.details[nestedField])) {
      const updatedArray = [...formData.details[nestedField]];
      if (index !== null) {
        updatedArray[index] = value;
      }

      setFormData((prev) => ({
        ...prev,
        details: { ...prev.details, [nestedField]: updatedArray },
      }));
    } else {
      // 🟩 CASE B: details[nestedField] is a simple value (type, workplace, experience, salary)
      setFormData((prev) => ({
        ...prev,
        details: { ...prev.details, [nestedField]: value },
      }));
    }
    return; // we're done for nested fields
  }


    // 🟧 CASE D: simple root-level value (title, level, responsibility, etc.)
    setFormData((prev) => ({ ...prev, [field]: value }));
 
};


  // Add new responsibility/specification field dynamically
  const addField = (nestedField) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [nestedField]: [...prev.details[nestedField], ""],
      },
    }));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
       if (id) {
      // 🟦 UPDATE existing job (PUT)
      await axios.put(`${BASE_URL}/${id}`, formData);
      alert("Job updated successfully!");
    } else {
      // 🟧 CREATE new job (POST)
      await axios.post(BASE_URL, formData);
      alert("Job posted successfully!");
    }

      setFormData({
        title: "",
        level: "",
        location: [],
        responsibility: "",
        details: {
          responsibilities: [""],
          specifications: [""],
          type: "",
          workplace: "",
          experience: "",
          salary: "",
          jobLocation: [],
        },
      });
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job");
    }
  };
 useEffect(() => {
  if (id) {
    axios.get(`${BASE_URL}/${id}`)
      .then((res) => {
        const job = res.data;

        setFormData({
          title: job.title || "",
          level: job.level || "",
          location: job.location || [],
          responsibility: job.responsibility || "",
          
          details: {
            responsibilities: job.details?.responsibilities?.length
              ? job.details.responsibilities
              : [""],

            specifications: job.details?.specifications?.length
              ? job.details.specifications
              : [""],

            type: job.details?.type || "",
            workplace: job.details?.workplace || "",
            experience: job.details?.experience || "",
            salary: job.details?.salary || "",
            jobLocation: job.details?.jobLocation || [],
          }
        });
      })
      .catch((err) => console.error("Error loading job:", err));
  }
}, [id]);



  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Job Title"
          value={formData.title}
          onChange={(e) => handleInputChange(e, "title")}
          className="border p-2 w-full mb-3"
        />
        <input
          type="text"
          placeholder="Job Level"
          value={formData.level}
          onChange={(e) => handleInputChange(e, "level")}
          className="border p-2 w-full mb-3"
        />
        <input
          type="text"
          placeholder="Locations (comma separated)"
          value={formData.location.join(", ")}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              location: e.target.value.split(",").map((l) => l.trim()),
            }))
          }
          className="border p-2 w-full mb-3"
        />

        <textarea
          placeholder="Primary Responsibility"
          value={formData.responsibility}
          onChange={(e) => handleInputChange(e, "responsibility")}
          className="border p-2 w-full mb-3"
        />

        {/* Responsibilities Array */}
        <label className="block font-bold">Responsibilities:</label>
        {formData.details.responsibilities.map((resp, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Responsibility ${idx + 1}`}
            value={resp}
            onChange={(e) =>
              handleInputChange(e, "details", "responsibilities", idx)
            }
            className="border p-2 w-full mb-2"
          />
        ))}
        <button
          type="button"
          onClick={() => addField("responsibilities")}
          className="mb-3 text-blue-600"
        >
          + Add Responsibility
        </button>

        {/* Specifications Array */}
        <label className="block font-bold">Job Specifications:</label>
        {formData.details.specifications.map((spec, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Specification ${idx + 1}`}
            value={spec}
            onChange={(e) =>
              handleInputChange(e, "details", "specifications", idx)
            }
            className="border p-2 w-full mb-2"
          />
        ))}
        <button
          type="button"
          onClick={() => addField("specifications")}
          className="mb-3 text-blue-600"
        >
          + Add Specification
        </button>

        {/* Other details */}
        <input
          type="text"
          placeholder="Employment Type (Full-time, Part-time)"
          value={formData.details.type}
          onChange={(e) => handleInputChange(e, "details", "type")}
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          placeholder="Workplace Type (Hybrid, Remote)"
          value={formData.details.workplace}
          onChange={(e) => handleInputChange(e, "details", "workplace")}
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          placeholder="Experience Required"
          value={formData.details.experience}
          onChange={(e) => handleInputChange(e, "details", "experience")}
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          placeholder="Salary"
          value={formData.details.salary}
          onChange={(e) => handleInputChange(e, "details", "salary")}
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          placeholder="Job Locations (comma separated)"
          value={formData.details.jobLocation.join(", ")}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              details: {
                ...prev.details,
                jobLocation: e.target.value.split(",").map((l) => l.trim()),
              },
            }))
          }
          className="border p-2 w-full mb-3"
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post Job
        </button>
      </form>
    </div>
  );    
}

export default Jobpost
