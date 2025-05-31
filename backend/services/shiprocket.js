const { default: axios } = require("axios");

const SHIPROCKET_BASE_URL = process.env.SHIPROCKET_BASE_URL;
let authToken = null;

// Authenticate with Shiprocket
const loginToShiprocket = async () => {
  
  try {
    const response = await axios.post(`${SHIPROCKET_BASE_URL}/auth/login`, {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD
    });
    
    authToken = response.data.token;
    tokenExpiry = Date.now() + (24 * 60 * 60 * 1000); // Token valid for 24 hours
    return authToken;
  } catch (error) {
    console.error('Shiprocket authentication failed:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with Shiprocket');
  }
};

module.exports = loginToShiprocket;
