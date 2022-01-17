
import axios from 'axios';
import { MAIN_URL } from './Url';

const token = localStorage.getItem('_token')

export function getPosts(data){
    return axios.post(`${MAIN_URL}posts/getuser`,data);
}
export function getAll(){
    return axios.get(`${MAIN_URL}posts/getall`);
}
export function addUser(data){
    return axios.post(`${MAIN_URL}posts/addpost`,data);
}
export function loginuser(data){
    return axios.post(`${MAIN_URL}/login`,data)
}
export function otpSend(data){
    return axios.post(`${MAIN_URL}posts/otpsend`,data)
}
export function updatePassword(data){
    return axios.post(`${MAIN_URL}posts/updatepass`,data)
}
export function changePassword(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/ChangePassword`,data)
    
}
export function EditProfileData(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/editprofile`,data)
    
}
export function UpdateProfilePic(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/updateprofilephoto`,data)
}



export function addSocialUser(data){
    console.log("im add")
    return axios.post(`${MAIN_URL}posts/socialuser`,data);
}
export function FindSocialUser(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/findsocialuser`,data)
}

export function checksocial(data){
    console.log("im add")
    return axios.post(`${MAIN_URL}posts/checksocial`,data);
}
export function tokenAuthenticate(){
    return axios.get(`${MAIN_URL}posts/checktoken`,{headers:{"Authorization":`Bearer ${token}`}})
}
export function GetProducts(){

    return axios.get(`${MAIN_URL}posts/getproducts`);
}


export function AddAddress(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/addaddress`,data)
}
export function getAddress(data){
    console.log(data)
return axios.post(`${MAIN_URL}posts/getaddress`,data)
}
export function DeleteAddress(data){
    console.log(data)
return axios.post(`${MAIN_URL}posts/deleteaddress`,data)
}
export function UpdateAddress(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/updateaddress`,data)
    
}
export function UpdateSelectedAddress(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/updateselectedaddress`,data)
    
}
export function updateProductRating(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/giverating`,data)
    
}
export function FliterData(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/filterdata`,data);
}
export function Search(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/search`,data);
}
export function FilterColor(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/filtercolor`,data);
}
export function addtoCart(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/addtocart`,data)
}
export function updateCart(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/updatecart`,data)
}

export function orderData(data){
    console.log(data)
    return axios.post(`${MAIN_URL}posts/orderdata`,data)
}
export function getOrder(){
    return axios.get(`${MAIN_URL}posts/getorder`);
}

export function email(data){
    return axios.post(`${MAIN_URL}posts/email`,data,{
        headers:{
            'Content-Type':"multipart/form-data"
        }
    }) 
}


