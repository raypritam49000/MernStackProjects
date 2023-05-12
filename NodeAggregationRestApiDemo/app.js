const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
require('./database/database')
const authRoute = require('./routes/auth.routes');
const userRoute = require('./routes/user.routes');
const blogRoute = require('./routes/blog.routes');
const categoryRoute = require('./routes/category.routes');
const blogCommentRoute = require('./routes/blog_comment.routes');

global.publicPath = __dirname + '/public';
app.use((req, res, next) => {
    global.req = req;
    next();
})
app.use(express.static(__dirname + '/public'));

app.use(cors({ origin: "*" }));
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload())

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comments", blogCommentRoute);

app.all('*', (req, res) => {
    return res.status(404).json({
        isSuccess: false,
        status: "Url Not Found",
        statusCode: 404,
        message: "Not Found " + req.url
    });
})


app.listen(PORT, HOST, () => {
    console.log(`App Server are running at http://${HOST}:${PORT}`);
})