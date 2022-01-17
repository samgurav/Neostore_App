import React, { useState ,useEffect} from 'react'
import {Navbar,Nav,Container,Dropdown,Form,FormControl,Button,NavDropdown} from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import {addtoCart} from '../config/MyService'
import jwt_decode from 'jwt-decode';
import {useDispatch,useSelector} from 'react-redux'

function NavigationBar() {
  const [flag,setFlag]=useState(false)
  const count = useSelector(state => state.cartLength)
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const [temp,setTemp]=useState(false)
  const [value,setValue]=useState(false)

  const logout=(e)=>{
    e.preventDefault();

    if(localStorage.getItem('_token') !==undefined){
      let token=localStorage.getItem('_token');
      let decode=jwt_decode(token);
      console.log(decode);
      if(localStorage.getItem("cartData")){
        addtoCart({uid:decode.uid,cartData:JSON.parse(localStorage.getItem('cartData'))})
      }
      else{
        addtoCart({id:decode.id,cartData:decode.cartData,uid:decode.uid})
      }
      Swal.fire({
        timer:1000,
        title:'Logout!',
        text:'You have Successfully Logout from this device.',
       icon: 'success'
      })
      localStorage.clear();
           setFlag(true)
      dispatch({type:'logout'})
        navigate('/login',{replace:true})
       
      
   
    }

}
    return (
        <div>

        <Navbar bg="dark" expand="lg" style={{padding:'5px'}}>
  <Container fluid>
    <Navbar.Brand href="#" style={{fontSize:'30px',fontWeight:'700',color:'white',marginLeft:'20px'}}>Neo<span style={{color:'#F71E0C'}}>STORE</span></Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0 menu"
        style={{ maxHeight: '100px',marginLeft:'250px' }}
        navbarScroll
      >
    <Link to='/'  class="btn1" style={{textDecoration:'none',letterSpacing:'2px',transition:'0.5%',fontSize:'15px',color:'white',display:'inline-block',padding:'10px 30px',marginTop:'20px', marginRight:'30px',textTransform:'uppercase',fontWeight:'700'}} >Home</Link> 
    <Link to='/getAllCategories'  class="btn1" style={{textDecoration:'none',letterSpacing:'2px',transition:'0.5%',fontSize:'15px',color:'white',display:'inline-block',padding:'10px 30px',marginTop:'20px', marginRight:'30px',textTransform:'uppercase',fontWeight:'700'}} >Products</Link> 
    <Link to='/order'  class="btn1" style={{textDecoration:'none',letterSpacing:'2px',transition:'0.5%',fontSize:'15px',color:'white',display:'inline-block',padding:'10px 30px',marginTop:'20px', marginRight:'30px',textTransform:'uppercase',fontWeight:'700'}} >Order</Link> 
      </Nav>
      <p style={{marginRight:'50px'}}></p>
     
    
         <Link to='/cart'> <Button variant="outline-light"style={{marginTop:'20px',marginRight:'30px'}} ><i class="fas fa-shopping-cart" ></i>Cart   <span ><sup className="top_header_cart_count">{count}</sup></span></Button></Link> 
               
        <Dropdown >
  <Dropdown.Toggle variant="outline-light" id="dropdown-basic"  style={{height:'40px',width:'100px', marginRight:'60px',marginTop:'20px'}}>
  <i class="fas fa-user-tie"></i>
  </Dropdown.Toggle>
  {localStorage.getItem('_token')?
  <Dropdown.Menu>
    <Dropdown.Item   ><Link to='/profile' style={{textDecoration:'none',color:'black'}}>Profile</Link></Dropdown.Item>
    <Dropdown.Item onClick={logout}><Link to='/login' style={{textDecoration:'none',color:'black'}}>Logout</Link></Dropdown.Item>
   
  </Dropdown.Menu>:
  <Dropdown.Menu>
     <Dropdown.Item   ><Link to='/login' style={{textDecoration:'none',color:'black'}}>Login</Link></Dropdown.Item>
    <Dropdown.Item ><Link to='/register' style={{textDecoration:'none',color:'black'}}>Register</Link></Dropdown.Item>
   
  </Dropdown.Menu>
}
</Dropdown>
    
         

         
     
    
      
     
  
    </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
    )
}

export default NavigationBar
