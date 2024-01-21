import apiMethods from "./useApiMethods";
import ENDPOINTS from "./endpoints";

export function apiWorkspace() {
    const { get, post } = apiMethods();

    const getWorkspaceByUsername = (username) => {
        const url = ENDPOINTS.GET_WORKSPACES_BY_USERNAME(username);
        return get(url);
    }

    const createWorkspace = (params) => {
        const url = ENDPOINTS.CREATE_WORKSPACE();
        return post(url, params);
    };

    return {
        getWorkspaceByUsername,
        createWorkspace
    };
}