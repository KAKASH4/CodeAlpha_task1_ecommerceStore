const mongoose = require("mongoose");

const connect=async ()=>{
    try {
        const con=await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        console.log(`mongodb database connected ${con.connection.host}`)
        
    } catch (error) {
        console.log(error,"here");
        process.exit(1);
    }
}

module.exports=connect;