const express=require('express')
const  UserModel  = require("../models/UserSchema");
const productModel=require('../models/ProductSchema')
const OrderModel=require('../models/OrderSchema')
const ColorModel=require('../models/ColorSchema')
const CategoryModel=require('../models/categorySchema');
const router = express.Router();
const jwt = require('jsonwebtoken')
const nodemailer=require('nodemailer')
const bcrypt = require('bcryptjs')
const jwtSecretKey = '*ahskimas0617#$#6012nahtnam#'
const app = express();
const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const fs=require('fs')


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Images/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  });

  const fileFilter=(req, file, cb)=>{
   if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
       cb(null,true);
   }else{
       cb(null, false);
   }

  }

var upload = multer({ 
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
 });


const autenticateToken=async(req, res, next) =>{
    const authHeader = await req.headers['authorization']
 const token = authHeader && authHeader.split(' ')[1]
    console.log(token+"/////////")
    if (token== null) {
        console.log( "Token not match" );
    }
    else {
       
        jwt.verify(token, jwtSecretKey, (err, data) => {
            if (err) {
                console.log( "Token incorrect" )
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}
router.get('/checktoken',autenticateToken ,(req, res) => {
    res.json({"err":0,"msg":"token match"})
    console.log('token match')
})

router.get('/getall', (req, res) => {
    UserModel.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    })

})


router.post('/getuser', (req, res) => {
    UserModel.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            res.send("its error")
        }
        else if (data == null) {
            console.log(data)
            res.json({ err: 1,message:'please write correct email id' })
        }
        else if ((bcrypt.compareSync(req.body.password, data.password))) {
            let payload = {
                 uid:req.body.email,
                 name:data.name,
                 lname:data.lname,
                 gender:data.gender,
                 mobile:data.mobile,
                 password:data.password,
                 photo:data.photo,
                cartData:data.cart,
                 id:data._id
                }
            const token = jwt.sign(payload,jwtSecretKey,{expiresIn:360000})
            console.log({
                err: 0, 
                success: true,
                status_code: 200,
                message: `" ${data.name} You have logged In"`,
                data: data,
                token:token
            })
            res.json({
                err: 0, 
                success: true,
                status_code: 200,
                message:` Hey ! ${data.name} You have Logged In Successfully`,
                data: data,
                token:token,
                photo:data.photo
            })
        }
        else if (!(bcrypt.compareSync(req.body.password, data.password))) {
            res.json({ err: 1 ,'message':'Please Enter Valid Details'})
        }

    })
})

router.post('/addpost',(req,res)=>{
   
    console.log(req.body)
let ins=new UserModel({ name: req.body.name, lname: req.body.lname, email: req.body.email, password: req.body.password, cpassword:req.body.cpassword,otp:'', mobile: req.body.mobile, gender: req.body.gender,photo:req.body.photo });

ins.save((err)=>{
    console.log(err)
   if(err){ res.json({err:1,'message':"User Already Exist,Please Try with another Email id"})}
  
else{
    res.json(

        {
            success: true,
            status_code: 200,
            message: `Hey ! ${req.body.name} was registered successfully`,
            err:0
          })
    
}
})


})

