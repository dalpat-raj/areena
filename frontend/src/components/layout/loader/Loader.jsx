import React from 'react';
import { Bars } from "react-loader-spinner";
import "./loader.scss";

const Loader = () => {
    
  return (
    <div className="main__loader">
        <Bars
        height="80"
        width="80"
        color="#333"
        ariaLabel="bars-loading"
        visible={true}
        />
    </div>
   
  )
}

export default Loader