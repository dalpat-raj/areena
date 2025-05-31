import axios from "axios";


export const loginToShiprocket = async () => {
  const credentials = {
    email: "geetakumari958747@gmail.com",
    password: "z#CT&Z8mbS4qjm7T",
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

    const data = {
      rate: res?.data?.data?.available_courier_companies?.[0]?.rate || 0,
      estimated_delivery_days: res?.data?.data?.available_courier_companies?.[0]?.estimated_delivery_days || 5,
    }
    return data;
  } catch (err) {
    console.error("Error getting shipping rate:", err?.response?.data || err.message);
    return 0;
  }
};