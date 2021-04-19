const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const port = 5000

// Express
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(bodyParser.json({ limit: '50mb' }));

//MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to mongoDB'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Kafka 
const { consumer } = require('./utils/kafka');
const { consumerMessage } = require('./utils/kafka');

// Sockets
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});
//Whenever someone connects 
io.on('connection', async function (socket) {
    console.log('A user connected');
    //send connection message
    socket.emit('greeting', {
        data: "Connected To Socket",
        id: socket.id
    })
    consumer.on('message', function (message) {
        // Websocket to front-end
        console.log('Message:', message);
        socket.emit('data', {
            id: socket.id,
            data: message.value,
            topic: message.topic,
            offset: message.offset,
        });
        // Send Data to Log
        consumerMessage(message, message.topic)
    });
    //Whenever someone disconnects 
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

// Routes
const logsRoute = require('./routes/logs')
app.use('/api/logs', logsRoute);
const topicsRoute = require('./routes/topics')
app.use('/api/topics', topicsRoute.router);

app.get('/', (req, res) => {
    res.send('Hello')
})

http.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})