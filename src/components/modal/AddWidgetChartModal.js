import React, { useState, useEffect, useContext } from "react";
import CustomModal from "./Modal";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { apiDevice } from '../../utils/apiManager/apiDevice';
import WorkspaceContext from "../../context/workspace-context";
import { nanoid } from 'nanoid';

export default function AddChartValueModal({ open, onClose, addWidget }) {
  const { workspace } = useContext(WorkspaceContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [devices, setDevices] = useState([]);
  const [fields, setFields] = useState([]);
  const { getDevicesByWorkspace } = apiDevice();
  const [selectedDeviceSerial, setSelectedDeviceSerial] = useState("");
  const [selectedValueField, setSelectedValueField] = useState("");

  useEffect(() => {
    updateDevices();
  }, []);

  const updateDevices = () => {
    getDevicesByWorkspace(workspace.id)
      .then((res) => {
        if (res != null) {
          console.log("Devices exist in db!");
          setDevices(res);
        } else {
          setDevices([]);
        }
      })
  };

  const filterByDeviceId = id => {
    const device = devices.filter(device => device.id === id);
    setSelectedDeviceSerial(device[0].id);
    if (device[0].fields != null && device[0].fields != "") {
      console.log("Device fields exist!");
      setFields(JSON.parse(device[0].fields));
    } else {
      setFields([]);
    }
  }
  
  const handleChange = (event) => {
    setErrorMessage(null);
    const { name, value } = event.target;
    setFormData(formData => ({...formData, [name]: value}));
    console.log(formData);
  }

  const handleSubmit = (event) => {
    // Reset errors
    setErrorMessage(null);

    let name = formData.name;
    let subheading = formData.subheading;

    // Add the widget to the dashboard
    const newWidget = {
      _uid: nanoid(),
      component: "chart",
      title: name,
      headline: subheading,
      topicSerial: selectedDeviceSerial,
      topicIdentifier: selectedValueField
    };
    addWidget(newWidget);
    onClose();
  }

  return (
    <>
      <CustomModal onClose={() => onClose()} visible={open}>
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed outline-none focus:outline-none">
          <div className="relative w-auto my-10 mx-auto max-w-5xl">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-dark-purple px-4 py-3 sm:px-6">
                <h1 className="text-lg text-gray-300 font-bold mt-2 pr-48">Edit Chart Widget</h1>
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
                      </TabList>
                      <TabPanel className="space-y-6 mt-6">
                        <div>
                          <label className="label">
                            Title
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={handleChange}
                            required
                            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                            placeholder="New Value Widget"
                          />
                        </div>
                        <div>
                          <label className="label">
                            Subheading
                          </label>
                          <input
                            id="subheading"
                            name="subheading"
                            type="text"
                            onChange={handleChange}
                            required
                            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                            placeholder="Current room temperature"
                          />
                        </div>
                      </TabPanel>
                      <TabPanel className="space-y-6 mt-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Data tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.
                        </p>
                        <div className="field">
                          <label>Source</label>
                          <div className="control">
                            <div className="flex">
                              <div className="w-1/2 px-2">
                                <div className="nobulma">
                                  <div className="flex justify-between items-end">
                                    <label className="block text-sm font-medium text-gray-700">Device</label>
                                  </div>
                                  <div className="mt-1 relative outline-none focus:outline-none">
                                    <select id="device" className="focus:ring-0 block w-full sm:text-sm border-gray-300 focus:border-gray-500 rounded-none rounded-r-md rounded-l-md false false" placeholder="Device" onChange={e => filterByDeviceId(e.target.value)} required>
                                      <option value=""></option>
                                      {devices.map((device) => <option key={device.id} value={device.id}>{device.name}</option>)}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="w-1/2 px-2">
                                <div className="nobulma">
                                  <div className="flex justify-between items-end">
                                    <label className="block text-sm font-medium text-gray-700">Field</label>
                                  </div>
                                  <div className="mt-1 relative outline-none focus:outline-none">
                                    <select id="field" className="focus:ring-0 block w-full sm:text-sm border-gray-300 focus:border-gray-500 rounded-none rounded-r-md rounded-l-md false false" onChange={(e) => setSelectedValueField(e.target.value)} placeholder="Field" required>
                                      <option value=""></option>
                                      <option value=""></option>
                                      {fields.map((field) => <option key={field.identifier} value={field.identifier}>{field.name}</option>)}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
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
      </CustomModal>
    </>
  );
};