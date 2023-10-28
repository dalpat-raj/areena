const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors")
const path = require("path")


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));

// Route Import 
const user = require("./routes/userRoutes");
const shop = require("./routes/shopRoutes");
const product = require("./routes/productRoutes");
const event = require("./routes/eventRoutes");
const couponCode = require("./routes/couponCodeRoutes")
const payment = require("./routes/paymentRoutes");
const order = require("./routes/orderRoutes");
const conversation = require("./routes/conversationRoutes");
const message = require("./routes/messageRoutes");
const withdraw = require("./routes/withdrawRoutes");
const color = require("./routes/colorRoutes");


app.use("/api/v2", user);
app.use("/api/v2", shop);
app.use("/api/v2", product);
app.use("/api/v2", event);
app.use("/api/v2", couponCode);
app.use("/api/v2", payment);
app.use("/api/v2", order);
app.use("/api/v2", conversation);
app.use("/api/v2", message);
app.use("/api/v2", withdraw);
app.use("/api/v2", color);


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for error
app.use(ErrorHandler);

module.exports = app;