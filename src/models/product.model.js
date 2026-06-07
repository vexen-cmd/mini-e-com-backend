const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    productUrl:{
        type:String,
        required:true
    },

    productName:{
        type:String,
        required:true
    },

    productPrice:{
        type:String,
        required:true
    },

    admin:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user",
        required:true
    }

})

const productModel = mongoose.model("product",productSchema)

module.exports = productModel