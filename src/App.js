import React,{Suspense} from 'react'
import './App.css';
import { DataProvider } from './Context/Context';
import Navbar from './Components/Navbar/Navbar';
import {Routes,Route} from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import RoutePlanner from './Components/RoutePlanner/RoutePlanner';

const Home = React.lazy(()=> import('./Components/Home/Home')) ;
const About = React.lazy(()=> import('./Components/About/About')) ;
const Careers = React.lazy(()=> import('./Components/Carrers/Careers'))
const Safety = React.lazy(()=> import('./Components/Safety/Safety')) ;
const Contact = React.lazy(()=> import('./Components/Contact/Contact')) ;
const Login = React.lazy(()=> import('./Components/Login/Login')) ;
const CaptainLogin = React.lazy(()=> import('./Components/Login/CaptainLogin')) ;
const CustomerLogin = React.lazy(()=> import('./Components/Login/CustomerLogin')) ;
const CaptainSignup = React.lazy(()=> import('./Components/Register/CaptainSignup')) ;
const CustomerSignup = React.lazy(()=> import('./Components/Register/CustomerSignup')) ;
const Register = React.lazy(()=> import('./Components/Register/Register')) ;

function App() {

 return(
  <div>
   <DataProvider>
     <Navbar/>
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
      <Route path="/customer-signup" element={<Suspense fallback={<div className='suspense'> <ClipLoader
        color={"#f9c935"}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>}> <CustomerSignup /></Suspense>} />
      <Route path="/register" element={<Suspense fallback={<div className='suspense'> <ClipLoader 
        color={"#f9c935"}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>}> <Register /></Suspense>} />
      <Route path='/route-planner' element={<RoutePlanner />} />
     </Routes>
   </DataProvider>
  </div>
 )
}

export default App;
