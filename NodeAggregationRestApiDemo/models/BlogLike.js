const mongoose = require("mongoose");

const BlogLikeSchema = new mongoose.Schema({
    blog_id: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},
    {
        timestamps: true
    }
);

const BlogLike = mongoose.model("BlogLike", BlogLikeSchema);
module.exports = BlogLike;