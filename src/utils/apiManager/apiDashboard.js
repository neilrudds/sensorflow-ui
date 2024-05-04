import apiMethods from "./useApiMethods";
import ENDPOINTS from "./endpoints";

export function apiDashboard() {

    const { get, post, put } = apiMethods(); // Destructure apiMethods

    // Define createDashboard function, accepting parameter object (Request Body)
    const createDashboard = (params) => {
        const url = ENDPOINTS.CREATE_DASHBOARD(); // Idnetify endpoint to be used
        return post(url, params); // Return the response of the post method
    };

    // Define getDashboard function, accepting id object
    const getDashboard = (id) => {
        const url = ENDPOINTS.GET_DASHBOARD(id); // id will be appended to the GET_DASHBOARD endpoint URL
        return get(url); // Return the response of the get method passed using the complete URL
    }

    // Define updateDashboard function, accepts both id and parmams object
    const updateDashboard = (id, params) => {
        const url = ENDPOINTS.UPDATE_DASHBOARD(id); // id is appended to the endpoint URL
        return put(url, params); // Return the response of the put method, passed using the complete URL and request body
    }

    // Export the defined functions
    return {
        createDashboard,
        getDashboard,
        updateDashboard
    };
}