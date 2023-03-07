import { useEffect, useState } from 'react';
import { BACKGROUND_ASSETS } from '../services/constants';
import { Switch } from '@headlessui/react';
import { AccomodationRequired, EventData, OptionsType, SpeakerDataModel, TalkData, TechType } from '../assets/models/speaker/datatype';
import { ApiEvent, ApiSpeaker, ApiSpeakerList, ApiTalk, ApiTechnologies } from '../services/speaker.service';
import Select, { MultiValue } from 'react-select';
import GoogleDotsLoader from "../components/Loader/GoogleDotsLoader"
import Spinner from '../components/Spinner/Spinner';


const CFS = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isSpeaker, setSpeaker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [technologies, setTechnologies] = useState<OptionsType[]>([]);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [topics_of_expertise, setTopics_of_expertise] = useState<number[]>([]);
  const [speakerData, setSpeakerData] = useState<number[]>([]);
  const [events, setEvents] = useState<EventData[]>([])
  const [isSpinnerLoading, setSpinnerLoading] = useState<boolean>(false)
  const [isSubmitted, setSubmitted] = useState<boolean>(false)

  const pkVal = (data: any) => {
    let myData = data.map((i: any) => {
      return i.id
    })
    return myData
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(
      document.getElementById('cfs') as HTMLFormElement
    );

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const overview = formData.get('overview') as string;
    const previous_talk_links = formData.get('previous_talk_links') as string;
    const event = formData.get('event') as string;
    const travel_support_required = formData.get(
      'travel_support_required'
    ) as AccomodationRequired;
    const format = formData.get('format') as string;
    const payloadTalk: TalkData = {
      title,
      description,
      overview,
      format,
      speakers: speakerData,
      technologies: topics_of_expertise,
      event: parseInt(event)
    }
    const payloadProfile: SpeakerDataModel = {
      has_spoken_previously: enabled,
      previous_talk_links: previous_talk_links,
      travel_support_required: travel_support_required,
      topics_of_expertise: topics_of_expertise
    };

    if (isSpeaker) {
      if (title === '') {
        setFieldErrors({
          title: 'Title cannot be blank'
        });
        setSpinnerLoading(false);
        return;
      }

      if (description === '') {
        setFieldErrors({
          description: 'Description cannot be blank',
        });
        setSpinnerLoading(false);
        return;
      }

      if (overview === "") {
        setFieldErrors({
          overview: 'Overview do not match'
        });
        setSpinnerLoading(false);
        return;
      }
      if (event === "") {
        setFieldErrors({
          event: 'Choose an event'
        });
        setSpinnerLoading(false);
        return;
      }
      if (format === "") {
        setFieldErrors({
          format: 'Choose a format'
        });
        setSpinnerLoading(false);
        return;
      }
      if (topics_of_expertise.length === 0) {
        setFieldErrors({
          technologies: 'Choose a technology'
        });
        setSpinnerLoading(false);
        return;
      }
      setSpinnerLoading(true)
      let result = await ApiTalk(payloadTalk);
      if (result.status === 200) {
        setSpinnerLoading(false)
        setSubmitted(true)
        setIsLoading(false)

      }
      else if (result.status === 400) {
        setSpinnerLoading(false)
        setFieldErrors({
          error: "There is a problem submitting talk"
        })
      }
      console.log(result.data)
    }
    else {
      console.log(topics_of_expertise)
      if (previous_talk_links === "") {
        setFieldErrors({
          previous_talk_links: 'This field cannot be empty'
        });
        setSpinnerLoading(false);
        return;
      }
      if (!['AO', 'TO', 'TA', 'NO'].includes(travel_support_required)) {
        setFieldErrors({
          travel_support_required: 'Choose an option '
        });
        setSpinnerLoading(false);
        return;
      }
      if (topics_of_expertise.length === 0) {
        setFieldErrors({
          technologies: "Choose an expertise"
        })
        setSpinnerLoading(false);
        return;
      }
      setSpinnerLoading(true)
      let result = await ApiSpeaker(payloadProfile);
      if (result.status === 200) {
        setSpinnerLoading(false)
        setSubmitted(true)
        setIsLoading(false)
      }
      else if (result.status === 400) {
        setSpinnerLoading(false)
        setFieldErrors({
          error: "There is a problem creating profile"
        })
      }
      console.log(result.data);
    }
  }

  const handleMultiChange = (e: MultiValue<OptionsType>) => {
    let current = e.map((i: OptionsType) => {
      return i.value;
    });
    setTopics_of_expertise(current);
  };

  useEffect(() => {
    const checkForSpeaker = async () => {
      setIsLoading(true)
      let result = await ApiSpeakerList();
      setIsLoading(false)
      if (result.status === 200 && result.data.length > 0) {
        setSpeaker(true)
        setSpeakerData(pkVal(result?.data))
      }
    }

    async function fetchEvent() {
      const result = await ApiEvent()
      if (result.status === 200) setEvents(result?.data?.results)
    }

    const fetchTechnology = async () => {
      let result = await ApiTechnologies();
      if (result.status === 200) {
        let options: { label: string, value: number }[] = result?.data?.results?.map((i: TechType) => {
          return {
            label: i.name,
            value: i.id
          }
        });
        setTechnologies(options);
      }
    };

    fetchTechnology();
    checkForSpeaker()
    fetchEvent()
  }, []);

  return (
    <>
      {
        isLoading ? <GoogleDotsLoader /> :

          <div className="max-w-7xl mx-auto" data-aos="fade-up">
            <div className="min-h-full flex">
              <div className="flex-1 flex flex-col justify-center pt-8 pb-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                {isSpeaker ?
                  isSubmitted ? <div className='mx-auto flex items-center flex-col w-full max-w-sm lg:w-96 text-center'>
                    <div>
                      <h2 className="mt-6 py-10 text-2xl text-gray-900 dark:text-gray-100 tracking-tight">
                        Your talk has benn submitted
                      </h2>
                    </div>
                    <button
                      type="submit"
                      className=" px-10 flex justify-center py-2  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                      onClick={() => { setSubmitted(false) }}
                    >
                      Submit another talk
                    </button>
                  </div> :
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                      <div>
                        <h2 className="mt-6 text-2xl text-gray-900 dark:text-gray-100 tracking-tight">
                          Call for Speakers for CCD Kol 2023
                        </h2>
                      </div>
                      <div className="mt-8">
                        {fieldErrors["error"] && (
                          <div className="rounded-md bg-red-50 p-4" data-aos="fade-in">
                            <div className="flex">
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                  {fieldErrors["error"]}
                                </h3>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-8">
                        <div className="mt-6">
                          <form method="POST" className="space-y-6" id="cfs">
                            <div>
                              <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                              >
                                Title
                              </label>
                              <div className="mt-1">
                                <input name="title" type="text" autoComplete="" required id="title"
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
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                              >
                                Description
                              </label>
                              <div className="mt-1">
                                <input name="description" type="text" autoComplete="" required id="description"
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
                              <label
                                htmlFor="overview"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                              >
                                Overview
                              </label>
                              <div className="mt-1">
                                <input name="overview" type="text" autoComplete="" required id="overview"
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
                            <div className="">
                              <label
                                htmlFor="event"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                              >
                                Event
                              </label>
                              <select
                                name="event"
                                required
                                id="event"
                                className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                              >
                                <option >Choose</option>
                                {events.map((data: EventData, key: number) => {
                                  return <option key={key} value={data.id}>{data.title}</option>
                                })}
                              </select>
                              {fieldErrors["event"] && (
                                <p className="mt-2 text-sm text-red-600">
                                  {fieldErrors["event"]}
                                </p>
                              )}
                            </div>
                            <div className="">
                              <label
                                htmlFor="format"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                              >
                                Type of Talk
                              </label>
                              <select
                                name="format"
                                required
                                id="format"
                                className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                              >
                                <option value="">Choose</option>
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
                            <div className="">
                              <label
                                htmlFor="technologies"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                              >
                                Technologies
                              </label>
                              <Select
                                closeMenuOnSelect={false}
                                isMulti
                                options={technologies as any}
                                name="technologies"
                                onChange={(e: MultiValue<OptionsType>) =>
                                  handleMultiChange(e)
                                }
                              />
                              {fieldErrors["technologies"] && (
                                <p className="mt-2 text-sm text-red-600">
                                  {fieldErrors["technologies"]}
                                </p>
                              )}
                            </div>
                            <div>
                              <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                                onClick={handleSubmit}
                              >
                                {isSpinnerLoading ? <Spinner color='red' /> : "Apply"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div> : isSubmitted ?
                    <div className='mx-auto flex items-center flex-col w-full max-w-sm lg:w-96 text-center'>
                      <div>
                        <h2 className="mt-6 py-10 text-2xl text-gray-900 dark:text-gray-100 tracking-tight">
                          Your Profile has been created.
                        </h2>
                      </div>
                      <button
                        type="submit"
                        className=" px-10 flex justify-center py-2  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                        onClick={() => {
                          setSpeaker(true)
                          setSubmitted(false)
                        }}
                      >
                        Let's submit a talk
                      </button>
                    </div>
                    :
                    <div className=' mx-auto w-full max-w-sm lg:w-96 dark:text-black text-white'>
                      <div>
                        <h2 className="mt-6 text-2xl text-gray-900 dark:text-gray-100 tracking-tight">
                          Create your speaker profile
                        </h2>
                      </div>
                      <div className="mt-8">
                        {fieldErrors["error"] && (
                          <div className="rounded-md bg-red-50 p-4" data-aos="fade-in">
                            <div className="flex">
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                  {fieldErrors["error"]}
                                </h3>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-8">
                        <div className="mt-6">
                          <form className="space-y-6" id="cfs">
                            <div>
                              <label
                                htmlFor="previous_talk_links"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                              >
                                Previous Talk Links
                              </label>
                              <div className="mt-1">
                                <input name="previous_talk_links" type="text" autoComplete="" required id="previous_talk_links"
                                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm                          
                          ${fieldErrors["previous_talk_links"] && 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'}`}

                                />
                              </div>
                              {!isSpeaker && (
                                <p className="mt-2 text-sm text-red-600">
                                  {fieldErrors["previous_talk_links"]}
                                </p>
                              )}
                            </div>
                            <div className="">
                              <label
                                htmlFor="travel_support_required"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                              >
                                Travel Support Required
                              </label>
                              <select
                                name="travel_support_required"
                                id="travel_support_required"
                                className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                              >
                                <option value="">Choose</option>
                                <option value="TO">Travel Only</option>
                                <option value="AO">Accomodation Only</option>
                                <option value="TA">Travel and Accomodation both</option>
                                <option value="NO">None</option>
                              </select>
                              {!isSpeaker && (
                                <p className="mt-2 text-sm text-red-600">
                                  {fieldErrors["travel_support_required"]}
                                </p>
                              )}
                            </div>
                            <div className="">
                              <label
                                htmlFor="topic_of_expertise"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                              >
                                Topic of Expertise
                              </label>
                              <Select closeMenuOnSelect={false} isMulti options={technologies as any} name="topic_of_expertise"
                                onChange={(e: MultiValue<OptionsType>) =>
                                  handleMultiChange(e)
                                }
                              />
                              {fieldErrors["topic_of_expertise"] && (
                                <p className="mt-2 text-sm text-red-600">
                                  {fieldErrors["topic_of_expertise"]}
                                </p>
                              )}
                            </div>
                            <Switch.Group
                              as="div"
                              className="flex items-center justify-between mt-8"
                            >
                              <span className="flex flex-grow flex-col">
                                <label
                                  htmlFor="has_spoken_previously"
                                  className="block text-xl font-medium text-gray-700 dark:text-gray-200"
                                >
                                  Previously talked at CCD Kol ?
                                </label>
                              </span>
                              <Switch id="has_spoken_previously" checked={enabled} onChange={setEnabled}
                                className={`${enabled ? 'bg-google-blue' : 'bg-gray-200'
                                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-google-blue focus:ring-offset-2`}
                              >
                                <span
                                  aria-hidden="true"
                                  className={`${enabled ? 'translate-x-5' : 'translate-x-0'
                                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                />
                              </Switch>
                            </Switch.Group>

                            <div>
                              <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                                onClick={handleSubmit}
                              >
                                {isSpinnerLoading ? <Spinner color='red' /> : "Continue"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                }
              </div>
              {!isLoading && <div className="hidden lg:block relative w-0 flex-1">
                <img
                  className="absolute inset-0 h-full w-full object-fill"
                  src={BACKGROUND_ASSETS + `victoria.svg`}
                  alt="Victoria SVG"
                />
              </div>}
            </div>
          </div>
      }
    </>
  );
};

export default CFS;
