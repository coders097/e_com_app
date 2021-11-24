import express from 'express';
const router=express.Router();
import jwtAuthentication from '../middlewares/jwtAuthentication';
import adminController from '../controllers/admin';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// configuring multer
const multerStorage = multer.memoryStorage();
const upload = multer({
  storage: multerStorage,
});


// @type POST
// @route /admin/fetchProducts
// @desc  for fetching all product 
// @access PRIVATE
router.post("/fetchProducts",jwtAuthentication,adminController.fetchProducts);

// @type POST
// @route /admin/addProduct
// @desc  for adding a product
// @access PRIVATE
router.post("/addProduct",upload.any(),(req,res)=>{
  jwtAuthentication(req,res,()=>{
    adminController.addProduct(req,res);
  });
});

// @type PATCH
// @route /admin/updateProduct
// @desc  for updating a product
// @access PRIVATE
router.patch("/updateProduct",jwtAuthentication,adminController.updateProduct);

// @type DELETE
// @route /admin/deleteProduct
// @desc  for deleting a product
// @access PRIVATE
router.delete("/deleteProduct",jwtAuthentication,adminController.deleteProduct);

// @type POST
// @route /admin/changeOrderStatus
// @desc  for changing the status of an order
// @access PRIVATE
router.post("/changeOrderStatus",jwtAuthentication,adminController.changeOrderStatus);

// @type POST
// @route /admin/refreshSells
// @desc  for getting info of latest sells
// @access PRIVATE
router.post("/refreshSells",jwtAuthentication,adminController.refreshSells);

// @type  GET
// @route /admin/itemPic
// @desc  for getting item's picture
// @access PUBLIC

router.get("/itemPic/:pic/:token", (req, res) => {
  let pic=req.params.pic;
  let token=req.params.token;
  req.headers['Authorization']=`Bearer ${token}`;
  jwtAuthentication(req,res,()=>{
    try{
      let stream=fs.createReadStream(path.join(__dirname,"../../storage/products/",pic));
      stream.pipe(res);
    }catch(e){
     res.status(404).send();
    }
  });
});

export default router;