router.post('/socialuser', (req, res) => {
    console.log(req.body)
    let ins = new UserModel({ name: req.body.name, lname: "", email: req.body.email, provider: req.body.provider,gender:"",mobile:"",photo:req.body.photo })
    UserModel.findOne({ email: req.body.email }, (err, data) => {
        console.log(data)
        ins.save((err) => {
            if (err) {
                let payload = {
                   uid: req.body.email,
                name: data.name,
                lname: data.lname,
                gender: data.gender,
                mobile: data.mobile,
                password: data.password,
                photo: data.photo,
                id: data._id,
                cartData: data.cart,
                provier: data.provider
                }
                const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 360000 })
                res.json({ message: `Logged In Successfully`, err: 0, token: token, photo:data.photo })
            }
            else {
                let payload = {
                    email: req.body.email,
                    name: req.body.name,
                    lname: req.body.lname,
                    provider: req.body.provider
                }
                const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 360000 })
                res.json({
                    success: true,
                    status_code: 200,
                    message: `Hey ! ${req.body.name} was logged in successfully`,
                    err: 0,
                    token: token,
                   
                })
            }

        })
    })

})
router.post('/findsocialuser', (req, res) => {
    console.log(req.body)
    UserModel.findOne({ email: req.body.email }, (err, data) => {
        if (data == null) {
            res.json({ err: 1 })
        }
        else if (data != null) {
            let payload = {
                uid: req.body.email,
                name: data.name,
                lname: data.lname,
                gender: data.gender,
                mobile: data.mobile,
                password: data.password,
                photo: data.photo,
                id: data._id,
                cartData: data.cart,
                provier: data.provider
            }
            const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 360000 })
            console.log(token)
            res.json({ err: 0, token: token })
        }
    })
})
router.post('/checksocial', (req, res) => {
    UserModel.findOne({ email: req.body.email }, (err, data) => {
        if (data == null) {
            res.json({ err: 1, message: "Oops!we haven't find user with this email Address." })
        }
        else if(data!=null){
        if (data.provider == "social") {
            res.json({ err: 1, message: "You are a social User,Please Login With Social Account ", provider: data.provider })
        }
        else {
            res.json({ err: 0})
        }
    }
    })
})
router.post('/otpsend',(req,res)=>{
    UserModel.findOne({ email: req.body.email }, (err, data) => {
        
        if(err){
            res.json({err:1})
        }
        else if(data==null){
            res.json({err:1,message:"email id is not saved in data base"})
        }
        else{
            UserModel.updateOne({_id:data.id}, 
                { $set: { otp: req.body.otp } }, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    // console.log("Updated Docs : ", docs);
                }
            });
             let smtpTransoprt = nodemailer.createTransport({
        service:'gmail',
        port:465,
        auth: {
            user: process.env.email,
            pass: process.env.password,
          }
    });
    var mailOptions = {
        from: process.env.email,
        to: req.body.email,
        subject: 'OTP is ready For Neostore !!!',
        html: `
        hello ,
        <h1>Your Otp Number is ${req.body.otp} !</h1>
        
        <h3>If you have any query contact this number: 012338475494 </h3>
        <h4>Thank you
        Neostore,</h4>
        `
      };

    smtpTransoprt.sendMail(mailOptions, (err,info) => {
        if(err){
          res.json({err:1,message:"This email is not proper"});
        }
    
        else{
            console.log(res.info)
    res.json({err:0,message:"Mail sent successfully",otp:req.body.otp,id:data._id})
        }
    });
   
    smtpTransoprt.close();
        }
    })
})

router.post('/updatepass',(req,res)=>{
    UserModel.updateOne({_id:req.body.id}, 
        { $set: { password: req.body.password,cpassword:req.body.cpassword } }, function (err, docs,data) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs : ", docs);
         
        }
    });
})


router.post('/ChangePassword',(req,res)=>{
    console.log(req.body.id)
    UserModel.updateOne({_id:req.body.id}, 
        { $set: { password: req.body.newPass,cpassword:req.body.confirmPass } }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs : ", docs);
        }
    });
})


router.post('/editprofile',(req,res)=>{
    console.log(req.body)
    
    UserModel.updateOne({email:req.body.uid}, 
        { $set: { name: req.body.name,lname:req.body.lname,email:req.body.uid,mobile:req.body.mobile,gender:req.body.gender } }, function (err, data) {
        if (err){
            console.log(err)
        }
        else{
            let payload = {
                uid:req.body.uid,
                name:req.body.name,
                lname:req.body.lname,
                gender:req.body.gender,
                address:req.body.address,
                mobile:req.body.mobile,
                  photo:data.photo,
                  cartData:req.body.cartData,
                id:req.body.id
               }
           const token = jwt.sign(payload,jwtSecretKey,{expiresIn:360000})
            res.json({
                err: 0, 
                success: true,
                status_code: 200,
                message:` Hey ! Your Data Has Been Updated Successfully`,
               data:data,
                token:token
            })
            console.log({
                err: 0, 
                success: true,
                status_code: 200,
                message:` Hey ! Your Data Has Been Updated Successfully`,
               data:data,
                token:token
            })
        }
    });
})



 router.post("/updateprofilephoto",upload.single('photo'),function(req,res,next){
     console.log(req.body)
     console.log(req.body.cartData)
     
    const url = req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename

console.log(url)
    UserModel.updateOne({email:req.body.uid}, 
        { $set: { photo: url } }, function (err, docs,data) {
        if (err){
            console.log(err)
        }
        else{
        
            let payload = {
               id:req.body.id,
                uid:req.body.uid,
                name:req.body.name,
                lname:req.body.lname,
                gender:req.body.gender,        
                mobile:req.body.mobile,
                password:req.body.password,
                 cartData:JSON.parse(req.body.cartData),
                photo:url
               }
               const token = jwt.sign(payload,jwtSecretKey,{expiresIn:360000})
               console.log({
                err: 0, 
                success: true,
                status_code: 200,
                message:` Hey ! Your Data Has Been Updated Successfully`,
                docs:docs,
                token:token
            })
                res.json({
                    err: 0, 
                    success: true,
                    status_code: 200,
                    message:` Hey ! Your Data Has Been Updated Successfully`,
                   data:data,
                    token:token
                })
          
         
        }
    });
 
 });


