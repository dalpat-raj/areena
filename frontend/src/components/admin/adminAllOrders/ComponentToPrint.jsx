import React from 'react'
import "./ComponentToPrint.scss";

const  ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div ref={ref} className='ComponentToPrint__main'>
        WelCome To Areena <br/>
        This Feature is Comming Soon
      </div>
    );
  });

export default ComponentToPrint