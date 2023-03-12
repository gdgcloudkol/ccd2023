import React, { useState } from 'react'
import { MultiValue } from 'react-select';
import Select from 'react-select';
import { MultiSelectOptionsType, TalkData } from '../../assets/models/speaker/datatype';
import ReactDOM from 'react-dom';
import { ApiUpdateTalk } from '../../services/speaker.service';

interface SetModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    formData: FormData;
    technologiesMap?: { label: string; value: number }[];
    technologiesList?: MultiSelectOptionsType[];
}

interface FormData {
    id?: number;
    title: string;
    description: string;
    overview: string;
    event?: number;
    format: string,
    speakers?: number[]
    technologies: number[]
}

const CfsModal: React.FC<SetModal> = ({ setModalOpen, formData, technologiesList }) => {
    const [editedData, setEditedData] = useState<FormData>({
        id: formData.id,
        title: formData.title,
        description: formData.description,
        overview: formData.overview,
        format: formData.format,
        technologies: [...formData.technologies]
    })

    const handleMultiChange = (e: MultiValue<any>) => {
        let temp = e.map((i: any) => { return i.value })
        setEditedData({ ...editedData, technologies: temp })
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        let current = e.target.name;
        setEditedData({ ...editedData, [current]: e.target.value });
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        let result = await ApiUpdateTalk({ ...editedData, speakers: formData.speakers } as TalkData);
        if (result.status === 200) {
            setModalOpen(false);
        }
    }

    const setter = () => {
        let techData: MultiSelectOptionsType[] = []
        formData.technologies.map((id: number) => {
            technologiesList?.map((data: MultiSelectOptionsType) => {
                if (data.value === id) techData.push({ label: data.label, value: data.value })
            })
        })
        return techData
    }
    return ReactDOM.createPortal(
        <>
            <div className="z-[99] backdrop-blur-md fixed pl-10 pr-10 md:w-full w-full mx-auto lg:w-full top-0 bottom-0 flex justify-center items-center">
                <div className="relative  bg-white rounded-lg shadow dark:bg-gray-700 overflow-y-scroll flex items-center justify-center  w-full md:w-3/6 lg:w-2/6 h-5/6 ">
                    <div className="relative mt-52 md:mt-30 lg:mt-[16rem] md:w-full">
                        <div className="px-6 py-6 lg:px-8">
                            <div className="flex mb-4 justify-between items-center align-middle">
                                <h3 className=" text-xl font-medium text-gray-900 dark:text-white">
                                    Edit Your Tallk
                                </h3>
                                <button onClick={() => { setModalOpen(false) }} type="button" className=" right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form className="space-y-2 lg:space-y-6" >
                                <div>
                                    <label htmlFor="title" className="block text-sm lg:text-lg font-medium text-gray-700 dark:text-gray-200">
                                        Title
                                    </label>
                                    <div className="mt-1">
                                        <input onChange={(e) => handleChange(e)} name="title" defaultValue={formData.title} type="text" autoComplete="" required id="title"
                                            className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm lg:text-lg`}

                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm lg:text-lg font-medium text-gray-700 dark:text-gray-200">
                                        Description
                                    </label>
                                    <div className="mt-1">
                                        <textarea rows={5} onChange={(e) => handleChange(e)} name="description" defaultValue={formData.description} autoComplete="" required id="description"
                                            className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm lg:text-lg`}

                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="overview" className="block text-sm lg:text-lg font-medium text-gray-700 dark:text-gray-200">
                                        Overview
                                    </label>
                                    <div className="mt-1">
                                        <textarea rows={10} onChange={(e) => handleChange(e)} name="overview" defaultValue={formData.overview} autoComplete="" required id="overview"
                                            className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm lg:text-lg                          
                                  `}

                                        />
                                    </div>
                                </div>
                                <div className='flex space-y-4 lg:space-x-4 lg:space-y-0 flex-col lg:flex-row'>
                                    <div className='cursor-not-allowed'>
                                        <label htmlFor="event" className="cursor-not-allowed block text-sm lg:text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">
                                            Event
                                        </label>
                                        <select name="event" required id="event" defaultValue={"GCCD '23"}
                                            className="cursor-not-allowed block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            <option disabled >GCCD '23</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="format" className="block text-sm lg:text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">
                                            Type of Talk
                                        </label>
                                        <select onChange={(e) => handleChange(e)} name="format" required id="format" defaultValue={formData.format}
                                            className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                        >

                                            <option value="short">Lightning Talk</option>
                                            <option value="medium">Regular Talk</option>
                                            <option value="long">Long Talk</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="technologies" className="block text-sm lg:text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">
                                        Technologies
                                    </label>
                                    <Select closeMenuOnSelect={false} isMulti options={technologiesList as MultiSelectOptionsType[]} name="technologies"
                                        onChange={handleMultiChange} defaultValue={setter() as MultiSelectOptionsType[]}
                                    />
                                </div>
                                <div className=" flex gap-3">
                                    <button onClick={() => { setModalOpen(false) }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
                                    <button onClick={(e) => handleSubmit(e)} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>, document.getElementById("app-modal") as Element,

    )
}

export default CfsModal