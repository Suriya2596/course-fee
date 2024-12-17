const express = require("express")
const cors = require("cors")

const configureDB = require("./config/configureDB")
const routes = require("./config/routes")
require('dotenv').config()
const app = express()
const PORT  = 3088
configureDB()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api",routes)

app.listen(PORT,()=>{
    console.log("Port is running on",PORT)
})