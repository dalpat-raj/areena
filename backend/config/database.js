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

// mongodb+srv://areena:9uPpsfPbHnlUN96K@cluster0.8qks5wb.mongodb.net/areena?retryWrites=true&w=majority

module.exports = connectDatabase;