const express=require('express');
const router=express.Router();
const productController=require('../controller/product.controller');

  
// router.post('/add', upload.single('file'), productController.addProducts);

router.post('/add', productController.upload, productController.addProducts);
router.get('/getProducts',productController.getAllProducts);
// router.post('/add',productController.addProducts);
router.delete('/delete/:deleteid',productController.deleteProduct);

module.exports=router;