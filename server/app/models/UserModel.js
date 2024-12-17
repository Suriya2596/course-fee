const { default: mongoose } = require("mongoose")
const { default: isEmail } = require("validator/lib/isEmail")
const { default: isNumeric } = require("validator/lib/isNumeric")
const Fee = require("./FeeModel")

const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: function (value) {
                return isEmail(value)
            },
            message: function (props) {
                return `${props?.value} Email address is invaildate`
            }
        }
    },
    mobile: {
        type: Number,
        required: [true, "Mobile is required"],
        validate: {
            validator: function (v) {
                return String(v).length === 10 && isNumeric(String(v));
            },
            message: props => `${props?.value} is not a valid 10-digit phone number!`
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        maxlength: [128, "Password is too long"],
        minlength: [8, "Password is too short"],
    },
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User