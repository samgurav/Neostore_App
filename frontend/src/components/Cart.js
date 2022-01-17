import React, { useEffect, useState } from 'react'
import { StepLabel,Step,Stepper,Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Navigate,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {Button} from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import {updateCart} from '../config/MyService'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function Cart() {

   
    const [cart, setCart] = useState({cartData:[]})
    const [total, setTotal] = useState()
    const [gst, setGST] = useState()
    const [mainTotal, SetMainTotal] = useState()
    const[decodes,setDecode]=useState()
    const navigate=useNavigate();
    const dispatch=useDispatch()
    useEffect(() => { 
        dispatch({type:"cartLen"})
        if(!localStorage.getItem("_token")){
            if(localStorage.getItem("cartData")!=undefined){
            let cartDetails=JSON.parse(localStorage.getItem('cartData'))
            setCart({cartData:cartDetails})
            let sum=0;
            cartDetails.forEach(ele => {
                console.log(ele.productCost + " "+ ele.quantity)
                sum += ele.productCost*ele.quantity
            })
            console.log(sum)
            setTotal(sum)
            setGST(Math.round(sum/100*5))
            SetMainTotal(sum+Math.round(sum/100*5))
            return
        }
        else{
            localStorage.setItem("cartData",[])
        }
        }
        else if(localStorage.getItem("_token")&& !(localStorage.getItem("cartData"))){
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            localStorage.setItem("cartData",JSON.stringify(decode.cartData))
            setCart({cartData:JSON.parse(localStorage.getItem('cartData'))})
            let sum = 0;
            let cartDetails=JSON.parse(localStorage.getItem('cartData'))
            cartDetails.forEach(ele => {
                console.log(ele.productCost + " "+ ele.quantity)
                sum += ele.productCost*ele.quantity
            })
            console.log(sum)
            setTotal(sum)
            setGST(Math.round(sum/100*5))
            SetMainTotal(sum+Math.round(sum/100*5))
           
           setDecode(decode)
        }
        else if((localStorage.getItem("_token") && localStorage.getItem('cartData'))){
            setCart({cartData:JSON.parse(localStorage.getItem('cartData'))})
            let sum = 0;
            let cartDetails=JSON.parse(localStorage.getItem('cartData'))
            cartDetails.forEach(ele => {
                console.log(ele.productCost + " "+ ele.quantity)
                sum += ele.productCost*ele.quantity
            })
            console.log(sum)
            setTotal(sum)
            setGST(Math.round(sum/100*5))
            SetMainTotal(sum+Math.round(sum/100*5))
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
           setDecode(decode)
            updateCart({id:decode.id,cartData:cartDetails,uid:decode.uid}).then(res=>{
                localStorage.removeItem("_token")
                localStorage.setItem("_token",res.data)
            }
            )
        }
     
       
    }, []) 

//increase quantity
    const additem = (id) => {
        const localCartData = JSON.parse(localStorage.getItem("cartData"))
        const index = localCartData.findIndex(res => { return res.id === id })
        if (localCartData[index].quantity > 0 && localCartData[index].quantity <= 9) {
            localCartData[index].quantity = localCartData[index].quantity + 1;
            localStorage.setItem('cartData', JSON.stringify(localCartData));
            let cartDetails=JSON.parse(localStorage.getItem('cartData'))
            let sum = 0;
            cartDetails.forEach(ele => {
                console.log(ele.productCost + " "+ ele.quantity)
                sum += ele.productCost*ele.quantity
            })
            console.log(sum)
            setTotal(sum)
            setCart({cartData:cartDetails})
            setGST(Math.round(sum/100*5))
            SetMainTotal(sum+Math.round(sum/100*5)) 

        }
    }
    //decrease quantity
    const deleteitem = (id) => {
        const localCartData =JSON.parse(localStorage.getItem("cartData"))
        const index = localCartData.findIndex(res => { return res.id === id })
        if (localCartData[index].quantity > 1 && localCartData[index].quantity <= 10) {
            localCartData[index].quantity = localCartData[index].quantity - 1;
            localStorage.setItem('cartData', JSON.stringify(localCartData));
            let sum = 0;
            let cartDetails=JSON.parse(localStorage.getItem('cartData'))
            cartDetails.forEach(ele => {
                console.log(ele.productCost + " "+ ele.quantity)
                sum += ele.productCost*ele.quantity
            })
            
            setCart({cartData:cartDetails})
            console.log(sum)
            setTotal(sum)
            setGST(Math.round(sum/100*5))
            SetMainTotal(sum+Math.round(sum/100*5)) 

        }
    }
    //delete cart data
    const deleteData = (index) => {
       
     let state=JSON.parse(localStorage.getItem("cartData"))
        state.splice(index, 1)
        Toastify({
            text: "Cart Data deleted",
            className: "info",
            style: {
              background: "red",
            }
          }).showToast();
        dispatch({type:"delCart"})
        setCart({cartData:state})
        localStorage.setItem('cartData', JSON.stringify(state))
        let cartDetails=JSON.parse(localStorage.getItem('cartData'))
        let sum=0;
        cartDetails.forEach(ele => {
            console.log(ele.productCost + " "+ ele.quantity)
            sum += ele.productCost*ele.quantity
        })
        console.log(sum)
        setTotal(sum)
        setGST(Math.round(sum/100*5))
        SetMainTotal(sum+Math.round(sum/100*5)) 
        updateCart({id:decodes.id,cartData:state}).then(res=>{
            localStorage.removeItem("_token")
            localStorage.setItem("_token",res.data)
        })
    }
    //proceed to buy button
    const buyButton=()=>{
        if(localStorage.getItem("_token")!=undefined){
            let cartData=JSON.parse(localStorage.getItem('cartData')).length
            if(cartData<1){
                Swal.fire({
                    icon: 'warning',
                title: 'Your Cart is empty.',
                text:'Please add products to proceed'
                
                  })
            }
           else if(cartData>=1){
            localStorage.setItem('isLogged',true)  
            localStorage.setItem("total",total);
            localStorage.setItem("GST",gst);
            localStorage.setItem('mainTotal',mainTotal)
            navigate('/selectAddress')
           }
  
        }
        else{
            Swal.fire({
                icon: 'warning',
            title: 'Oops,Login is required',
            text:'please login to buy the product'
            
              })
            navigate('/login')
        }
    }
  
  
    return (
        
        <div>
                <div className="container-fluid">
                    <div className="container-fluid" >
                        <div className="row"style={{marginTop:'20px'}}>
                            <Stepper activeStep={0} style={{ width: "100%" }}>
                              
                                    <Step >
                                        <StepLabel>Cart</StepLabel>
                                    </Step>
                                    <Step >
                                        <StepLabel>Delivery Address</StepLabel>
                                    </Step>
                           
                            </Stepper>
                        </div>

        <div className="row" style={{marginTop:'30px'}}>
        <div className="col-8 ">

                      
        { cart.cartData.length>0 ?cart.cartData.map((el, index) =>
                      
        <div className="container mt-3 mb-2" key={el.id} >
                                {/* <img src={`${URL}${el.product_id.product_image}`}/>
                                    <p>{el.product_id.product_desc}</p> */}
                <div className="row">
                    <div className="col-12">
                    <div className="card">
                    <Paper elevation={10} >
                    <div className="row card-body">
                    <div className="col-2">Product
                    <br/><br/>
                    <img src={el.productImage} alt='not found' width="100%"/>
                    </div>
                    <div className="col-3">
                    <span style={{fontSize:"smaller"}}>{el.productName}&nbsp;
                    by {el.productProducer} <br/>Status: {el.productStock > 0 ?
                    <span style={{color:"green"}}>In stock</span>:<span style={{color:"red"}}>Not in stock</span>} 
                    </span>
                    </div>
                    <div className="col-3">Quantity
                    <br/><br/>
                    <span style={{fontSize:"smaller"}}><RemoveIcon onClick={()=>deleteitem(el.id)}  fontSize="small"  className='bg-danger rounded-circle'/>  {el.quantity}  <AddIcon  
                    onClick={()=>additem(el.id)}fontSize="small"  className='bg-danger rounded-circle'/></span>
                    </div>
                    <div className="col-2">Price
                    <br/><br/>    {el.productCost}
                                                
                    </div>
                    <div className="col-2">Total
                     <br/><br/>
                    <span>{el.productCost*el.quantity}&nbsp;&nbsp;&nbsp;&nbsp;<span style={{float:"right"}}> <DeleteIcon 
                    onClick={() => deleteData(index)}  color="error" style={{fontSize:'40px'}}/></span></span>
                    </div>
                     <hr/>
                                                
                    </div>
                    </Paper>
                    </div>
                    </div>
                                   

             </div>


                        </div>):

                            <div className="row mt-5 ">
                                <div className="text-center mb-4" style={{ marginLeft: "27px" }}>
                                    <img src='../Images/cart.jpg' alt="img" height="30%" />
                                    <div className="text-center mt-4">
                                        <h3>YOUR CART IS CURRENTLY EMPTY</h3>
                                        <p>Before proceed to checkout you must add some products to your shopping cart.
                                        <br />You will find lots of intresting products on our products page</p>
                                        <Link to="/getAllCategories" className="btn btn-primary">Return to product page <LockOpenIcon/></Link>
                                    </div>
                                </div>
                            </div>}
        </div>
                      
                            <div className="col-4 mb-3 card" >
                            <div className="container" >
                                <div style={{paddigTop:'40px'}}><h2>Review Order</h2></div>
                                <br/><br/>
                                <div className="row">
                                    <div className="col-6 text-left">
                                        <p>Subtotal</p>
                                    </div>
                                    <div className="col-6 text-right">
                                        <p>{total}</p>
                                    </div>
                                </div>
                                <hr/>

                                <div className="row">
                                    <div className="col-6 text-left">
                                        <p>GST(5%)</p>
                                    </div>
                                    <div className="col-6 text-right">
                                        <p>{gst}</p>
                                    </div>
                                </div>
                                <hr/>
                                
                                <div className="row">
                                    <div className="col-6 text-left">
                                        <p>Order Total</p>
                                    </div>
                                    <div className="col-6 text-right">
                                        <p>{mainTotal}</p>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                            <Button  className="btn btn-primary"  style={{width:"100%",marginBottom:"15px"}} onClick={buyButton}>Proceed to Buy <ShoppingCartIcon/></Button>
                        </div>
        </div>
                            

                    </div>
                </div>
        </div>
    )
}

export default Cart
