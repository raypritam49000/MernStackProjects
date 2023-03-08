const Blog = require("../models/Blog");
const BlogComment = require("../models/BlogComment");

class BlogCommentController {

    static createBlogComment = async (req, res) => {
        try {
            const blog_id = req.params.blog_id;

            if (!mongoose.Types.ObjectId.isValid(blog_id)) {
                return res.status(400).json({
                    isSuccess: false,
                    status: "Bad Request",
                    statusCode: 400,
                    message: "InValid Blog Id"
                });
            }

            const blog = await Blog.findOne({ _id: blog_id });

            if (!blog) {
                return res.status(404).json({
                    isSuccess: false,
                    state: "Not Found",
                    statusCode: 404,
                    message: "Blog Not Found"
                });
            }

            const v = new Validator(req.body, {
                comment: 'required'
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

            const newCommentDocument = new Comment({
                comment: request.blog.comment,
                blog_id: blog_id,
                user_id: req.user._id
            });

            const createComment = await newCommentDocument.save();

            await Blog.updateOne(
                { _id: blog_id },
                {
                    $push: { blog_comments: createComment._id }
                });


            let query = [
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $match: {
                        '_id': mongoose.Types.ObjectId(createComment._id)
                    }
                }
            ];

            const comments = await BlogComment.aggregate(query);

            return res.status(201).json({
                isSuccess: true,
                status: "Success",
                statusCode: 200,
                message: "Blog Comment has been created",
                data: comments[0]
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

    static getComments = async (req, res) => {
        try {

            const blog_id = req.params.blog_id;

            if (!mongoose.Types.ObjectId.isValid(blog_id)) {
                return res.status(400).json({
                    isSuccess: false,
                    status: "Bad Request",
                    statusCode: 400,
                    message: "InValid Blog Id"
                });
            }

            const blog = await Blog.findOne({ _id: blog_id });

            if (!blog) {
                return res.status(404).json({
                    isSuccess: false,
                    state: "Not Found",
                    statusCode: 404,
                    message: "Blog Not Found"
                });
            }

            let query = [
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $match: {
                        'blog_id': mongoose.Types.ObjectId(blog_id)
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                }
            ];

            


            let total = await BlogComment.countDocuments(query);
            let page = (req.query.page) ? parseInt(req.query.page) : 1;
            let perPage = (req.query.perPage) ? parseInt(req.query.perPage) : 10;
            let skip = (page - 1) * perPage;

            query.push({
                $skip: skip
            });

            query.push({
                $limit: perPage
            });

            const comments = await BlogComment.aggregate(query);

            return res.status(200).json({
                isSuccess: true,
                status: "Success",
                statusCode: 200,
                message: "BlogComments successfully fetch",
                data: {
                    comments,
                    meta: {
                        total: total,
                        currentPage: page,
                        perPage: perPage,
                        totalPages: Math.ceil(total / perPage)
                    }
                }
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

    static updateBlog = async (req, res) => {
        try {

            const comment_id = req.params.comment_id;

            if (!mongoose.Types.ObjectId.isValid(comment_id)) {
                return res.status(400).json({
                    isSuccess: false,
                    status: "Bad Request",
                    statusCode: 400,
                    message: "InValid Comment Id"
                });
            }

            const blogComment = await BlogComment.findOne({ _id: blog_id });

            if (!blogComment) {
                return res.status(404).json({
                    isSuccess: false,
                    state: "Not Found",
                    statusCode: 404,
                    message: "Blog Comment Not Found"
                });
            }
            else {
                const current_user = req.user;
                if (blogComment.user_id != current_user._id) {
                    return res.status(404).json({
                        isSuccess: false,
                        status: "Access Denied",
                        statusCode: 401,
                        "message": "Your are not allowed to access this blog"
                    });
                }
                else {
                    const v = new Validator(req.body, {
                        comment: 'required'
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

                    await BlogComment.updateOne(
                        { _id: comment_id },
                        { comment: req.body.comment }
                    )

                    let query = [
                        {
                            $lookup: {
                                from: "users",
                                localField: "user_id",
                                foreignField: "_id",
                                as: "user"
                            }
                        },
                        {
                            $unwind: '$user'
                        },
                        {
                            $match: {
                                '_id': mongoose.Types.ObjectId(comment_id)
                            }
                        }
                    ];

                    const comments = await BlogComment.aggregate(query);

                    return res.status(201).json({
                        isSuccess: true,
                        status: "Success",
                        statusCode: 200,
                        message: "Blog Comment has been updated",
                        data: comments[0]
                    });
                }
            }


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

    static deleteBlog = async (req, res) => {
        try {
            const comment_id = req.params.comment_id;

            if (!mongoose.Types.ObjectId.isValid(comment_id)) {
                return res.status(400).json({
                    isSuccess: false,
                    status: "Bad Request",
                    statusCode: 400,
                    message: "InValid Comment Id"
                });
            }

            const blogComment = await BlogComment.findOne({ _id: blog_id });

            if (!blogComment) {
                return res.status(404).json({
                    isSuccess: false,
                    state: "Not Found",
                    statusCode: 404,
                    message: "Blog Comment Not Found"
                });
            }
            else {

                const current_user = req.user;
                if (blogComment.user_id != current_user._id) {
                    return res.status(404).json({
                        isSuccess: false,
                        status: "Access Denied",
                        statusCode: 401,
                        message: "Your are not allowed to access this blog"
                    });
                }
                else {

                    await BlogComment.deleteOne({ _id: comment_id });
                    await Blog.updateOne(
                        { _id: comment.blog_id },
                        {
                            $pull: { blog_comments: comment_id }
                        }
                    );

                    return res.status(200).json({
                        isSuccess: true,
                        status: "Success",
                        statusCode: 200,
                        message: "Blog Comment has been deleted"
                    });
                }

            }

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
}

module.exports = BlogCommentController;