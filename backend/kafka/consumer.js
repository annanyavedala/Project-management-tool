const { Kafka } = require('kafkajs');
const kafka = new Kafka({ clientId: 'project-management-app', brokers: ['kafka-broker:9092'] });
const consumer = kafka.consumer({ groupId: 'notification-group' });

const runConsumer = async ()=>{
    await consumer.connect();
    await consumer.subscribe({ topic: 'notifications', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const notification = JSON.parse(message.value.toString());
            sendToUser(notification.recipient, notification.message);
        },
    });

};

const sendToUser = (userEmail, message) => {
    // Implementation to send the message (e.g., email, SMS, push notification)
    console.log(`Sending notification to ${userEmail}: ${message}`);
};

runConsumer().catch(console.error);