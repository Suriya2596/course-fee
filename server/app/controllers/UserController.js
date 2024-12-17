

const userController = {}
const User = require("../models/UserModel")
const { stringTrim, requiredError } = require("../../helpers/helper")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const Course = require("../models/CourseLevelModel");

userController.create = async (req, res) => {
    const body = req.body;
    try {
        // Step 1: Trim body and validate required fields
        stringTrim(body);
        requiredError({
            requiredFields: ['name', 'email', 'mobile', 'password', 'fee', 'nationality', 'course', 'level', 'amount'],
            body,
            res
        });

        // Step 2: Check for existing user
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return res.status(400).json({
                message: `User with email ${body.email} already exists`
            });
        }

        // Step 3: Hash the password
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);

        // Step 4: Create User
        const userPayload = {
            name: body.name,
            email: body.email,
            mobile: body.mobile,
            password: body.password
        };
        const createdUser = await User.create(userPayload);
        // Step 5: Create Course linked to the User
        const { fee, nationality, course, level, amount } = body;
        const newCourse = new Course({
            fee,
            nationality,
            course,
            level,
            amount,
            user: createdUser._id
        });
        const newCourseCreated = await newCourse.save();
        // // Step 6: Send response
        return res.status(201).json({
            message: "User and Course created successfully",
            data: {
                user: createdUser,
                course: newCourseCreated
            }
        });

    } catch (error) {
        console.error("Error creating user and course:", error);
        return res.status(400).json({
            message: "Error creating user or course",
            error: error.message || error
        });
    }
};

userController.login = async (req, res) => {
    const body = req.body;

    try {
        requiredError({ requiredFields: ['email', 'password'], body, res })
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            const match = await bcrypt.compare(body.password, existingUser.password);

            if (match) {
                const tokenData = {
                    _id: existingUser._id,
                    email: existingUser.email,
                    role: existingUser.role,
                };
                const token = jwt.sign(tokenData, process.env.JWT_Verify, { expiresIn: "1d" })
                if (token) {
                    return res.status(200).json({ token: `Bearer ${token}`, message: "Login successfully", });
                } else {
                    return res.status(400).json({
                        message: `Something went wronge in create token`
                    });
                }

            } else {
                return res.status(400).json({
                    message: `Incorrect password or email`
                });
            }
        } else {
            return res.status(400).json({
                message: `User with email ${body.email} not exists`
            });
        }


    } catch (err) {
        return res.status(400).json({
            message: "Can't be login, please try again",
            error: err
        });
    }
}

userController.update = async (req, res) => {
    const { _id: userId } = req.user;
    const { name, mobile, examFee, applicationFee } = req.body;

    try {
        // Step 1: Validate required fields for update
        if (!name && !mobile && !examFee && !applicationFee) {
            return res.status(400).json({
                message: "At least one field (name, mobile, examFee, applicationFee) must be provided for update."
            });
        }

        // Step 2: Fetch user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Step 3: Update name and mobile if provided
        if (name) user.name = name.trim();
        if (mobile) {
            if (String(mobile).length !== 10 || !/^[0-9]+$/.test(mobile)) {
                return res.status(400).json({
                    message: "Invalid mobile number. Must be a 10-digit number."
                });
            }
            user.mobile = mobile;
        }

        // Step 4: Save the updated user document
        const updatedUser = await user.save();

        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            message: "User update failed",
            error: error.message || error
        });
    }
};

userController.get = async (req, res) => {
    const { _id: userId } = req.user;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User successfully got",
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            message: "User update failed",
            error: error.message || error
        });
    }
};

module.exports = userController