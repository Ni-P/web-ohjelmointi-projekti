const mongoose = require("mongoose");
const { Schema } = mongoose;

const cottageSchema = new Schema({
    name: String,
    location: String,
    reserved: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    image: String,
    price: Number,
    description: String
});

module.exports = mongoose.model("cottages", cottageSchema);