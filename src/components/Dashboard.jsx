import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBriefcase,
  FaUsers,
  FaAddressBook,
  FaFileAlt,
  FaSignOutAlt,
  FaThLarge,
} from "react-icons/fa";

function DashboardCard({ title, count, icon: Icon, accent }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-5 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-4xl font-extrabold mt-2 text-slate-800">
            {count}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${accent} bg-opacity-10`}
        >
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [jobscount, setJobscount] = useState(0);
  const [applicantscount, setApplicantscount] = useState(0);
  const [contactscount, setContactscount] = useState(0);
  const [caseStudiescount, setCaseStudiescount] = useState(0);
  const [logos,setLogos]=useState(0)
  const [client,setClient]=useState(0)
  const [insights,setInsights]=useState(0)

  const location = useLocation();

  const BASE_URL = "https://69247d9f3ad095fb8474688f.mockapi.io/applications";
  const BASE_URL1 = "https://69305d77778bbf9e0071110b.mockapi.io/contact";
  const BASE_URL2 = "https://69305d77778bbf9e0071110b.mockapi.io/casestudies";
  const BASE_URL3 = "https://6933d2894090fe3bf01e1697.mockapi.io/Jobs";
  const BASE_URL4="https://6935881efa8e704dafbe1e86.mockapi.io/logos";
   const BASE_URL5="https://6935881efa8e704dafbe1e86.mockapi.io/clientrevies";
    const BASE_URL6="https://694416237dd335f4c35f3edc.mockapi.io/Insightsform"
  const fetchJobsCount = async () => {
    try {
      const response = await fetch(BASE_URL);
      const response1 = await fetch(BASE_URL1);
      const response2 = await fetch(BASE_URL2);
      const response3 = await fetch(BASE_URL3);
      const response4=await fetch(BASE_URL4)
      const response5=await fetch(BASE_URL5)
      const response6=await fetch(BASE_URL6);
      const data6=await response6.json()
      const data5=await response5.json();
      const data4=await response4.json();
      const data3 = await response3.json();
      const data2 = await response2.json();
      const data1 = await response1.json();
      const data = await response.json();
      setInsights(data6.length)
      setClient(data5.length)
      setLogos(data4.length)
      setApplicantscount(data.length);
      setContactscount(data1.length);
      setCaseStudiescount(data2.length);
      setJobscount(data3.length);
    } catch (error) {
      console.error("Error fetching applicants data:", error);
    }
  };

  useEffect(() => {
    fetchJobsCount();
  }, []);

  return (
    <div className="min-h-screen flex bg-white">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white backdrop-blur-xl border-r border-slate-200 shadow-xl flex flex-col">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
            D
          </div>
          <div>
            <p className="text-sm font-semibold text-black tracking-wide">
              DoelSoft
            </p>
            <p className="text-base font-bold text-slate-800">
              Admin Panel
            </p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              location.pathname === "/dashboard"
                ? "bg-red-600 text-white shadow-md"
                : "text-gary-700 hover:bg-slate-100"
            }`}
          >
            <FaThLarge />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/jobdetails"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              location.pathname.startsWith("/jobdetails")
                ? "bg-white text-red-600"
                : "text-gary-700 hover:bg-gray-300"
            }`}
          >
            <FaBriefcase />
            <span>Jobs</span>
          </Link>

          <Link
            to="/applicationsdata"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              location.pathname.startsWith("/applicationsdata")
                ? "bg-indigo-50 text-red-600"
                : "text-gary-700 hover:bg-gray-300"
            }`}
          >
            <FaUsers />
            <span>Applicants</span>
          </Link>

          <Link
            to="/contact"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              location.pathname.startsWith("/contact")
                ? "bg-indigo-50 text-red-600"
                : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            <FaAddressBook />
            <span>Contacts</span>
          </Link>

          <Link
            to="/casestudy"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              location.pathname.startsWith("/casestudy")
                ? "bg-indigo-50 text-red-600"
                : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            <FaFileAlt />
            <span>Case Studies</span>
          </Link>
        </nav>

        <div className="px-4 py-4 border-t border-slate-200">
       <Link to="/"> <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold shadow-md hover:bg-red-600 active:bg-red-700 transition">
            <FaSignOutAlt />
            <span>Logout</span>
          </button></Link>  
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-red-600 to-gray-600 text-transparent bg-clip-text">
              Dashboard Overview
            </h1>
            <p className="text-gray-700 text-sm mt-1">
              Quick stats of your Jobs, Applicants, Contacts and Case Studies.
            </p>
          </div>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <Link to="/jobdetails">
            <DashboardCard
              title="Jobs"
              count={jobscount}
              icon={FaBriefcase}
              accent="text-indigo-600"
            />
          </Link>

          <Link to="/applicationsdata">
            <DashboardCard
              title="Applicants"
              count={applicantscount}
              icon={FaUsers}
              accent="text-emerald-600"
            />
          </Link>

          <Link to="/contact">
            <DashboardCard
              title="Contacts"
              count={contactscount}
              icon={FaAddressBook}
              accent="text-amber-500"
            />
          </Link>

          <Link to="/casestudy">
            <DashboardCard
              title="Case Studies"
              count={caseStudiescount}
              icon={FaFileAlt}
              accent="text-rose-500"
            />
          </Link>
        <Link to="/clientlogos">  <DashboardCard
        title="Client logos"
        count={logos}
        icon={FaFileAlt}
        accent="text-rose-500"
          /> </Link>
           <Link to="/clientreview">  <DashboardCard
        title="Client Reviews"
        count={client}
        icon={FaFileAlt}
        accent="text-rose-500"
          /> </Link>
        <Link to="/insights">  <DashboardCard
        title="Insights"
        count={insights}
        icon={FaFileAlt}
        accent="text-rose-500"
          /> </Link>
         
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
