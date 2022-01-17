import React, { useState, useEffect } from 'react';
import { Link, Redirect, useNavigate } from 'react-router-dom';
import { Button, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ReorderIcon from '@mui/icons-material/Reorder';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getAll, tokenAuthenticate, UpdateProfilePic } from '../config/MyService';
import jwt_decode from 'jwt-decode'
import { Card } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'
// import userIcon from '../Images/profile.jpg'
export default function Account() {
    const token = localStorage.getItem('_token')
    const [flag, setFlag] = useState(false)
    const [flag1, setFlag1] = useState(false)
    const [data, setData] = useState();
    const [photo, setPhoto] = useState();
    const [profile, setProfile] = useState();
    const navigate = useNavigate();
    const [temp, setTemp] = useState(false)
    const [newUser, setNewUser] = useState(
        {

            photo: '',
            id: ''
        }
    );
    //fetch the values from token and set profilephoto
    useEffect(() => {

        if (localStorage.getItem('_token') !== undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            setData(decode)
            getAll({ "email": decode.uid }).then(res => {
                if (res.data.err === 0) setProfile(res.data.data)
            })
            getAll().then(res => {
                if (res.data.err === 0) setPhoto(res.data.data)
            })
        }


    }, [token])

    //submit data to change profile photo
    const handleSubmit = e => {
        console.log(data.cartData)
        localStorage.removeItem('_token')
        e.preventDefault()
        let formData = new FormData()
        formData.append('photo', newUser.photo)
        formData.append('uid', data.uid)
        formData.append('id', data.id)
        formData.append('name', data.name)
        formData.append('mobile', data.mobile)
        formData.append('lname', data.lname)
        formData.append('gender', data.gender)
        formData.append('password', data.password)
        formData.append('cartData', localStorage.getItem('cartData'))
        UpdateProfilePic(formData).then(res => {
            localStorage.setItem('_token', res.data.token)
            if (res.data.err === 0) alert(res.data.message)
            else alert(res.data.message)
            setTemp(prev => !prev);
            setFlag1(false)
            navigate('/profile', { replace: true })
        })
    }
    //handler to handle event
    const handlePhoto = (e) => {
        console.log({ photo: e.target.files[0] })
        setNewUser({ ...newUser, photo: e.target.files[0] });
        console.log(newUser.photo)
    }
    if  (!localStorage.getItem('_token')){
        window.location.replace('/login')
  }
    return (
        <div>

            {

                data !== undefined &&

                <img src={data.photo} alt="userIcon" height="100px" style={{ borderRadius: "100%" }} />
            }
            
            <div>
                {

                    data !== undefined &&
                    <h4 style={{ color: '#F71E0C' }} >{data.name} {data.lname}</h4>

                }
            </div>

            {
                flag1 ?
                    <form onSubmit={handleSubmit} encType='multipart/form-data' >
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="photo"
                            onChange={handlePhoto} />

                        <div className="mb-2"><Button variant="contained" style={{ marginLeft: '10px', marginTop: '20px', width: '200px' }} fullWidth type='submit'><AccountCircleIcon /> &nbsp;Submit</Button></div>  </form> :
                    <div>        <div className="mb-2"><Button variant="contained" onClick={() => setFlag1(true)} style={{ marginLeft: '10px', marginTop: '20px', width: '200px' }} fullWidth><AccountCircleIcon /> &nbsp;Change Profile</Button></div>
                    </div>

            }
            <div className="mb-2"><Link to="/order"><Button variant="contained" style={{ marginLeft: '10px', marginTop: '20px', width: '200px' }} fullWidth><ReorderIcon /> &nbsp;Order</Button></Link></div>
            <div className="mb-2"><Link to="/profile"><Button variant="contained" style={{ marginLeft: '10px', marginTop: '20px', width: '200px' }} fullWidth><PersonIcon /> &nbsp; Profile</Button></Link></div>
            <div className="mb-2"><Link to="/address"><Button variant="contained" style={{ marginLeft: '10px', marginTop: '20px', width: '200px' }} fullWidth><MenuBookIcon /> &nbsp; Addresses</Button></Link></div>
            <div className="mb-2"><Link to="/changepassword"><Button variant="contained" style={{ marginLeft: '10px', marginTop: '20px', width: '200px' }} fullWidth><SyncAltIcon /> &nbsp; Change Password</Button></Link></div>


        </div>
    )
}
