import React from 'react'
import Footer from './Footer'
import NavigationBar from './NavigationBar'
import { Paper } from '@mui/material'
import {addUser,addSocialUser} from '../config/MyService'
import { useState,useRef,useEffect } from 'react'
import '../CSS/Login.css'
import SocialButton from './SocialButton';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
const regForName = RegExp(/^[A-Za-z]{3,10}$/);
const regForUName = RegExp(/^[A-Za-z]{2,12}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);
const RegForMobile=RegExp('^((\\+91-?)|0)?[0-9]{10}$')
const bcrypt = require('bcryptjs')

const paperStyle={padding:20,height:'120vh', width:600, margin:'20px auto'}
function Register() {
    const navigate=useNavigate()
    const[data,setData] =useState({
        name:'',
        lname:'',
        email:'',
        password:'',
        mobile:'',
        cpassword:'',
        photo:''
    });
    const[eye,seteye]=useState(true);
   
    const[password,setpassword]=useState("password");
    const[type,settype]=useState(false);
    const[eyes,seteyes]=useState(true);
    const[passwords,setpasswords]=useState("password");
    const[types,settypes]=useState(false);    
    const [select,setSelect]=useState()
    const[flag,setFlag]=useState(false)
    const pass =useRef()
const [Errors,SetError]=useState({
    name:'',
    lname:'',
    email:'',
    password:'',
    mobile:'',
    cpassword:''
  })
    const Eye=()=>{
        if(password=="password"){
        setpassword("text");
        seteye(false);
        settype(true);
        }
        else{
        setpassword("password");
        seteye(true);
        settype(false);
        }
        }
  
        const Eyes=()=>{
            if(passwords=="password"){
            setpasswords("text");
            seteyes(false);
            settypes(true);
            }
            else{
            setpasswords("password");
            seteyes(true);
            settypes(false);
            }
            }
        //handler to handle data and error
    const handler=(event)=>{
        const {name,value}=event.target;
        switch(name){
            case 'name':
              Errors.name= regForName.test(value)?'':' name should be between 2 to 10 letters';
              break;
              case 'lname':
                Errors.lname= regForName.test(value)?'':' last name should be between 2 to 10 letters';
                break;
              case 'mobile':
                Errors.mobile= RegForMobile.test(value)?'':'Phone Number should be valid';
           break;
         
                   case 'email':
                    Errors.email= regForEmail.test(value)?'':'invalid email';
               break;
            
                  case 'password':
                      Errors.password= regForPass.test(value)?'':'Password must be between 6 to 16 characters and must contain one number and one special character';
                      break;
                      case 'cpassword':
                        Errors.cpassword=pass.current.value===value?'':'Password do not match';
                      break; 
                
             
            
          }
          setSelect({Errors,[name]:value},()=>{
            console.log(Errors)
          })
          
        setData({...data,[name]:value})
        console.log(data)
    }
    //validate errors
    const validate=(errors)=>{
        let valid = true;
        Object.values(errors).forEach((val)=> 
            val.length>0 && (valid = false));
            return valid;
            }
  //submit registration data
    const submit=()=>{
        const saltRounds=10;
        const myPlaintextPassword=data.password;
        const salt=bcrypt.genSaltSync(saltRounds)
        const hashPass = bcrypt.hashSync(myPlaintextPassword,salt);
        data.password=hashPass;
        data.photo="profile.jpg"
        console.log(data)
        setFlag(true)
        if(validate(Errors)){
        addUser(data).then(res=>{
            if(res.data.err==1) {
                alert(res.data.message)
            }
            alert(res.data.message)
        })
      
        }
    }
    //social login
    const handleSocialLogin = (user) => {
        console.log(user); 
      
        addSocialUser({name:user.profile.name,lname:user.profile.lname,email:user.profile.email, provider: "social" ,photo:user.profile.profilePicURL}).then((res) => {
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
        <SocialButton className='btn btn-danger' style={{height:60,width:300,marginTop:'20px',marginRight:'20px'}}
                        provider="google"
                        appId="552530164250-085dqcdp3mjb18nl3nknl0u96p9mnf7c.apps.googleusercontent.com"
                        onLoginSuccess={handleSocialLogin}
                   onLoginFailure={handleSocialLoginFailure}

                    >
                       <i class="fab fa-google fa-1x"></i> Login with Google
                    </SocialButton> 
                    <SocialButton className='btn btn-primary' style={{height:60,width:300,marginTop:'20px'}}
                        provider="facebook"
                        appId="598247578289958"
                        onLoginSuccess={handleSocialLogin}
                   onLoginFailure={handleSocialLoginFailure}
                    >
                        <i class="fab fa-facebook fa-1x" ></i>  Login with Facebook
                    </SocialButton>
            <Paper elevation={10} style={paperStyle }>
            <div className="container">
        <div >
            <div className="text">
                <h3>Register To NeoSTORE</h3>
               
            </div>
            <form onSubmit={submit} >
                <div className="input-text">
             
                    <input type="text"  placeholder="Enter First Name"  name="name" 
                        onChange={handler} required />
                    <i class="fa fa-font" aria-hidden="true"></i>

                </div>
                {Errors.name.length>0 &&
                  <span style={{color:"red"}}>{Errors.name}</span>}   
                <div className="input-text">
                    <input type="text"  placeholder="Enter Last Name"  name="lname" 
                        onChange={handler} required />
                    <i class="fa fa-font" aria-hidden="true"></i>

                </div>
                {Errors.lname.length>0 &&
                  <span style={{color:"red"}}>{Errors.lname}</span>}   
                <div className="input-text">
                    <input type="text"  placeholder="Enter Email Address"  name="email"
                        onChange={handler} required />
                    <i className="fa fa-envelope"></i>
                  

                </div>
                {Errors.email.length>0 &&
                  <span style={{color:"red"}}>{Errors.email}</span>}   
                <div className="input-text">
                    <input type={password}  placeholder="Enter your password"  name="password"  ref={pass}
                        onChange={handler} required/>
                    <i className="fa fa-lock"></i>
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
                </div>
                {Errors.password.length>0 &&
                  <span style={{color:"red"}}>{Errors.password}</span>}   
                <div className="input-text">
                    <input type={passwords}  placeholder="Confirm Password"  name="cpassword" 
                        onChange={handler} required/>
                    <i className="fa fa-lock"></i>
                    <i onClick={Eyes} className={`fa ${eyes ? "fa-eye-slash" : "fa-eye" }`}></i>
                </div>
                {Errors.cpassword.length>0 &&
                  <span style={{color:"red"}}>{Errors.cpassword}</span>}   
                <div className="input-text">
                    <input type="text"  placeholder="Enter Mobile Number"  name="mobile" 
                        onChange={handler} required />
                    <i class="fa fa-phone" aria-hidden="true"></i>
          
                </div>
                {Errors.mobile.length>0 &&
                  <span style={{color:"red"}}>{Errors.mobile}</span>}   
            <div className="input-text">
            <input class="form-check-input" type="radio" name="gender" id="flexRadioDefault1"  onChange={handler} value="Female" />
                        <label class="form-check-label" for="flexRadioDefault1" value="Female" >
                            Female
                        </label>
                        <input class="form-check-input" type="radio" name="gender" id="flexRadioDefault2"onChange={handler} value="Male" />
                        <label class="form-check-label" for="flexRadioDefault2">
                            Male
                        </label>
                        <input class="form-check-input" type="radio" name="gender" id="flexRadioDefault3" onChange={handler} value="Others"/>
                        <label class="form-check-label" for="flexRadioDefault2">
                            Others
                        </label>
                
                </div>
          

                
                <div className="buttons">
                    <button type="submit">Register</button>
                    {flag? navigate('/login'):null}  
                </div>
             
              
            </form>
        </div>
    </div>

            </Paper>
          
        
            
        </div>
    )
}

export default Register
