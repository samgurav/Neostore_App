const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
    productName: { type: String, required: true },
    productImage: { type: String , required: true },
    productDescrip: { type: String, required: true},
    productRating: { type: Number, },
    productProducer: { type: String, required: true },
    productCost: { type: Number, required: true },
    productStock: { type: Number, required: true },
    productDimension: { type: Number, required: true },
    productMaterial: { type: String, required: true },
    colorId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'color',
        default:null
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category',
        default:null
    },
    created_at:{
        type:Date,
        default:Date.now
      },
    subImages:[

    ],
    RatingArray:{
        type:Array,
      
    }   
});

module.exports = mongoose.model("product", productModel);