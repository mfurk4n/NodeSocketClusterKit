const Room = require('../models/roomModel');
const Message = require('../models/messageModel');

const getAllRooms = async (req, res) => {

    const allRooms = await Room.find().sort({ createdAt: -1 });
    res.status(200).json(allRooms);
};

const getLastMessages = async (req, res) => {

    const lastMessages = await Message.find({ to: req.body.data })
        .sort({ createdAt: -1 })
        .limit(40);

    res.status(200).json(lastMessages.reverse());
};

const createRoom = async (req, res) => {

    const room = Room({ name: req.body.data });
    await room.save();

    res.status(200).json(room);
};

module.exports = {
    getAllRooms,
    getLastMessages,
    createRoom
}