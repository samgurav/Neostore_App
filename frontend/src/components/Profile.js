import React, { useState, useEffect,useRef } from 'react'
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Account from './Account';
import jwtDecode from 'jwt-decode';
import {Button} from 'react-bootstrap'
import { Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { EditProfileData } from '../config/MyService';


const paperStyle = { height: '100vh', width: 600, margin: '30px auto', paddingTop: '10px' }

function Profile() {
    const [data, setData] = useState()
    const [flag,setFlag]=useState(false)
    const navigate=useNavigate()
    const [temp,setTemp]=useState(false)
    const dispatch=useDispatch()
    const [edit, setEditData] = useState({
        name: '',
        lname: '',
        email:'',
        mobile:'',
        gender:''
    })
    const [values, setValues] = useState({
        name: '',
        lname: '',
        email:'',
        mobile:'',
        gender:''
    })
    const email=useRef(null);
    const fname=useRef(null);
    const lname=useRef(null);
    const mobile=useRef(null);
    const gender=useRef(null);
    useEffect(() => {
        dispatch({type:"cartLen"})
        if (localStorage.getItem('_token') !== undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwtDecode(token);
            console.log(decode)
            setData(decode)
            if(localStorage.getItem('cartData')==undefined){
                localStorage.setItem('cartData',JSON.stringify(decode.cartData))
            }
        }
      
    }, [])
    //handler to handle edit data
    const handleData = (event) => {
        edit.name=fname.current.value;
        edit.lname=lname.current.value;
        edit.email=email.current.value;
        edit.mobile=mobile.current.value;
        edit.gender=gender.current.value;
        const { name, value } = event.target;
        setEditData({ ...edit, [name]: value })
        console.log(edit)
    }

//submit edited data
    const EditData=(e)=>{
        e.preventDefault();
        if(fname.current.value==data.name && lname.current.value==data.lname &&email.current.value==data.uid && mobile.current.value==data.mobile
           && gender.current.value==data.gender ){
       alert("Oops ! you have not updated anything !");
     
       }
       else{
           localStorage.removeItem('_token')
           EditProfileData({name:edit.name,lname:edit.lname,uid:edit.email,mobile:edit.mobile,gender:edit.gender,id:data.id,cartData:data.cartData}).then(res=>{
               localStorage.setItem('_token',res.data.token)
           alert(res.data.message)
          setFlag(false)
         window.location.reload();
          setTemp(prev=>!prev);
       })
   }
       }

       if  (!localStorage.getItem('_token')){
             window.location.replace('/login')
       }
    return (
     
        <div>
            
            <div>
                <div className="col-12">
                    <h1>My Account</h1>
                </div>
                <hr />
                {flag ? <>
                  
                    <div className="container m-4">
                <div className="row">
                    <div className="col-6 text-center">
                     <Account/>
                    </div>
                    <div className="col-6">
                    <Paper elevation={5} style={paperStyle} >
                      
                        
                            <div className="container">
                                <div >
                                    <div className="text">
                                        <h3>Edit Profile</h3>

                                    </div>
                                    <form  >

                               {
                                   (data!=undefined &&  
                                    <div>
                       <div className="input-text">
                       
                    <input type='text'  placeholder=" Enter Name" defaultValue={data.name}  onChange={handleData}   name="name" ref={fname} required/>
                    <i className="fa fa-lock"></i>
                 
                </div>
                <div className="input-text">
                       
                       <input type='text'  placeholder=" Enter Last Name" defaultValue={data.lname} ref={lname}   onChange={handleData}      name="lname" required/>
                       <i className="fa fa-lock"></i>
                    
                   </div>
              
                                         <div className="input-text">
                    <input type='text' placeholder="Enter Email"  name="email" defaultValue={data.uid}  ref={email}  onChange={handleData}    required/>
                    <i className="fa fa-lock"></i>
                   
                </div>
                <div className="input-text">
                    <input type='text'  placeholder="Enter Gender"  name="mobile" defaultValue={data.mobile} ref={mobile}  onChange={handleData}    required/>
                    <i className="fa fa-lock"></i>
                  
                </div>
                <div className="input-text">
                    <input type='text'  placeholder="Enter Phone Number"  name="gender" defaultValue={data.gender} 
                     ref={gender} onChange={handleData}   required/>
                    <i className="fa fa-lock"></i>
                  
                </div>
             
                </div>
                                   )} 
 

                       <div className="buttons" style={{marginTop:'50px'}}>
                    <button onClick={EditData}>Submit</button>
                </div>
              
                <div className="mb-2"><Button variant="outline-light"  onClick={()=> setFlag(false)}   fullWidth>&nbsp;Cancel</Button></div>
         
            

                                    </form>
                                </div>
                            </div>
                        </Paper>

                    </div>
                </div>
            </div>
                                 
                                   </>
                               :<div>
                <div className="container m-4">
                    <div className="row">
                        <div className="col-6 text-center">
                            <Account />
                        </div>
                        <div className="col-6">
                            <div className="container card" style={{ marginTop: '40px' }}>
                                <div className="col-12">
                                    <h2 className="mb-5">Profile</h2>
                                    <hr />
                               
                                    <div className="row mb-4 mt-5">
                                        <div className="col-4 mt-4 mb-4">
                                            <p className="font-weight-bolder">First Name</p>
                                            <p className="font-weight-bolder">Last Name</p>
                                            <p className="font-weight-bolder">Email</p>
                                            <p className="font-weight-bolder">Gender</p>

                                            <p className="font-weight-bolder">Mobile Number</p>

                                        </div>
                                        <div className='col-2'></div>
                                        <div className="col-6 mt-4 mb-4">
                                            {
                                                data!=undefined &&
                                                <>
                                                <p>{data.name}</p>
                                                <p>{data.lname}</p>
                                                <p>{data.uid}</p> 
                                               <p>{data.gender}</p>
                                               <p>{data.mobile}</p>
                                               </>
                                            }
                                          
                                            <hr />
                                            <Button  className="btn" onClick={()=> setFlag(true)} ><EditIcon />&nbsp;Edit</Button>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                </div>
}

            </div>
        </div>
    )
}

export default Profile
