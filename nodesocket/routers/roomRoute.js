const express = require("express");
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/allrooms', roomController.getAllRooms);

router.post('/lastmessages', roomController.getLastMessages);

router.post('/createroom', roomController.createRoom);

module.exports = router;