const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        maxlength: 25
    },
    to: {
        type: String,
        required: true,
        maxlength: 25
    },
    message: {
        type: String,
        required: true,
        maxlength: 1000
    }
}, {
    timestamps: true
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;