import express from 'express';
import fs from 'fs';
import { Mongoose } from 'mongoose';
import multer from 'multer';
import path from 'path';
import Product from '../models/Product';
import Seller from '../models/Seller';
import Order from '../models/Order';
import E from '../utils/errors';

let addProduct=async (req:express.Request,res:express.Response)=>{
    let {title,qty,sellerId,price,group,subgroup,desc}=req.body;
    // pics:[]
    let pics:string[]=[];
    (req.files as Express.Multer.File[]).forEach((file,i)=>{
        let picName=`${sellerId}_${title}_${group}_${Date.now()}_${i}.jpg`;
        fs.writeFileSync(
            path.join(__dirname, "../../storage/products", picName),
            file.buffer
        );
        pics.push(picName);
    });    
    try{
        let seller=await Seller.findById(sellerId);
        if(!seller){
            E.notFoundError(res);
            return;
        }
        let product=await Product.create({
            title:title,
            pics:pics,
            qty:qty,
            sellerId:sellerId,
            price:price,
            group:group,
            subgroup:subgroup,
            desc:(desc)?desc:""
        });
        seller.products.push(product._id);
        seller.save().then(()=>{
            res.status(200).json({
                success:true,
                data:{
                    title:title,
                    pics:pics,
                    qty:qty,
                    sellerId:sellerId,
                    price:price,
                    group:group,
                    subgroup:subgroup,
                    desc:(desc)?desc:"",
                    _id:product._id.toString(),
                    creationDate:product.creationDate
                }
            });
        }).catch((err:Error)=>{
            E.serverError(res);
        });
    }catch(e){
        E.serverError(res);
    }
}

let updateProduct=async (req:express.Request,res:express.Response)=>{
    let { price,productId,qty,_id,desc,title,group,subgroup}=req.body;
    if(!productId){
        E.notFoundError(res);
        return;
    }
    if(!price && !qty){
        E.dataMissingError(res);
        return;
    }
    try{
        let seller=await Seller.findById(_id);
        let checkExists=false;
        seller.products.forEach((_productId:any) => {
            if(_productId.toString()===productId) checkExists=true;
        });
        if(!checkExists){
            E.resorucePresentError(res);
            return;
        }
        let product=await Product.findById(productId);
        if(!product){
            E.notFoundError(res);
            return;
        }
        if(qty) product.qty=qty;
        if(price) product.price=price;
        if(desc) product.desc=desc;
        if(title) product.title=title;
        if(group) product.group=group;
        if(subgroup) product.subgroup=subgroup;
        
        product.save().then(()=>{
            res.status(200).json({
                success:true
            });
        }).catch((err:Error)=>{
            E.serverError(res);
        });
    }catch(e){
        E.serverError(res);
    };
}

let deleteProduct=async (req:express.Request,res:express.Response)=>{
    let { productId,_id}=req.body;
    if(!productId){ 
        E.notFoundError(res);
        return;
    }
    try{
        let seller=await Seller.findById(_id);
        let checkExists=false;
        seller.products.forEach((_productId:any) => {
            if(_productId.toString()===productId) checkExists=true;
        });
        if(!checkExists){
            E.resorucePresentError(res);
            return;
        }
        seller.products=seller.products.filter((_productId:any) => {
            if(_productId.toString()===productId) return false;
            else return true;
        });
        seller.save().then(async ()=>{
            res.status(200).json({
                success:true
            });
            try{
                let __product=await Product.findByIdAndDelete(productId);
                __product.pics.forEach((_string:string)=> {
                    fs.unlinkSync(path.join(__dirname, "../../storage/products",_string));
                });
            }catch(e){}
        }).catch((e:Error)=>{
            E.serverError(res);
        });
    }catch(e){
        E.serverError(res);
    };
}

let changeOrderStatus=async (req:express.Request,res:express.Response)=>{
    let {orderId,status,_id}=req.body;
    if(!orderId || !status){
        E.dataMissingError(res);
        return;
    }
    try{
        let seller=await Seller.findById(_id);
        let checkExists=false;
        seller.sells.forEach((_orderId:any) => {
            if(_orderId.toString()===orderId) checkExists=true;
        });
        if(!checkExists){
            E.resorucePresentError(res);
            return;
        }
        let order=await Order.findById(orderId);
        if(!order){
            E.notFoundError(res);
            return;
        }
        order.status=status;
        order.save().then(()=>{
            res.status(200).json({
                success:true
            });
        }).catch((e:Error)=>{
            E.serverError(res);
        });
    }catch(e){
        E.serverError(res);
    }
}

let refreshSells=async (req:express.Request,res:express.Response)=>{
    let {_id}=req.body;
    try{
        let seller=await Seller.findById(_id).populate('sells');
        if(!seller){
            E.resorucePresentError(res);
            return;
        }
        res.status(200).json({
            success:true,
            data:seller.sells
        });
    }catch(e){
        E.serverError(res);
    }
}

let fetchProducts=async (req:express.Request,res:express.Response)=>{
    let {_id}=req.body;
    try{
        let seller=await Seller.findById(_id).populate('products');
        if(!seller){
            E.resorucePresentError(res);
            return;
        }
        res.status(200).json({
            success:true,
            data:seller.products
        });
    }catch(e){
        E.serverError(res);
    }
}

export default {
    addProduct,
    fetchProducts,
    updateProduct,
    deleteProduct,
    changeOrderStatus,
    refreshSells
};