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
    '/User/login'
};

export default ENDPOINTS;