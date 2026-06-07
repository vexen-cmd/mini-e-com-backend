const cookieParser = require("cookie-parser");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const productModel = require("../models/product.model");
const uploadFile = require("../services/image.services");
const cartModel = require("../models/cart.model");

require("dotenv").config();

async function registerUser(req, res) {
  const { userName, email, password, role } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    userName,
    email,
    password: passwordHash,
    role,
  });

  const id = user._id;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({ token });
}

async function loginUser(req, res) {
  const { userName, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    return res.status(401).json({ message: "not a valid lala" });
  }

  const IsPasswordValid = await bcrypt.compare(password, user.password);

  if (!IsPasswordValid) {
    return res.status(401).json({ message: "not a valid lala" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({ message: "logged in successfully", user });
}

async function addProducts(req, res) {
  const file = req.file;

  const {productName,productPrice} = req.body

  const id = req.user.id;

  const productImg = await uploadFile(file.buffer.toString("base64"));

  const product = await productModel.create({
    productUrl:productImg.url,
    productPrice,
    productName,
    admin: id,
  });

  res.send(product);
}

async function viewProduct(req,res) {

  const product = await productModel.find()

  res.send(product)

}
async function adddTocart(req, res) {
  const { productName } = req.body;
  const userId = req.user.id;

  const cart = await cartModel.findOneAndUpdate(
    { user: userId },
    {
      $addToSet: { productName }
    },
    {
      upsert: true,
      returnDocument: "after"
    }
  );

  res.send(cart);
}

async function getCart(req,res) {

const id = req.user.id

const cart = await cartModel.findOne({user:id}).populate("productName")

res.send(cart)
} 

module.exports = { registerUser, loginUser, addProducts,viewProduct , adddTocart , getCart};
