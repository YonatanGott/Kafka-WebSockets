const express = require('express')
const router = express.Router()
const Log = require('../models/gamelog')

// Kafka Producer
const kafka = require('kafka-node')
const Producer = kafka.Producer
const client = new kafka.KafkaClient()
const producer = new Producer(client)

// Logs Api
// Init Logs
router.get('/', async (req, res) => {
    try {
        const logs = await Log.find().sort('-time').skip(0).limit(12);
        const numLogs = await Log.collection.estimatedDocumentCount();
        res.json({
            logs: logs,
            numLogs: numLogs,
        })
    }
    catch (err) {
        res.json({ err: err })
    }
});
// Send Log to Analytics Topic
router.post('/', async (req, res) => {
    try {
        console.log('Received:', req.body);
        const log = await Log.findById(req.body.id)
        console.log('Log: ', log);
        // Send log to kafka
        for (let i = 1; i < log.data.length; i++) {
            // Skip first entry to avoid storing in DB (temp)
            producer.send(
                [{ topic: 'Analytics-Topic', messages: log.data[i], partition: 0 }], function (err, data) {
                    console.log(data);
                });
        }
        res.send('Sent')
    } catch (err) {
        res.json({ err: err })
    }
});
// Pagination
router.post('/pagination', async (req, res) => {
    try {
        let skip = 12 * req.body.page
        const logs = await Log.find().sort('-time').skip(skip).limit(12);
        res.json({
            logs: logs,
        })
    } catch (err) {
        res.json({ err: err })
    }
});


module.exports = router;