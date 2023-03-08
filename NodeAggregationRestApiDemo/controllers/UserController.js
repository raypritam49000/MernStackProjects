const CryptoJS = require("crypto-js");
const User = require("../models/User");

class UserController {

    static updateUser = async (req, res) => {

        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SEC).toString()
        }

        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                { new: true }
            );
            return res.status(200).json({ isSucess: true, state: "Success", statusCode: 200, "message": "User has been updated successfully", data: updateUser });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static deleteUser = async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "User Not Found" });
            }
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({ isSucess: true, state: "Success", statusCode: 200, "message": "User has been deleted successfully" });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getUser = async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "User Not Found" });
            }

            const { password, ...others } = user._doc;
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "User Details", user: others });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getAllUsers = async (req, res) => {
        try {
            const query = req.query.new;
            const users = query ? await User.find().limit(5) : await User.find();
            if (!users) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "User Not Found" });
            }
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Users List", data: users });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getAllUsersWithPagination = async (req, res) => {
        try {
            const pageNumber = parseInt(req.body.pageNumber) || 0;
            const pageSize = parseInt(req.body.pageSize) || 15;
            const sortBy = req.body.sortBy || "username";
            const sortDir = req.body.sortDir === "ascending" ? 1 : -1;
            const offset = (pageNumber * pageSize);
            const email = req.body.email || null;
            const username = req.body.username || null;
            const isAdmin = req.body.isAdmin || null;

            const filterQuery = {};

            if (email !== null) {
                filterQuery.email = email;
            }

            if (username !== null) {
                filterQuery.username = username;
            }

            if (isAdmin !== null) {
                filterQuery.isAdmin = isAdmin;
            }

            const myCustomLabels = {
                totalDocs: "itemCount",
                docs: "itemsList",
                limit: "perPage",
                page: "currentPage",
                nextPage: "next",
                prevPage: "prev",
                totalPages: "pageCount",
                pagingCounter: "slNo",
                meta: "paginator",
            };

            // Query for users with pagination
            const options = {
                page: pageNumber,
                limit: pageSize,
                sort: { [sortBy]: sortDir },
                offset: parseInt(offset) || 0,
                customLabels: myCustomLabels,
                lean: true,
            };

            const usersPage = Object.keys(filterQuery).length > 0 ? await User.paginate(filterQuery, options) : await User.paginate({}, options);

            if (!usersPage) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, message: "User Not Found" });
            }
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, message: "Users List", data: usersPage });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, message: "Server Error" });
        }
    };


    static userStats = async (req, res) => {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        try {
            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                {
                    $project: {
                        month: { $month: "$createdAt" }
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 }
                    }
                }
            ]);

            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "User Stats", data: data });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getAllUsersWithProjection = async (req, res) => {
        try {
            const users = await User.find({ address: { $elemMatch: { city: "TDI" } } }, { _id: 0, username: 1, email: 1, password: 1, address: 1 });
            if (!users) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "User Not Found" });
            }
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Users List", data: users });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getAllUsersWithDistinctCount = async (req, res) => {
        try {
            const users = await User.distinct('username', { username: "admin" }).count();
            if (!users) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "User Not Found" });
            }
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Users List", data: users });
        }
        catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    // $project  -> $match -> $group -> $sort -> output
    // $count , $skip -> $unwind

    static getAllUsersWithAggreation = async (req, res) => {
        try {
            const users = await User.aggregate([
                {
                    $unwind: "$address"
                },
                {
                    $match: { username: "admin" }
                },
                {
                    $project: { username: { $type: "username" }, password: 1, emailId: "$email" }
                },
                {
                    $group: {
                        _id: {
                            username: '$username',
                            email: "$emailId",
                            _id: "$_id"
                        },
                        totalUsers: {
                            $sum: '$_id'
                        }
                    }
                },
                {
                    $skip: 0
                },
                {
                    $sort: {
                        username: -1
                    }
                },
                {
                    $limit: 1
                },
                {
                    $count: "totals"
                },
                {
                    $out: 'info'
                }
            ])

            if (!users) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "User Not Found" });
            }
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Users List", data: users });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getCurrentUser = async (req, res) => {
        try {
            const currentUser = req.user;
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Current User", data: currentUser });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }


}

module.exports = UserController;