import React, { useState } from 'react'
import { MultiValue } from 'react-select';
import Select from 'react-select';
import { MultiSelectOptionsType } from '../../assets/models/speaker/datatype';

interface SetModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    formData: Sample
}
interface Sample {
    title: string;
    description: string;
    overview: string;
    event?: number;
    format: string,
    speakers: number[]
    technologies: number[]
}
const CfsModal: React.FC<SetModal> = ({ setModalOpen, formData }) => {
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [topics_of_expertise, setTopics_of_expertise] = useState<number[]>([]);
    const [technologies, setTechnologied] = useState<number[]>([]);
    const [technologiesList, setTechnologiesList] = useState<MultiSelectOptionsType[]>([]);


    const handleMultiChange = (e: MultiValue<MultiSelectOptionsType>, type: 's' | 't') => {
        if (type === 's')
            setTopics_of_expertise(e.map((i: MultiSelectOptionsType) => i.value));
        else if (type === 't')
            setTechnologied(e.map((i: MultiSelectOptionsType) => i.value));
    };

    return (
        <>
            <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className=" w-full flex justify-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
                <div className="relative w-full h-full max-w-md md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => { setModalOpen(false) }} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                            <form className="space-y-6" action="submit">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Title
                                    </label>
                                    <div className="mt-1">
                                        <input name="title" defaultValue={formData.title} type="text" autoComplete="" required id="title"
                                            className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm                          
                                  ${fieldErrors["title"] && 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'}`}

                                        />
                                    </div>
                                    {fieldErrors["title"] && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {fieldErrors["title"]}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Description
                                    </label>
                                    <div className="mt-1">
                                        <input name="description" defaultValue={formData.description} type="text" autoComplete="" required id="description"
                                            className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm                          
                                  ${fieldErrors["description"] && 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'}`}

                                        />
                                    </div>
                                    {fieldErrors["description"] && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {fieldErrors["description"]}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="overview" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Overview
                                    </label>
                                    <div className="mt-1">
                                        <input name="overview" defaultValue={formData.overview} type="text" autoComplete="" required id="overview"
                                            className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm                          
                                  ${fieldErrors["overview"] && 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'}`}

                                        />
                                    </div>
                                    {fieldErrors["overview"] && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {fieldErrors["overview"]}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="event" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                        Event
                                    </label>
                                    <select name="event" required id="event"
                                        className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option disabled >GCCD</option>
                                    </select>
                                    {fieldErrors["event"] && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {fieldErrors["event"]}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="format" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                        Type of Talk
                                    </label>
                                    <select name="format" required id="format"
                                        className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option selected value="" >{formData.format}</option>
                                        <option value="short">Lightning Talk</option>
                                        <option value="medium">Regular Talk</option>
                                        <option value="long">Long Talk</option>
                                    </select>
                                    {fieldErrors["format"] && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {fieldErrors["format"]}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                        Technologies
                                    </label>
                                    <Select closeMenuOnSelect={false} isMulti options={technologiesList as MultiSelectOptionsType[]} name="technologies"
                                        onChange={(e: MultiValue<MultiSelectOptionsType>) => handleMultiChange(e, 't')}
                                    />
                                    {fieldErrors["technologies"] && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {fieldErrors["technologies"]}
                                        </p>
                                    )}
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default CfsModal