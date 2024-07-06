const {Kafka} = require('kafkajs');
const kafka = new Kafka({clientId:'project-management-app', brokers:['kafka-broker:9092']});
const producer = kafka.producer();

const sendNotification = async (notification) =>{
    await producer.connect();
    await producer.send({
        topic: 'notifications',
        messages: [{ value: JSON.stringify(notification) }],
    });
    await producer.disconnect();
}

module.exports = { sendNotification };