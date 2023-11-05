import React, { useEffect, useState } from "react";
import DashboardSidebar from "../dashboardSidebar/DashboardSidebar";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import Loader from "../../layout/loader/Loader";
import "./shopCoupon.scss";
import {
  getAllCoupon,
} from "../../../actions/couponAction";
import axios from "axios";

const ShopCouponCode = () => {
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const { coupons, isLoading } = useSelector(
    (state) => state.coupons
  );
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [selectedProduct, setSelectedProducts] = useState("");

  const handleSubmit =async (e) => {
    e.preventDefault();

    const obj = {
      name: name,
      value: value,
      shopId: seller?._id,
      selectedProducts: selectedProduct,
    };
    
    await axios.post(`/api/v2/create-coupon-code`, obj, {
      withCredentials: true,
    }).then((res)=>{
      if(res.data.success === true){
        alert(res.data.message);
        setName("")
        setSelectedProducts("")
        setValue("")
      }
    }).catch((error)=>{
      alert(error.response.data.error.message)
    })
    dispatch(getAllCoupon(seller?._id));  
    setOpen(false)
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/v2/delete-coupon/${id}`, {withCredentials: true}).then((res)=>{
      if(res.data.success === true){
        alert(res.data.message)
      }
    }).catch((error)=>{
      alert(error.response.data.error.message)
    })
    dispatch(getAllCoupon(seller?._id));
  }

  useEffect(() => {
    dispatch(getAllCoupon(seller?._id));    
  }, [seller, dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="dashboard__container coupon">
        <div className="container">
          <div className="dashboard__row">
            <div className="col__2 dashboard__sidebar">
              <DashboardSidebar active={9} />
            </div>
            <div className="col__2 coupon__code__h">
              <div className="btn-box">
                <button onClick={() => setOpen(!open)} className="btn-main">
                  Create Coupon
                </button>
              </div>
              {
                coupons && (
                  <div className="coupon__code__rows">
                    <div className="box">Product Name</div>
                    <div className="box">Code</div>
                    <div className="box">Discount Percentage</div>
                    <div className="box">Delete</div>
                  </div>
                )
              }
              {
                coupons && coupons?.map((item, i)=>(
                  <div className="coupon__code__rows">
                    <div className="product__name box">
                      <span>{item?.selectedProducts?.length >= 75 ? item?.selectedProducts.slice(0,75) + "..." : item?.selectedProducts}</span>
                    </div>
                    <div className="discount__code box">
                      <span>{item?.name}</span>
                    </div>
                    <div className="discount__perc box">
                      <span>{item?.value}</span>
                    </div>
                    <div className="coupon__delete box">
                      <AiOutlineDelete onClick={()=>handleDelete(item?._id)}/>
                    </div>
                  </div>
                ))
              }
              
            </div>
          </div>
        </div>
      </div>

      {/* create coupon code  */}
      {open && (
        <>
          <div className="create__coupon__main">
            <div className="header">
              <AiOutlineClose onClick={() => setOpen(false)} />
            </div>
            <h2>Create Coupon Code</h2>
            <form onSubmit={handleSubmit}>
              <div className="input__box">
                <label htmlFor="brand">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  name="name"
                  value={name}
                  placeholder="Enter Product Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input__box">
                <label htmlFor="value">Discount Percentage</label>
                <input
                  type="number"
                  id="value"
                  name="brand"
                  value={value}
                  required
                  placeholder="Enter Coupon Code Value"
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>

              <div className="input__box">
                <label htmlFor="selectedProducts">Selected Products</label>
                <select
                  id="selectedProducts"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProducts(e.target.value)}
                >
                  <option value="Choose a Product">Choose Your Product</option>
                  {products &&
                    products.map((item, i) => (
                      <option value={item.title} key={i}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="btn__box">
                <button type="submit" className="btn-main">
                  Submit
                </button>
              </div>
            </form>
          </div>

          <p
            onClick={() => setOpen(false)}
            className={open ? "overlay" : ""}
          ></p>
        </>
      )}
    </>
  );
};

export default ShopCouponCode;
