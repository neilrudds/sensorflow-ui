import { useEffect } from 'react';

// using the MQTT clinet passed in, subscribe to the provided topic
// when a new message is recieved, pass it to the onMessage callback function
// if at any stage the hook is destroyed, unsubscribe from the topic
function useMQTTSubscribe(client, topic, onMessage) {
  useEffect(() => {
    /*if (!client || !client.connected) return () => {
      console.log("Client not connected, unable to subscribe.")
    };*/
    const handleMsg = (receivedTopic, message) => {
      if (receivedTopic === topic) {
        console.log(topic + ":" + message.toString())
        onMessage(message.toString());
      }
    };
    console.log('Client connected, subscribing to topic: ', topic);
    client.subscribe(topic);
    client.on('message', handleMsg);
    return () => {
      console.log("Unsubscribing from topic: " + topic);
      client.unsubscribe(topic);
      client.off('message', handleMsg);
    };
  }, [client, topic, onMessage]);
}

export default useMQTTSubscribe;