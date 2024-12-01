import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { format, subDays, addHours } from 'date-fns';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Simulated API calls
const fetchData = async (period) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const endDate = new Date();
  const startDate = subDays(endDate, period === 'week' ? 7 : period === 'month' ? 30 : 365);
  const generateData = (start, end, dataPoints) => {
    const data = [];
    const step = (end - start) / (dataPoints - 1);
    for (let i = 0; i < dataPoints; i++) {
      const date = new Date(start.getTime() + step * i);
      data.push({
        date: format(date, 'MMM dd'),
        revenue: Math.floor(Math.random() * 5000) + 1000,
        rides: Math.floor(Math.random() * 50) + 10
      });
    }
    return data;
  };
  return generateData(startDate, endDate, period === 'week' ? 7 : period === 'month' ? 30 : 12);
};

const fetchUpcomingRides = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const now = new Date();
  return [
    { id: 1, pickup: "Central Park", dropoff: "Times Square", time: addHours(now, 1) },
    { id: 2, pickup: "Brooklyn Bridge", dropoff: "Statue of Liberty", time: addHours(now, 2) },
    { id: 3, pickup: "Grand Central Station", dropoff: "Empire State Building", time: addHours(now, 3) },
  ];
};

const CaptainDashboard = () => {
  const [period, setPeriod] = useState('week');
  const [data, setData] = useState([]);
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [newData, newUpcomingRides] = await Promise.all([
        fetchData(period),
        fetchUpcomingRides()
      ]);
      setData(newData);
      setUpcomingRides(newUpcomingRides);
      setLoading(false);
    };
    loadData();
  }, [period]);

  const totalRevenue = data.reduce((sum, day) => sum + day.revenue, 0);
  const totalRides = data.reduce((sum, day) => sum + day.rides, 0);
  const averageFare = totalRides > 0 ? totalRevenue / totalRides : 0;
  const completionRate = 95;

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
  };

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
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Captain Dashboard</h1>
      </header>
      <main style={styles.main}>
        <section>
          <h2 style={styles.sectionTitle}>Upcoming Rides</h2>
          <div style={styles.upcomingRidesGrid}>
            {upcomingRides.map((ride) => (
              <div key={ride.id} style={styles.upcomingRideCard}>
                <div style={styles.upcomingRideTime}>{format(ride.time, 'h:mm a')}</div>
                <div>Pickup: {ride.pickup}</div>
                <div>Dropoff: {ride.dropoff}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.overviewSection}>
          <h2 style={styles.sectionTitle}>Overview</h2>
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            style={styles.periodSelect}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </section>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3>Total Revenue</h3>
            <p style={styles.statValue}>₹{totalRevenue.toFixed(2)}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Total Rides</h3>
            <p style={styles.statValue}>{totalRides}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Average Fare</h3>
            <p style={styles.statValue}>₹{averageFare.toFixed(2)}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Completion Rate</h3>
            <p style={styles.statValue}>{completionRate}%</p>
          </div>
        </div>

        <div style={styles.chartsGrid}>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Revenue Trend</h3>
            {loading ? (
              <div style={styles.loadingSpinner}>Loading...</div>
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
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Rides Trend</h3>
            {loading ? (
              <div style={styles.loadingSpinner}>Loading...</div>
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

        <div style={styles.chartsGrid}>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Performance Overview</h3>
            <div style={styles.performanceChart}>
              <div style={styles.performanceCircle}>
                <span style={styles.performanceText}>{completionRate}%</span>
              </div>
              <p>Completion Rate</p>
            </div>
          </div>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Recent Rides</h3>
            <table style={styles.recentRidesTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Revenue</th>
                  <th>Rides</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 5).map((day, index) => (
                  <tr key={index}>
                    <td>{day.date}</td>
                    <td>₹{day.revenue.toFixed(2)}</td>
                    <td>{day.rides}</td>
                    <td>
                      <span style={day.rides > 30 ? styles.excellentBadge : styles.goodBadge}>
                        {day.rides > 30 ? 'Excellent' : 'Good'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#eab308',
    color: 'black',
    padding: '1rem',
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  main: {
    padding: '1rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  upcomingRidesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  upcomingRideCard: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    ':hover': {
      transform: 'translateY(-5px)',
    },
  },
  upcomingRideTime: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  overviewSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  periodSelect: {
    padding: '0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid #e2e8f0',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2d3748',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  chartCard: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  chartTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  loadingSpinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
  },
  performanceChart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
  },
  performanceCircle: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    border: '10px solid #48bb78',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  performanceText: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  recentRidesTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  excellentBadge: {
    backgroundColor: '#48bb78',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
  },
  goodBadge: {
    backgroundColor: '#ecc94b',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
  },
};

export default CaptainDashboard;