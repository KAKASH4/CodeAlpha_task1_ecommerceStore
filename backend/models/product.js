const mongoose=require('mongoose');

const product=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image_path:{
        type:String,
        required:true
    },
    product_id:{
       type:String,
       required:true,
       unique:true
    }
});

module.exports=mongoose.model("product_Collection",product);