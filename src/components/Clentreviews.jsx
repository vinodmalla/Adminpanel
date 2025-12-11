import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'


function Clentreviews() {
 const [reviews,setReviews]=useState([])
    const [startPage,setStartPage]=useState(1)
    const [filtered,setFiltered]=useState([])
    const itemsPerPage=10;

    const BASE_URL="https://6935881efa8e704dafbe1e86.mockapi.io/clientrevies";
    async function fetchdata() {
        try{
            const data=await fetch(BASE_URL)
            const response=await data.json()
            setReviews(response)
        }
        catch(error){
            console.log("Somthing Wentwrong",error)
        }
    }
    function searcReviews(e){
        if(e.target.value===""){
            setFiltered(reviews)
            return;
        }
        else{
            const filter=reviews.filter((review)=>
            review.Company.toLowerCase().includes(e.target.value.toLowerCase()))
            setFiltered(filter)

        }
    }
    async function handleDelete(id) {
        try{
            await fetch(`${BASE_URL}/${id}`,{
                method:"DELETE",
            })
            setReviews(reviews.filter((review)=>review.id!==id))
        }
        catch(error){
            console.log("Something Went Wrong",error)
        }
        
    }
    const startIndex=(startPage-1)*itemsPerPage;
    const endIndex=startPage*itemsPerPage;
    const finaldata=filtered.length>0 ?filtered :reviews;
    const currentData=finaldata.slice(startIndex,endIndex)
    const totalPages=Math.floor(currentData.length/itemsPerPage)

    useEffect(()=>{
        fetchdata()
    },[])
  return (
    <div className=" bg-white p-8">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header + Search */}
        <div className="bg-white p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 text-center md:text-left">
             Client  Reviews
            </h1>
            <p className="text-sm text-slate-500 mt-1 text-center md:text-left">
              View and manage all Client Revies
            </p>

          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-slate-300 text-sm transition bg-white"
              placeholder="Search by Name, Email, or Mobile..."
              onChange={searcReviews}
            />
          </div>
           <Link to="/clientreviewform">
              <button className="w-full sm:w-auto px-4 py-2  bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800 transition shadow-sm">
                Add Review
              </button>
            </Link>
        </div>

        {/* Table Card */}
        <div className="bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 text-left text-lg font-semibold text-black uppercase tracking-wide border-b">
                   Company Name
                  </th>
                  <th className="py-3 px-4 text-left text-lg font-semibold text-black uppercase tracking-wide border-b">
                  Name
                  </th>
                  <th className="py-3 px-4 text-left text-lg font-semibold text-black uppercase tracking-wide border-b">
                  Role
                  </th>
                  <th className="py-3 px-4 text-left text-lg font-semibold text-black uppercase tracking-wide border-b">
                   Rating
                  </th>
                  <th className="py-3 px-4 text-left text-lg font-semibold text-black uppercase tracking-wide border-b">
                   Discription
                  </th>
             
            
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentData.map((review) => (
                  <tr
                    key={review.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-base text-black">
                      {review.Company}
                    </td>
                    <td className="py-3 px-4 text-base text-black">
                      {review.Name}
                    </td>
                    <td className="py-3 px-4 text-base text-black">
                      {review.Role}
                    </td>
                    <td className="py-3 px-4 text-base text-black">
                      {review.Rating}
                    </td>
                    <td className="py-3 px-4 text-base text-black">
                      {review.Disc}
                    </td>
                    
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold  bg-red-600 text-white shadow-sm hover:bg-rose-600 active:bg-rose-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {currentData.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-6 px-4 text-center text-sm text-black"
                    >
                      No Reviews found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 py-3 border-t border-slate-200 bg-slate-50">
            <button
              disabled={startPage === 1}
              onClick={() => setStartPage((p) => Math.max(p - 1, p))}
              className={`mx-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                startPage === 1
                  ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-500 shadow-sm"
              }`}
            >
              Previous
            </button>

            <span className="text-sm text-black">
              Page{" "}
              <span className="font-semibold text-black">{startPage}</span>{" "}
              of{" "}
              <span className="font-semibold text-black">
                {totalPages || 1}
              </span>
            </span>

            <button
              disabled={startPage === totalPages || totalPages === 0}
              onClick={() => setStartPage((p) => Math.min(p + 1, totalPages))}
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
  )
}

export default Clentreviews
