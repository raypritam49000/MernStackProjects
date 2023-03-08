import jwt from "jsonwebtoken";

const isAuthenticatedUser = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        req.userId = userInfo.id;
    })

    next();
}

export default isAuthenticatedUser;