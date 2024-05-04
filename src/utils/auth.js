import { config } from './Constants'

const BASE_URL = config.url.API_URL_LOGIN;

// AuthProvider will perform API request to the backend signin service
// the response will then be stored in the user object along with the resulting user
// authentication status
const authProvider = {
    isAuthenticated: false,
    user: null,
    error: null,
    signin(username, password, callback) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userName: username,
            password: password
          })
    };
    fetch(BASE_URL, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = data || response.status;
                return Promise.reject(error);
            }
            authProvider.isAuthenticated = true;
            authProvider.user = JSON.stringify(data);
            callback();
        })
        .catch(error => {
          console.error('There was an error!', error);
          authProvider.error = error;
        });
    },
    signout(callback) {
      authProvider.isAuthenticated = false;
      callback();
    }
  };
  
  export { authProvider };