import React from "react";
import "./careers.css";
import Temp1 from "../Home/Temp1";
import carrer1 from "../../Assets/career_home_1.png";
import carrer2 from "../../Assets/career_home_2.png";
import { benifits } from "../../Assets/Data";
import Slider2 from "../Slider/Slider1";
import Slider1 from "../Slider/Slider";
import { employeesFeedback } from "../../Assets/Data";
import Footer from "../Footer/Footer";

const Careers = () => {
  return (
    <div className="careers-container">
      <div className="row">
        <div className="col-lg-6 text-center text-lg-start">
          <div className="px-4 career-left mx-auto my-lg-3 my-2">
            <h1 className="">Be a part of our team.</h1>

            <p className="m-0 p-0">
              We are so glad you want to join us in exploring a world of endless
              opportunities at Rapido. Let’s find a spot for you.
            </p>
          </div>
        </div>
        <div className="col-lg-6 my-4 my-lg-0">
          <Temp1 img1={carrer1} img2={carrer2} />
        </div>
      </div>
      <div className="why-with-us-container">
      <div className="d-inline-flex flex-column align-items-center align-items-lg-start">
        <h3 className="mx-auto">Why work with us</h3>
        <span className="head-line"></span>
      </div>
      <div className="benifits-wrapper">

          {benifits.map((data,index)=>(
            <div className="benifits" key={index} >
            <img src={data.image} alt="" className="benifits-img" loading="lazy" />
            <p className="benifits-text">{data.body}</p>
            </div>
          ))}
          
      </div>
      </div>
      <Slider2 />
      <div className="text-center my-3">
      <div className="d-flex flex-column align-items-center">
            <h2>What our employees say</h2>
            <span className="head-line"></span>
          </div>
      </div>
      <Slider1 feedback={employeesFeedback} />
      <Footer />
    </div>
  );
};

export default Careers;
