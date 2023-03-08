const Blog = require('../models/Blog');
const BlogLike = require('../models/BlogLike');
const { Validator } = require('node-input-validator');
const { default: mongoose } = require('mongoose');
const fs = require('fs');

class BlogController {

    static createBlog = async (req, res) => {

        if (req.files && req.files.image) {
            req.body['image'] = req.files.image;
        }

        try {
            const v = new Validator(req.body, {
                title: 'required|minLength:5|maxLength:150',
                short_description: 'required',
                description: 'required',
                category: 'required',
                image: 'required|mime:jpg.jpeg,png'
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

            if (req.files && req.files.image) {
                var image_file = req.files.image;
                var image_file_name = Date.now() + '-blog-image-' + image_file.name;
                var image_path = publicPath + '/uploads/blog_images/' + image_file_name;
                await image_file.mv(image_path);
            }

            const newBlog = new Blog({
                title: req.body.title,
                short_description: req.body.short_description,
                description: req.body.description,
                category: req.body.category,
                created_By: req.user.id,
                image: image_file_name,
            });

            const blogData = await newBlog.save();
            //const populateData = await Blog.findById(blogData._id).populate('category').populate('created_By');

            let query = [
                {
                    $lookup: {
                        from: "users",
                        localField: "created_By",
                        foreignField: "_id",
                        as: "creator"
                    }
                },
                { $unwind: '$creator' },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category_details"
                    }
                },
                { $unwind: '$category_details' },
                {
                    $match: {
                        "_id": mongoose.Types.ObjectId(blogData._id)
                    }
                },
                {
                    $project: {
                        "title": 1,
                        "description": 1,
                        "short_description": 1,
                        "image": 1,
                        "category_details.slug": 1,
                        "category_details.name": 1,
                        "creator.email": 1,
                        "creator.username": 1
                    }
                }
            ];

            let blogs = await Blog.aggregate(query);

            return res.status(201).json({
                isSuccess: true,
                status: "Success",
                statusCode: 201,
                message: "Blog has been created",
                data: Blog.hydrate(blogs[0])
            });
        } catch (error) {
            return res.status(500).json({ isSuccess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error", errors: error });
        }
    }

    static searchBlog = async (req, res) => {
        try {
            let query = {};
            if (req.query.category) {
                query.category = req.query.category;
            }
            if (req.query.keyword) {
                query.$or = [
                    { "title": { $regex: req.query.keyword, $options: 'i' } },
                    { "short_description": { $regex: req.query.keyword, $options: 'i' } }
                ];
            }

            let blogs = await Blog.find(query)
                .populate('category')
                .populate('created_By')
                .skip(0)
                .limit(2)
                .sort({ createdAt: -1 });

            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Blog successfully fetch", data: blogs });
        } catch (error) {
            return res.status(500).json({ isSuccess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error", errors: error });
        }
    }

    static searchBlogWithAggregation = async (req, res) => {
        try {
            let query = [
                {
                    $lookup: {
                        from: "users",
                        localField: "created_By",
                        foreignField: "_id",
                        as: "creator"
                    }
                },
                { $unwind: '$creator' },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category_details"
                    }
                },
                { $unwind: '$category_details' }
            ];

            if (req.query.keyword && req.query.keyword != '') {
                query.push({
                    $match: {
                        $or: [
                            {
                                title: { $regex: req.query.keyword }
                            },
                            {
                                'category_details.name': { $regex: req.query.keyword }
                            },
                            {
                                'creator.email': { $regex: req.query.keyword }
                            }
                        ]
                    }
                })
            }

            if (req.query.category) {
                query.push({
                    $match: {
                        'category_details.slug': { $regex: req.query.category }
                    }
                })
            }

            if (req.query.user_id) {
                query.push({
                    $match: {
                        created_By: mongoose.Types.ObjectId(req.query.user_id)
                    }
                })
            }

            let total = await Blog.countDocuments(query);
            let page = (req.query.page) ? parseInt(req.query.page) : 1;
            let perPage = (req.query.perPage) ? parseInt(req.query.perPage) : 10;
            let skip = (page - 1) * perPage;

            query.push({
                $skip: skip
            });

            query.push({
                $limit: perPage
            });

            query.push({
                $project: {
                    "title": 1,
                    "description": 1,
                    "short_description": 1,
                    "image": 1,
                    "category_details.slug": 1,
                    "category_details.name": 1,
                    "creator.email": 1,
                    "creator.username": 1,
                    "comments_counts": { $size: { "$ifNull": ["$blog_comments", []] } },
                    "likes_count": { $size: { "$ifNull": ["$blog_likes ", []] } }
                }
            });

            if (req.query.sortBy && req.query.sortOrder) {
                var sort = {};
                sort[req.query.sortBy] = (req.query.sortOrder == 'asc') ? 1 : -1;
                query.push({
                    $sort: sort
                });
            }
            else {
                query.push({
                    $sort: { createdAt: -1 }
                });
            }

            let blogs = await Blog.aggregate(query);

            return res.status(200).json({
                isSuccess: true,
                status: "Success",
                statusCode: 200,
                "message": "Blog successfully fetch",
                data: {
                    blogs: blogs.map(doc => Blog.hydrate(doc)),
                    meta: {
                        total: total,
                        currentPage: page,
                        perPage: perPage,
                        totalPages: Math.ceil(total / perPage)
                    }
                }
            });
        } catch (error) {
            return res.status(500).json({ isSuccess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error", errors: error });
        }
    }

    static getBlogById = async (req, res) => {
        try {
            let blog_id = req.params.blog_id;
            // let blog = await Blog.findOne({ _id: blog_id }).populate('category').populate('created_By');
            let query = [
                {
                    $lookup: {
                        from: "users",
                        localField: "created_By",
                        foreignField: "_id",
                        as: "creator"
                    }
                },
                { $unwind: '$creator' },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category_details"
                    }
                },
                { $unwind: '$category_details' },
                {
                    $match: {
                        "_id": mongoose.Types.ObjectId(blog_id)
                    }
                },
                {
                    $project: {
                        "title": 1,
                        "description": 1,
                        "short_description": 1,
                        "image": 1,
                        "category_details.slug": 1,
                        "category_details.name": 1,
                        "creator.email": 1,
                        "creator.username": 1,
                        "comments_counts": { $size: { "$ifNull": ["$blog_comments", []] } }
                    }
                }
            ];

            let blogs = await Blog.aggregate(query);

            if (blogs.length > 0) {
                return res.status(200).json({
                    isSuccess: true,
                    status: "Success",
                    statusCode: 200,
                    "message": "Blog successfully fetch",
                    data: Blog.hydrate(blogs[0])
                });
            }
            else {
                return res.status(404).json({
                    isSuccess: true,
                    status: "Success",
                    statusCode: 404,
                    "message": "Blog Not Found"
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                isSuccess: false,
                state: "Internal Server Error",
                statusCode: 501,
                "message": "Server Error",
                errors: error
            });
        }
    }

    static updateBlog = async (req, res) => {
        try {
            const blog_id = req.params.blog_id;

            if (!mongoose.Types.ObjectId.isValid(blog_id)) {
                return res.status(400).json({
                    isSuccess: false,
                    status: "Bad Request",
                    statusCode: 400,
                    "message": "InValid Blog Id"
                });
            }

            const blog = await Blog.findOne({ _id: blog_id });
            if (!blog) {
                return res.status(404).json({
                    isSuccess: true,
                    status: "Success",
                    statusCode: 404,
                    "message": "Blog Not Found"
                });
            }
            else {
                const current_user = req.user;
                if (blog.created_By != current_user._id) {
                    return res.status(404).json({
                        isSuccess: false,
                        status: "Access Denied",
                        statusCode: 401,
                        "message": "Your are not allowed to access this blog"
                    });
                }
                else {

                    const rules = {
                        title: 'required|minLength:5|maxLength:150',
                        short_description: 'required',
                        description: 'required',
                        category: 'required'
                    }

                    if (req.files && req.files.image) {
                        req.body['image'] = req.files.image;
                        rules['image'] = 'required|mime:jpg.jpeg,png';
                    }

                    const v = new Validator(req.body, rules);

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

                    if (req.files && req.files.image) {
                        var image_file = req.files.image;
                        var image_file_name = Date.now() + '-blog-image-' + image_file.name;
                        var image_path = publicPath + '/uploads/blog_images/' + image_file_name;
                        await image_file.mv(image_path);

                        let old_path = publicPath + '/uploads/blog_images/' + blog.image;
                        if (fs.existsSync(old_path)) {
                            fs.unlinkSync(old_path);
                        }
                    }
                    else {
                        var image_file_name = blog.image;
                    }

                    await Blog.updateOne({ _id: blog_id }, {
                        title: req.body.title,
                        short_description: req.body.short_description,
                        description: req.body.description,
                        category: req.body.category,
                        created_By: req.user.id,
                        image: image_file_name,
                    });

                    let query = [
                        {
                            $lookup: {
                                from: "users",
                                localField: "created_By",
                                foreignField: "_id",
                                as: "creator"
                            }
                        },
                        { $unwind: '$creator' },
                        {
                            $lookup: {
                                from: "categories",
                                localField: "category",
                                foreignField: "_id",
                                as: "category_details"
                            }
                        },
                        { $unwind: '$category_details' },
                        {
                            $match: {
                                "_id": mongoose.Types.ObjectId(blog_id)
                            }
                        },
                        {
                            $project: {
                                "title": 1,
                                "description": 1,
                                "short_description": 1,
                                "image": 1,
                                "category_details.slug": 1,
                                "category_details.name": 1,
                                "creator.email": 1,
                                "creator.username": 1,
                                "comments_counts": { $size: { "$ifNull": ["$blog_comments", []] } }
                            }
                        }
                    ];

                    let blogs = await Blog.aggregate(query);
                    return res.status(200).json({
                        isSuccess: true,
                        status: "Success",
                        statusCode: 200,
                        message: "Blog has been updated",
                        data: Blog.hydrate(blogs[0])
                    });
                }
            }
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                state: "Internal Server Error",
                statusCode: 501,
                "message": "Server Error",
                errors: error
            });
        }
    }

    static deleteBlog = async (req, res) => {
        try {
            const blog_id = req.params.blog_id;

            if (!mongoose.Types.ObjectId.isValid(blog_id)) {
                return res.status(400).json({
                    isSuccess: false,
                    status: "Bad Request",
                    statusCode: 400,
                    "message": "InValid Blog Id"
                });
            }

            let blog = await Blog.findOne({ _id: blog_id });

            if (!blog) {
                return res.status(404).json({
                    isSuccess: true,
                    status: "Success",
                    statusCode: 404,
                    "message": "Blog Not Found"
                });
            }
            else {
                const current_user = req.user;
                if (blog.created_By != current_user._id) {
                    return res.status(404).json({
                        isSuccess: false,
                        status: "Access Denied",
                        statusCode: 401,
                        "message": "Your are not allowed to access this blog"
                    });
                }
                else {

                    let old_path = publicPath + '/uploads/blog_images/' + blog.image;
                    if (fs.existsSync(old_path)) {
                        fs.unlinkSync(old_path);
                    }

                    await Blog.deleteOne({ _id: blog_id });

                    return res.status(200).json({
                        isSuccess: true,
                        status: "Success",
                        statusCode: 200,
                        message: "Blog has been deleted"
                    });
                }
            }
        }
        catch (error) {
            return res.status(500).json({
                isSuccess: false,
                state: "Internal Server Error",
                statusCode: 501,
                "message": "Server Error",
                errors: error
            });
        }
    }

    static toggle_like = async (req, res) => {
        try {
            const blog_id = req.params.blog_id;

            if (!mongoose.Types.ObjectId.isValid(blog_id)) {
                return res.status(400).json({
                    isSuccess: false,
                    status: "Bad Request",
                    statusCode: 400,
                    "message": "InValid Blog Id"
                });
            }

            let blog = await Blog.findOne({ _id: blog_id });

            if (!blog) {
                return res.status(404).json({
                    isSuccess: true,
                    status: "Success",
                    statusCode: 404,
                    "message": "Blog Not Found"
                });
            }
            else {
                const current_user = req.user;
                if (blog.created_By != current_user._id) {
                    return res.status(404).json({
                        isSuccess: false,
                        status: "Access Denied",
                        statusCode: 401,
                        "message": "Your are not allowed to access this blog"
                    });
                }
                else {
                    const blog_like = await BlogLike.findOne({
                        blog_id: blog_id,
                        user_id: current_user._id
                    });

                    if (!blog_like) {
                        const blog_like_doc = new BlogLike({
                            blog_id: blog_id,
                            user_id: current_user._id
                        });

                        const likeData = blog_like_doc.save();

                        await Blog.updateOne(
                            { _id: blog_id },
                            {
                                $push: { blog_likes: likeData._id }
                            });

                        return res.status(200).json({
                            isSuccess: true,
                            status: "Success",
                            statusCode: 200,
                            message: "Like has been added"
                        });

                    }
                    else {

                        await BlogLike.deleteOne({ _id: blog_like._id });

                        await Blog.updateOne(
                            { _id: blog_like.blog_id },
                            {
                                $pull: { blog_likes: blog_like._id }
                            }
                        );

                        return res.status(200).json({
                            isSuccess: true,
                            status: "Success",
                            statusCode: 200,
                            message: "Like has been deleted"
                        });

                    }
                }
            }

        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                state: "Internal Server Error",
                statusCode: 501,
                message: "Server Error",
                errors: error
            });
        }
    }
}


module.exports = BlogController;