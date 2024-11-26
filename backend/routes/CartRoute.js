const express=require('express');
const router=express.Router();
const cartController=require('../controller/cart.controller');


router.post('/add',cartController.add);
router.get('/',cartController.getAll);
router.delete('/delete/:product_id',cartController.deleteItem);
router.post('/checkout',cartController.checkout);
router.put('/update/:productId', cartController.updateCartQuantity);

module.exports=router;