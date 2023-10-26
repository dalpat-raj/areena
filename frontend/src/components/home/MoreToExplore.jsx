import React from 'react';
import {Link} from "react-router-dom"
import "./moreToExplore.scss";

const MoreToExplore = () => {
    const moreToExploreData = [
        {
            btnName: "women",
            img: "/moreToExplore/m1.webp"
        },
        {
            btnName: "men",
            img: "/moreToExplore/m2.webp"
        },
        {
            btnName: "shoes",
            img: "/moreToExplore/m3.webp"
        },
        {
            btnName: "accessories",
            img: "/moreToExplore/m4.jpg"
        },
    ]
  return (
    <div className='moretoexplore__main'>
        <div className="container">
            <div className="container__heading">
                <h2>There's More to Explore</h2>
            </div>
            <div className="row">
                {
                    moreToExploreData && moreToExploreData.map((item, i)=>(
                        <div className="box" key={i}>
                            <Link to={item.btnName}>
                                <img src={item.img} alt="item.img" />
                                <button className='btn-sec'>{item.btnName}</button>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default MoreToExplore