const prod = {
    url: {
        API_URL: 'http://ec2-54-156-178-91.compute-1.amazonaws.com:4000/api',
        API_URL_LOGIN: 'http://ec2-54-156-178-91.compute-1.amazonaws.com:4000/api/User/login',
        MQTT_WS_URL: 'ws://ec2-44-206-138-226.compute-1.amazonaws.com:8000/mqtt'
    }
};
const dev = {
    url: {
        API_URL: 'http://localhost:5124/api',
        API_URL_LOGIN: 'http://localhost:5124/api/User/login',
        MQTT_WS_URL: 'ws://ec2-44-206-138-226.compute-1.amazonaws.com:8000/mqtt'
    }
};
// Use a ternary operator to return the correct URL object based on the current environment
export const config = process.env.NODE_ENV === 'development' ? dev : prod;