import React from 'react';
import {useNavigate} from "react-router-dom"
import "./moreToExplore.scss";
import { useDispatch } from 'react-redux';
import { getSearchProducts } from '../../actions/productAction';

const MoreToExplore = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const moreToExploreData = [
        {
            btnName: "women",
            img: "/moreToExplore/m1.webp",
            category: "women"
        },
        {
            btnName: "men",
            img: "/moreToExplore/m2.webp",
            category: "men",
        },
        {
            btnName: "shoes",
            img: "/moreToExplore/m3.webp",
            category: "shoes"
        },
        {
            btnName: "accessories",
            img: "/moreToExplore/m4.jpg",
            category: "bag"
        },
    ]

    const buttonHandler = (categories) => {
        navigate('/products')
        dispatch(getSearchProducts(categories));
    }

  return (
    <div className='moretoexplore__main'>
        <div className="container">
            <div className="container__heading">
                <h2>There's More to Explore</h2>
            </div>
            <div className="row">
                {   
                    moreToExploreData && moreToExploreData.map((item, i)=>(
                        <div className="box" key={i} onClick={()=>buttonHandler(item.category)}>
                                <img src={item.img} alt="item.img" />
                                <button className='btn-sec'>{item.btnName}</button>
                        </div>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default MoreToExplore