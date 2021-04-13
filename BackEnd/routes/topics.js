const express = require('express')
const router = express.Router()

// KafkaJS
const { Kafka } = require('kafkajs')
const kafkaJS = new Kafka({
    clientId: 'kafka-webS',
    brokers: ['localhost:9092']
})
// Admin
const admin = kafkaJS.admin()

// Topics Api
router.get('/', async (req, res) => {
    try {
        const topics = await admin.listTopics();
        res.json({
            topics: topics
        })
    }
    catch (err) {
        res.json({ err: err })
    }
});

// Not at Use
router.post('/', async (req, res) => {
    try {
        let topicsArray = req.body.topics;
        console.log(topicsArray);
        res.send('Received')
    }
    catch (err) {
        res.json({ err: err })
    }
});


module.exports = {
    router: router,
    admin: admin
}