router.get('/getproducts', (req, res) => {
    productModel.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
       
    })

})

router.post('/addaddress',(req,res)=>{
 console.log(req.body)
 UserModel.updateOne({email:req.body.uid}, 
    { $push:{address: { address:req.body.address,city:req.body.city,state:req.body.state,country:req.body.country,pincode:req.body.pincode,address_id:Math.random() }} }, function (err, docs) {
    if (err){
        console.log(err)
    }else if(docs==null){
       
    }
    else{
       res.json({
           docs,
           message:'Your address has been added',
           err:0,
           "isDeliveryAddress": false,
           "success": true,
           "status_code": 200,
            address:req.body.arr
       })
      console.log({
        docs,
        message:'Your address has been added',
        err:0,
        "isDeliveryAddress": false,
        "success": true,
	    "status_code": 200,
       

       


    })
    }
});
})
router.post('/getaddress',(req,res)=>{
    // console.log(req.body);
    UserModel.findOne({email:req.body.uid},(err,data)=>{
        if(err){
            throw err;  
        }
        else{
            // console.log(data)
            res.json({
                "err":0,
                "address":data.address,
               
            })
        }
    })
})

router.post('/deleteaddress',(req,res)=>{
    console.log(req.body)
    UserModel.updateOne({email:req.body.uid}, 
        { $set: { address:req.body.address } }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
           res.json({
               docs,
               message:'Your address has been Deleted',
               err:0,
               "isDeliveryAddress": false,
               "success": true,
               "status_code": 200,
                address:req.body.address
           })
          console.log({
            docs,
               message:'Your address has been Deleted',
               err:0,
               "isDeliveryAddress": false,
               "success": true,
               "status_code": 200,
                address:req.body.address
    
           
    
    
        })
        }
    });
})
router.post('/updateaddress',(req,res)=>{
    console.log(req.body)
    UserModel.updateOne({email:req.body.uid,"address.address_id":req.body.address_id},{"address.$":req.body},(err,result)=>{
        if(err){
            console.log(err);
            res.json({
                "err":1,
                "message":"Address Not Found!!"
            })
        }
        else{
            console.log(result);
            res.json({"err":0,"message":"You Have Successfuly Set Your shipping address.",  "isDeliveryAddress": true,})
        }
    })


    
})
router.post('/updateselectedaddress',(req,res)=>{
    console.log(req.body)
    UserModel.updateMany({email:req.body.uid}, {$set:{ "address.$[].isDeliveryAddress":false} }
    ,(err,result)=>{
        if(err) throw err;
        else{
            console.log(result)
        }
    })
    UserModel.updateOne({email:req.body.uid,"address.address_id":req.body.address_id},{"address.$.isDeliveryAddress":true},
    (err,result)=>{
    if(err){
        console.log(err);
        res.json({
            "err":1,
            "message":"Address Not Found!!"
        })
    }
    else{
        console.log({$ne:req.body.address_id})
        res.json({"err":0,"message":"You Have Successfuly updated Your shipping address.",  "isDeliveryAddress": true,})
    }
})
  

})



