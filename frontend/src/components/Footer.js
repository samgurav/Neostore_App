import React from 'react'
import '../CSS/footer.css'
import { Button, Nav } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

function Footer() {

  const subscribe=()=>{
    Swal.fire("Thank You!", "You Have subscribe!", "success");
  }
    return (
        <div>
            <div class="mt-5 pt-5 pb-5 footer" >
<div class="container">
  <div class="row">
    <div class="col-lg-5 col-xs-12 about-company">
      <h3>About Company</h3>
      <p class="pr-4 text-white-50">Neosoft TechNology is here for your Easy and quick service for shopping.<br/>Contact Information:<br/>Email: contact@neosofttech.com<br/>Phone:01244858930<br/>MUMBAI INDIA  </p>
    
     </div>
    <div class="col-lg-3 col-xs-12 links">
      <h3 class="mt-lg-0 mt-sm-3">Information</h3>
        <ul class="m-0 p-0">
          <li>- <a href="../Images/SodaPDF-converted-terms_conditions.pdf" target="_blank">Terms and Conditions</a></li>
         
        </ul>
        <p class="pr-5 text-white-50">Gaurentee and return policy<br/>Contact Us <br/>Privacy policy<br/><Link to='/map' style={{color:'white'}} target="_blank" >Locate Us</Link> </p>
        
    </div>

    <div class="col-lg-4 col-xs-12">
          <h5 class="text-uppercase mb-4">Sign up to our newsletter</h5>

          <div class="form-outline form-white mb-4">
          <p  class="pr-5 text-white-50">SignUp to get More Exclusive Offer for our Favourite Brand</p>
            <input type="email" id="form5Example2" class="form-control"  placeholder='Enter Email Address' required />
          
          </div>
          <Button variant="light" type="submit" onClick={subscribe}>Subscribe</Button>
        
        </div>
 
  </div>
  <div class="row mt-5">
    <div class="col copyright">
      <p class=""><small class="text-white-50">© CopyRight 2022-Neosoft Technologies. All Rights Reserved. | Designed By: Samiksha Gurav</small></p>
    </div>
  </div>
</div>
</div>

        </div>
    )
}

export default Footer;