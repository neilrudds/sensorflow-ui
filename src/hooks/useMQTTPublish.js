// using the MQTT client passed in, publish an MQTT broadcast message
function useMQTTPublish(client) {
    const publish = (topic, message, options = {}) => {
        if (client && client.connected) {
            client.publish(topic, message, options);
        }
    };
    return publish;
}

export default useMQTTPublish;