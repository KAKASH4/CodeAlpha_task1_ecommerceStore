
const product=require('../models/product');

const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, req.body.product_id + '-' + req.body.name+'.'+file.originalname.split('.')[1]);
    },
  });
  
const upload = multer({ storage: storage });
exports.addProducts=(req,res)=>{
    console.log(req.body,req.file);
    const name=req.body.name;
    const description=req.body.description
    const price=req.body.price
    const extension=req.body.product_id + '-' + req.body.name+'.'+req.file.originalname.split('.')[1];
    const image_path="../../backend/uploads/"+extension;
    const product_id=req.body.product_id;
    console.log(name,description,price,image_path,product_id)

    const newProduct=new product({
        name:name,
        description:description,
        price:price,
        image_path:image_path,
        product_id:product_id
    });

    newProduct.save()
    .then((response)=>{
        res.json(response);
    })
    .catch(error=>{
        console.log('some error has occured!!!!',error);
        res.json(error);
    })

    return;
}

exports.getAllProducts=(req,res)=>{
    product.find()
    .then(response=>{
        res.json(response);
    })
    .catch(error=>{
        console.log("error occured"+error);
        res.json(error);
    })
}

exports.deleteProduct=(req,res)=>{
    const deleteid=req.params.deleteid
    console.log(deleteid)
    product.findOneAndDelete({product_id:deleteid})
    .then((data)=>{
         res.json(data);
    })
    .catch((error)=>{
        res.json(error);
    })
    return;
}

exports.upload = upload.single('file');
