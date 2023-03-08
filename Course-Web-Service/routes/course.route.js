const express = require('express');
const route = express.Router();
const CourseController = require("../controllers/CourseController.js");

route.get("/",CourseController.getAllCourses);
route.get("/:courseId",CourseController.getCourseById);
route.post("/",CourseController.createCourse);
route.delete("/:courseId",CourseController.deleteCourseById);
route.put("/:courseId",CourseController.updateCourseById);


module.exports = route;