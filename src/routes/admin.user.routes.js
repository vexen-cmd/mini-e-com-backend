const express = require("express");
const controller = require("../controllers/auth.controller");
const verify = require("../middleware/middleware");

const multer = require("multer");
const AdminUserRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

AdminUserRouter.post(
  "/admin/addProduct",
  verify("admin"),
  upload.single("image"),
  controller.addProducts,
);

AdminUserRouter.get("/", verify("user"), controller.viewProduct);

AdminUserRouter.post("/cart", verify("user"), controller.adddTocart);

AdminUserRouter.get("/cart", verify("user"), controller.getCart);
module.exports = AdminUserRouter;
