import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./exploreTopCategories.scss";

const ExploreTopCategories = () => {

    const responsive = {
        desktop: {
          breakpoint: { max: 1800, min: 768 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 768, min: 480 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 480, min: 0 },
          items: 2
        }
      };

    const data = [
        {
            name: "Spring forward!",
            img: "./etc1.webp",
        },
        {
            name: "Bold Moves",
            img: "./etc2.webp",
        },
        {
            name: "Online Exclusive",
            img: "./etc3.webp",
        }
    ]

  return (
    <div className="explore__main">
        <div className="container__heading">
            <h2>Explore Top Categories</h2>
        </div>
        <div className="explore__container">
            <Carousel responsive={responsive} containerClass="carousel-container" removeArrowOnDeviceType={["tablet", "mobile"]} autoPlay={"mobile" ? true : false} infinite={true} >
                {
                    data && data.map((item,i)=>(
                        <div className="box" key={i}>
                        <img src={item.img} alt="explore more" />
                        <div className="box__text">
                            <p>{item.name}</p>
                            <button>SHOP NOW</button>
                        </div>
                    </div>
                    ))
                }
               
            </Carousel>
        </div>
    </div>
  )
}

export default ExploreTopCategories