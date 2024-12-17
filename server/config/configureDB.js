const { default: mongoose } = require("mongoose")
const db = "mongodb+srv://suriyaj2596:ZMFJhp2SYReC3Sbi@cluster0.l9f19.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const configureDB = () => {
    mongoose.connect(db).then(() => {
        console.log("connect to db")
    }).catch((err) => {
        console.log(err, "not connect to db")
    })
}
module.exports = configureDB
