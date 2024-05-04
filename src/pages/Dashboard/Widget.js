import React, { useState } from "react";
import Components from "./components";
import useMQTTSubscribe from '../../hooks/useMQTTSubscribe'

/* The widget components require a widget object, which detail the configuration of the widget,
  the wsClient is a reference to the current MQTT WebSocket Client instance, the onRemoveItem parameter is a 
  callback function to delete the widget from the dashboard */
export default function Widget({ widget, wsClient, onRemoveItem }) {
  const [message, setMessage] = useState("");
  /* Subscribe the widget to the required topic to recieve relevant widget values, the message will be stored in 
    the message variable in state as the setMessage function will be called through the useMQTTSubscribe callback() */
  useMQTTSubscribe(wsClient, (widget.topicSerial + "/" + widget.topicIdentifier), setMessage);
  
  return (
    <div className="h-full w-full relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-sm">
      <button
        type="button"
        className="absolute top-0 right-0 w-10 h-10 cursor:pointer text-blue-gray-900 text-xs px-3 py-2 cancelDraggable"
        onClick={() => { onRemoveItem(widget._uid) }}
      >
        X
      </button>
      <div className="p-6">
        {/* Render the component based on the component type and the MQTT payload */}
        {Components(widget, message)}
      </div>
    </div>
  );
};