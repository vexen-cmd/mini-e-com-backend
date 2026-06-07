const express = require ("express")
const router = require("./routes/auth.routes")
const cookieParser = require("cookie-parser");
const AdminUserRouter = require("./routes/admin.user.routes")
const app = express()

app.use(express.json())
app.use(cookieParser());

app.use("/api/auth",router)
app.use("/api/",AdminUserRouter)
module.exports = app