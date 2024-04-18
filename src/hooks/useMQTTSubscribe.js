import { useEffect } from 'react';

function useMQTTSubscribe(client, topic, onMessage) {
  useEffect(() => {
    if (!client || !client.connected) return () => {
      console.log("Client not connected, unable to subscribe.")
    };
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