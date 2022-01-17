import React,{useState,useEffect} from 'react'
import {Rating,Typography} from '@mui/material'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { GetProducts,addtoCart, FliterData, updateCart } from '../config/MyService';
import { useDispatch } from 'react-redux';
import {Button} from 'react-bootstrap'
import Pages from './Pages'
function PopularProducts() {
    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(1);
    const [postsPerPage] = useState(8);
    const [data, setData] = useState()
    const [cart, setCart] = useState({ cartData: [] })
    const [decodes, setDeocde] = useState()
    const [flag,SetFlag]=useState()
    const dispatch=useDispatch()
    const [posts, setAllPosts] = useState([]);
    let [page, setPage] = useState(1);
    let [temp, setTemp] = useState(1);
    const[set,setstate]=useState({id:'',cartCount:0})
    const count = Math.ceil(products.length / postsPerPage);
    const temp_count = Math.ceil(temp.length / postsPerPage);
    const _DATA = Pages(products, postsPerPage);
    const _TEMPDATA = Pages(temp, postsPerPage);
    const handleChange = (e, p) => {
        setPage(p);
        flag ? _TEMPDATA.jump(p) : _DATA.jump(p);

    };
    const getAllPosts = async () => {
        GetProducts().then(res => {
          setProducts(res.data)
          console.log(res.data)
          const data = res.data;
          setData(res.data)
          products.sort((a, b) => parseFloat(b.productRating) - parseFloat(a.productRating));
          console.log(products)
          const slice = products.slice(offset - 1, offset - 1 + postsPerPage)
          setAllPosts(slice);
  

        })
    }
 
     useEffect(async () => {
        getAllPosts();
      
        if (localStorage.getItem("_token") != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            setDeocde(decode.cartData)
            setCart({cartData:decode.cartData})
            localStorage.setItem("cartData", JSON.stringify(decode.cartData))
        }
     }, [offset])
     const specificProduct = (id) => {

        setstate({
            id: id
        })
        localStorage.setItem('specificProductId', id);

    }

    return (
        <div>
            <div className="container-fluid" >
                <h4 className="text-center">Popular Products</h4>
                <div className="text-center">
                    <Link to="/getAllCategories" className="btn">View All</Link>
                </div>
                <br />

                <div className="row"  style={{marginLeft:'5px'}}>

              
              
                { products.sort((a, b) => parseFloat(b.productRating) - parseFloat(a.productRating)) && _DATA.currentData().map(ele=>
           <div className="col-lg-3 "key={ele._id}>
                
               <div className="card" style={{width:"280px",border:'1px solid grey',padding:'10px',marginTop:'10px'}}>
               <div onClick={(id) => specificProduct(ele._id)} > <Link to="/specificproduct">
               <img className="mx-auto" src={ele.productImage} height="150px" width="200px" alt="..."/></Link></div>
               <div className="card-body">
             <h3 className="card-title " style={{fontSize:'15px'}}>{ele.productName}</h3>
               
                 <span style={{fontSize:'20px',color:'green',fontWeight:'600'}}>Price : Rs.{ele.productCost}</span><br/>
                
                 <Rating
                            name="simple-controlled"
                            value={ele.productRating}
                            readOnly
                            precision={0.5}
                           
                            />
                
               </div>
             </div>
           
             </div>
           )
           }


                </div>
            </div>
        </div>
    )
}

export default PopularProducts
