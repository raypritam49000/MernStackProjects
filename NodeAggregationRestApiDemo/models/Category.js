const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const CategorySchema = new mongoose.Schema({
    slug: { type: String },
    name: { type: String }
},
    { timestamps: true }
);

// Add the paginate plugin to your schema
CategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Category", CategorySchema);