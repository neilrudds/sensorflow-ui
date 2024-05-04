// Code Credits: https://medium.com/@dhruvpvx/the-most-effective-method-for-managing-api-calls-in-your-react-or-react-native-project-fe4293a7905f

import { useContext } from "react";
import AuthContext from "../../context/auth-context";
import { config } from '../Constants';

const BASE_URL = config.url.API_URL; // Get the server URL

export default function useApiMethods() {
    const auth = useContext(AuthContext); // AuthContect is required for backend server authentication
    
    // function to build common request headers
    const getHeaders = () => {
        const GetAuthToken = () => {
            let user = JSON.parse(auth.user);
            return 'Bearer ' + user.jwtToken // Users JWT token
        };
    
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': GetAuthToken()
        };
    };

    // Generic API Reqyest handler for all API methods (GET, POST, PUT, DELETE)
    // with error handling
    function apiRequest(method, url, body) {
        url = BASE_URL + url;
        return new Promise((resolve, reject) => {
            fetch(url, { method, body: JSON.stringify(body), headers: getHeaders() })
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        });
    }

    // Accessable functions exported from useApiMethods with parameters
    return {
        get: function (url) {
            return apiRequest('GET', url);
        },

        post: function (url, data) {
            return apiRequest('POST', url, data);
        },

        put: function (url, data) {
            return apiRequest('PUT', url, data);
        },

        'delete': function (url) {
            return apiRequest('DELETE', url);
        }
    }
}