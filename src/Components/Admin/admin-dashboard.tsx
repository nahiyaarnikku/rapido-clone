import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, RefreshCw, User, Users, DollarSign, HelpCircle, Truck } from "lucide-react";
import '../Admin/Admindashboard.css'

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface Captain {
  _id: string;
  name: string;
  email: string;
  phone: string;
  vehicleDetails: {
    vehicleNumber: string;
  };
}

interface HelpRequest {
  _id: string;
  name: string;
  email: string;
  issue: string;
}

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [captainCount, setCaptainCount] = useState<number | null>(null);
  const [totalIncome, setTotalIncome] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedCaptain, setSelectedCaptain] = useState<Captain | null>(null);
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState({
    overview: false,
    user: false,
    captain: false,
    helpRequests: false,
  });

  const fetchDashboardData = async () => {
    setLoading(prev => ({ ...prev, overview: true }));
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/api/admins/counts',
      headers: {}
    };
    try {
      const response = await axios.request(config).then(result => result.data);
      if (response.result === "SUCCESS") {
        setUserCount(response.message.totalUsers);
        setCaptainCount(response.message.totalCaptains);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(prev => ({ ...prev, overview: false }));
    }
  };

  const fetchUserDetails = async (id: string) => {
    setLoading(prev => ({ ...prev, user: true }));
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/api/admins/user/' + id,
      headers: {}
    };
    try {
      const response = await axios.request(config).then(result => result.data);
      if (response.result === "SUCCESS") {
        setSelectedUser(response.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setSelectedUser(null);
    } finally {
      setLoading(prev => ({ ...prev, user: false }));
    }
  };

  const fetchCaptainDetails = async (id: string) => {
    setLoading(prev => ({ ...prev, captain: true }));
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/api/admins/captain/' + id,
      headers: {}
    };
    try {
      const response = await axios.request(config).then(result => result.data);
      if (response.result === "SUCCESS") {
        setSelectedCaptain(response.message);
      }
    } catch (error) {
      console.error("Error fetching captain details:", error);
      setSelectedCaptain(null);
    } finally {
      setLoading(prev => ({ ...prev, captain: false }));
    }
  };

  const fetchHelpRequests = async () => {
    setLoading(prev => ({ ...prev, helpRequests: true }));
    try {
      const response = await axios.get("/api/admin/help-requests");
      setHelpRequests(response.data);
    } catch (error) {
      console.error("Error fetching help requests:", error);
    } finally {
      setLoading(prev => ({ ...prev, helpRequests: false }));
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [])


  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-yellow-400 text-black p-4 shadow-md">
        <h1 className="text-3xl font-bold">Rapigo Admin Dashboard</h1>
      </header>
      <main className="container mx-auto p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Dashboard Overview</h2>
            <button
              onClick={fetchDashboardData}
              className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors flex items-center"
              disabled={loading.overview}
            >
              {loading.overview ? <Loader2 className="animate-spin mr-2" /> : <RefreshCw className="mr-2" />}
              Refresh Data
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-4 rounded-lg shadow"
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Total Users</p>
                <User className="text-yellow-400" />
              </div>
              <p className="text-2xl font-bold">{userCount !== null ? userCount : '-'}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-4 rounded-lg shadow"
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Total Captains</p>
                <Truck className="text-yellow-400" />
              </div>
              <p className="text-2xl font-bold">{captainCount !== null ? captainCount : '-'}</p>
            </motion.div>
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-4 rounded-lg shadow"
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Total Income</p>
                <DollarSign className="text-yellow-400" />
              </div>
              <p className="text-2xl font-bold">
                {totalIncome !== null ? `₹${totalIncome.toLocaleString()}` : '-'}
              </p>
            </motion.div> */}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter User ID"
                className="w-full p-2 border rounded"
                id="userId"
              />
              <button
                onClick={() => fetchUserDetails((document.getElementById('userId') as HTMLInputElement).value)}
                className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
                disabled={loading.user}
              >
                {loading.user ? <Loader2 className="animate-spin" /> : 'Fetch'}
              </button>
            </div>
            {selectedUser && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-4 p-4 bg-gray-100 rounded-md"
              >
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phone}</p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Captain Details</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter Captain ID"
                className="w-full p-2 border rounded"
                id="captainId"
              />
              <button
                onClick={() => fetchCaptainDetails((document.getElementById('captainId') as HTMLInputElement).value)}
                className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
                disabled={loading.captain}
              >
                {loading.captain ? <Loader2 className="animate-spin" /> : 'Fetch'}
              </button>
            </div>
            {selectedCaptain && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-4 p-4 bg-gray-100 rounded-md"
              >
                <p><strong>Name:</strong> {selectedCaptain.name}</p>
                <p><strong>Email:</strong> {selectedCaptain.email}</p>
                <p><strong>Phone:</strong> {selectedCaptain.phone}</p>
                <p><strong>Vehicle Number:</strong> {selectedCaptain.vehicleDetails.vehicleNumber}</p>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Help Requests</h2>
            <button
              onClick={fetchHelpRequests}
              className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors flex items-center"
              disabled={loading.helpRequests}
            >
              {loading.helpRequests ? <Loader2 className="animate-spin mr-2" /> : <HelpCircle className="mr-2" />}
              Fetch Requests
            </button>
          </div>
          {helpRequests.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {helpRequests.map((request) => (
                <motion.li
                  key={request._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-4"
                >
                  <p><strong>Name:</strong> {request.name}</p>
                  <p><strong>Email:</strong> {request.email}</p>
                  <p><strong>Issue:</strong> {request.issue}</p>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p>No pending help requests.</p>
          )}
        </motion.div>
      </main>
    </div>
  );
}
