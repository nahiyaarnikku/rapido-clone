import React from "react";
import "./about.css";
import about1 from "../../Assets/about_us_1.png";
import about2 from "../../Assets/about_us_2.png";
import pos1 from "../../Assets/rishi.png";
import pos3 from "../../Assets/aravind.png";
import pos2 from "../../Assets/pavan.png";
import Temp1 from "../Home/Temp1";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <div className="about-container">
      <div className="row">
        <div
          className="col-lg-6 home-left text-center text-lg-start"
        
        >
          <div className="px-4 mx-auto">
            <h1>India’s Beloved</h1>
            <h1>Bike Taxi Service</h1>
            <p className="m-0 p-0" style={{ fontWeight: "600" }}>
              We are not an option, we are a choice
            </p>
            <p className="m-0 p-0">
              We're #1 choice of 10 Million people because we're the solution of
              India's intra-city commuting problems. With assured safety, we
              also provide economically priced rides.
            </p>
            <p className="m-0 p-0" style={{ fontWeight: "600" }}>
              What makes us different?
            </p>
            <p className="m-0 p-0">
              Our bike taxis can dodge the traffic during peak hours and get you
              to the destination in a jiffy! So when you think travel, think
              Rapido.
            </p>
          </div>
        </div>
        <div className="col-lg-6 home-right mt-5 mt-lg-0">
          <Temp1 img1={about1} img2={about2} />
        </div>
      </div>

      <div className="row my-3">
        <div className="col-lg-6 text-center  py-3 py-lg-0 ">
          <div className="d-inline-flex flex-column align-items-center align-items-lg-start">
            <h3 className="mx-auto">Champions of our success story</h3>
            <span className="head-line"></span>
          </div>
          <p className="know-us-text mx-auto text-center text-lg-start ">
            Rapido has come a long way ever since its inception in 2015. With a
            lot of hardwork and perseverance we have made a place for ourselves
            in the market. As a brand and as a service, it is our constant
            endeavour to redefine ourselves.
          </p>
        </div>
        <div className="col-lg-6 ">
          <div className="row h-100 d-flex align-items-center">
            <div className="col-lg-4 text-center">
              <div className="about-design">
                <div className="about-img">
                  <img src={pos1} alt="founder-img" className="img-fluid" loading="lazy" />
                </div>
              </div>
              <span className="about-name">Rishikesh S R</span>
              <br />
              <span className="about-pos">Founder</span>
            </div>
            <div className="col-lg-4 text-center">
              <div className="about-design">
                <div className="about-img">
                  <img src={pos2} alt="founder-img" className="img-fluid" loading="lazy" />
                </div>
              </div>
              <span className="about-name">Pavan Guntupalli</span>
              <br />
              <span className="about-pos">Founder</span>
            </div>
            <div className="col-lg-4 text-center">
              <div className="about-design ">
                <div className="about-img">
                  <img src={pos3} alt="founder-img" className="img-fluid" loading="lazy" />
                </div>
              </div>
              <span className="about-name">Aravind Sanka</span>
              <br />
              <span className="about-pos">Founder</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rapido-team py-5 ">
        <h1>Jobs @ Rapido</h1>
        <p>
          Join us in exploring a world of endless opportunities. Let’s find a
          spot for you.
        </p>
        <button className="work-btn">Work with us</button>
      </div>
      <Footer />
    </div>
  );
};

export default About;
