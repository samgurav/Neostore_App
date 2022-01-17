import React,{useEffect} from 'react'
import {Carousel} from 'react-bootstrap'
import {Rating,Typography} from '@mui/material'
import {Link} from 'react-router-dom'
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import PopularProducts from './PopularProducts';
import {useDispatch} from 'react-redux'
import jwt_decode from 'jwt-decode';
import {addSocialUser, FindSocialUser, updateCart} from '../config/MyService'
function Home() {
const dispatch = useDispatch()
if (localStorage.getItem("_token")) {
  let token = localStorage.getItem('_token');
  let decode = jwt_decode(token);
  console.log(decode)
  if (decode.provider == "social") { 
      localStorage.removeItem("_token")
     FindSocialUser({ email: decode.email }).then(res => localStorage.setItem("_token", res.data.token))
     dispatch({ type: "cartLen" })
    setTimeout(() => {
      dispatch({ type: "cartLen" })
      if (localStorage.getItem("cartData") && localStorage.getItem("_token")) {
        let cartDetails = JSON.parse(localStorage.getItem("cartData"));
        console.log(cartDetails)
        let token = localStorage.getItem('_token');
        let decode = jwt_decode(token);
        console.log(decode.cartData)
        let arr = cartDetails.concat(decode.cartData)
        console.log(arr)
        let jsonObject = arr.map(JSON.stringify);
        console.log(jsonObject);

        let uniqueSet = new Set(jsonObject);
        let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        console.log(uniqueArray)
        dispatch({ type: "oldCart", payload: uniqueArray.length })
        setTimeout(() => {
          dispatch({ type: "cartLen" })
        }, 100);
        dispatch({ type: "cartLen" })
        console.log(uniqueArray);
        updateCart({ id: decode.id, cartData: uniqueArray }).then(res => {
          localStorage.clear()
          localStorage.setItem("_token", res.data)
        })
        dispatch({ type: "cartLen" })
      }
    }, 300);

  }
}
  if(localStorage.getItem("cartData") && localStorage.getItem("_token")){
    let cartDetails=JSON.parse(localStorage.getItem("cartData"));
    console.log(cartDetails)
    let token = localStorage.getItem('_token');
    let decode = jwt_decode(token);
    console.log(decode.cartData)
    let arr=cartDetails.concat(decode.cartData)
    console.log(arr)
   let jsonObject = arr.map(JSON.stringify);  
    console.log(jsonObject);
  
    let uniqueSet = new Set(jsonObject);
    let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    console.log(uniqueArray)
    dispatch({type:"oldCart",payload:uniqueArray.length})
  
    console.log(uniqueArray);
            updateCart({id:decode.id,cartData:uniqueArray}).then(res=>{
              localStorage.clear()
              localStorage.setItem("_token",res.data)
            })
          }

useEffect(()=>{
  setTimeout(() => {
    dispatch({type:"cartLen"})
  }, 200);
})



    return (
        <div>
      
            <Carousel style={{margin:'20px'}}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="../Images/c1.jpg"
      alt="First slide"
      height="400px"
    />
    <Carousel.Caption>
    <h3 style={{fontWeight:'1000',color:'black',fontStyle:'italic'}}>Welcome To NeoSTORE</h3>
    <Link to="/login" class="btn1" style={{textDecoration:'none',letterSpacing:'2px',transition:'0.5%',fontSize:'15px',color:'white',display:'inline-block',padding:'10px 30px',marginTop:'20px', marginRight:'30px',textTransform:'uppercase',fontWeight:'700'}} >Join Us</Link>

    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="../Images/c2.jpg"
      alt="Second slide"
      height="400px"
    />

    <Carousel.Caption>
    <h3 style={{fontWeight:'1000',color:'black',fontStyle:'italic'}}>Welcome To NeoSTORE</h3>
    <a href="/login" class="btn1" style={{textDecoration:'none',letterSpacing:'2px',transition:'0.5%',fontSize:'15px',color:'white',display:'inline-block',padding:'10px 30px',marginTop:'20px', marginRight:'30px',textTransform:'uppercase',fontWeight:'700'}} >Join Us</a>

    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="../Images/c3.jpg"
      alt="Third slide"
      height="400px"
    />

    <Carousel.Caption>
    <h3 style={{fontWeight:'1000',color:'black',fontStyle:'italic'}}>Welcome To NeoSTORE</h3>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

<PopularProducts/>


        </div>
    )
}

export default Home
