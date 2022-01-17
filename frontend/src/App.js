import logo from './logo.svg';
import React,{Suspense,lazy} from 'react'
import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

// import Login from './components/Login';
// import Register from './components/Register'

// import Home from './components/Home';
// import PopularProducts from './components/PopularProducts';
// import ForgotPassword from './components/ForgotPassword';
// import ChangePassword from './components/ChangePassword'
// import Profile from './components/Profile';
// import Address from './components/Address';
// import Order from './components/Order';
// import Account from './components/Account';
// import SpecificProduct from './components/SpecificProduct';


// import SelectAddress from './components/SelectAddress';
// import Preview from './components/Preview'
// import GoogleMap from './components/GoogleMap';
 
// import NavigationBar from './components/NavigationBar';
// import Footer from './components/Footer';
import Cart from './components/Cart';
import { GetAllCategories } from './components/GetAllCategories';
import PageNotFound from './components/PageNotFound';
const Home=lazy(()=>import('./components/Home'))
const Login=lazy(()=>import('./components/Login'))

// const GetAllCategories=lazy(()=>import('./components/GetAllCategories'))
const PopularProducts=lazy(()=>import('./components/PopularProducts'))
const Register=lazy(()=>import('./components/Register'))
const ForgotPassword=lazy(()=>import('./components/ForgotPassword'))
const ChangePassword=lazy(()=>import('./components/ChangePassword'))
const Profile=lazy(()=>import('./components/Profile'))
const Address=lazy(()=>import('./components/Address'))
const Order=lazy(()=>import('./components/Order'))
const Account=lazy(()=>import('./components/Account'))
 const SpecificProduct=lazy(()=>import('./components/SpecificProduct'))
// const Cart=lazy(()=>import('./components/Cart'))
const Preview=lazy(()=>import('./components/Preview'))
const SelectAddress=lazy(()=>import('./components/SelectAddress'))
const GoogleMap=lazy(()=>import('./components/GoogleMap'))
const NavigationBar=lazy(()=>import('./components/NavigationBar'))
const Footer=lazy(()=>import('./components/Footer'))
function App() {
  return (
    <div className="App">

<Suspense fallback={<div><img src='./Images/loading.gif'/></div>}>

      <BrowserRouter>
      <NavigationBar/>
    
        <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/PopularProducts" element={<PopularProducts/>} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/ChangePassword" element={<ChangePassword/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/address" element={<Address/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/preview" element={<Preview/>} />
        <Route path="/map" element={<GoogleMap/>} />
        <Route path="/selectAddress" element={<SelectAddress/>} />
        <Route path="/getAllCategories" element={<GetAllCategories/>} /> 
        <Route path="/specificProduct" element={<SpecificProduct/>} />
        <Route path="*" element={<PageNotFound/>} />

        </Routes>
      
        <Footer/>
      </BrowserRouter>
      </Suspense>
     
   
    </div>
  );
}

export default App;
