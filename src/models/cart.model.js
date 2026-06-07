const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    productName: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
}],


    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

const cartModel = mongoose.model("cart",cartSchema)

module.exports = cartModel