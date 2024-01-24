import apiMethods from "./useApiMethods";
import ENDPOINTS from "./endpoints";

export function apiDashboard() {
    const { get, post, put } = apiMethods();

    const createDashboard = (params) => {
        const url = ENDPOINTS.CREATE_DASHBOARD();
        return post(url, params);
    };

    const getDashboard = (id) => {
        const url = ENDPOINTS.GET_DASHBOARD(id);
        return get(url);
    }

    const updateDashboard = (id, params) => {
        const url = ENDPOINTS.UPDATE_DASHBOARD(id);
        return put(url, params);
    }

    return {
        createDashboard,
        getDashboard,
        updateDashboard
    };
}