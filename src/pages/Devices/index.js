import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SubHeader from "../../components/ui/SubHeader";
import AddDeviceModal from "../../components/modal/AddDeviceModal";
import { DeviceTable } from "./DeviceTable";
import { apiDevice } from "../../utils/apiManager/apiDevice";

export default function Devices() {
    let { workspaceId } = useParams();
    const { getDevicesByWorkspace } = apiDevice();
    const [devices, setDevices] = useState([]);

    const updateDevices = () => {
        getDevicesByWorkspace(workspaceId)
            .then((res) => {
                console.log(JSON.stringify(res));
                if (res != null) {
                    console.log("Devices exist in db!");
                    setDevices(res);
                } else {
                    setDevices([]);
                }
            })
    };

    useEffect(() => {
        updateDevices();
    }, [workspaceId]);

    return (
        <>
            <SubHeader title="Devices" />
            <AddDeviceModal onAdd={updateDevices} />
            <DeviceTable devices={devices} />
        </>
    )
}