import React, { useEffect, useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import { Rating, Paper, ratingClasses } from '@mui/material';
import { Tabs, Tab } from 'react-bootstrap'
import ShareIcon from '@mui/icons-material/Share';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Box } from '@mui/material';
import Swal from 'sweetalert2'
import { WhatsappShareButton, WhatsappIcon, FacebookMessengerShareButton, FacebookIcon, EmailShareButton, EmailIcon, TwitterShareButton, TwitterIcon } from 'react-share'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { GetProducts, addtoCart, FliterData, updateProductRating } from '../config/MyService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
const url = 'http://localhost:3000/specificproduct'
let proData = []
function SpecificProduct() {
    const [set, setstate] = useState({ id: '', cartCount: 0 })
    const [modalShow, setModalShow] = React.useState(false);
    const [specificProduct, setSpecificProduct] = useState([]);
    const [image, setImage] = useState()
    const navigate = useNavigate();
    const [value, setValue] = React.useState(2);

    const [lgShow, setLgShow] = useState(false);
    const [cart, setCart] = useState()
    const [color, SetColor] = useState()
    const [rating, SetRating] = useState()
    const dispatch = useDispatch()

    //fetch all products
    useEffect(() => {
        dispatch({ type: "cartLen" })
        GetProducts().then(res => {
            const result = res.data
            const specificData = result.filter(result => result._id == localStorage.getItem("specificProductId"))
            setSpecificProduct(specificData[0])
            console.log(specificData)
            setImage(specificData[0].productImage)
            SetRating(specificProduct.RatingArray)

        })
    }, [])
    //set image to display
    const imageSet = (img) => {
        setImage(img)
    }


    //rating handler
    const handleRatingSubmit = async (e) => {
        e.preventDefault();
        var total = 0;
        var count = 0;
        var ave = 0;
        console.log(rating)
        // rating.forEach(function(item, index) {
        //     total += item;

        // });


        // console.log(ave= total / rating.length)
        updateProductRating({ productratingvalue: value, id: localStorage.getItem('specificProductId'), productRating: specificProduct.RatingArray }).then(res => {
            alert(res.data.message)
            navigate('/getAllCategories')

        })

    };
    //add to cart
    const addToCart = () => {
        let proData = []
        if (localStorage.getItem("_token") != undefined) {
            let productData = {
                id: specificProduct._id,
                productImage: specificProduct.productImage,
                productCost: specificProduct.productCost,
                productName: specificProduct.productName,
                productStock: specificProduct.productStock,
                productProducer: specificProduct.productProducer,
                quantity: 1,

            }
            if (localStorage.getItem("cartData") != undefined) {
                let cart = JSON.parse(localStorage.getItem("cartData"));
                for (let index = 0; index < cart.length; index++) {
                    if (cart[index].id == specificProduct._id) {
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
                id: specificProduct._id,
                productImage: specificProduct.productImage,
                productCost: specificProduct.productCost,
                productName: specificProduct.productName,
                productStock: specificProduct.productStock,
                productProducer: specificProduct.productProducer,
                quantity: 1,
            }
            proData.push(productData)
            if (localStorage.getItem("cartData") != undefined) {
                let cart = JSON.parse(localStorage.getItem("cartData"));
                for (let index = 0; index < cart.length; index++) {
                    if (cart[index].id == specificProduct._id) {
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
                localStorage.setItem("cartData", JSON.stringify(proData))
                dispatch({ type: "addCart" })


            }
        }
    }
  

    //modal for popup window
    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    {specificProduct !== undefined &&
                        <Modal.Title id="contained-modal-title-vcenter">
                            {specificProduct.productName}
                        </Modal.Title>
                    }
                    <Row>
                        <Col xs={12} md={8} >
                            <div>


                                <div className="container " >
                                    <div>
                                        <div className="row d-flex justify-content-around">
                                            {specificProduct.subImages != undefined &&
                                                specificProduct.subImages.map(imgs =>
                                                    <div className="col-lg-4 " key={imgs.id}>

                                                        <div>
                                                            <img alt="sofa" onClick={() => imageSet(imgs)} src={imgs} style={{ width: "100px", height: "100px", margin: '10px' }} />


                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </Col>
                        <Col xs={6} md={4}>
                            <div className="d-flex justify-content-around pt-2 pb-2">
                                <div>

                                    <img alt="sofa" src={image} style={{ width: "200px", height: "200px", margin: '10px' }} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div>

            <div className="container mt-5 mb-5">
                <Paper elevation={12}>
                    <div className="container" style={{ padding: '20px' }}>
                        <div className="row">
                            <div className="col-6 text-left card">

                                <div onClick={() => setModalShow(true)} >
                                    <ReactImageMagnify

                                        {...{
                                            smallImage: {

                                                alt: "product",
                                                src: image,
                                                width: 300,
                                                height: 300
                                            },
                                            largeImage: {
                                                src: image,
                                                width: 800,
                                                height: 1000,
                                            },
                                        }}
                                    /></div>

                                <MyVerticallyCenteredModal

                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                                <div className="d-flex justify-content-around pt-2 pb-2">
                                    <div>
                                        {specificProduct.subImages != undefined &&
                                            specificProduct.subImages.map(imgs =>
                                                <img alt="sofa" onClick={() => imageSet(imgs)} src={imgs} style={{ width: "100px", height: "100px", margin: '10px' }}
                                                />
                                            )
                                        }

                                    </div>

                                </div>
                            </div>
                            <div className="col-6 card" style={{ paddingTop: '20px' }}>
                                <h3 style={{ fontStyle: 'italic' }}> {specificProduct.productName}</h3>
                                <div>
                                    <Rating
                                        name="simple-controlled"
                                        value={parseInt(specificProduct.productRating)}
                                    // precision={0.5}

                                    />
                                </div>
                                <hr />

                                <h6 style={{ color: 'green', fontSize: '25px' }}>Price :-Rs.{specificProduct.productCost} </h6>
                                <h6 style={{ color: 'black', fontSize: '15px' }}>Material :-{specificProduct.productMaterial} </h6>

                                <h5 className="mt-3">Share&nbsp; <ShareIcon style={{ fontSize: '32px', color: 'black', borderRadius: '50%', margin: '5px' }} /></h5>
                                <div>
                                    <FacebookMessengerShareButton
                                        url={url} appId="598247578289958"
                                        quote={'Welcome to Neostore, Please find the below link to get exciting offer upto 50% and check this product' + specificProduct.productName + "at Rs. " + specificProduct.productCost}><FacebookIcon size={32} round={true} />
                                    </FacebookMessengerShareButton>    &nbsp;
                                    <EmailShareButton
                                        url={url}
                                        subject={'Neostore Offeres'}
                                        body={'Welcome to Neostore, Please find the below link to get exciting offer upto 50% and check this product' + specificProduct.productName + "at Rs. " + specificProduct.productCost}>
                                        <EmailIcon size={32} round={true} />&nbsp;</EmailShareButton>
                                    <WhatsappShareButton
                                        url={url}
                                        title={"Welcome to Neostore, Please find the below link to get exciting offer upto 50% and check this product " + specificProduct.productName + "at Rs. " + specificProduct.productCost}
                                        hashtag="#react"
                                    ><WhatsappIcon size={32} round={true} />
                                    </WhatsappShareButton>&nbsp;
                                    <TwitterShareButton url={url}
                                        title={"Checkout NeoStore offers " + specificProduct.productName + "at Rs. " + specificProduct.productCost} hashtag='#neostore'>
                                        <TwitterIcon size={32} round={true} />&nbsp;</TwitterShareButton>
                                    <InstagramIcon style={{ fontSize: '32px', color: '#b30086', borderRadius: '50%', margin: '5px' }} />&nbsp;

                                </div>




                                <div className="row mt-3" >
                                    <div className="col-6" ><button className="btn btn-danger" onClick={addToCart}  >ADD TO CART</button></div>

                                    <div className="col-6">
                                        <button
                                            className="btn btn-warning m-1"

                                            data-toggle="modal"
                                            data-target="#myModal"
                                            onClick={() => setLgShow(true)}

                                        >
                                            GIVE RATING
                                        </button>
                                    </div>
                                </div>
                                <Modal
                                    size="lg"
                                    show={lgShow}
                                    onHide={() => setLgShow(false)}
                                    aria-labelledby="example-modal-sizes-title-lg"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-modal-sizes-title-lg">
                                            Rating
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <Box component="fieldset" mb={3}>
                                            {/* <Rating name="read-only" readOnly onChange={this.handleRating} /> */}
                                            <Rating
                                                name="rating"
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                            />

                                        </Box>
                                        <div className="modal-footer text-center">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={handleRatingSubmit}
                                                data-dismiss="modal"
                                            >
                                                Give Rating
                                            </button>
                                        </div>
                                    </Modal.Body>
                                </Modal>

                            </div>
                        </div>
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="home" title="Description">
                                <p style={{ fontSize: '13px' }}><b>{specificProduct.productDescrip}</b></p>
                            </Tab>
                            <Tab eventKey="profile" title="Feature">

                                <p style={{ textAlign: 'left', fontSize: '20px' }}>  Product Material : {specificProduct.productMaterial}</p>

                                <p style={{ textAlign: 'left' }}> Product Rating : {specificProduct.productRating}</p>
                                <p style={{ textAlign: 'left' }}> Product Producer :{specificProduct.productProducer}</p>
                                <p style={{ textAlign: 'left' }}>  Product stock :{specificProduct.productStock}</p>

                            </Tab>

                        </Tabs>


                    </div>
                </Paper>



            </div>
        </div>
    )
}

export default SpecificProduct
