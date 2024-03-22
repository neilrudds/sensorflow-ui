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
    fetch('http://ec2-54-242-250-176.compute-1.amazonaws.com:4000/api/User/login', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = data || response.status;
                return Promise.reject(error);
            }
            //localStorage.setItem("user", JSON.stringify(data));
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
      //localStorage.removeItem("user");
      callback();
    }
  };
  
  export { authProvider };