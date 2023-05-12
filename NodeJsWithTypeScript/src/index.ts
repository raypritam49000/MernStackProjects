import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app: Application = express();
const PORT: string = process.env.PORT || '3000';
const HOST: string = process.env.HOST || 'localhost'
import dataConnection from '../src/database/db';
import userRoutes from './routes/User.Routes';
import logger from 'morgan';
import cors from 'cors';

dataConnection();

app.use(cors({ origin: "*" }));
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.listen(parseInt(PORT), HOST, () => {
    console.log(`Server listening on port http://${HOST}:${PORT}`);
});
