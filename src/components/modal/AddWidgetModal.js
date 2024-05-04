import React, { useState } from "react";
import CustomModal from "../modal/Modal";
import { RiAddFill } from "react-icons/ri";
import { GoNumber } from "react-icons/go";
import { PiChartLine } from "react-icons/pi";
import AddWidgetValueModal from "./AddWidgetValueModal";
import AddWidgetChartModal from "./AddWidgetChartModal";


const AddWidgetModal = ({ addWidget }) => {
    const [showModal, setShowModal] = useState(false);
    const [showValueModal, setShowValueModal] = useState(false);
    const [showChartModal, setShowChartModal] = useState(false);

    const openWidgetConfigModal = (type) => {
        setShowModal(false);

        switch (type) {
            case 'value':
                return setTimeout(() => { setShowValueModal(true); }, 100);
            case 'chart':
                return setTimeout(() => { setShowChartModal(true); }, 100);
            default:
                console.log("Undefined configuration type: " + type);
        }
    }

    return (
        <>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"
                onClick={() => { setShowModal(true); }}
            >
                <span className="text-2xl block float-left">
                    <RiAddFill />
                </span>
                <span className="text-base font-medium flex-1 duration-200">
                    Add Widget
                </span>
            </li>
            <CustomModal visible={showModal} onClose={() => setShowModal(false)}>
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed outline-none focus:outline-none">
                    <div className="relative w-auto my-10 mx-auto max-w-5xl">
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
                                                onClick={() => { openWidgetConfigModal("value"); }}>
                                                <div className="flex-shrink-0">
                                                    <GoNumber />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="cursor-pointer">
                                                        <span className="absolute inset-0" aria-hidden="true"></span>
                                                        <p className="text-sm font-medium text-gray-900">Value</p>
                                                        <p className="text-sm text-gray-500 truncate">Displays a measurement</p></div>
                                                </div>
                                            </div>
                                            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
                                                onClick={() => { openWidgetConfigModal("chart"); }}>
                                                <div className="flex-shrink-0">
                                                    <PiChartLine />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="cursor-pointer">
                                                        <span className="absolute inset-0" aria-hidden="true"></span>
                                                        <p className="text-sm font-medium text-gray-900">Chart</p>
                                                        <p className="text-sm text-gray-500 truncate">Displays a chart</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CustomModal>
            <AddWidgetValueModal open={showValueModal} onClose={() => setShowValueModal(false)} addWidget={addWidget} />
            <AddWidgetChartModal open={showChartModal} onClose={() => setShowChartModal(false)} addWidget={addWidget} />
        </>
    );
};

export default AddWidgetModal;