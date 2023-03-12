import React, { FC, useEffect, useState } from 'react'
import { MultiSelectOptionsType, TalkData, TechTypeData } from '../../assets/models/speaker/datatype'
import { RiDeleteBin6Line } from "react-icons/ri"
import { FaRegEdit } from "react-icons/fa"
import CfsModal from './CfsModal'
import { ApiGetTalk, ApiTechnologies } from '../../services/speaker.service'

interface TalkProps {
    talkData?: Talk[]
    technologiesList: MultiSelectOptionsType[]
}
interface Talk {
    id?: number | undefined;
    title: string;
    added_at?: string;
    description: string;
    overview: string;
    event?: number;
    format: string;
    speakers: number[];
    technologies: number[]
}
const CFSSettings: FC<TalkProps> = ({ talkData, technologiesList }) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [formaData, setFormData] = useState<Talk>({ id: undefined, title: "", description: "", format: "", overview: "", event: 0, technologies: [], speakers: [] })

    const handleFormData = (i: Talk) => {
        setFormData({ ...formaData, id: i.id, title: i.title, format: i.format, description: i.description, overview: i.overview, technologies: [...i.technologies], event: i.event })
    }

    function randomColor() {
        return `hsl(${Math.floor(Math.random() * 360)}, 95%, 90%)`
    }

    return (
        <>
            <div className=' w-full'>
                {isModalOpen &&
                    <div className='absolute backdrop-blur-md z-50 flex w-full m-auto item-center justify-center'>
                        <CfsModal technologiesList={technologiesList} setModalOpen={setModalOpen} formData={formaData} />
                    </div>}
                <div className=' relative flex  flex-col  justify-center items-center  w-full mt-10'>
                    {talkData?.map((i: Talk, key: number) => {
                        return (
                            <div className='w-full md:w-5/6 lg:w-4/6' key={key}>
                                {/* <div className=' hidden md:hidden  text-white border rounded-md py-3 bg-g-gray-9  mb-3 w-2/3 m-auto lg:flex justify-between items-center'>
                                    <h2 className=" w-fit pl-10">{i.title}</h2>
                                    <div className=" w-1/2">
                                        <div
                                            className="flex">
                                            <div className=" flex-auto items-center ">
                                                <div className=' text-center'>
                                                    Submitted
                                                </div>
                                                <div className=" flex items-center leading-[1.3rem]  before:mr-2  before:flex-1  after:ml-2 after:h-px after:w-full after:flex-1 after:bg-[#e0e0e0] after:content-[''] focus:outline-none dark:before:bg-neutral-600 dark:after:bg-neutral-600 ">
                                                    <span className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-google-blue text-white text-sm font-medium ">
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
                                        <FaRegEdit onClick={() => {
                                            setModalOpen(true)
                                            handleFormData(i)
                                        }} size={24} />
                                    </div>
                                </div> */}
                                <div className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                    <time className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {i.added_at}</time>
                                    <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                                        <li>
                                            <div className="text-gray-600 dark:text-gray-400">
                                                <div className="text-base flex flex-col font-normal">
                                                    <span className=" my-1 text-gray-900 dark:text-white">
                                                        <span className='text-xl font-bold'>Title: </span>{i.title}
                                                    </span>
                                                    <span className=" my-2 text-gray-900 dark:text-white">
                                                        <span className="font-bold">Description: </span>{i.description.substring(0, 30) + "..."}
                                                    </span>
                                                    <span className=" my-2 text-gray-900 dark:text-white">
                                                        <span className="font-bold">Overview: </span>{i.overview.substring(0, 30) + "..."}
                                                    </span>

                                                </div>
                                                <span className={`inline-flex gap-2 justify-between mt-2 bg-google-yellow items-center text-xs py-1.5 px-5 font-normal text-black p-1 rounded-sm`}>
                                                    Under Review
                                                    <FaRegEdit onClick={() => {
                                                        setModalOpen(true)
                                                        handleFormData(i)
                                                    }} size={24} />
                                                </span>
                                            </div>
                                        </li>

                                    </ol>
                                </div>
                            </div>)
                    })}</div>
            </div>
        </>
    )
}

export default CFSSettings