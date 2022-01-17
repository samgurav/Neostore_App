import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/material/styles';
import { useState,useEffect,useRef } from 'react';
import '../CSS/Login.css'
import Swal from 'sweetalert2'
import { loginuser,getPosts,addUser,addSocialUser, getAll, checksocial } from '../config/MyService';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { OldSocialLogin as SocialLogin } from "react-social-login";
import SocialButton from './SocialButton'
import { useDispatch } from 'react-redux';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
const paperStyle={height:'60vh', width:500, margin:'30px auto',paddingTop:'20px'}
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const bcrypt = require('bcryptjs')
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);
function Login() {
    const [loginData,setLoginData]=useState()
    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");
    const[flag,setFlag]=useState(false)
    const [type, settype] = useState(false);
    const [state, setstate] = useState([])
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch({type:"cartLen"})
        if(localStorage.getItem('isLogged')==='true'){
            window.location.replace('/getAllCategories')
        }
        else{
            localStorage.setItem('isLogged',false)
        }
      
            getAll().then(res=>{
              setstate(res.data)
              console.log(res.data)
            })
        
      
    
      
    },[])
    const Eye = () => {
        if (password == "password") {
            setpassword("text");
            seteye(false);
            settype(true);
        }
        else {
            setpassword("password");
            seteye(true);
            settype(false);
        }
    }
//hanlder to handle login data
    const handleLoginData = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value })
        console.log(loginData)
    }
    //password and email check 
    const submitLogin = (e) => {
        e.preventDefault()
        checksocial({ email: loginData.email }).then((res) => {
            if (res.data.err == 0) {
               getPosts({ email: loginData.email, password: loginData.password }).then((res) => {
                   if (res.data.err == 0) {
                    Swal.fire({
                        icon:'success',
                        text: res.data.message,
                        imageUrl: res.data.photo,
                        imageWidth: 100,
                        imageHeight: 100,
                        imageAlt: 'Profile Photo',
                        timer:2000
                      })
                       localStorage.setItem("_token", res.data.token);
                       navigate('/')
                       dispatch({ type: "cartLen" })
    
                   } else if (res.data.err == 1) {
                       console.log('good')
                       alert(res.data.message)
    
                   }
               })
             
           }
           else if(res.data.err==1){
            Swal.fire({
                icon:'error',
                title: res.data.message  
             
               })
             
           }
       })
    }

   


    //navigate to forgot password
    const forgotpassword=(e)=>{
        e.preventDefault();
        setFlag(true)
        navigate('/forgotPassword',{replace:'true'})
    }
    //navigate to register
    const register=(e)=>{
        e.preventDefault();
        setFlag(true)
        navigate('/register',{replace:'true'})
    }

//social login handle
            
    const handleSocialLogin = (user) => {
        console.log(user);     
        addSocialUser({name:user.profile.name,lname:user.profile.lname,email:user.profile.email, provider: "social",photo:user.profile.profilePicURL}).then((res) => {
            if (res.data.err == 0) {
                localStorage.setItem('isLogged',true)
                Swal.fire({
                    icon:'success',
                    text: res.data.message,
                    imageUrl: res.data.photo,
                    imageWidth: 100,
                    imageHeight: 100,
                    imageAlt: 'Profile Photo',
                    timer:2000
                  })
                  localStorage.setItem("_token",res.data.token);
                navigate('/')
                setFlag({
                    flag: true
                })
            }
        })
       
    };

 
    const handleSocialLoginFailure = (err) => {
        console.error(err);
        alert("Sorry wrong user")
    };


 
    return (
        <div>
   
            <Container>
  <Row>
    <Col>
    <Paper elevation={2} style={paperStyle}>

 
 

                    <SocialButton className='btn btn-primary' style={{height:60,width:300,marginTop:'80px'}}
                        provider="facebook"
                        appId="598247578289958"
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}
                    >
                        <i class="fab fa-facebook fa-1x" ></i>  Login with Facebook
                    </SocialButton>
                    <SocialButton className='btn btn-danger' style={{height:60,width:300,marginTop:'20px'}}
                        provider="google"
                        appId="552530164250-085dqcdp3mjb18nl3nknl0u96p9mnf7c.apps.googleusercontent.com"
                        onLoginSuccess={handleSocialLogin}
                   onLoginFailure={handleSocialLoginFailure}

                    >
                       <i class="fab fa-google fa-1x"></i> Login with Google
                    </SocialButton> 
                    
                    {/* <SocialButton  style={{height:60,width:300,marginTop:'20px',background:'#1DA1F2',color:'white',border:'1px solid white'}}
                        provider="google"
                        appId="552530164250-085dqcdp3mjb18nl3nknl0u96p9mnf7c.apps.googleusercontent.com"
                        // onLoginSuccess={responseSuccessGoogle}
                        // onLoginFailure={handleSocialLoginFailure}
                    >
                        <i class="fab fa-twitter fa-1x" ></i>  Login with Twitter
                    </SocialButton> */}


      
    </Paper>

    
    </Col>
    <Col>
    <Paper elevation={5} style={paperStyle}>
    <div className="container">
        <div >
            <div className="text">
                <h3>Login To NeoSTORE</h3>
               
            </div>
            <form  >
                <div className="input-text">
                    <input type="text" name="email" placeholder="Enter email" onChange={handleLoginData}  required />
                    <i className="fa fa-envelope"></i>

                </div>
               
                <div className="input-text">
                    <input type={password}  name="password" placeholder="Enter password" onChange={handleLoginData} required/>
                    <i className="fa fa-lock"></i>
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
                </div>
               
                <div className="buttons">
                    <button onClick={submitLogin} type='submit'>Login</button>
                </div>
             
              
            </form>
        </div>
    </div>
    </Paper>
    
 
    
    </Col>
  </Row>
  <div style={{marginLeft:'5%'}}>
  <Button variant="contained" color="primary" onClick={register}  >Register Now</Button> |  <Button variant="contained" color="success" onClick={forgotpassword}>Forgot Password?</Button> 
 
  </div>
              
 
</Container>

        </div>
    )
}

export default Login
