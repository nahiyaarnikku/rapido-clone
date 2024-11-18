'use client'

import React, { useState, useEffect } from 'react'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { CalendarIcon, CreditCard, Users, TrendingUp, List, ChevronDown } from 'lucide-react'
import { format, subDays } from 'date-fns'

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend
)

// Simulated API call
const fetchData = async (period) => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay

  const endDate = new Date()
  const startDate = subDays(endDate, period === 'week' ? 7 : period === 'month' ? 30 : 365)

  const generateData = (start, end, dataPoints) => {
    const data = []
    const step = (end - start) / (dataPoints - 1)
    for (let i = 0; i < dataPoints; i++) {
      const date = new Date(start.getTime() + step * i)
      data.push({
        date: format(date, 'MMM dd'),
        revenue: Math.floor(Math.random() * 5000) + 1000,
        rides: Math.floor(Math.random() * 50) + 10
      })
    }
    return data
  }

  return generateData(startDate, endDate, period === 'week' ? 7 : period === 'month' ? 30 : 12)
}

export default function CaptainDashboard() {
  const [period, setPeriod] = useState('week')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const newData = await fetchData(period)
      setData(newData)
      setLoading(false)
    }
    loadData()
  }, [period])

  const totalRevenue = data.reduce((sum, day) => sum + day.revenue, 0)
  const totalRides = data.reduce((sum, day) => sum + day.rides, 0)
  const averageFare = totalRides > 0 ? totalRevenue / totalRides : 0
  const completionRate = 95 // Assuming a fixed completion rate for this example

  const revenueData = {
    labels: data.map(day => day.date),
    datasets: [
      {
        label: 'Revenue',
        data: data.map(day => day.revenue),
        borderColor: 'rgba(234, 179, 8, 1)',
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
      }
    ]
  }

  const ridesData = {
    labels: data.map(day => day.date),
    datasets: [
      {
        label: 'Number of Rides',
        data: data.map(day => day.rides),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      }
    ]
  }

  const performanceData = {
    labels: ['Completed', 'Cancelled'],
    datasets: [
      {
        data: [completionRate, 100 - completionRate],
        backgroundColor: ['rgba(234, 179, 8, 0.8)', 'rgba(239, 68, 68, 0.8)'],
        hoverBackgroundColor: ['rgba(234, 179, 8, 1)', 'rgba(239, 68, 68, 1)'],
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-yellow-400 text-black p-4">
        <h1 className="text-2xl font-bold">Captain Dashboard</h1>
      </header>
      <main className="p-4">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Overview</h2>
          <div className="relative">
            <select 
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-2xl font-semibold">₹{totalRevenue.toFixed(2)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Rides</p>
                <p className="text-2xl font-semibold">{totalRides}</p>
              </div>
              <Users className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Average Fare</p>
                <p className="text-2xl font-semibold">₹{averageFare.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completion Rate</p>
                <p className="text-2xl font-semibold">{completionRate}%</p>
              </div>
              <List className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
              </div>
            ) : (
              <Bar 
                data={revenueData} 
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Revenue (₹)'
                      }
                    }
                  }
                }}
              />
            )}
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Rides Trend</h3>
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
              </div>
            ) : (
              <Line 
                data={ridesData}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of Rides'
                      }
                    }
                  }
                }}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
            <div className="h-64">
              <Doughnut 
                data={performanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Recent Rides</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rides</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.slice(0, 5).map((day, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{day.revenue.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.rides}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}