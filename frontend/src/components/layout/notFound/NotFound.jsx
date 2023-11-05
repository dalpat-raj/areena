import React from 'react'
import "./notFound.scss";
import { useNavigate } from 'react-router';

const NotFound = () => {

    const navigate = useNavigate()
  return (
    <div className='notfound'>
        <div>
        <h2>404</h2>
        <div>
            <h4>Opps... <h6>Page Not Found</h6></h4>
        </div>
        <button className="btn-sec" onClick={()=>navigate("/")}>
            Go Back
        </button>
        </div>
    </div>
  )
}

export default NotFound