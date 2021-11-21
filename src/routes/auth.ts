import express from 'express';
const router=express.Router();
import multer from 'multer';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
const saltRounds = 14;
const jwt_key = process.env.jwt_Key!;
import jwtVerify from '../middlewares/jwtAuthentication';

// importing Models
import Seller from '../models/Seller';
import Client from '../models/Client';

// configuring multer
const multerStorage = multer.memoryStorage();
const upload = multer({
  storage: multerStorage,
});

// @type POST
// @route /auth/signup
// @desc  for signup admin or client
// @access PUBLIC
router.post("/signup", upload.any(), async (req:express.Request, res:express.Response) => {
    const { name, email, password,phone, mode } = req.body;
    if (!email || !password || !name || !mode) {
      res.status(401).json({ success: false, error: "Invalid Details" });
      return;
    }
    if(!(mode==='admin' || mode==='client')){
        res.status(401).json({ success: false, error: "Invalid Details" });
        return;
    }
    let userMatch = (mode==='admin')?
        await Seller.findOne({ email: email }):
        await Client.findOne({ email: email });
    if (userMatch) {
      res.status(401).send({
        success: false,
        error: "Email present!",
      });
    } else {
      const temp_password = bcrypt.hashSync(password, saltRounds);
      let pic_name = `${name}_${Date.now()}.jpg`;
      let pic_present = false;
      if (req.files && (req.files.length>0)) {
        
        fs.writeFileSync(
          path.join(__dirname, "../../storage/userpics", pic_name),
          ((req.files as Express.Multer.File[])[0]).buffer
        );
        pic_present = true;
      } else pic_name = "avatar.jpg";
  
      const new_user = (mode==='admin')?new Seller({
        name:name,
        pic:pic_name,
        password:temp_password,
        email:email,
        phone:phone?phone:""
      }):new Client({
        name:name,
        pic:pic_name,
        password:temp_password,
        email:email,
        phone:phone?phone:""
      });
      new_user.save(async (err:Error, user:any) => {
        user=(mode==='admin')?user as typeof Seller:user as typeof Client;
        if (err) {
          console.log(err);
          if (pic_present) {
            try {
              fs.unlinkSync(path.join(__dirname, "../../storage/userpics", pic_name));
            } catch (e) {}
          }
          res.status(400).send({
            success: false,
            error: "Service Temporary Unavalable!",
          });
        } else {
          res.status(200).json({
            success: true,
          });
        }
      });
    }
  });

// @type POST
// @route /auth/signin
// @desc  for signin admin or client
// @access PUBLIC
router.post("/signin", async (req:express.Request, res:express.Response) => {
    const { password, email ,mode} = req.body;
    if (!email || !password || !mode) {
      res.status(401).json({ success: false, error: "Invalid Details" });
      return;
    }
    if(!(mode==='admin' || mode==='client')){
        res.status(401).json({ success: false, error: "Invalid Details" });
        return;
    }
    let userMatch = (mode==='admin')?
        await Seller.findOne({ email: email }):
        await Client.findOne({ email: email });
    if (userMatch) {
      let submittedPass = password;
      let savedPass = userMatch.password;
      const comparePassword = bcrypt.compareSync(submittedPass, savedPass);
      if (comparePassword === true) {
        let timeInMinutes = 120;
        let expires = Math.floor(Date.now() / 1000) + 60 * timeInMinutes;
        let token = jwt.sign(
          {
            name: userMatch.name,
            _id: userMatch._id,
            exp: expires,
          },
          jwt_key
        );
        res.status(200).send({
          success: true,
          data: {
            _id: userMatch._id,
            name: userMatch.name,
            email: userMatch.email,
            pic: userMatch.pic,
            phone: userMatch.phone,
            token: token,
          },
        });
      } else {
        res.status(401).send({
          success: false,
          error: "Invalid Password!",
        });
      }
    } else {
      res.status(401).send({
        success: false,
        error: "Invalid Credentials!",
      });
    }
});

// @type POST
// @route /auth/editProfile
// @desc  for editing admin's or client's profile
// @access PRIVATE
router.post("/editProfile", upload.any(), async (req:express.Request, res:express.Response) => {
    jwtVerify(req, res, () => {
      console.log("Verified!");
      let { id, name, email, password ,phone, mode } = req.body;
      if (!email || !password || !mode) {
        res.status(401).json({ success: false, error: "Invalid Details" });
        return;
      }
      if(!(mode==='admin' || mode==='client')){
        res.status(401).json({ success: false, error: "Invalid Details" });
        return;
      }
      (mode==='admin'?Seller:Client).findById(id)
        .then(async (user:any) => {
          user=(mode==='admin')?user as typeof Seller:user as typeof Client;
          let oldPic = user.pic;
          let newPic = oldPic;
          if ((req.files as Express.Multer.File[]).length != 0) {
            newPic = `${user.name}_${Date.now()}.jpg`;
            fs.writeFileSync(
              path.join(__dirname, "../../storage/userpics", newPic),
              (req.files as Express.Multer.File[])[0].buffer
            );
            user.pic = newPic;
          }
          if (name) {
            user.name = name;
          }
          if (email) {
            user.email = email;
          }
          if (phone) {
            user.phone = phone;
          }
          if (password) {
            const temp_password = bcrypt.hashSync(password, saltRounds);
            user.password = temp_password;
          }
          user
            .save()
            .then(async () => {
              res.status(200).json({
                success: true,
                data: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  pic: user.pic,
                },
              });
              if (oldPic !== newPic) {
                if (oldPic !== "avatar.jpg") {
                  try {
                    fs.unlinkSync(path.join(__dirname, "../../storage/userpics", oldPic));
                  } catch (E) {
                    console.log("ADMIN PROBLEM 4002:", oldPic);
                  }
                }
              }
            })
            .catch(() => {
              res.status(401).json({
                success: false,
                error: "SERVER PROBLEM!",
              });
            });
        })
        .catch((err:Error) => {
          console.log(err);
          res.status(401).json({
            success: false,
            error: "INVALID USER ID!",
          });
        });
    });
  });
  
// @type  POST
// @route /auth/deleteProfile
// @desc  for deleting seller's or client's profile
// @access PRIVATE
router.post("/deleteProfile", jwtVerify, async (req, res) => {
    let { id , mode } = req.body;
    if(!mode){
        res.status(401).json({ success: false, error: "Invalid Details" });
        return;
    }
    if(!(mode==='admin' || mode==='client')){
        res.status(401).json({ success: false, error: "Invalid Details" });
        return;
    }
    (mode==='admin'?Seller:Client).findByIdAndDelete(id)
        .then(async (user:any) => {
        user=(mode==='admin'?user as typeof Seller:user as typeof Client);
        res.status(200).json({
            success: true,
        });
        try {
            if (user.pic !== "avatar.jpg")
            fs.unlinkSync(path.join(__dirname, "../../storage/userpics", user.pic));
        } catch (E) {}
        })
        .catch((err) => {
        res.status(401).json({
            success: false,
            error: "SERVER PROBLEM!",
        });
        });
});

export default router;