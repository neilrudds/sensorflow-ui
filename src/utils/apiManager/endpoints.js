const ENDPOINTS = {
    CREATE_DASHBOARD: () =>
    '/Dashboards',
    GET_DASHBOARD: (id) =>
    `/Dashboards/${id}`,
    UPDATE_DASHBOARD: (id) =>
    `/Dashboards/${id}`,
    GET_WORKSPACES_BY_USERNAME: (username) =>
    `/Workspaces/getByUsername/${username}`,
    CREATE_WORKSPACE: () =>
    '/Workspaces',
    USER_LOGIN: () =>
    '/User/login',
    CREATE_DEVICE: () =>
    '/Devices',
    GET_DEVICES_BY_WORKSPACE: (id) =>
    `/Devices/getByWorkspaceId/${id}`,
    GET_GATEWAYS_BY_WORKSPACE:  (id) =>
    `/Gateways/getByWorkspaceId/${id}`
};

export default ENDPOINTS;