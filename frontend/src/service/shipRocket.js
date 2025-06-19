import axios from "axios";


export const loginToShiprocket = async () => {
  const credentials = {
    email: "dalpatt12@gmail.com",
    password: "j5Vf02c%^!W832GV",
  };

  const res = await axios.post("https://apiv2.shiprocket.in/v1/external/auth/login", credentials);
  return res.data.token;
};



export const getShippingRate = async (pickupPincode, deliveryPincode, weight) => {
  
  try {
    // 1. Get token
    const token = await loginToShiprocket();

    // 2. Make request using token
    const res = await axios.get(
      "https://apiv2.shiprocket.in/v1/external/courier/serviceability/",
      {
        params: {
          pickup_postcode: pickupPincode,
          delivery_postcode: deliveryPincode,
          cod: 0,
          weight,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
     const couriers = res?.data?.data?.available_courier_companies || [];
     
    if (!couriers?.length) {
      console.warn("❌ No courier options available");
      return null;
    }

    const selectedCourier = couriers.reduce((min, cur) =>
      Number(cur.rate) < Number(min.rate) ? cur : min,
      couriers[0]
    );

    if (!selectedCourier) {
      console.warn("❌ No selected courier after reduce");
      return null;
    }
    
    const data = {
      courier_company_id: selectedCourier?.courier_company_id,
      courier_name: selectedCourier?.courier_name,
      estimated_delivery_days: selectedCourier?.estimated_delivery_days,
      rate: selectedCourier?.rate,
      freight_charge: selectedCourier?.freight_charge,
      rto_charges: selectedCourier?.rto_charges,
      pickup_availability: selectedCourier?.pickup_availability,
      cod: selectedCourier?.cod,
      realtime_tracking: selectedCourier?.realtime_tracking,
      etd: selectedCourier?.etd,
      etd_hours: selectedCourier?.etd_hours,
      charge_weight: selectedCourier?.charge_weight,
      ccity: selectedCourier?.city,
      cstate: selectedCourier?.state,
      postcode: selectedCourier?.postcode,
    };
    return data;
  } catch (err) {
    console.error("Error getting shipping rate:", err?.response?.data || err.message);
    return 0;
  }
};