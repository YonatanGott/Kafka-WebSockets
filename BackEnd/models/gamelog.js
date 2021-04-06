const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let gameLog = new Schema({
    data: {
        type: Array,
        required: true,
    },
    game: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
});

let Log = mongoose.model("Log", gameLog);

module.exports = Log;