import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const ActivationPage = () => {
    const {activation_token} = useParams();
    const [error, setError] = useState(false); 

    useEffect(()=>{
        if(activation_token){
            const activationEmail = async () => {
                try {
                    axios.post(`/shop-activation`,{
                        activation_token,
                    }).then((res)=>{
                        console.log(res.data);
                    }).catch((err)=>{
                        console.log(err);
                    })
                    
                } catch (error) {
                    console.log(error);
                    setError(true)
                }
            }
            activationEmail();
        }
    },[activation_token])

  return (
    <div style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }} className='container'>
        {
            error ? (
                <p> Your Token is expired!</p>
            ) : (
                <p>Your account is created successfully</p>
            )
        }
    </div>
  )
}

export default ActivationPage