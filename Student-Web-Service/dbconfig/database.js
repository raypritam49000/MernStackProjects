const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/test'

mongoose.set('debug', true);
mongoose.set('strictQuery', true);

mongoose.connect(DB_URL).then(() => {
    console.log("Database are Connected Successfully");
}).catch((err) => {
    console.log(err);
})