const express = require('express');
const app = express();
const feign = require('feignjs');
const FeignRequest = require('feignjs-request')
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
require('./dbconfig/database');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const studentRoute = require("./routes/student.route");


app.use(cors({ origin: "*" }));
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/students",studentRoute);


const apiDescription = {
    getUsers: 'GET /users',
    getUser: 'GET /users/{id}',
    createPost: 'POST /posts',
    modifyPost: 'PUT /posts/{id}',
};

const client = feign.builder()
    .client(new FeignRequest())
    .target(apiDescription, 'http://jsonplaceholder.typicode.com');


client.modifyPost(1, {content: 'new text'}).then(console.log);

client.getUsers().then(users => console.log(users));

client.getUser(10).then(user => console.log("user", user));


app.listen(PORT, HOST, () => {
    console.log(`Server are Running at http://${HOST}:${PORT}`);
})
