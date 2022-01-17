import React, { useState, useEffect, useRef } from 'react'
import Footer from './Footer'
import Paper from '@mui/material/Paper';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
import Account from './Account';
import { useDispatch } from 'react-redux';
import { changePassword, updatePassword } from '../config/MyService';
const paperStyle = { height: '70vh', width: 450, margin: '30px auto', paddingTop: '20px' }
const regForPass = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/);
function ChangePassword() {

    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");
    const [flag, setFlag] = useState(false)
    const [type, settype] = useState(false);
    const[eyes,seteyes]=useState(true);
    const[passwords,setpasswords]=useState("password");
    const[types,settypes]=useState(false);   
    const [data, setData] = useState();
    const [dataPass, setDataPass] = useState({
        oldPass:'',
        newPass:'',
        confirmPass:''
    })
    const[Errors,setError]=useState({
        oldPass:'',
        newPass:'',
        confirmPass:''
    })
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const [user, setUser] = useState([])
    const [values, setValues] = useState({
        password: '',
        cpassword: '',
    })

    const pass = useRef(null);
    const confirmPassword = useRef(null);

    useEffect(() => {
        dispatch({type:"cartLen"})
        if (localStorage.getItem('_token') !== undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            setData(decode)
        }
    }, [])


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    //handler to set password
    const changeIt = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'oldPass':
                console.log(value+""+data.password)
                Errors.oldPass =!bcrypt.compareSync(value, data.password) ? 'old password should match' : '';
                break;
            case 'newPass':
                Errors.newPass = regForPass.test(value) ? '' : 'Password must be between 6 to 16 characters and must contain one number and one special character';
                break;
            case 'confirmPass':
                Errors.confirmPass =dataPass.newPass != value? 'password and confirm password should match' : '';
                break;
        }
        setDataPass({ ...dataPass, [name]: value })
        console.log(dataPass)
    }
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

    //submit password
    const submitPassword = () => {
     
        if (!bcrypt.compareSync(dataPass.oldPass, data.password)){
            alert("old password not match")
        }
       else if (dataPass.newPass != dataPass.confirmPass) {
            alert("password and confirm password not match")
        }
        else if (bcrypt.compareSync(dataPass.oldPass, data.password)) {
            Swal.fire({
                icon: 'success',
            title: 'Congratulations,You have SuccessFully Change Your Password',
                text:'Try To login With New Password',
                timer:2000
               
            
              })
      
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(dataPass.newPass, salt);
            changePassword({newPass:hash,confirmPass:dataPass.confirmPass,id:data.id})
            localStorage.clear();
            navigate('/login',{replace:true})
        }
    }

    if  (!localStorage.getItem('_token')){
        window.location.replace('/login')
  }
   
    return (

        <div>
            <div className="col-12">
                <h1>My Account</h1>

            </div>
            <hr />

            <Container>
                <Row>
                    <Col sm={4}>


                        <div className="container m-1" >

                            <div className="row">
                                <Account />
                            </div>
                        </div>


                    </Col>


                    <Col sm={8} >
                        <Paper elevation={5} style={paperStyle} >
                            <div className="container">
                                <div >
                                    <div className="text">
                                        <h3>Change Password</h3>

                                    </div>
                                    <form  >

                                      
                       <div className="input-text">
                    <input type={password}  placeholder=" Old Password" onChange={changeIt} name="oldPass"  required/>
                    <i className="fa fa-lock"></i>
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
                </div>
                {Errors.oldPass.length>0 &&
                  <span style={{color:"red"}}>{Errors.oldPass}</span>}  
            
                                         <div className="input-text">
                    <input type={password}  placeholder="New Password" onChange={changeIt} name="newPass" required/>
                    <i className="fa fa-lock"></i>
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
                </div>
                {Errors.newPass.length>0 &&
                  <span style={{color:"red"}}>{Errors.newPass}</span>}  
                <div className="input-text">
                    <input type={passwords}  placeholder="Confirm Password" onChange={changeIt} name="confirmPass"  required/>
                    <i className="fa fa-lock"></i>
                    <i onClick={Eyes} className={`fa ${eyes ? "fa-eye-slash" : "fa-eye" }`}></i>
                </div>
                {Errors.confirmPass.length>0 &&
                  <span style={{color:"red"}}>{Errors.confirmPass}</span>}  
 

                            <div className="buttons" style={{marginTop:'50px'}}>
                    <button onClick={submitPassword}>Submit</button>
                </div>
            

                                    </form>
                                </div>
                            </div>
                        </Paper>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default ChangePassword