router.post('/giverating',(req,res)=>{
    console.log(req.body.productRating)
    let total=0
    req.body.productRating.forEach(function(item, index) {
            total += item;
            
         
        });
        let avg=total/req.body.productRating.length
        console.log(avg)
        productModel.updateOne({_id:req.body.id},
            { $push: {RatingArray:req.body.productratingvalue}  },function(err,docs){
                if (err){
                    console.log(err)
                    res.json({
                        "err":1,
                        "message":"Rating Is not updated!!"
                    })
                }
                else{
                    console.log("Updated Docs : ", docs);
                    productModel.updateOne({_id:req.body.id},
                        {$set:{productRating:avg }}, function (err, docs) {
                  
                              if (err){
                                  console.log(err)
                                  res.json({
                                      "err":1,
                                      "message":"Rating Is not updated!!"
                                  })
                              }
                              else{
                                  console.log("Updated Docs : ", docs);
                                  res.json({"err":0,"message":"You Have Successfuly Updated Your Rating.",docs})
                              }
                         });
                }
            })
 
    
})


router.post('/filterdata', (req, res) => {
    console.log(req.body.category)  
    productModel.find()
        .populate(["categoryId", "colorId"])
        .then(product => {
            const pro=product.filter(product => product.categoryId.categoryName == req.body.category);
            res.send(pro)
        })
})
router.post('/filtercolor', (req, res) => {
    console.log(req.body.colour)  
    let ds, sofaData, slice;
    productModel.find()
        .populate(["categoryId", "colorId"])
        .then(product => {
            console.log(product)
            if(req.body.category=="Sofa"){
            ds = product.filter(product => product.categoryId.categoryName == "Sofa");
            sofaData = ds.filter(ds => ds.colorId.colorName == req.body.colour)
                res.send(sofaData)
            }
            else if(req.body.category=="Bed"){
                ds = product.filter(product => product.categoryId.categoryName == "Bed");
                sofaData = ds.filter(ds => ds.colorId.colorName == req.body.colour)
                  res.send(sofaData)
            }
            else if(req.body.category=="Wadrobe"){
                ds = product.filter(product => product.categoryId.categoryName == "Wadrobe");
                sofaData = ds.filter(ds => ds.colorId.colorName == req.body.colour)
                  res.send(sofaData)
            }
            else if(req.body.category=="Chair"){
                ds = product.filter(product => product.categoryId.categoryName == "Chair");
                sofaData = ds.filter(ds => ds.colorId.colorName == req.body.colour)
                  res.send(sofaData)
            }
            else if(req.body.category=="Dining set"){
                ds = product.filter(product => product.categoryId.categoryName == "Dining set");
                sofaData = ds.filter(ds => ds.colorId.colorName == req.body.colour)
                  res.send(sofaData)
            }
        })
})

router.post('/search',(req,res)=>{
    productModel.find()
    .populate(["categoryId","colorId"])
    .then(product=>{
        res.send(product)
    })
})


router.post('/addtocart',(req,res)=>{
     console.log(req.body)
    UserModel.updateOne({email:req.body.uid}, 
        { $set: { cart: req.body.cartData } }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs : ", docs);
        }
    });
})
router.post('/updatecart',(req,res)=>{
    console.log(req.body)
    UserModel.updateOne({email:req.body.uid}, 
        { $set: { cart: req.body.cartData } }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs : ", docs);
    UserModel.findOne({ _id: req.body.id }, (err, data) => {
console.log(data)
            let payload = {
                uid: data.email,
                name:data.name,
                lname:data.lname,
                gender:data.gender,
                mobile:data.mobile,
                address:data.address,
                password:data.password,
                cartData:req.body.cartData,
                photo:data.photo,
                id:data._id,
                
               
            }
            const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 360000 })
            res.send(token)
            // console.log(token)
        })
        }
    });
})

router.post("/orderdata", (req, res) => {
    console.log(req.body)
    let ins = new OrderModel({ order: req.body.orders, total: req.body.total, gst: req.body.gst, mainTotal: req.body.mainTotal, userId: req.body.userId ,deliveryAddress:req.body.deliveryAddress})
    ins.save(function (err) {
        if (err) {
            console.log(err)
        }
    });
    UserModel.updateOne({ _id: req.body.userId },
        { $set: { cart: [] } }, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                UserModel.findOne({ _id: req.body.userId }, (err, data) => {
                let payload = {
                    uid: data.email,
                    name: data.name,
                    lname: data.lname,
                    gender: data.gender,
                    mobile: data.mobile,
                    password: data.password,
                    photo: data.photo,
                    id: data._id,
                    cartData: data.cart
                }
                const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 360000 })
                res.send(token)
            })
        }
        });
})

router.get('/getorder', (req, res) => {
    OrderModel.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    })

})


module.exports= router;