const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient('localhost:9092')
//MongoDB
const Log = require('../models/gamelog')


// Consumers 
const consumer = new Consumer(
    client,
    //Topic 1
    [{ topic: 'StreamOne', partition: 0 },
    // Topic 2
    { topic: 'StreamTwo', partition: 0 },
    // Topic 3
    { topic: 'StreamThree', partition: 0 },
    // Topic 4
    { topic: 'StreamFour', partition: 0 },
    // Topic 5
    { topic: 'StreamFive', partition: 0 }],
    // Options
    { autoCommit: false }
);

// Game Logs
let gameLogOne = [];
let gameLogTwo = [];
let gameLogThree = [];
let gameLogFour = [];
let gameLogFive = [];

const buildGameLog = (gameLog, message) => {
    if (gameLog.length === 0 && message.value.search("NewRound") !== -1) {
        gameLog.push(message.value)
    } else if (gameLog.length !== 0 && message.value.search("EndRound") === -1) {
        gameLog.push(message.value)
    } else if (gameLog.length !== 0 && message.value.search("EndRound") !== -1) {
        gameLog.push(message.value)
        // Save to mongo
        const log = new Log({
            game: gameLog[0],
            data: gameLog,
            topic: message.topic,
        });
        console.log("Save Log:", log);
        log.save(function (err, log) {
            if (err) return console.error(err);
            console.log(log);
        });
        gameLog = [];
    }
}

const consumerMessage = (message, topic) => {
    // Can add logic to stream data here
    console.log("messege:", message);
    // Check Topic
    switch (topic) {
        case 'StreamOne':
            buildGameLog(gameLogOne, message);
            break;
        case 'StreamTwo':
            buildGameLog(gameLogTwo, message);
            break;
        case 'StreamThree':
            buildGameLog(gameLogThree, message);
            break;
        case 'StreamFour':
            buildGameLog(gameLogFour, message);
            break;
        case 'StreamFive':
            buildGameLog(gameLogFive, message);
            break;
        default:
            console.log('Topic Not Recognized');
    }
}


module.exports = { consumerMessage, consumer };
