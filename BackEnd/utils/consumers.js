const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'kafka-webS',
    brokers: ['localhost:9092']
})

// Admin
const admin = kafka.admin()

// Consumer

const topic = 'topic-test'
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({

        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`)
        },
    })
}
run()
run().catch(e => console.error(`[example/consumer] ${e.message}`, e))

module.exports = { run };
