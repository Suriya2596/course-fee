const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");


const authentication = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    try {
        const tokenData = jwt.verify(token, process.env.JWT_Verify);

        if (tokenData) {

            const user = await User.findOne({ _id: tokenData._id });

            if (user) {
                req.user = user;
                next();
            } else {
                return res.status(401).json({
                    message: "User is not found",
                });
            }
        } else {
            return res.status(401).json({
                message: "Invalid Token",
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token",
            error: error.message,
        });
    }
};



module.exports = {
    authentication,
}