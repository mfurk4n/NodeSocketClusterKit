const Message = require('./models/messageModel');
const { createAdapter } = require("@socket.io/cluster-adapter");
const { setupWorker } = require("@socket.io/sticky");
const { io } = require('./index');

io.adapter(createAdapter());

setupWorker(io);

async function saveMessage(payload) {
    try {
        const message = Message(payload);
        await message.save();
        return true;
    } catch (error) {
        return false;
    }
}


io.on('connection', async function (client) {
    const userName = client.handshake.headers['username'];
    const roomName = client.handshake.headers['room'];

    if (roomName == "noroom" || roomName == null) {
        return client.disconnect();
    } else {
        client.join(roomName);
    }

    client.on('message', async payload => {
        payload.from = userName;
        await saveMessage(payload);
        io.to(roomName).to(payload.to).emit('message', payload);

    })

    client.on('disconnect', async () => {
    });
});