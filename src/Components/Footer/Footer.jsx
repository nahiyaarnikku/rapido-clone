import React from 'react'
import './footer.css'
import playstore from '../../Assets/playstore.jpg'
import appstore from '../../Assets/appstore.png'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  const year = new Date().getFullYear()

    const nav = [ 
        {link : "Home",path:"/"},
        {link : "About Us",path:"/about"},
        {link : "Safety",path:"/safety"},
        {link : "Careers",path:"/careers"},
        {link : "Contact Us",path:"/contact"}
]
   const nav1 = ["Customer Terms - Bike Taxi","Customer Terms - Cabs and Auto" ,"Corporate Affairs"]
  return (
    <footer className='footer-container'>
        <div className="footer-wrapper">
           <div className="footer">
             <h5>Customer App</h5>
           <img src={playstore} alt="playstore" className='footer-img'/>
           <img src={appstore} alt="appstore" className='footer-img'/>

           </div>
           <div className="footer">
           <h5>Captains App</h5>
           <img src={playstore} alt="playstore" className='footer-img'/>
           <img src={appstore} alt="appstore" className='footer-img'/>

           </div>
           <div className="footer">
             <ul className='footer-menu'>
              {nav.map((nav,index)=>(
                <li key={index} className='footer-nav-link'>{nav.link}</li>
              ))}
             </ul>
           </div>
           <div className="footer">
           <ul className='footer-menu'>
              {nav1.map((nav,index)=>(
                <li key={index}  className='footer-nav-link'>{nav}</li>
              ))}
             </ul>
           </div>
           <div className="footer">
            <h5>Follow Us</h5>
           <div className="d-flex justify-content-center align-items-center gap-3 fs-4 my-3">
           <FaFacebookF className='nav-icons'/>
            <FaTwitter className='nav-icons' />
            <FaLinkedinIn className='nav-icons'/>
            <FaInstagram className='nav-icons'/>
           </div>
           </div>
        </div>
        <hr />

        <p className='text-center'>&copy; {year} Tanvi Dubey . All rights reserved.</p>

    </footer>
  )
}

export default Footer