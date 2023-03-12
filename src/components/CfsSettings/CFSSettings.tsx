import { FC, useEffect, useState } from 'react'
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa"
import { MultiSelectOptionsType, TalkData } from '../../assets/models/speaker/datatype'
import { ApiDeleteTalk } from '../../services/speaker.service'
import CfsModal from './CfsModal'

interface TalkProps {
    talkData?: TalkData[];
    technologiesList: MultiSelectOptionsType[];
    refreshTalkList: any;
}

const CFSSettings: FC<TalkProps> = ({ talkData, technologiesList, refreshTalkList }) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [formaData, setFormData] = useState<TalkData>({} as TalkData)

    const handleFormData = (i: TalkData) => {
        setFormData({ ...formaData, id: i.id, title: i.title, format: i.format, description: i.description, overview: i.overview, technologies: [...i.technologies], event: i.event, speakers: i.speakers })
    }

    useEffect(() => {
        refreshTalkList();
    }, [isModalOpen])

    async function deleteTalk(i: TalkData) {
        let result = await ApiDeleteTalk(i.id + '');
        if (result.status === 204) {
            refreshTalkList();
        }
    }

    return (
        <>
            <div className=' w-full'>
                {isModalOpen &&
                    <div className='absolute backdrop-blur-md z-50 flex w-full m-auto item-center justify-center'>
                        <CfsModal technologiesList={technologiesList} setModalOpen={setModalOpen} formData={formaData} />
                    </div>}
                <div className=' relative flex  flex-col  justify-center items-center  w-full mt-10'>
                    {talkData?.map((i: TalkData, key: number) => {
                        return (
                            <div className='w-full md:w-5/6 lg:w-4/6' key={key}>
                                <div className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                    <span className=" my-1 text-gray-900 dark:text-white">
                                        <span className='text-xl font-bold'>Submitted On: </span>
                                    </span>
                                    <time className="text-lg underline text-gray-900 dark:text-white">
                                        {i.added_at && new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.parse(i.added_at))}
                                    </time>
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
                                                <div className='flex flex-row space-x-2'>
                                                    <span className={`inline-flex gap-2 justify-between mt-2 
                                                                        bg-google-${i.status === 'review' ? 'yellow' : i.status === 'accepted' ? 'green' : 'red'} items-center py-1.5 px-5 font-normal text-black p-1 rounded-md`}>
                                                        <p className='font-bold text-lg capitalize'>
                                                            {i.status}
                                                        </p>
                                                    </span>
                                                    {
                                                        i.status === 'review' &&
                                                        <>
                                                            <span className='inline-flex cursor-pointer gap-2 justify-between mt-2 bg-google-blue items-center py-1.5 px-5 font-normal text-black p-1'>
                                                                <FaRegEdit className='cursor-pointer' onClick={() => {
                                                                    setModalOpen(true)
                                                                    handleFormData(i)
                                                                }} size={24} />
                                                            </span>
                                                            <span className='inline-flex cursor-pointer gap-2 justify-between mt-2 bg-google-red items-center py-1.5 px-5 font-normal text-black p-1'>
                                                                <FaRegTrashAlt className='cursor-pointer' fill='black' onClick={() => {
                                                                    deleteTalk(i);
                                                                }} size={24} />
                                                            </span>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </li>

                                    </ol>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CFSSettings