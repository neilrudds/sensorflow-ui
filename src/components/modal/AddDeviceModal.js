import React, { useState, useContext, useEffect } from "react";
import CustomModal from "../modal/Modal";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { RiAddFill, RiFingerprintFill, RiPassPendingLine, RiPriceTag3Line, RiHashtag, RiFahrenheitFill } from "react-icons/ri";
import WorkspaceContext from "../../context/workspace-context";
import AuthContext from "../../context/auth-context";
import { apiDevice } from '../../utils/apiManager/apiDevice';
import { apiGateway } from '../../utils/apiManager/apiGateway';

const AddDeviceModal = ({ onAdd }) => {
    const { workspace } = useContext(WorkspaceContext);
    let auth = useContext(AuthContext);
    let user = JSON.parse(auth.user);
    const [showModal, setShowModal] = useState(false);
    const [postId, setPostId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState(null);
    const [fields, setFields] = useState([{ id: 1, name: "", identifier: "", type: "Float", unit: "" }]);
    const [gateways, setGateways] = useState([]);
    const { createDevice } = apiDevice();
    const { getGatewaysByWorkspace } = apiGateway();
    const [selectedGateway, setSelectedGateway] = useState("");

    useEffect(() => {
        updateGateways();
    }, []);

    const updateGateways = () => {
        getGatewaysByWorkspace(workspace.id)
            .then((res) => {
                console.log(JSON.stringify(res));
                if (res != null) {
                    console.log("Gateways exist in db!");
                    setGateways(res);
                } else {
                    setGateways([]);
                }
            })
    };

    const createField = () => {
        setFields([
            ...fields,
            { id: fields.length + 1, name: "", identifier: "", type: "Float", unit: "" }
        ]);
    };

    const handleFieldChange = (e, index) => {
        const { id, value } = e.target;
        const list = [...fields];
        list[index][id] = value;
        setFields(list);
        console.log(JSON.stringify(fields));
    }

    const handleChange = (event) => {
        setPostId(null); setErrorMessage(null);
        setErrorMessage(null);
        const { id, value } = event.target;
        setFormData(formData => ({ ...formData, [id]: value }));
    }

    const handleSubmit = async () => {
        // Reset errors
        setPostId(null); setErrorMessage(null);

        const params = { id: formData.serial, name: formData.name, workspaceId: workspace.id, gatewayId: selectedGateway, fields: JSON.stringify(fields) };
        try {
            createDevice(params)
                .then((res) => {
                    console.log(res);
                    setPostId(res.Id);
                })
            onAdd();
            setShowModal(false);
        } catch (error) {
            setErrorMessage(error.toString());
            console.error('There was an error; ', error);
        }
    }

    return (
        <>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"
                onClick={() => { setShowModal(true); setErrorMessage(null) }}
            >
                <span className="text-2xl block float-left">
                    <RiAddFill />
                </span>
                <span className="text-base font-medium flex-1 duration-200">
                    Add Device
                </span>
            </li>
            <CustomModal
                onClose={() => setShowModal(false)}
                visible={showModal}>(
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed outline-none focus:outline-none">
                    <div className="relative w-auto my-10 mx-auto max-w-5xl">
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
                            <div className="bg-dark-purple px-4 py-3 sm:px-6">
                                <h1 className="text-lg text-gray-300 font-bold mt-2 pr-48">Add Device</h1>
                            </div>
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="text-center sm:mt-0">
                                        {errorMessage &&
                                            <h3 className="text-red-500"> {errorMessage} </h3>
                                        }
                                        <Tabs selectedTabClassName="me-2 inline-block p-4 border-b-2 border-blue-500 text-blue-600">
                                            <TabList className="flex flex-wrap -mb-px text-sm font-medium text-center border-b border-gray-200">
                                                <Tab className="me-2 inline-block p-4 cursor-pointer hover:border-b-2">Basic</Tab>
                                                <Tab className="me-2 inline-block p-4 cursor-pointer hover:border-b-2">Data</Tab>
                                                <Tab className="me-2 inline-block p-4 cursor-pointer hover:border-b-2">MQTT Configuration</Tab>
                                            </TabList>
                                            <TabPanel className="space-y-6 mt-6">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    You can add one device at a time. Serial numbers are used to identify devices when ingesting data. You can provide your own or let us auto-generate one. It can't be changed later.</p>
                                                <div className="space-y-3">
                                                    <div className="flex flex-col">
                                                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                                    <table className="min-w-full divide-y divide-gray-200">
                                                                        <thead className="bg-gray-50">
                                                                            <tr>
                                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group px-0 py-0">
                                                                                    <div className="flex space-x-2">
                                                                                        <span>Serial Number</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group px-0 py-0">
                                                                                    <div className="flex space-x-2">
                                                                                        <span>Name</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group px-0 py-0">
                                                                                    <div className="flex space-x-2">
                                                                                        <span>Location</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group px-0 pt-4">
                                                                                    <div className="flex space-x-2">
                                                                                    </div>
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                                            <tr>
                                                                                <td className="px-6 py-4 whitespace-nowrap align-top">
                                                                                    <div className="nobulma">
                                                                                        <div className="false flex rounded-md shadow-sm">
                                                                                            <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                                                                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                                                    <RiFingerprintFill />
                                                                                                </div>
                                                                                                <input type="text" id="serial" className="focus:ring-0 block w-full sm:text-sm border-gray-300 focus:border-gray-500 rounded-none rounded-r-md rounded-l-md pl-10 false font-mono tracking-tighter" autocomplete="off" placeholder="Auto-Generate" onChange={handleChange} required />
                                                                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                                                                    <span></span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td className="px-6 py-4 whitespace-nowrap align-top">
                                                                                    <div className="nobulma">
                                                                                        <div className="false flex rounded-md shadow-sm">
                                                                                            <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                                                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                                                    <RiPassPendingLine />
                                                                                                </div>
                                                                                                <input type="text" id="name" className="focus:ring-0 block w-full sm:text-sm border-gray-300 focus:border-gray-500 rounded-none rounded-r-md rounded-l-md pl-10 false" autocomplete="off" placeholder="Name" onChange={handleChange} required />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td className="px-6 py-4 whitespace-nowrap align-top">
                                                                                    <div className="nobulma">
                                                                                        <div className="false flex rounded-md shadow-sm">
                                                                                            <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                                                                                <input type="text" id="location" className="focus:ring-0 block w-full sm:text-sm border-gray-300 focus:border-gray-500 rounded-none rounded-r-md rounded-l-md false false" autocomplete="off" placeholder="Location" onChange={handleChange} required />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                            <TabPanel className="space-y-6 mt-6">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Fields describe the data the device will publish.</p>
                                                <button onClick={createField}>
                                                    <span className="text-2xl block float-left">
                                                        <RiAddFill />
                                                    </span>
                                                    <span className="text-base font-medium flex-1 duration-200">
                                                        Add Field
                                                    </span>
                                                </button>
                                                <div className="space-y-3">
                                                    <div className="flex flex-col">
                                                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                                    <table className="min-w-full divide-y divide-gray-200">
                                                                        <thead className="bg-gray-50">
                                                                            <tr>
                                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group px-0 py-0">
                                                                                    <div className="flex space-x-2">
                                                                                        <span>Name</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group px-0 py-0">
                                                                                    <div className="flex space-x-2">
                                                                                        <span>Identifier</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group px-0 py-0">
                                                                                    <div className="flex space-x-2">
                                                                                        <span>Type</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group px-0 pt-4">
                                                                                    <div className="flex space-x-2">
                                                                                        <span>Unit</span>
                                                                                    </div>
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                                            {fields.map((row, i) => (
                                                                                <tr>
                                                                                    <td className="px-6 py-4 whitespace-nowrap align-top">
                                                                                        <div className="nobulma">
                                                                                            <div className="false flex rounded-md shadow-sm">
                                                                                                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                                                                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                                                        <RiPriceTag3Line /> 
                                                                                                    </div>
                                                                                                    <input type="text" id="name" className="focus:ring-0 block w-full sm:text-sm border-gray-300 focus:border-gray-500 rounded-none rounded-r-md rounded-l-md pl-10 false font-mono tracking-tighter" autocomplete="off" placeholder="Name" onChange={(e) => handleFieldChange(e, i)} required />
                                                                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="px-6 py-4 whitespace-nowrap align-top">
                                                                                        <div className="nobulma">
                                                                                            <div className="false flex rounded-md shadow-sm">
                                                                                                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                                                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                                                        <RiHashtag />
                                                                                                    </div>
                                                                                                    <input type="text" id="identifier" className="focus:ring-0 block w-full sm:text-sm border-gray-300 focus:border-gray-500 rounded-none rounded-r-md rounded-l-md pl-10 false" autocomplete="off" placeholder="Identifier" onChange={(e) => handleFieldChange(e, i)} required />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="px-6 py-4 whitespace-nowrap align-top">
                                                                                        <div className="nobulma">
                                                                                            <div className="false flex rounded-md shadow-sm">
                                                                                                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                                                                                    <select id="type" className="focus:ring-0 block w-full sm:text-sm border-gray-300 focus:border-gray-500 rounded-none rounded-r-md rounded-l-md false false" placeholder="Type" onChange={(e) => handleFieldChange(e, i)} required>
                                                                                                        <option value="float">
                                                                                                            Float
                                                                                                        </option>
                                                                                                        <option value="integer">
                                                                                                            Integer
                                                                                                        </option>
                                                                                                        <option value="boolean">
                                                                                                            Boolean
                                                                                                        </option>
                                                                                                        <option value="string">
                                                                                                            String
                                                                                                        </option>
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="px-6 py-4 whitespace-nowrap align-top">
                                                                                        <div className="nobulma">
                                                                                            <div className="false flex rounded-md shadow-sm">
                                                                                                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                                                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                                                        <RiFahrenheitFill />
                                                                                                    </div>
                                                                                                    <input type="text" id="unit" className="focus:ring-0 block w-full sm:text-sm border-gray-300 focus:border-gray-500 rounded-none rounded-r-md rounded-l-md pl-10 false" autocomplete="off" placeholder="Unit" onChange={(e) => handleFieldChange(e, i)} required />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                            <TabPanel className="space-y-6 mt-6">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    The MQTT integration allows you to connect to an external MQTT broker.</p>
                                                <div className="space-y-3">
                                                    <div className="flex flex-col">
                                                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                                <div className="space-y-12">
                                                                    <div>
                                                                        <div class="flex justify-between">
                                                                            <label class="text-sm text-gray-700 font-medium">MQTT Server</label>
                                                                        </div>
                                                                        <div class="flex items-center space-x-4">
                                                                            <div class="flex-grow">
                                                                                <div class="mt-1 relative">
                                                                                    <select id="type" className="focus:ring-0 block w-full sm:text-sm border-gray-300 focus:border-gray-500 rounded-none rounded-r-md rounded-l-md false false" placeholder="Type" value={selectedGateway} onChange={(e) => setSelectedGateway(e.target.value)} required>
                                                                                        <option value=""></option>
                                                                                        { gateways.map((gateway) => <option value={gateway.id}>{gateway.name}</option> )}
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                        </Tabs>
                                    </div>                               </div>
                            </div>
                            <div className="px-2 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-dark-purple text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => handleSubmit()}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                ) </CustomModal>
        </>
    );
};

export default AddDeviceModal;