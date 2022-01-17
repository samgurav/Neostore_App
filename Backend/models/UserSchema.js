const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type: String,
       
     
    },
    lname:{
        type: String,
        
     
    },
    email:{
        type:String, 
        unique:true
    },
    mobile:{
        type:String,
 
    },
  
    password:{
        type:String,
       
      
        
    },
    cpassword:
    {
        type:String,
      
    
    },
    gender:{
        type:String,
    },

    otp:{
        type:String,
    },
    photo: {
        type: String,
      
    },
    address:{
        type:Array,
    }
     ,  
    cart:{
        type:Array,
      
    } ,  
    provider:{
        type:String
    } 


})

module.exports=mongoose.model('user',UserSchema)

