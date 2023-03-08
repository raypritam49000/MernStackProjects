import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import postRoutes from "../api/routes/posts.js";
import userRoutes from "../api/routes/user.js";
import authRoutes from "../api/routes/auth.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(cors({ origin: "*" }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);


app.listen(PORT, HOST, () => {
    console.log(`Server are Running at http://${HOST}:${PORT}`);
})