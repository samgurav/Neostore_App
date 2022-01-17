import React,{useEffect,useRef,useState} from 'react'
import { StepLabel,Step,Stepper,Paper } from '@mui/material'
import { Link,Navigate ,useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { Card, Container,Button,Accordion,Modal } from 'react-bootstrap'
import { getAddress, orderData, UpdateSelectedAddress } from '../config/MyService'
const regForVC = RegExp(/^[1-9][0-9]{3}$/);
const regForName = RegExp(/^[A-Za-z]{3,10}$/);
const regForCVC = RegExp(/^[1-9][0-9]{5}$/);
function SelectAddress() {
    const[data,setData] =useState({});
    const [address,setAddress]=useState([]);
    const [temp,setTemp]=useState(false)
    const [selectaddress,setSelectAddress]=useState({})
    const [indexvalue,SetIndex]=useState()
    const dispatch=useDispatch()
    const [modalShow, setModalShow] = React.useState(false);
    const [flag,setFlag]=useState(false)
    const AddressInput=useRef(null)
    const navigate=useNavigate()
 
    useEffect(() => {
        dispatch({type:"cartLen"})
        if (localStorage.getItem('_token') !== undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            setData(decode)
            getAddress({uid:decode.uid})
            
            .then(res=>{
                if(res.data.err===1){
                    alert(res.data.message)
                   
                }
                else if(res.data.err===0){
                    setAddress(res.data.address)
                    console.log(res.data.address)
                  
                
                }
            })
        }
        
        
    }, [temp])
  //set address as true
  const   selectAddress = (ele) => {
   
        console.log(ele)
        UpdateSelectedAddress({address_id:ele.address_id,uid:data.uid}).then(res=>{  
            console.log(res.data.address)
            Toastify({
                text: res.data.message,
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
           
        setTemp(prev=>!prev);
       
    }) 
}
//modal for payment
function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{textAlign:'center'}}>Make Payment</h4>
          <div class="padding">
    <div class="row">
        <div class="container-fluid d-flex justify-content-center">
            <div class="col-sm-8 col-md-6">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-6"> <span>CREDIT/DEBIT CARD PAYMENT</span> </div>
                            <div class="col-md-6 text-right" style={{marginTop:'-5px'}}> <img src="https://img.icons8.com/color/36/000000/visa.png"/> <img src="https://img.icons8.com/color/36/000000/mastercard.png"/> <img src="https://img.icons8.com/color/36/000000/amex.png"/> </div>
                        </div>
                    </div>
                
                    <div class="card-body"  style={{height:'350px'}}>
                  <form onSubmit={checkout}>
                        <div class="form-group"> <label for="cc-number" class="control-label">CARD NUMBER</label> <input id="cc-number" type="text" class="input-lg form-control cc-number" name='vc' autocomplete="cc-number" placeholder="•••• •••• •••• ••••" required/> </div>
                      
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group"> <label for="cc-exp" class="control-label">CARD EXPIRY</label> <input id="cc-exp" type="text" class="input-lg form-control cc-exp"   placeholder="•• / ••" required/> </div>
                                
                            </div>
                           
                            <div class="col-md-6">
                                <div class="form-group"> <label for="cc-cvc" class="control-label">CARD CVC</label> <input id="cc-cvc" type="text" class="input-lg form-control cc-cvc"   name='cvc' placeholder="••••" required/> </div>

                            </div>
                        </div>
                    
                        <div class="form-group"> <label for="numeric" class="control-label">CARD HOLDER NAME</label> <input type="text" class="input-lg form-control"   /> </div>
                       
                        <Button variant="success" type='submit'  style={{marginTop:'20px', marginLeft:'80px'}} >Proceed to Checkout</Button>
                        </form>
                    </div>
                 
                </div>
            </div>
        </div>
    </div>
</div>
        </Modal.Body>
       
      </Modal>
    );
  }
  
     //proceed to checkout
 
    const checkout=(e)=>{
        e.preventDefault();
        Swal.fire({
            title: 'Are You Sure, Do you want to Buy This product? ',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Buy',
            denyButtonText: `Don't Buy`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire({imageWidth:'100px',imageHeight:'100px',imageUrl:"../Images/right.png",text:'THANKYOU , YOUR ORDER HAS BEEN PLACED SUCCESSFULLY!', icon: 'success',timer:1000})
              localStorage.removeItem("_token")
              let arr=data.cartData
              console.log(data.cartData)
              orderData({id:data.id,orders:JSON.parse(localStorage.getItem('cartData')),total:localStorage.getItem("total"),gst:localStorage.getItem("GST"),mainTotal:localStorage.getItem("mainTotal"),userId:data.id,deliveryAddress:address[indexvalue],uid:data.uid}).then((res)=>{
                  localStorage.setItem("_token",res.data)
                  localStorage.removeItem("cartData")
                  dispatch({type:"logout"})
                  navigate('/order')
              })
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
   
    }
  
    if  (!localStorage.getItem('_token')){
        window.location.replace('/login')
  }
   
    return (
        
        <div>
          
                 <div>
               
                <div className="container-fluid">
                    <div className="row">
                        <Stepper activeStep={1} style={{ width: "100%",marginTop:'30px' }}>
                                <Step >
                                    <StepLabel>Cart</StepLabel>
                                </Step>
                                <Step >
                                    <StepLabel>Delivery address</StepLabel>
                                </Step>
                        </Stepper>
                    </div>
                </div>
         <Container>
              <div className="mt-4 mb-4" style={{ border: "1px groove", borderRadius: "5px" }}>
                  <div className="col-lg-4 ">
                  <div className="row d-flex justify-content-around">
          
           <div className="col-lg-4 ">
               
               <div className="card" style={{width:"750px",border:'1px solid grey',padding:'10px',marginTop:'10px',margin:"30px"}}>
                   <h4>Shipping Address</h4>
               {address.length > 0 ? address.map((ele,index)=>
                    
                                <div style={{margin:'10px'}}>
                                              
                              
                        <Accordion defaultActiveKey="0" key={index} >
                        <Accordion.Item eventKey="0">
                        <Accordion.Header>Address {index+1}</Accordion.Header>
                        <Accordion.Body>
                            <p> address: {ele.address}</p>
                            <p>Pincode: {ele.pincode}</p>
                            <p>City: {ele.city}</p>
                            <p>State: {ele.state}</p>
                            <p>Country: {ele.country}</p>
                          
                            <button className='btn btn-primary' style={{marginRight:'20px'}} onClick={()=> {SetIndex(index);selectAddress(ele);setModalShow(true)}}>Delivery Address</button>          
                         
                        </Accordion.Body>
                        </Accordion.Item>
                        
                        </Accordion>
                        </div>
                        
         ):<div className="text-center">
           <h2>No address found</h2>
           <Link  to='/address' className="btn btn-primary"  style={{width:"50%",marginBottom:"15px"}} >Add Shipping Address</Link>
                   

       </div>}
     
       <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
           
             </div>
           
             </div>
         
           
           </div>
</div>
              </div>
         </Container>
            </div>
        </div>
    )
}

export default SelectAddress
