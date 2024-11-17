import React, { useContext,useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
import logo from '../../Assets/logo.jpeg'
import DataContext from '../../Context/Context'
import { AiOutlineMenu } from "react-icons/ai";
import Offcanvas from "react-bootstrap/Offcanvas";

const Navbar = () => {
    const {active,setActive} = useContext(DataContext)
    const [show, setShow] = useState(false);
      const handleClose = ( ) => setShow(false);
    const handleShow = () => setShow(true);
    const nav = [ 
        {link : "Home",path:"/"},
        {link : "About Us",path:"/about"},
        {link : "Safety",path:"/safety"},
        {link : "Careers",path:"/careers"},
        {link : "Contact Us",path:"/contact"}
]
const handleNavigation = (nav) => {
    setActive(nav)
    handleClose();
}

useEffect(()=>{
  localStorage.setItem("nav",active)
},[active])

  return (
    <div>
        <div className="nav-container">
            <div className="nav-wrapper  px-md-4 py-md-2 p-2">
            <img src={logo} alt="logo-img" className="app-logo" />
            <div className="nav-items d-none d-md-flex">
              <div className="nav-menu">
              {
            nav.map((nav,index)=>(
                <Link to={nav.path} className={`${active === nav.link ? "nav-links-active" :""} nav-links`} onClick={()=>setActive(nav.link)} key={index}>{nav.link}</Link>
            ))
            }
              </div>
              <a href="/login" className='app-download-btn'>Login</a>      
            </div>

            <div className="menu-icons d-md-none">
                <p className='download-text'>Login</p>
            <AiOutlineMenu className='menu-bar' onClick={handleShow}/>

            <Offcanvas show={show} onHide={handleClose} placement="end" id="offcanvas-bar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="nav-menu">
              {
            nav.map((nav,index)=>(
                <Link to={nav.path} className={`${active === nav.link ? "nav-links-active" :""} nav-links`} onClick={()=>handleNavigation(nav.link)} key={index}>{nav.link}</Link>
            ))
            }
              </div>
        </Offcanvas.Body>
      </Offcanvas>
            </div>
            </div>
        </div>
       
    </div>
  )
}

export default Navbar