const Student = require('../models/student.model');
const feign = require('feignjs');
const FeignRequest = require('feignjs-request')

class StudentController {

    static createStudent = async (req, res) => {
        try {
            const newStudent = new Student({
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                city: req.body.city,
                courseId: req.body.courseId
            });

            const savedStudent = await newStudent.save(newStudent);

            return res.status(201).json(savedStudent);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    static getAllStudents = async (req, res) => {
        try {
            const students = await Student.find();
            return res.status(200).json(students);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    static getStudentById = async (req, res) => {
        try {
            const students = await Student.findById({_id: req.params.id});
            return res.status(200).json(students);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    static deleteStudentById = async (req, res) => {
        try {
            await Student.deleteOne({_id: req.params.id});
            return res.status(200).json({"status": 200, "success": true});
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    static updateStudentById = async (req, res) => {
        try {
            const student = await Student.findById({_id: req.params.id});

            if (!student) {
                return res.status(404).json({"status": 404, "success": false});
            }

            student.name = req.body.name
            student.email = req.body.email
            student.gender = req.body.gender
            student.city = req.body.city
            student.courseId = req.body.courseId

            const updateStudent = await student.save(student);

            return res.status(200).json(updateStudent);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    static getStudentCourseByCourse = async (req, res) => {
        try {
            const student = await Student.findById({_id: req.params.id});

            if (!student) {
                return res.status(404).json({"status": 404, "success": false});
            }

            const apiDescription = {
                getCourse: 'GET courses/{courseId}'
            };

            const client = feign.builder()
                .client(new FeignRequest())
                .target(apiDescription, 'http://localhost:8888/');

            const course = await client.getCourse(student.courseId);


            return res.status(200).json({...student._doc,course});
        } catch (err) {
            return res.status(500).json(err);
        }
    }


}

module.exports = StudentController;