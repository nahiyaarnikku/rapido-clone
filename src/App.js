import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';
import AdminDashboard from './Components/Admin/admin-dashboard.tsx';
import AdminLogin from './Components/Admin/admin-login.tsx';
import CaptainApprovedRide from './Components/CaptainApprovedRide/CaptainApprovedRide';
import CaptainRideRequest from './Components/CaptainRideRequest/CaptainRideRequest';
import CaptainRideStart from './Components/CaptainRideStart/CaptainRideStart';
import CaptainSearch from './Components/CaptainSearch/CaptainSearch';
import Navbar from './Components/Navbar/Navbar';
import RideStarted from './Components/RideStarted/RideStarted.jsx';
import RouteAndPricingIndia from './Components/RouteAndPricingIndia/RouteAndPricingIndia';
import RoutePlanner from './Components/RoutePlanner/RoutePlanner';
import { DataProvider } from './Context/Context';

export const BaseUrl = 'http://localhost:5000';

const Home = React.lazy(() => import('./Components/Home/Home'));
const About = React.lazy(() => import('./Components/About/About'));
const Careers = React.lazy(() => import('./Components/Carrers/Careers'))
const Safety = React.lazy(() => import('./Components/Safety/Safety'));
const Contact = React.lazy(() => import('./Components/Contact/Contact'));
const Login = React.lazy(() => import('./Components/Login/Login'));
const CaptainLogin = React.lazy(() => import('./Components/Login/CaptainLogin'));
const CustomerLogin = React.lazy(() => import('./Components/Login/CustomerLogin'));
const CaptainSignup = React.lazy(() => import('./Components/Register/CaptainSignup'));
const CustomerSignup = React.lazy(() => import('./Components/Register/CustomerSignup'));
const Register = React.lazy(() => import('./Components/Register/Register'));
const Stripe = React.lazy(() => import('./Components/PaymentGateway/Stripe'));
const Dashboard = React.lazy(() => import('./Components/Dashboard/Dashboard'));
const Help = React.lazy(() => import('./Components/Help/help'));
const CustomerHome = React.lazy(() => import('./Components/Home/customerhome'));
const CustomerProfile = React.lazy(() => import('./Components/Profile/customerprofile'));

function App() {
  const location = useLocation(); // Get the current route
  // Define your multiple conditions
  const shouldRenderNavbar = location.pathname !== '/route-planner' && location.pathname !== '/customerhome' && location.pathname !== '/customerprofile' && location.pathname !== '/captain-approved-ride' && location.pathname !== '/captain-search' && location.pathname !== '/captaindashboard' && location.pathname !== '/captain-ride-request' && location.pathname !== '/ride-started' && location.pathname !== '/ride-started-captain';

  return (
    <div className='app'>
      <DataProvider>
        {/* Render Navbar only if the current path is not '/route-planner' */}
        {shouldRenderNavbar && <Navbar />}
        <div className={shouldRenderNavbar ? 'content' : ''}>
          <Routes>
            <Route path="/home" element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div>}> <Home /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div>}><About /></Suspense>} />
            <Route path="/safety" element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div>}> <Safety /></Suspense>} />
            <Route path="/careers" element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div>}> <Careers /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div>}> <Contact /></Suspense>} />
            <Route path="/login" element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div>}> <Login /></Suspense>} />
            <Route path="/captainlogin" element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div>}> <CaptainLogin /></Suspense>} />
            <Route path="/customerlogin" element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div>}> <CustomerLogin /></Suspense>} />
            <Route path="/CaptainSignup" element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div>}> <CaptainSignup /></Suspense>} />
            <Route
              path="/customer-signup"
              element={
                <Suspense fallback={<div className='suspense'> <ClipLoader color="#f9c935" /> </div>}>
                  <CustomerSignup isOpen={true} onClose={() => console.log('Closed')} />
                </Suspense>
              }
            />
            <Route path="/register" element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div>}> <Register /></Suspense>} />
            <Route path="/stripe" element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div>}> <Stripe /></Suspense>} />
            <Route path="/captaindashboard" element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div>}> <Dashboard /></Suspense>} />
            <Route path="/help" element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div>}> <Help /></Suspense>} />
            <Route path='/route-planner' element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"} aria-label="Loading Spinner" data-testid="loader" /></div>}> <RoutePlanner /></Suspense>} />
            <Route path='/customerprofile' element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"} aria-label="Loading Spinner" data-testid="loader" /></div>}> <CustomerProfile /></Suspense>} />
            <Route path='/customerhome' element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"} aria-label="Loading Spinner" data-testid="loader" /></div>}> <CustomerHome /></Suspense>} />
            <Route path='/captain-approved-ride' element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"} aria-label="Loading Spinner" data-testid="loader" /></div>}> <CaptainApprovedRide /></Suspense>} />
            <Route path='/captain-ride-request' element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"} aria-label="Loading Spinner" data-testid="loader" /></div>}> <CaptainRideRequest /></Suspense>} />
            <Route path='/captain-ride-start' element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"} aria-label="Loading Spinner" data-testid="loader" /></div>}> <CaptainRideStart /></Suspense>} />
            <Route path='/route-and-pricing-india' element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"} aria-label="Loading Spinner" data-testid="loader" /></div>}> <RouteAndPricingIndia /></Suspense>} />
            <Route path='/captain-search' element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"} aria-label="Loading Spinner" data-testid="loader" /></div>}> <CaptainSearch /></Suspense>} />
            <Route path='/admin-dashboard' element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"} aria-label="Loading Spinner" data-testid="loader" /></div>}> <AdminDashboard /></Suspense>} />
            <Route path='/admin-login' element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"} aria-label="Loading Spinner" data-testid="loader" /></div>}> <AdminLogin /></Suspense>} />
            <Route path='/ride-started' element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"} aria-label="Loading Spinner" data-testid="loader" /></div>}> <RideStarted /></Suspense>} />
            <Route path='/ride-started-captain' element={<Suspense fallback={<div className='suspense'> <ClipLoader
              color={"#f9c935"} aria-label="Loading Spinner" data-testid="loader" /></div>}> <RideStarted /></Suspense>} />
          </Routes>
        </div>
      </DataProvider>
    </div>
  )
}

export default App;