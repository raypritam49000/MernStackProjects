import { db } from "../dbconfig/db.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

class AuthController {

    static register = (req, res) => {

        // CHECK EXISTING USER
        const query = "SELECT * FROM users WHERE email = ? OR username = ?";

        db.query(query, [req.body.email, req.body.username], (err, data) => {
            if (err) return res.json(err);
            if (data.length) return res.status(409).json("User Already Exists");

            // Hash the Password and Create a User
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const query = "INSERT INTO users (`username`,`email`,`password`) VALUES (?,?,?)";

            const values = [req.body.email, req.body.username, hash]

            db.query(query, values, (err, data) => {
                if (err) return res.json(err);
                return res.status(200).json("User has been created")
            })
        });

    }

    static login = (req, res) => {

        // CHECK EXISTING USER
        const query = "SELECT * FROM users WHERE username = ?";

        db.query(query, [req.body.username], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0) return res.status(404).json("User not found!");

            //Check password
            const isPasswordCorrect = bcrypt.compareSync(
                req.body.password,
                data[0].password
            );

            if (!isPasswordCorrect)
                return res.status(400).json("Wrong username or password!");

            const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);
            const { password, ...other } = data[0];

            return res.status(200).json({ token, ...other });
        });

    }

    static logout = (req, res) => {
            delete req.userId;
            return res.status(200).json("User has been logged out.");
    }
}

export default AuthController;