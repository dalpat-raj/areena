import React from 'react';
import { Oval } from "react-loader-spinner";
import "./loader.scss";

const Loader = () => {
    
  return (
    <div className="main__loader">
        <Oval
        height="80"
        width="80"
        color="#333"
        ariaLabel="oval-loading"
        secondaryColor="#eee"
        visible={true}
        strokeWidth={4}
        strokeWidthSecondary={4}
        />
    </div>
   
  )
}

export default Loader