import apiMethods from "./useApiMethods";
import ENDPOINTS from "./endpoints";

export function apiAuth() {
    const { post } = apiMethods();

    const userLogin = (params) => {
        const url = ENDPOINTS.CREATE_DASHBOARD();
        return post(url, params);
    };

    return {
        userLogin
    };
}