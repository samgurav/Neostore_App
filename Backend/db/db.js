const mongoose=require('mongoose');
const db="mongodb://localhost:27017/Neostore";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("MongoDB connected")
    }
    catch(err){
        console.log(err.message)
    }
}
connectDB();