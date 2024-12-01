import React,{useRef} from 'react'
import './slider.css'
import Slider from "react-slick";
import { FaGreaterThan } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";
import { careerCarousal } from '../../Assets/Data';
const Slider2 = () => {
    let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
    var settings = {
        dots: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow:2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
  return (
    <div className='slider-container'>
         <Slider   ref={slider => {
          sliderRef = slider;
        }} {...settings}>
       
       {careerCarousal.map((carousal,index)=>(
        <div className="slider2" key={index} >
        <div className="slider-img-container">
   <img src={carousal} alt="carousal-img" className='w-100 h-100' loading="lazy" />
        </div>
       </div>
       ))}
      </Slider>

      <FaLessThan className="prev-button " onClick={previous}/>
      <FaGreaterThan className="next-button" onClick={next}/>
    </div>
  )
}

export default Slider2