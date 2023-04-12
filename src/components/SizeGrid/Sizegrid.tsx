import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import size from "../../assets/icons/sizechart.jpeg";

interface PropsType {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Sizegrid = ({ isOpen, setIsOpen }: PropsType) => {

    return (
        < div
            className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-flow-row place-items-center gap-4 max-w-7xl mx-auto`}
            id="speakers-grid"
        >
            <Transition
                show={isOpen}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Dialog open={isOpen} onClose={() => { setIsOpen(false) }}>
                    <div className="fixed inset-0 bg-black/75" aria-hidden="true" />

                    {/* Full-screen container to center the panel */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel>
                            <div className="border-2 rounded-lg shadow-lg flex flex-col bg-white dark:bg-black outline-none focus:outline-none max-w-lg">
                                <div className="px-2 py-2 flex-auto">
                                    <img src={size} alt="" />
                                </div>
                                <button
                                    className="text-google-red background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default Sizegrid