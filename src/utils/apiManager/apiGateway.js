import apiMethods from "./useApiMethods";
import ENDPOINTS from "./endpoints";

export function apiGateway() {
    const { get } = apiMethods();

    const getGatewaysByWorkspace = (id) => {
        const url = ENDPOINTS.GET_GATEWAYS_BY_WORKSPACE(id);
        return get(url);
    }
    return {
        getGatewaysByWorkspace
    };
}