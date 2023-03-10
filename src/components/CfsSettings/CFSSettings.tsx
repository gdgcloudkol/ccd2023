import React, { useState } from 'react'
import { TalkData } from '../../assets/models/speaker/datatype'
import { RiDeleteBin6Line } from "react-icons/ri"
import { FaRegEdit } from "react-icons/fa"
import CfsModal from './CfsModal'

interface TalkProps {
    talkList: TalkData[]
}
const CFSSettings = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)


    return (
        <>
            {isModalOpen &&
                <div className='absolute backdrop-blur-md z-50 flex w-full h-full item-center justify-center'>
                    <CfsModal setModalOpen={setModalOpen} />
                </div>}
            <div className=' relative w-full mt-10'>
                {[1, 2, 3, 4, 5]?.map((i: number, key: number) => {
                    return (
                        <div className='text-white border rounded-md py-3 bg-g-gray-9  mb-3 w-2/3 m-auto flex justify-between items-center' key={key}>
                            <h2 className=" w-fit pl-10">This is a test talk {i}</h2>
                            <div className=" w-1/2">
                                <div
                                    className="flex">
                                    <div className=" flex-auto items-center ">
                                        <div className=' text-center'>
                                            Submitted
                                        </div>
                                        <div className=" flex items-center leading-[1.3rem]  before:mr-2  before:flex-1  after:ml-2 after:h-px after:w-full after:flex-1 after:bg-[#e0e0e0] after:content-[''] focus:outline-none dark:before:bg-neutral-600 dark:after:bg-neutral-600 ">
                                            <span className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-google-yellow text-sm font-medium text-[#40464f]">
                                                1
                                            </span>
                                        </div>
                                    </div>
                                    <div className=" flex-auto justify-center items-center justify-cneter ">
                                        <div className=" text-center ">
                                            Under review
                                        </div>
                                        <div className="flex items-center leading-[1.3rem]  before:mr-2 before:h-px before:w-full before:flex-1 before:bg-[#e0e0e0] before:content-[''] after:ml-2 after:h-px after:w-full after:flex-1 after:bg-[#e0e0e0] after:content-[''] focus:outline-none dark:before:bg-neutral-600 dark:after:bg-neutral-600 ">
                                            <span className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-[#ebedef] text-sm font-medium text-[#40464f]">
                                                2
                                            </span>
                                        </div>

                                    </div>
                                    <div className="flex-auto justify-center items-center justify-cneter ">
                                        <div className=' text-center'>
                                            Status
                                        </div>
                                        <div className="flex items-center leading-[1.3rem]  before:mr-2 before:h-px before:w-full before:flex-1 before:bg-[#e0e0e0] before:content-[''] after:ml-2   after:flex-1   focus:outline-none dark:before:bg-neutral-600 dark:after:bg-neutral-600 ">
                                            <span
                                                className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-[#ebedef] text-sm font-medium text-[#40464f]">
                                                3
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=' flex mr-10 gap-10'>
                                <RiDeleteBin6Line size={24} />
                                <FaRegEdit onClick={() => setModalOpen(true)} size={24} />
                            </div>
                        </div>)
                })}</div>

        </>
    )
}

export default CFSSettings