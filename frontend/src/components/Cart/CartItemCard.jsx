import React, { useState } from 'react'
import "./cartItemCard.scss";
import { backend__url } from '../../Server';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import {toast} from 'react-toastify'

const CartItemCard = ({item, quantityChangeHandler, removeFromCartHandler}) => {
  
  const [value, setValue] = useState(item?.qty);
  const totalPrice = item?.sellingPrice * value;


  const increment = (item) => {
    if(item?.stock <= value){
      toast.error("Product stock limited")
    }else{
      setValue(value + 1);
      const updateCartData = {...item, qty: value + 1};
      quantityChangeHandler(updateCartData)
    }
  }

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = {...data, qty: value === 1 ? 1 : value - 1};
    quantityChangeHandler(updateCartData)
  }

  

  return (
    <div className="cart_item_card">
        <img src={`${backend__url}/${item?.images && item?.images[0]}`} alt="ok" />
        <div className="item__details">
           <p>{item.name}</p>
           <span>Color: {item.color}</span>
           <p>price: {totalPrice}</p>
           <div className="cartInput">

            <button className='dec__item' onClick={()=>decrement(item)}>
              <AiOutlineMinus sx={{ fontSize: 15 }} />
            </button>
            <input type="number" value={item.qty} readOnly/>
            <button className='inc__item' onClick={()=>increment(item)}>
              <AiOutlinePlus sx={{ fontSize: 15 }} />
            </button>

            <button className='delete__item' >
              <AiOutlineDelete onClick={()=>removeFromCartHandler(item)} sx={{ fontSize: 20, color: "#334" }} />
            </button>
          </div>
        </div>
    </div>
  )
}

export default CartItemCard