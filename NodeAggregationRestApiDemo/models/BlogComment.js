const mongoose = require("mongoose");

const BlogCommentSchema = new mongoose.Schema({
    comment: String,
    blog_id: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("BlogComment", BlogCommentSchema);