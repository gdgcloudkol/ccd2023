import React from 'react'
import { TalkData } from '../../assets/models/speaker/datatype'
import { RiDeleteBin6Line } from "react-icons/ri"

interface TalkProps {
    talkList: TalkData[]
}
const CFSSettings = () => {

    return (
        <div className='w-full'>{[1, 2]?.map((i: number, key: number) => {
            return (
                <div className='text-white flex justify-between items-center' key={key}>
                    <div className="">test</div>
                    <div className=" w-1/2">
                        <div
                            className="flex">
                            <div className=" flex-auto justify-center items-center justify-cneter ">
                                <div className=' text-center'>
                                    submitted
                                </div>
                                <div className=" flex items-center leading-[1.3rem]  before:mr-2  before:flex-1  after:ml-2 after:h-px after:w-full after:flex-1 after:bg-[#e0e0e0] after:content-[''] focus:outline-none dark:before:bg-neutral-600 dark:after:bg-neutral-600 ">
                                    <span className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-google-yellow text-sm font-medium text-[#40464f]">
                                        1
                                    </span>
                                </div>
                            </div>
                            <div className=" flex-auto justify-center items-center justify-cneter ">
                                <div className=" text-center ">
                                    under review
                                </div>
                                <div className="flex items-center leading-[1.3rem]  before:mr-2 before:h-px before:w-full before:flex-1 before:bg-[#e0e0e0] before:content-[''] after:ml-2 after:h-px after:w-full after:flex-1 after:bg-[#e0e0e0] after:content-[''] focus:outline-none dark:before:bg-neutral-600 dark:after:bg-neutral-600 ">
                                    <span className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-[#ebedef] text-sm font-medium text-[#40464f]">
                                        2
                                    </span>
                                </div>

                            </div>
                            <div className="flex-auto justify-center items-center justify-cneter ">
                                <div className=' text-center'>
                                    status
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
                    <RiDeleteBin6Line />
                </div>)
        })}</div>
    )
}

export default CFSSettings