import React, { useState, useEffect, useRef, lazy } from 'react'
import StarIcon from '@mui/icons-material/Star';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { CircularProgress, Paper } from '@mui/material';
import ReactPaginate from 'react-paginate';
import { Accordion, Button, Container, Card, Form, FormControl } from 'react-bootstrap';
import { Pagination, PaginationItem } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import '../CSS/ProductPage.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { GetProducts, addtoCart, FliterData, updateCart, FilterColor, Search } from '../config/MyService';
import { useDispatch } from 'react-redux';
import Pages from './Pages'
import Swal from 'sweetalert2'
import { Rating, Typography } from '@mui/material'

export const GetAllCategories = () => {

    const searchInput = useRef(null);
    const [set, setstate] = useState({ id: '', cartCount: 0 })
    const [postsPerPage] = useState(6);
    const [offset, setOffset] = useState(1);
    const [posts, setAllPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [products, setProducts] = useState([]);
    const [data, setData] = useState()
    const [cart, setCart] = useState({ cartData: [] })
    const [decodes, setDeocde] = useState()
    const [filter, setFilter] = useState('')
    const [flag, SetFlag] = useState()
    const dispatch = useDispatch()
    let [page, setPage] = useState(1);
    let [temp, setTemp] = useState(1);
    const [item, setItem] = useState();
    const navigate = useNavigate()

    const count = Math.ceil(products.length / postsPerPage);
    const temp_count = Math.ceil(temp.length / postsPerPage);
    const _DATA = Pages(products, postsPerPage);
    const _TEMPDATA = Pages(temp, postsPerPage);
    const handleChange = (e, p) => {
        setPage(p);
        flag ? _TEMPDATA.jump(p) : _DATA.jump(p);

    };
    //fetch the products
    const getAllPosts = async () => {
        GetProducts().then(res => {
            setProducts(res.data)
            console.log(res.data)
            const data = res.data;
            const slice = data.slice(offset - 1, offset - 1 + postsPerPage)
            console.log(slice)
            setAllPosts(slice);
            setData(res.data)
            setPageCount(Math.ceil(data.length / postsPerPage))

        })
    }

    useEffect(async () => {
        getAllPosts();
        dispatch({ type: "cartLen" })
        if (localStorage.getItem("_token") != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            setDeocde(decode.cartData)
            setCart({ cartData: decode.cartData })
            localStorage.setItem("cartData", JSON.stringify(decode.cartData))
        }
    }, [offset])

    //ascending order
    const IncreaseSorting = () => {
        products.sort((a, b) => parseFloat(a.productCost) - parseFloat(b.productCost));
        console.log(products)
        const slice = products.slice(offset - 1, offset - 1 + postsPerPage)
        setAllPosts(slice);

    }
    //descending order
    const DecreaseSorting = () => {
        products.sort((a, b) => parseFloat(b.productCost) - parseFloat(a.productCost));
        console.log(products)
        const slice = products.slice(offset - 1, offset - 1 + postsPerPage)
        setAllPosts(slice);

    }
    //rating wise sorting
    const RatingSorting = () => {
        products.sort((a, b) => parseFloat(b.productRating) - parseFloat(a.productRating));
        console.log(products)
        const slice = products.slice(offset - 1, offset - 1 + postsPerPage)
        setAllPosts(slice);

    }

    //set id for specific product
    const specificProduct = (id) => {

        setstate({
            id: id
        })
        localStorage.setItem('specificProductId', id);

    }




    //fetch all data for filtering
    const allData = () => {
        getAllPosts()
    }
    //filter sofa
    const showSofa = () => {
        FliterData({ category: "Sofa" }).then((res) => {
            setProducts(res.data)
            setData(res.data)
        })
    }

    //filter bed
    const bedData = () => {
        FliterData({ category: "Bed" }).then((res) => {
            setProducts(res.data)
            setData(res.data)
        })
    }
    //filter chair
    const chairData = () => {
        FliterData({ category: "Chair" }).then((res) => {
            setProducts(res.data)
            setData(res.data)
        })
    }
    //filter wadrobe
    const wadData = () => {
        FliterData({ category: "Wadrobe" }).then((res) => {
            setProducts(res.data)
            setData(res.data)
        })
    }

    //filter dining set
    const diningData = () => {
        FliterData({ category: "Dining set" }).then((res) => {
            setProducts(res.data)
            setData(res.data)
        })
    }
    //filter according to black color
    const blackData = () => {
        FilterColor({ colour: "Black", category: data[0].categoryId.categoryName }).then(res => setProducts(res.data))
    }
    //filter according to blue color
    const blueData = () => {
        FilterColor({ colour: "Blue", category: data[0].categoryId.categoryName }).then(res => setProducts(res.data))
    }
    //filter according to brown color
    const brownData = () => {
        FilterColor({ colour: "Brown", category: data[0].categoryId.categoryName }).then(res => setProducts(res.data))
    }
    //filter according to beige color
    const beigeData = () => {
        FilterColor({ colour: "Beige", category: data[0].categoryId.categoryName }).then(res => setProducts(res.data))
    }
    //filter according to pink color
    const pinkData = () => {
        FilterColor({ colour: "Pink", category: data[0].categoryId.categoryName }).then(res => setProducts(res.data))
    }
    //filter according to purple color
    const purpleData = () => {
        FilterColor({ colour: "Purple", category: data[0].categoryId.categoryName }).then(res => setProducts(res.data))
    }
    //filter according to white color
    const whiteData = () => {
        FilterColor({ colour: "White", category: data[0].categoryId.categoryName }).then(res => setProducts(res.data))
    }
    //filter according to grey color
    const greyData = () => {
        FilterColor({ colour: "Grey", category: data[0].categoryId.categoryName }).then(res => setProducts(res.data))
    }
    //search product
    const searchProduct = () => {
        let arr = [];
        GetProducts()
            .then(res => {
                arr = res.data;
                console.log(arr)
                let selectedproduct = arr.filter((value) => {
                    if (searchInput.current.value === "") {
                        return value
                    }
                    else if (value.productName.toLowerCase().includes(searchInput.current.value.toLowerCase())) {
                        return value
                    }
                })
                setProducts(selectedproduct)
            })
    }

    //add products in cart

    const addToCart = (pro) => {
        let proData = []
        if (localStorage.getItem("_token") != undefined) {
            let productData = {
                id: pro._id,
                productImage: pro.productImage,
                productCost: pro.productCost,
                productName: pro.productName,
                productStock: pro.productStock,
                productProducer: pro.productProducer,
                quantity: 1,

            }
            if (localStorage.getItem("cartData") != undefined) {
                let cart = JSON.parse(localStorage.getItem("cartData"));
                for (let index = 0; index < cart.length; index++) {
                    if (cart[index].id == pro._id) {
                        Toastify({
                            text: "Product is available in the Cart",
                            className: "info",
                            style: {
                                background: "#dc143c",
                            }
                        }).showToast();
                        navigate('/cart')
                        return;
                    }
                }
                console.log("hello")
                cart.push(productData)
                Toastify({
                    text: "Product is added in the Cart",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
                dispatch({ type: "addCart" })
                localStorage.setItem("cartData", JSON.stringify(cart))

            }

        }
        else {


            let productData = {
                id: pro._id,
                productImage: pro.productImage,
                productCost: pro.productCost,
                productName: pro.productName,
                productStock: pro.productStock,
                productProducer: pro.productProducer,
                quantity: 1,
            }
            proData.push(productData)
            if (localStorage.getItem("cartData") != undefined) {
                console.log("hello in if")
                let cart = JSON.parse(localStorage.getItem("cartData"));
                for (let index = 0; index < cart.length; index++) {
                    if (cart[index].id == pro._id) {
                        Toastify({
                            text: "Product is available in the Cart",
                            className: "info",
                            style: {
                                background: "#dc143c",
                            }
                        }).showToast();
                        navigate('/cart')
                        return;
                    }
                }

                console.log("hello")
                cart.push(productData)
                Toastify({
                    text: "Product is added in the Cart",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
                dispatch({ type: "addCart" })
                localStorage.setItem("cartData", JSON.stringify(cart))

            }
            else {
                console.log("hello in else")
                localStorage.setItem("cartData", JSON.stringify(proData))
                dispatch({ type: "addCart" })

            }
        }
    }



    return (
        <div>
            <div>
                <div className="row" style={{ marginLeft: "2%" }}>
                    <div className="col-lg-3">


                        <Accordion defaultActiveKey="0" style={{ marginTop: '100px' }}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header onClick={allData}>All Products</Accordion.Header>
                                <Accordion.Body>

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Categories</Accordion.Header>

                                <Accordion.Body onClick={showSofa} style={{ background: '#EAECEE' }}>Sofa</Accordion.Body>
                                <Accordion.Body onClick={bedData} style={{ background: '#EAECEE' }}>Bed</Accordion.Body>
                                <Accordion.Body onClick={chairData} style={{ background: '#EAECEE ' }}>Chair</Accordion.Body>
                                <Accordion.Body onClick={wadData} style={{ background: '#EAECEE ' }}>Wadrobe</Accordion.Body>
                                <Accordion.Body onClick={diningData} style={{ background: '#EAECEE ' }}>Dining set</Accordion.Body>


                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Color</Accordion.Header>

                                <Accordion.Body onClick={blackData} style={{ background: '#EAECEE' }}>Black</Accordion.Body>
                                <Accordion.Body onClick={blueData} style={{ background: '#EAECEE' }}>Blue</Accordion.Body>
                                <Accordion.Body onClick={brownData} style={{ background: '#EAECEE' }}>Brown</Accordion.Body>
                                <Accordion.Body onClick={purpleData} style={{ background: '#EAECEE' }}>Purple</Accordion.Body>
                                <Accordion.Body onClick={whiteData} style={{ background: '#EAECEE' }}>White</Accordion.Body>
                                <Accordion.Body onClick={beigeData} style={{ background: '#EAECEE' }}>Beige</Accordion.Body>
                                <Accordion.Body onClick={greyData} style={{ background: '#EAECEE' }}>Grey</Accordion.Body>
                                <Accordion.Body onClick={pinkData} style={{ background: '#EAECEE' }}>Pink</Accordion.Body>

                            </Accordion.Item>
                        </Accordion>

                    </div>


                    <div className="col-lg-9" style={{ marginTop: '30px' }}>
                        <h1 >Products</h1>

                        <div>
                            <div className="row mb-2" style={{ width: "100%" }}>

                                <div style={{ marginLeft: "35%" }}>Sort by
                                    <Button variant="light" style={{ width: '50px' }} onClick={RatingSorting} ><StarIcon style={{ marginLeft: '5px', color: '#1569C7' }} /></Button>
                                    <Button variant="light" style={{ width: '50px' }} onClick={IncreaseSorting}><ArrowUpwardIcon style={{ marginLeft: '5px', color: '#1569C7' }} /></Button>
                                    <Button variant="light" style={{ width: '50px' }} onClick={DecreaseSorting}><ArrowDownwardIcon style={{ marginLeft: '5px', color: '#1569C7' }} /></Button>


                                </div>



                            </div>
                            <Form style={{ marginTop: '20px', marginLeft: '600px', width: '320px', boxShadow: 'initial' }} >

                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    ref={searchInput} onChange={searchProduct}
                                />

                            </Form>

                            <Container >

                                <div className="container " >
                                    <div>
                                        <div className="row d-flex justify-content-around">
                                            {_DATA.currentData().map(ele =>
                                                <div className="col-lg-4 " key={ele._id}>
                                                    <Paper elevation={4} >
                                                        <div className="card" style={{ width: "280px", border: '1px solid grey', padding: '10px', marginTop: '10px' }}>
                                                            <div onClick={(id) => specificProduct(ele._id)} > <Link to="/specificproduct">
                                                                <LazyLoadImage className="mx-auto" effect="blur" src={ele.productImage} height="150px" width="200px" alt="..." /></Link></div>
                                                            <div className="card-body">
                                                                <h3 className="card-title " style={{ fontSize: '15px' }}>{ele.productName}</h3>

                                                                <span style={{ fontSize: '20px', color: 'green', fontWeight: '600' }}>Price : Rs.{ele.productCost}</span><br />
                                                                <Button variant='danger' onClick={() => addToCart(ele)} >Add To Cart</Button>
                                                                <Rating
                                                                    name="simple-controlled"
                                                                    value={ele.productRating}
                                                                    readOnly
                                                                    precision={0.5}

                                                                />

                                                            </div>
                                                        </div>
                                                    </Paper>
                                                </div>
                                            )
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '20px' }}>


                                </div>
                                <Pagination
                                    className='align-self-center'
                                    // style={{margin:"auto"}}
                                    count={flag ? temp_count : count}
                                    size="large"
                                    page={page}
                                    style={{ marginLeft: '315px', fontSize: '35px', fontWeight: '600' }}
                                    variant="contained"
                                    //  shape="rounded"
                                    onChange={handleChange}
                                    renderItem={(item) => (
                                        <PaginationItem
                                            components={{ previous: ArrowCircleLeftIcon, next: ArrowCircleRightIcon }}
                                            {...item}
                                        />
                                    )}
                                />

                            </Container>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
