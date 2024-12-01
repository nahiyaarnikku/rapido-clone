// import React, { useState } from "react";
// import axios from "axios";

// export default function AdminLogin() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/admin/login", { username, password });
//       localStorage.setItem("adminToken", response.data.token);
//       alert("Login successful!");
//       window.location.href = "/admin-dashboard";
//     } catch (err) {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-yellow-400 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
//         <form onSubmit={handleLogin}>
//           {/* Form Fields */}
//           <button type="submit">Log In</button>
//         </form>
//       </div>
//     </div>
//   );
// }
