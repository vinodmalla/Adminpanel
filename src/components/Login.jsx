import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./Authcontext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ FETCH ADMIN BY EMAIL
      const response = await axios.get(
        `https://69247d9f3ad095fb8474688f.mockapi.io/adminlogin?email=${email}`
      );

      console.log("Response:", response.data);

      // 2️⃣ CHECK IF EMAIL EXISTS
      if (response.data.length === 0) {
        alert("Email not found");
        return;
      }

      const admin = response.data[0];

      // 3️⃣ CHECK PASSWORD
      if (admin.password !== password) {
        alert("Incorrect password");
        return;
      }

      // 4️⃣ GENERATE FAKE JWT
      const jwt = "mock-jwt-" + Date.now();

      // 5️⃣ STORE IN CONTEXT
      login(jwt,admin);

      // 6️⃣ REDIRECT AFTER SUCCESS
      navigate("/dashboard");

    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='w-96 p-6 bg-white rounded shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border rounded'
            />
          </div>

          <div className='mb-6'>
            <label className='block text-gray-700 mb-2' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 border rounded'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
