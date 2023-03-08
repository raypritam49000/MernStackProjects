const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const BlogSchema = new mongoose.Schema({
    title: { type: String },
    short_description: { type: String },
    description: { type: String },
    image: { type: String, default: null },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    created_By: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    blog_comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogComment' }],
    blog_likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogLike' }]
},
    {
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

BlogSchema.virtual('image_url').get(function () {
    var fullUrl = req.protocol + "://" + req.get('host');
    return fullUrl + '/uploads/blog_images/' + this.image;
})


// Add the paginate plugin to your schema
BlogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Blog", BlogSchema);