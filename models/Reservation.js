const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const reservationSchema = new Schema({
    user: ObjectId,
    cottage: ObjectId,
    date: Date
});

module.exports = mongoose.model("reservations", reservationSchema);
