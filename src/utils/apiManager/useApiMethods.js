import { useContext } from "react";
import AuthContext from "../../context/auth-context";

const BASE_URL = 'https://localhost:7026/api';

export default function useApiMethods() {
    const auth = useContext(AuthContext);
    
    const getHeaders = () => {
        const GetAuthToken = () => {
            let user = JSON.parse(auth.user);
            return 'Bearer ' + user.jwtToken
        };
    
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': GetAuthToken()
        };
    };

    function apiRequest(method, url, body = {}) {
        url = BASE_URL + url;
        return new Promise((resolve, reject) => {
            fetch(url, { method, if (body) { body: JSON.stringify(body) }, headers: getHeaders() })
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        });
    }

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