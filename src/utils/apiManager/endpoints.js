const ENDPOINTS = {
    CREATE_DASHBOARD: () =>
    '/Dashboards',
    GET_WORKSPACES_BY_USERNAME: (username) =>
    `/Workspaces/getByUsername/${username}`,
    CREATE_WORKSPACE: () =>
    '/Workspaces',
    USER_LOGIN: () =>
    '/User/login'
};

export default ENDPOINTS;