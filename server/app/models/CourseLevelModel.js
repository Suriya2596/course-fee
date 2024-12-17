const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({
    fee: {
        type: String,
        enum: ['Exam Fee', 'Application Fee'],
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User is required"],
        ref: "User",
        unique: true,  
    }
}, { timestamps: true })

const Course = mongoose.model("Course", CourseSchema)

module.exports = Course