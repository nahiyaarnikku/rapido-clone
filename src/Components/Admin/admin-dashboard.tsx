// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AdminDashboard() {
//   const [userCount, setUserCount] = useState(0);
//   const [captainCount, setCaptainCount] = useState(0);
//   const [totalIncome, setTotalIncome] = useState(0);

//   useEffect(() => {
//     // Fetch counts of users and captains
//     axios.get("/api/admin/user-and-captain-count")
//       .then(response => {
//         setUserCount(response.data.userCount);
//         setCaptainCount(response.data.captainCount);
//       })
//       .catch(error => console.error("Error fetching counts:", error));

//     // Fetch total income
//     axios.get("/api/admin/income-details")
//       .then(response => setTotalIncome(response.data.totalIncome))
//       .catch(error => console.error("Error fetching income details:", error));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-yellow-400 text-black p-4">
//         <h1 className="text-2xl font-bold">Rapigo Admin Dashboard</h1>
//       </header>
//       <main className="container mx-auto p-4">
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-gray-100 p-4 rounded-lg">
//               <p className="text-gray-600">Total Users</p>
//               <p className="text-2xl font-bold">{userCount}</p>
//             </div>
//             <div className="bg-gray-100 p-4 rounded-lg">
//               <p className="text-gray-600">Total Captains</p>
//               <p className="text-2xl font-bold">{captainCount}</p>
//             </div>
//             <div className="bg-gray-100 p-4 rounded-lg">
//               <p className="text-gray-600">Total Income</p>
//               <p className="text-2xl font-bold">₹{totalIncome.toLocaleString()}</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
