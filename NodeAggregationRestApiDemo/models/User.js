const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    address: { type: Array, required: false }
},
    { timestamps: true }
);

// Add the paginate plugin to your schema
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", UserSchema);