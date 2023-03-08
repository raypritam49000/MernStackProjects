import mongoose from 'mongoose';
const DB_URL = process.env.DB_URL || '';

const dataConnection = () => {
    mongoose.set('debug', true);
    mongoose.set('strictQuery', false);

    mongoose.connect(DB_URL).then(() => {
        console.log("Database are Connected Successfully");
    }).catch((err) => {
        console.log(err);
    })
}

export default dataConnection;
