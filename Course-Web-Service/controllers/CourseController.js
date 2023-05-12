const Course = require('../models/course.model');

class CourseController {

    static getAllCourses = async (req, res) => {
        try {
            const courses = await Course.findAll();
            return res.status(200).json(courses);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static createCourse = async (req, res) => {
        try {
            const savedCourse = await Course.create(req.body);
            return res.status(201).json(savedCourse);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static getCourseById = async (req, res) => {
        try {
            const course = await Course.findByPk(req.params.courseId);
            return res.status(200).json(course);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static deleteCourseById = async (req, res) => {
        try {
            await Course.destroy({where: {courseId: req.params.courseId}})
            return res.status(200).json({"status": 200, "success": true});
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static updateCourseById = async (req, res) => {
        try {
            const course  = await Course.update(req.body,{where: {courseId: req.params.courseId}})
            return res.status(202).json(course);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = CourseController;