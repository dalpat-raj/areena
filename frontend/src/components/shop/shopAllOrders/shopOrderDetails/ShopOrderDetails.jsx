import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiBeachBag } from "react-icons/gi";
import {
  getSelectedOrderShop,
  updateOrderStatus,
  // updateRefundOrderStatus,
} from "../../../../actions/orderAction";
import { useNavigate, useParams } from "react-router";
import { HiBadgeCheck } from "react-icons/hi";
import { backend__url } from "../../../../Server";
import Loader from "../../../layout/loader/Loader";
import "./shopOrderDetails.scss";
import axios from "axios";
import { toast } from "react-toastify";


const ShopOrderDetails = () => {
  const { order, isLoading } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId, sellerId } = useParams();

  const updateOrderStatusHandler = () => {
    dispatch(updateOrderStatus(order?._id, orderId, status));
  };

const downloadInvoiceHandler = async (shipment_id) => {
  if (!shipment_id) {
    toast.error("Shipment ID is missing");
    return;
  }

  try {
    const response = await axios.post(`/api/v2/shiprocket/download-invoice/${shipment_id}`);
    
    const { label_url } = response.data;

    if (!label_url) {
      toast.error("Label URL not found");
      return;
    }

    // PDF Download Trigger
    const link = document.createElement("a");
    link.href = label_url;
    link.setAttribute("download", `invoice_${shipment_id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    toast.success("Invoice downloaded successfully");
  } catch (error) {
    console.error("Invoice download error:", error);
    toast.error("Failed to download invoice");
  }
};


  
  useEffect(() => {
    dispatch(getSelectedOrderShop(orderId, sellerId));
  }, [dispatch, orderId, sellerId]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="shop_order_details">
      <div className="container">
        <div className="row">
          {order?.status === "delivered" ? (
            <div className="heading heading_row">
              <span>
                <HiBadgeCheck />
              </span>
              <h4>Delivered</h4>
            </div>
          ) : (
            <div className="heading">
              <span>
                <GiBeachBag />
              </span>
              <h4>Order Details</h4>
            </div>
          )}
          <div>
            <button className="btn-main" onClick={() => navigate(-1)}>
              All Orders
            </button>
          </div>
        </div>

        <div className="order_id">
          <p>
            Order ID : <span>{order?._id?.slice(0, 9)}...</span>
          </p>
          <p>
            Placed on : <span>{new Date(order?.createdAt).toLocaleString()}</span>
          </p>
        </div>

        <div className="row product_details">
          <div className="shop_product_main">
            {order &&
              order?.items?.map((item, i) => (
                <div className="image__box" key={i}>
                  <img
                    src={`${backend__url}/${item?.images[0]}`}
                    alt="product details"
                  />
                  <div className="product_text">
                    <h5>{item?.sku}</h5>
                    {item?.title && <h5>Size: {item?.title?.slice(0,15)}...</h5>}
                    <h5>₹ {item?.sellingPrice} * {item?.qty} = {(item?.sellingPrice * item?.qty).toFixed(2)}</h5>
                    {item?.color && <h5>Color: {item?.color}</h5>}
                    {item?.size && <h5>Size: {item?.size}</h5>}
                  </div>
                </div>
              ))}
          </div>
          <div className="total_info">
            <p>Sub total. <span>₹ {(order?.payment?.subTotal)?.toFixed(2)}</span></p>
            <p>Shipping Charge. <span>₹ {order?.payment?.shippingCharge}</span></p>
            <p>DiscountPrice. <span>₹ {(order?.payment?.discount || 0)?.toFixed(2)}</span></p>
            <p>Total. <span>₹ {(order?.payment?.total)?.toFixed(2)}</span></p>
          </div>
          <div className="payment_info">
            {order && order?.paymentInfo?.status === "succeeded" ? (
              <img src={"/payment.png"} alt="payment" />
            ) : (
              <>
                <h5>Payment Info</h5>
                <p>{order?.payment?.status}</p>
              </>
            )}
          </div>

          <div className="update_stauts">
            <h4>Order Status</h4>
            {order?.status !== "delivered" &&
              (
                <>
                  {order?.status === "processing" && (
                    <select
                      value={status}
                      className="btn-sel"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {[
                        "processing",
                        "confirm",
                      ]
                        .slice(
                          [ 
                            "processing",
                            "confirm",
                          ].indexOf(order?.status)
                        )
                        .map((option, i) => (
                          <option value={option} key={i}>
                            {option}
                          </option>
                        ))}
                    </select>
                  )}

                  {/* // iimplemen download invoice */}
                  {
                    order?.status === `confirm` && (
                      <select
                        value={status}
                        className="btn-sel"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {[
                          "confirm",
                          "ship now",
                        ]
                          .slice(
                            [ 
                              "confirm",
                              "ship now",
                            ].indexOf(order?.status)
                          )
                          .map((option, i) => (
                            <option value={option} key={i}>
                              {option}
                            </option>
                          ))}
                      </select>
                    )  
                  }

                  {
                    order?.status === "ship now" && (
                      <button
                        className="btn-main"
                        onClick={()=>downloadInvoiceHandler(order?.shipment?.shipment_id)}
                      >
                        Download Invoice
                      </button>
                    )
                  }

                  {
                    (order?.status === `confirm` || order?.status === `processing`) && (
                      <button
                        className="btn-main"
                        onClick={()=>
                          updateOrderStatusHandler()
                        }
                      >
                        Update Status
                      </button>
                    )  
                  }
                </>
              )
             }
              <span>{order?.status}</span>
          </div>
        </div>

        <div className="order__info">
          <div className="shipping__info">
            <h4>Client Information</h4>
            {order?.shipping?.address?.name && (
              <p>
                Name: <span>{order?.shipping?.address?.name}</span>
              </p>
            )}
            {order?.shipping?.address?.email && (
              <p>
                Email: <span>{order?.shipping?.address?.email}</span>
              </p>
            )}
            {order?.shipping?.address?.phone && (
              <p>
                Phone: <span>{order?.shipping?.address?.phone}</span>
              </p>
            )}
          </div>

          <div className="shipping__info">
            <h4>Shipping Address</h4>
            <p>
              {order?.shipping?.address?.address1 +
                ", " +
                order?.shipping?.address?.address2 +
                ", " +
                order?.shipping?.address?.city}
            </p>
            <p>
              {order?.shipping?.address?.state +
                " (" +
                order?.shipping?.address?.country}
              )
            </p>
            <p>PinCode. {order?.shipping?.address?.pincode}</p>
            <p>+91 {order?.shipping?.address?.phone}</p>
          </div>
          <div className="price__box">
            <div className="total_price">
              <p>
                Total Price : <span>₹ {order?.payment?.total?.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOrderDetails;
