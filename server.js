const app = require ("./src/app")
const connectDb = require("./src/database/db")

connectDb()

app.listen(3000,()=>{
    console.log("server lala bhag rhe h")
})