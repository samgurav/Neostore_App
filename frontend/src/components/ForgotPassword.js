import React,{useEffect, useRef,useState} from 'react'
import Footer from './Footer'
import NavigationBar from './NavigationBar'
import { Paper } from '@mui/material'
import Swal from 'sweetalert2'
import {  getPosts, otpSend, updatePassword } from '../config/MyService';
import bcrypt from 'bcryptjs'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
const paperStyle={height:'100vh', width:400, margin:'30px auto',paddingTop:'20px'}
function ForgotPassword() {
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
        showConfirmPassword:false
    });
    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");
    const [type, settype] = useState(false);
    const[eyes,seteyes]=useState(true);
    const[passwords,setpasswords]=useState("password");
    const[types,settypes]=useState(false);   
    const[flag,setFlag]=useState(0);
    const[otp,setOtp]=useState(0);
    const email=useRef(null);
    const code=useRef(null);
    const pass=useRef(null);
    const cPass=useRef(null);
    const navigate=useNavigate()
    const dispatch=useDispatch()
     useEffect(()=>{
        dispatch({type:"cartLen"})
     },[])
    //handler to handle the values
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
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
    const Eyes = () => {
        if (passwords == "password") {
            setpasswords("text");
            seteyes(false);
            settypes(true);
        }
        else {
            setpasswords("password");
            seteyes(true);
            settypes(false);
        }
    }
  
    //send otp 
    const sendOtp=(e)=>{
        e.preventDefault()
        const otp=Math.floor(100000 + Math.random() * 900000)
        otpSend({otp:otp,email:email.current.value}).then(res=>{
            console.log(res.data)
            if(res.data.err==1){
             
                Swal.fire({
                    icon: 'warning',
                title: 'Oops,SomeThing Went Wrong!!',
                    text:res.data.message,
                
                  })
            }
            else{
                setFlag(1)
                setOtp(res.data.otp)
               localStorage.setItem("id",res.data.id)
               Toastify({
                text: res.data.message,
                className: "info",
                style: {
                  background: "green",
                }
              }).showToast();
                console.log(res.data.otp)

            }
        })  
    }

    //recover the password
    const submitPassword=(e)=>{
        e.preventDefault();
        setFlag(1)
        const saltRounds = 10;
        const myPlaintextPassword = pass.current.value;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(myPlaintextPassword, salt);
        pass.current.value = hash;
        if(otp==code.current.value){
            Swal.fire({
            icon: 'success',
            title: 'Congratulations,You have SuccessFully Recover Your Account',
                text:'Try To login With New Password',
                timer:1000
            
              })
              navigate('/login')
              
            updatePassword({password:pass.current.value,cpassword:cPass.current.value,id:localStorage.getItem("id")}).then(res=>{
            
            })
        }
    
    }
    return (
        <div>
           
            <Paper elevation={5} style={paperStyle}>
    <div className="container">
        <div >
            <div className="text">
                <h3>Forgot Password</h3>
               
            </div>
            <form onSubmit={sendOtp} >
                <div className="input-text">
                    <input type="text" name="email" placeholder="Enter Valid email"  ref={email}   required />
                    <i className="fa fa-envelope"></i>

                </div>
             
                <div className="buttons" style={{marginTop:'50px'}}>
                    <button type='submit' >Send Email</button>
                </div>
             
              
            </form>
            {/* {
    flag==1&& */}
    <form onSubmit={submitPassword} >
         <div className="input-text">
                    <input type='text'  placeholder="Verification Code" className='py-2' ref={code}  required/>
                    <i className="fa fa-lock"></i>
                   
                </div>
   <div className="input-text">
                    <input type={password}  name="password" placeholder="Enter password" ref={pass} onChange={handleChange('password')}  required/>
                    <i className="fa fa-lock"></i>
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
                </div>
                <div className="input-text">
                    <input type={passwords}  name="cpassword" placeholder="Enter confirm password"  ref={cPass} onChange={handleChange('confirm')}  required/>
                    <i className="fa fa-lock"></i>
                    <i onClick={Eyes} className={`fa ${eyes ? "fa-eye-slash" : "fa-eye" }`}></i>
                </div>
 
    <div className="buttons" style={{marginTop:'50px'}}>
        <button  type='submit'>Submit</button>
    </div>
 
  
</form>

        </div>
    </div>
    </Paper>
       
            
        </div>
    )
}

export default ForgotPassword
