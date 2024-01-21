import apiMethods from "./useApiMethods";
import ENDPOINTS from "./endpoints";

export function apiDashboard() {
    const { post } = apiMethods();

    const createDashboard = (params) => {
        const url = ENDPOINTS.CREATE_DASHBOARD();
        return post(url, params);
    };

    return {
        createDashboard
    };
}