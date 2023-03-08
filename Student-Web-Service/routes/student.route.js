const express = require('express');
const route = express.Router();
const StudentController = require('../controllers/StudentController');

route.post('/',StudentController.createStudent);
route.get('/',StudentController.getAllStudents);
route.get('/:id',StudentController.getStudentById);
route.delete('/:id',StudentController.deleteStudentById);
route.put('/:id',StudentController.updateStudentById);
route.get('/getStudentCourse/:id',StudentController.getStudentCourseByCourse);


module.exports = route;
