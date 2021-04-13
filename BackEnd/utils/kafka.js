const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient('localhost:9092')
//MongoDB
const Log = require('../models/gamelog')

// Consumers Group
const consumer = new Consumer(
    client,
    // Analytic Topic 1 
    [{ topic: 'StreamOne', partition: 0 },
    // Analytic Topic 2
    { topic: 'StreamTwo', partition: 0 },
    // Analytic Topic 3
    { topic: 'StreamThree', partition: 0 },
    // Analytic Topic 4
    { topic: 'StreamFour', partition: 0 },
    // Analytic Topic 5
    { topic: 'StreamFive', partition: 0 },
    // Real-Time Indicators 
    { topic: 'Dashboard', partition: 0 },
    // Real-Time Topic
    { topic: 'Real-Time', partition: 0 }]
    ,
    // Options
    {
        autoCommit: false,
        //autoCommitIntervalMs: 5000,
    }
);

// Game Logs
let gameLog = [];
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
        });
        console.log("Save Log:", log);
        log.save(function (err, log) {
            if (err) return console.error(err);
            console.log(log);
        });
        gameLog = [];
    }
}
// Check Consumer Event
const consumerMessage = (message, topic) => {
    console.log("Messege:", message);
    // Check Topic
    if (topic === 'Real-Time') {
        buildGameLog(gameLog, message)
    }
}


module.exports = { consumerMessage, consumer };
