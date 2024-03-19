import apiMethods from "./useApiMethods";
import ENDPOINTS from "./endpoints";

export function apiDevice() {
    const { get, post, put } = apiMethods();

    const createDevice = (params) => {
        const url = ENDPOINTS.CREATE_DEVICE();
        return post(url, params);
    };

    const getDevice = (id) => {
        const url = ENDPOINTS.GET_DEVICE(id);
        return get(url);
    }

    const getDevicesByWorkspace = (id) => {
        const url = ENDPOINTS.GET_DEVICES_BY_WORKSPACE(id);
        return get(url);
    }

    const updateDevice = (id, params) => {
        const url = ENDPOINTS.UPDATE_DEVICE(id);
        return put(url, params);
    }

    return {
        createDevice,
        getDevice,
        getDevicesByWorkspace,
        updateDevice
    };
}