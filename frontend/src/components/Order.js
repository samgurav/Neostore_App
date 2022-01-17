import React,{useEffect,useState} from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import Account from './Account';
import Paper from '@mui/material/Paper';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { getOrder } from '../config/MyService';
const paperStyle = { height: '70vh', width: 750, margin: '60px auto', paddingTop: '20px', "overflow-y": "auto" }

function Order() {
    const [data, setData] = useState()
    const navigate=useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: "cartLen" })
        getOrder().then((res) => {
            const result = res.data;
            if (localStorage.getItem('_token') !== undefined) {
                let token = localStorage.getItem('_token');
                let decode = jwtDecode(token);
                console.log(decode)
                const orderData = result.filter(result => result.userId == decode.id)
                console.log(orderData)
                setData(orderData)
            }
        })
    }, [])
  
                
  const handleDownloadInvoice=(ele)=>{
        navigate('/preview')
  }
 
          
      

    return (
        <div>
              <div>
            <div className="col-12">
                <h1>My Account</h1>

            </div>
            <hr />
            {localStorage.getItem('_token')?
<div>
            <Container>
                <Row>
                    <Col sm={4}>


                        <div className="container m-4" style={{ marginRight: '50px' }}>

                            <div className="row">
                                <Account />
                            </div>
                        </div>


                    </Col>


                    <Col sm={8} >
                    <h2 style={{fontSize:'30px',fontWeight:'700'}}>Orders</h2>
                            <div className="container">
                            <Paper elevation={5} style={paperStyle} >
                                <div >
                                    <div className="text">
                                      
                                      
                                        {data!==undefined && data.map((el,index) =>
                                        
                                            <Container key={el._id}>
                                                
                                                <div className="row m-2">
                                                    <h2 style={{ fontSize: "25px", color: "black" }}>TRANSIT : </h2><span style={{fontSize:'20px'}}>&nbsp; Bill No:  OREDNO_{index + 200} </span>
                                                    <div className="col-12"> <small className="text-dark" style={{fontSize:'20px'}}>Placed on :{el.createdAt} </small></div>
                                                     <div className='col-12'><small className="text-success" style={{fontSize:'20px',fontFamily:'600'}}>Total cost : <b>{el.total} </b>&nbsp; GST:<b> {el.gst}</b> <br/> mainTotal: <b>{el.mainTotal} </b><i className="fa fa-rupee"></i> </small></div>
                                                </div> 
                                                <hr />
                                                <div className="row m-2">
                                                {
                                                            el.order.map(img =>
                                                                <img className="mx-2" style={{ width: "20%", height: "100px" }} variant="top" src={img.productImage} />
                                                            )
                                                        }
                                                    
                                                </div>
                                                <hr />
                                                <div className="row m-2" >
                                                    <button  onClick={() => navigate('/preview', {state:{user:el,total:el.total,amount:el.mainTotal,time:el.createdAt,index:index,order:el.order,}} )} className="btn btn-primary">View Invoice and Download The PDF</button>
                                                </div>
                                            </Container>
                                              
                                         ) }
                                    </div>
                                </div>
                                </Paper>
                            </div>
                       
                    </Col>
                </Row>
            </Container>
            </div>:<div>
            <div className="container text-center mt-5 mb-5">
            <h5>Hi Customer, sorry but you are not logged in..</h5>
                            <h5>Please Login to continue to orders Page ,Follow Below link to countinue to login Page..</h5>
                            <Link to="/login" className="btn btn-danger m-4">Go to Login Page</Link>
                        </div>
            </div>
}
        </div>
        </div>
    )
}

export default Order
