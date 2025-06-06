const mongoose = require("mongoose")

const connectDatabase =()=>{
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data)=>{
        console.log(`database is conncted with ${data.connection.host}`);
    }).catch((err)=>{
        console.log(`database err : ${err}`);
    })
}

module.exports = connectDatabase;