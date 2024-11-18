import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import RoutePlanner from './Components/RoutePlanner/RoutePlanner';
import { DataProvider } from './Context/Context';

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

function App() {
  const location = useLocation(); // Get the current route
  return (
    <div>
      <DataProvider>
        {/* Render Navbar only if the current path is not '/route-planner' */}
        {location.pathname !== '/route-planner' && <Navbar />}
        <Routes>
          <Route path="/" element={<Suspense fallback={<div className='suspense'> <ClipLoader
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
          <Route path='route-planner' element={<RoutePlanner />} />
          <Route path='/stripe' element={<Stripe />} />
          <Route path='/captaindashboard' element={<Dashboard />} />
        </Routes>
      </DataProvider>
    </div>
  )
}

export default App;
