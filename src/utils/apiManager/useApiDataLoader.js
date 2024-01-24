import { useState, useEffect } from "react";

const apiStatus = {
    loading: 'loading',
    complete: 'complete',
    errored: 'errored'
}

const useApiDataLoader = (service) => {
    const [status, setStatus] = useState(apiStatus.loading);
    const [data, setData] = useState(null);

    useEffect(() => {
        service()
        .then((res) => {
            setData(res);
            setStatus(status.complete);
            console.info("Response: " + JSON.stringify(res)); 
        })
        .catch(() => {
            setStatus(status.errored);
        })
    }, [service]);

    return [status === apiStatus.loading, data, status === apiStatus.errored];
}

export default useApiDataLoader;