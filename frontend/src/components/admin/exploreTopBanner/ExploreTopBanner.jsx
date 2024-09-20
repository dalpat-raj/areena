import React, { useEffect, useState } from 'react';
import './exploreTopBanner.scss';
import AdminSidebar from '../adminSidebar/AdminSidebar';
import {createExploreTopBanner, deleteExploreTopBanner, getExploreTopBanner} from "../../../actions/bannerChangeAction"
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../layout/loader/Loader"
import { CgProfile } from "react-icons/cg";
import {backend__url} from "../../../Server"

const ExploreTopBanner = () => {
    const {isLoading, exploreBanner} = useSelector((state)=>state.banner)  

    const [active, setActive] = useState(8);
    const [heading, setHeading] = useState("");
    const [category, setCategory] = useState("");
    const [avatar, setAvatar] = useState(null)

    const dispatch = useDispatch();

    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      setAvatar(file);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const exploreBannerData = {
        heading: heading,
        category: category,
        file: avatar,
      }
      dispatch(createExploreTopBanner(exploreBannerData)) 
      setHeading("")
      setCategory("")
      setAvatar(null)
      dispatch(getExploreTopBanner()) 
      
    };

    const handleDelete = async (id) => {
        dispatch(deleteExploreTopBanner(id))
    }

    useEffect(()=>{
      dispatch(getExploreTopBanner()) 
    },[dispatch])

  return (
    <div className="admin__container">
          <div className="container">
            <div className="dashboard__row">
              <div className="col__2 dashboard__sidebar">
                <AdminSidebar active={active} setActive={setActive} />
              </div>

              {
                isLoading ? (
                  <Loader/>
                ) : (
                <div className="col__2 explore__top__banner">
                  <div className='top_row__form'>
                      <form action="/fileupload" onSubmit={handleSubmit}>
                          <input 
                            type='text' 
                            placeholder='Heading'
                            value={heading}
                            onChange={(e)=>setHeading(e.target.value)}
                          />
                          <input 
                            type='text' 
                            placeholder='category'
                            value={category}
                            onChange={(e)=>setCategory(e.target.value)}
                          />

                          <div className="main__img">
                          {avatar ? (
                              <div className="img__box">
                                <img src={URL.createObjectURL(avatar)} alt="areena" />
                              </div>
                            ) : (
                              <div className="img__box">
                                <CgProfile />
                              </div>
                            )}
                            <div className="input__box">
                              <input
                                type="file"
                                onChange={(e) => handleFileInputChange(e)}
                              />
                              <button>Choose Image</button>
                            </div>
                          </div>
                              
                          
                          <button type='submit' className='btn-main'>Add Banner</button>
                      </form>
                  </div>

                  <div className='banner__show__row'>
                  {
                    exploreBanner && (
                      exploreBanner.map((item, i)=>(
                        <div className='col' key={i}>
                          <div className='images'>
                            <img src={`${backend__url}/${item?.banner}`} alt="" />
                          </div>
                          <p className="heading">{item?.heading}</p>
                          <p className='category'>{item?.category}</p>
                          <div className="delete">
                            <button className='btn-main' onClick={()=>handleDelete(item?._id)}>Delete Banner</button>
                          </div>
                        </div>
                      ))
                    )
                  }
                  </div>
                </div>
                )
              }
                
            </div>
          </div>
        </div>
  )
}

export default ExploreTopBanner