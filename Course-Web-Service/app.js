const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const courseRoute = require('./routes/course.route');

app.use(cors({ origin: "*" }));
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/courses",courseRoute);


app.listen(PORT, HOST, () => {
    console.log(`Server are Running at http://${HOST}:${PORT}`);
})
