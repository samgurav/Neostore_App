const express=require('express');
const cors=require('cors')
const http=require('http')
const db=require('./db/db')
const PORT=3022
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());
const httpServer=http.createServer(app);

const postRoutes=require('./routes/postRoutes');
app.use("/api/posts",postRoutes)
app.use(express.static('./'));



httpServer.listen(PORT,(err)=>{
    if(err) throw err
    console.log(`Server is running on ${PORT}`)
})