import { useEffect } from 'react';

function useMQTTSubscribe(client, topic, onMessage) {
  useEffect(() => {
    if (!client || !client.connected) return;
    const handleMsg = (receivedTopic, message) => {
      if (receivedTopic === topic) {
        onMessage(message.toString());
      }
    };
    console.log('MQTT subscribing to topic: ', topic);
    client.subscribe(topic);
    client.on('message', handleMsg);
    return () => {
      client.unsubscribe(topic);
      client.off('message', handleMsg);
    };
  }, [client, topic, onMessage]);
}

export default useMQTTSubscribe;