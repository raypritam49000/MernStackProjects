const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { Validator } = require('node-input-validator');

class AuthController {

    static register = async (req, res) => {
        try {
            const v = new Validator(req.body, {
                username: 'required|minLength:5|maxLength:150',
                password: 'required|minLength:5|maxLength:150',
                email: 'required|email',
                address: 'required|minLength:2|maxLength:100'
            });

            const matched = await v.check();
            if (!matched) {
                return res.status(404).json({
                    isSuccess: false,
                    status: "Bad Request",
                    statusCode: 422,
                    message: "Validation Error",
                    errors: v.errors
                });
            }

            const existingUserByUsername = await User.findOne({ username: req.body.username });

            if (existingUserByUsername) {
                return res.status(409).json({
                    isSuccess: false,
                    status: "User Already Register With Username",
                    statusCode: 409,
                    message: "User Already Register with Username : " + req.body.username
                });
            }

            const existingUserByEmail = await User.findOne({ email: req.body.email });

            if (existingUserByEmail) {
                return res.status(409).json({
                    isSuccess: false,
                    status: "User Already Register With Email",
                    statusCode: 409,
                    message: "User Already Register with Email : " + req.body.email
                });
            }

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                address: req.body.address,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SEC).toString(),
                "isAdmin": req.body.isAdmin ? req.body.isAdmin : false
            });
            const savedUser = await newUser.save();
            return res.status(201).json({
                isSuccess: true,
                status: "Success",
                statusCode: 201,
                message: "User has been register",
                data: savedUser
            });
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                status: "Internal Server Error",
                statusCode: 501,
                message: "Server Error",
                errors: error
            });
        }
    }

    static login = async (req, res) => {
        try {
            const v = new Validator(req.body, {
                username: 'required|minLength:5|maxLength:150',
                password: 'required|minLength:5|maxLength:150'
            });

            const matched = await v.check();
            if (!matched) {
                return res.status(422).json({ 
                    isSuccess: false, 
                    status: "Bad Request", 
                    statusCode: 422, 
                    message: "Validation Error", 
                    errors: v.errors 
                });
            }

            const user = await User.findOne({ username: req.body.username });

            if (!user) {
                return res.status(404).json({ 
                    isSuccess: false, 
                    state: "Not Found", 
                    statusCode: 404, 
                    message: "User Not Found with " + req.body.username 
                });
            }


            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.JWT_SEC);
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            const inputPassword = req.body.password;

            if (originalPassword != inputPassword) {
                return res.status(401).json({ isSuccess: false, state: "ForBidden", statusCode: 401, "message": "Wrong Password" });
            }


            const accessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                    username: user.username,
                    email: user.email
                },
                process.env.JWT_SEC,
                { expiresIn: "3d" }
            );

            const { password, ...others } = user._doc;
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "User has been login successfully ", user: { ...others, accessToken } });

        } catch (err) {
            return res.status(500).json({ isSuccess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }


}

module.exports = AuthController;