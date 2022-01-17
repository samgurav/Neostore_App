import React,{useEffect,useState} from 'react';
import { useLocation,useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReactToPdf from 'react-to-pdf';
import html2canvas from 'html2canvas';
import { Navbar } from 'react-bootstrap';
import {jsPDF} from 'jspdf';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import {Paper } from '@mui/material'

import Swal from 'sweetalert2'
import { email, getOrder } from '../config/MyService';
const options = {
    orientation: 'potrait',
    unit: 'in',
    format: 'A4'
};
function Preview() {
    const [data, setData] = useState()
    const [order, setOrder] = useState()
    const navigate=useNavigate()
    const dispatch = useDispatch()
  
  
    const { state } = useLocation();
    console.log(state)
    const ref = React.createRef();
    useEffect(() => {
        dispatch({ type: "cartLen" })
    
        getOrder().then((res) => {
            const result = res.data;
            if (localStorage.getItem('_token') !== undefined) {
                let token = localStorage.getItem('_token');
                let decode = jwtDecode(token);
                console.log(decode)
                setData(decode)
                const orderData = result.filter(result => result.userId == decode.id)
                console.log(orderData)
                setOrder(orderData)
               
            }
        })
 
      
    }, [])
    if  (!localStorage.getItem('_token')){
        window.location.replace('/login')
  }
    return (
        <div>
 
              <div className="container" style={{marginRight:'200px'}} >
            <nav class="navbar">
                <div class="container-fluid" style={{marginLeft:'100px'}}>
                    <Link to="/order"><button className='btn btn-primary' style={{height:'60px'}}>Return to Order Page</button></Link>
                    <button className="btn btn-success">
                        <ReactToPdf targetRef={ref} filename={`_ORDERNo${state.index+200}.pdf`} options={options} x={0} y={0} scale={0.6}>
                            {({ toPdf }) => (
                                <button onClick={() => {
                                   
                                    toPdf();
                                  
                                }}  className='btn btn-success'>
                                    Save PDF
                                </button>
                            )}
                        </ReactToPdf>
                    </button>
                  
                </div>
            </nav>
            <Paper ref={ref} id='divToPrint' style={{width:"1300px",padding:'40px' }}>
         

                <nav class="navbar  navbar-light bg-light" >
                    <div class="container-fluid" style={{ height: "168px" }}>
                        <img  src="./Images/logo.jpg" alt="image" height="120px" width=" 190px" opacity=" 2" class="d-inline-block align-text-top" style={{ marginLeft: "15px", marginTop: "5px" }} />
                        <Navbar.Brand href="#" style={{fontSize:'35px',fontWeight:'700',color:'Black',fontStyle:'italic'}}>Neo<span style={{color:'#F71E0C'}}>STORE</span></Navbar.Brand>
   
                    </div>
                </nav>
                <div className='row m-0 border'>
                    <div className='col text-left ml-4'>
                        <h5>From</h5>
                        <h6>NeoStore Shopping Pvt LTD</h6>
                        <h6>Dadar-West</h6>
                        <h6>669594</h6>
                        <h6>Contact NO:01234567890</h6>
                        <br />
                        <h5>To</h5>
                        {
                            data!==undefined &&
                            <h6>{data.name} {data.lname}</h6>  
                    }
                     {
                                data!==undefined &&
                                <h6> Contact Details:<br/>Mobile No:{data.mobile}<br/> </h6>
                               }
                               <h6> Address:<br></br> 
                               {state.user.deliveryAddress.address}&nbsp;
                                {state.user.deliveryAddress.city}<br/>
                                 {state.user.deliveryAddress.pincode}<br/>
                                 {state.user.deliveryAddress.state} {state.user.deliveryAddress.country}
                               </h6>
                    </div>
                    <div className='col text-right mr-4' style={{height:'250px'}}>
                    <h6 style={{ textAlign: "right", marginRight: "15px" }}>Recipt No: <p style={{color:'black',fontSize:'25px'}}>ORDERNO_{state.index+200}</p></h6>
                     
                        <h6 style={{ textAlign: "right", marginRight: "15px" }}>Status: <p style={{color:'green',fontSize:'25px'}}>PAID</p></h6>
                        <h6 style={{ textAlign: "right", marginRight: "15px",fontSize:'15px' }}>Order Placed On:<br/>{state.user.createdAt}</h6><br/><br/><br/>
                        <h5 style={{ textAlign: "right", marginRight: "15px" }}>Total: Rs.<b>{state.user.total}</b></h5>
                        <h5 style={{ textAlign: "right", marginRight: "15px" }}>GST: Rs.<b>{state.user.gst}</b></h5>
                        <h3 style={{ textAlign: "right", marginRight: "15px" }}>Total Amout:Rs.<b>{state.amount}</b> </h3>
                    </div>

                </div>
                <br />
                <div className="container-fluid">

                <table class="table " style={{border:"2px solid grey"}}>
                        <thead>
                            <tr style={{background:'grey'}}>
                                <th scope="col">Sr No</th>
                                <th scope="col">Item</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Price</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {state.user.order.map((ele, index) =>

                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td><img src={ele.productImage} width="80px" height="100px"/></td>
                                    <td>{ele.quantity}</td>
                                    <td>{ele.productCost}</td>
                                    <td>{ele.productCost * ele.quantity}</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                    <h6>Thank You for Shopping With Us.</h6>
                    <h1>NEO<span style={{color:'red'}}>STORE</span></h1>
                    <div>
                      
                    </div>
                </div>
         
            </Paper>


        </div>
       
        </div>

    )
}

export default Preview
