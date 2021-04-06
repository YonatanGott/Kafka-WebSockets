const express = require('express')
const router = express.Router()
const Log = require('../models/gamelog')

// Kafka Producer
const kafka = require('kafka-node')
const Producer = kafka.Producer
const client = new kafka.KafkaClient()
const producer = new Producer(client)

// Logs Api
router.get('/', async (req, res) => {
    try {
        const logs = await Log.find().sort('-time');
        res.json(logs)
    }
    catch (err) {
        res.json({ err: err })
    }
});

router.post('/', async (req, res) => {
    try {
        const log = await Log.findById(req.body.id)
        console.log('Log: ', log);
        // Send log to kafka
        for (let i = 1; i < log.data.length; i++) {
            // Skip first entry to avoid storing in DB (temp)
            producer.send(
                [{ topic: log.topic, messages: log.data[i], partition: 0 }], function (err, data) {
                    console.log(data);
                });
        }
    } catch (err) {
        res.json({ err: err })
    }
});

module.exports = router;