

const sendShopToken = (shop, statusCode, res) => {
    const sellerToken = shop.getJwtToken();

    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }

    res.status(statusCode).cookie("sellerToken", sellerToken, options).json({
        success: true,
        shop,
        sellerToken,
    });
};

module.exports = sendShopToken;