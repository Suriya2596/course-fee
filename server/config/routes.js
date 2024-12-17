const express = require("express")
const userController = require("../app/controllers/UserController")
const feeController = require("../app/controllers/FeeController")
const { authentication } = require("../app/middleware/Authentication")
const CourseController = require("../app/controllers/CourseController")
const routes = express.Router()

routes.post("/user", userController.create)
routes.post("/login", userController.login)
routes.get("/user", authentication, userController.get)
routes.put("/user", authentication, userController.update)

routes.get("/course", authentication, CourseController.getCoursesByUserId)
routes.put("/course/:courseId", authentication, CourseController.updateCourseByUserId)

routes.post("/fee", feeController.createFee)
routes.get("/fee", feeController.listFee)
routes.get("/fee/exam", feeController.getExamFees)
routes.get("/fee/application", feeController.getApplicationFees)

module.exports = routes