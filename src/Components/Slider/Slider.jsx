import React,{useRef} from 'react'
import './slider.css'
import Slider from "react-slick";
import { FaGreaterThan } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";
const Slider1 = ({feedback}) => {
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
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
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
        {feedback && feedback.map((feed,index)=>(
              <div className='slider' key={index}>
            <div className='slider-content'>
          <div className="row w-100 mx-auto">
            <div className="col-md-3">
                <div className="slider-design">
                     <div className="slider-img">
                     <img src={feed.image} alt="cutomer-img"  className='img-fluid w-100 h-100' loading="lazy" />
                     </div>
                </div>
            </div>
            <div className="col-md-9 pt-md-4">     
                <p className='slider-text'>{feed.body}</p>
               
               <h6 className='m-0 p-0'>{feed.h5}</h6>
               <span>{feed.span}</span>
            </div>
          </div>
        </div>
        </div>
        ))}
 
      </Slider>

      <FaLessThan className="prev-button " onClick={previous}/>
      <FaGreaterThan className="next-button" onClick={next}/>
    </div>
  )
}

export default Slider1