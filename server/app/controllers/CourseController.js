const { default: mongoose } = require("mongoose");
const Course = require("../models/CourseLevelModel");
const CourseController = {}

CourseController.getCoursesByUserId = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const courses = await Course.findOne({ user: userId });
        return res.status(200).json({ data : courses || {} });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

CourseController.updateCourseByUserId = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { _id: userId } = req.user;
        const { fee, nationality, course, level, amount } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: "Invalid user ID or course ID" });
        }
        const foundCourse = await Course.findOne({ _id: courseId, user: userId });
        if (!foundCourse) {
            return res.status(404).json({ message: "Course not found for this user" });
        }
        foundCourse.fee = fee || foundCourse.fee;
        foundCourse.nationality = nationality || foundCourse.nationality;
        foundCourse.course = course || foundCourse.course;
        foundCourse.level = level || foundCourse.level;
        foundCourse.amount = amount || foundCourse.amount;
        await foundCourse.save();
        return res.status(200).json({ message: 'Course updated successfully', course: foundCourse });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


module.exports = CourseController