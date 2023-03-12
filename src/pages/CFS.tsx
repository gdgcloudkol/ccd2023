import { Switch } from '@headlessui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Select, { MultiValue } from 'react-select';
import { AccomodationRequired, EventData, MultiSelectOptionsType, SpeakerDataModel, TalkData, TechTypeData } from '../assets/models/speaker/datatype';
import CFSSettings from '../components/CfsSettings/CFSSettings';
import GoogleDotsLoader from "../components/Loader/GoogleDotsLoader";
import Spinner from '../components/Spinner/Spinner';
import { BACKGROUND_ASSETS, PROFILE_ROUTE } from '../services/constants';
import { ApiEvent, ApiGetTalk, ApiSpeaker, ApiSpeakerList, ApiTalk, ApiTechnologies } from '../services/speaker.service';
import { LoggedInContext } from '../services/state.service';

const CFS = () => {
  const { loggedInState } = useContext(LoggedInContext);
  const nav = useNavigate();
  const [has_spoken_previously, setHasSpokenPreviously] = useState<boolean>(false);
  const [isSpeaker, setSpeaker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [technologiesList, setTechnologiesList] = useState<MultiSelectOptionsType[]>([]);
  const [topics_of_expertise, setTopics_of_expertise] = useState<number[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [isSpinnerLoading, setSpinnerLoading] = useState<boolean>(false)
  const [isSubmitted, setSubmitted] = useState<boolean>(false)
  const [technologies, setTechnologies] = useState<number[]>([]);
  const [speakers, setSpeakerData] = useState<number[]>([]);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [submittedTalks, setSubmittedTalks] = useState<TalkData[]>([]);

  useEffect(() => {
    if (!loggedInState.isLoggedIn) nav(PROFILE_ROUTE);
  }, [loggedInState, nav]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      ApiSpeakerList(),
      ApiEvent(),
      ApiTechnologies(),
      ApiGetTalk()
    ]).then(([speaker, event, tech, talk]) => {
      if (speaker.status === 200 && speaker.data.length > 0) {
        setSpeaker(true);
        setSpeakerData(speaker?.data?.map((i: any) => i.id));
      }

      if (event.status === 200) setEvents(event?.data?.results);

      if (tech.status === 200) {
        let options: { label: string, value: number }[] = tech?.data?.results?.map((i: TechTypeData) => {
          return { label: i.name, value: i.id }
        });
        setTechnologiesList(options);
      }

      if (talk.status === 200 && talk?.data?.length > 0) {
        setSpeaker(true);
        setSubmitted(true);
        setSubmittedTalks(talk.data);
      }
      setIsLoading(false);
    })
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(document.getElementById('cfs') as HTMLFormElement);

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const overview = formData.get('overview') as string;
    const previous_talk_links = formData.get('previous_talk_links') as string;
    const event = formData.get('event') as string;
    const travel_support_required = formData.get('travel_support_required') as AccomodationRequired;
    const format = formData.get('format') as string;

    const payloadTalk: TalkData = { title, description, overview, format, speakers, technologies, event: parseInt(event) };
    const payloadProfile: SpeakerDataModel = { has_spoken_previously, previous_talk_links, travel_support_required, topics_of_expertise };

    if (isSpeaker) {
      if (title === '') {
        setFieldErrors({ title: 'Title cannot be blank' });
        setSpinnerLoading(false);
        return;
      }

      if (description === '') {
        setFieldErrors({ description: 'Description cannot be blank' });
        setSpinnerLoading(false);
        return;
      }

      if (overview === '') {
        setFieldErrors({ overview: 'Overview cannot be blank' });
        setSpinnerLoading(false);
        return;
      }
      if (event === '') {
        setFieldErrors({ event: 'Choose an event' });
        setSpinnerLoading(false);
        return;
      }
      if (format === '') {
        setFieldErrors({ format: 'Choose a format' });
        setSpinnerLoading(false);
        return;
      }
      if (technologies.length === 0) {
        setFieldErrors({ technologies: 'Choose minimum of 1 technology' });
        setSpinnerLoading(false);
        return;
      }
      setSpinnerLoading(true)
      let result = await ApiTalk(payloadTalk);
      if (result?.status > 199 && result?.status < 301) {
        setSpinnerLoading(false);
        setSubmitted(true);
        setIsLoading(false);
      }
      else if (result?.status > 399 && result?.status < 501) {
        setSpinnerLoading(false);
        setFieldErrors({ error: 'There is a problem submitting talk' });
      }
      result = await ApiGetTalk()
      if (result?.status > 199 && result?.status < 301) {
        setSpeaker(true);
        setSubmitted(true);
        setSubmittedTalks(result.data);
      }
    }
    else {
      if (previous_talk_links === '') {
        setFieldErrors({ previous_talk_links: 'Please provide comma separated previous talks link' });
        setSpinnerLoading(false);
        return;
      }
      if (!['AO', 'TO', 'TA', 'NO'].includes(travel_support_required)) {
        setFieldErrors({ travel_support_required: 'Choose an option' });
        setSpinnerLoading(false);
        return;
      }
      if (topics_of_expertise.length === 0) {
        setFieldErrors({ technologies: 'Choose an expertise' });
        setSpinnerLoading(false);
        return;
      }
      setSpinnerLoading(true)

      let result = await ApiSpeaker(payloadProfile);
      if (result?.status > 199 && result?.status < 301) {
        setSpinnerLoading(false);
        setSubmitted(true);
        setIsLoading(false);
      }
      else if (result?.status > 399 && result?.status < 501) {
        setSpinnerLoading(false);
        setFieldErrors({ error: 'There is a problem creating speaker profile' });
      }
    }
  }

  async function handleSubmitTalk(e: any) {
    setIsLoading(true);
    let speaker = await ApiSpeakerList();
    if (speaker.status === 200 && speaker.data.length > 0) {
      setSpeaker(true);
      setSpeakerData(speaker?.data?.map((i: any) => i.id));
      setSubmitted(false);
      setIsLoading(false);
    }
  }

  async function refreshTalkList() {
    const result = await ApiGetTalk()
    if (result?.status > 199 && result?.status < 301) {
      setSpeaker(true);
      setSubmitted(true);
      setSubmittedTalks(result.data);
    }
  }

  const handleMultiChange = (e: MultiValue<MultiSelectOptionsType>, type: 's' | 't') => {
    if (type === 's')
      setTopics_of_expertise(e.map((i: MultiSelectOptionsType) => i.value));
    else if (type === 't')
      setTechnologies(e.map((i: MultiSelectOptionsType) => i.value));
  };

  return (
    <>
      {isLoading ? <GoogleDotsLoader /> :
        <div className="max-w-7xl mx-auto" data-aos="fade-up">
          <div className="min-h-full w-full flex">
            <div className="flex-1 flex flex-col justify-center m-5 ">
              {
                isSpeaker ?
                  isSubmitted ? <div className='flex m-5 items-center flex-col justify-center'>
                    <div className='w-full flex flex-col items-center justify-center'>
                      <h2 className="mt-6 py-5 text-2xl lg:text-4xl text-gray-900 text-center dark:text-gray-100 tracking-tight">
                      Submitted Talks Status
                      </h2>
                      <CFSSettings technologiesList={technologiesList} talkData={submittedTalks} refreshTalkList={refreshTalkList} />
                    </div>
                    <div className="flex space-x-4 mt-8 lg:mt-10  items-center justify-center ">
                      <button
                        type="submit"
                        className=" flex px-8 justify-center p-2 border border-transparent rounded-md shadow-sm text-lg lg:text-xl font-medium text-white bg-google-blue
                                     hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                        onClick={() => { nav(PROFILE_ROUTE) }}
                      >
                        Profile
                      </button>
                      <button
                        type="submit"
                        className=" flex px-5 lg:px-10 justify-center p-2 border border-transparent rounded-md shadow-sm text-lg lg:text-xl font-medium text-white bg-google-blue
                                     hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                        onClick={() => { setSubmitted(false) }}
                      >
                        Submit New Talk
                      </button>
                    </div>
                  </div> :
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                      <div>
                        <h2 className="flex mt-6 text-2xl text-gray-900 dark:text-gray-100 items-center justify-center tracking-tight">
                          Talk for GCCD Kolkata 2023
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
                              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
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
                              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Description
                              </label>
                              <div className="mt-1">
                                <textarea name="description" rows={5} autoComplete="" required id="description"
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
                                <textarea name="overview" rows={10} autoComplete="" required id="overview"
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
                                className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                              >
                                <option >Choose</option>
                                {events.map((data: EventData, key: number) => <option key={key} value={data.id}>{data.title}</option>)}
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
                            <div className='flex gap-3'>
                              <button onClick={() => { setSubmitted(true) }}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                              >
                                Back
                              </button>
                              <button type="submit" onClick={handleSubmit}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                              >
                                {isSpinnerLoading ? <Spinner color='red' /> : "Submit"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div> : isSubmitted ?
                    <div className='mx-auto flex items-center flex-col w-full max-w-sm lg:w-96 text-center'>
                      <div>
                        <h2 className="mt-6 py-10 text-2xl text-gray-900 dark:text-gray-100 tracking-tight">
                          Speaker Profile Created.
                        </h2>
                      </div>
                      <div className='flex'>
                        <button
                          type="submit"
                          className=" px-10 flex justify-center py-2  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                          onClick={() => { nav(PROFILE_ROUTE) }}
                        >
                          Profile
                        </button>
                        <button
                          type="submit"
                          className=" px-10 flex justify-center py-2  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                          onClick={handleSubmitTalk}
                        >
                          Submit A Talk
                        </button>
                      </div>
                    </div>
                    :
                    <div className=' mx-auto w-full max-w-sm lg:w-96 dark:text-black text-white'>
                      <div>
                        <h2 className="mt-6 text-2xl text-gray-900 dark:text-gray-100 tracking-tight">
                          Create Your Speaker Profile
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
                              <label htmlFor="previous_talk_links" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
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
                            <div>
                              <label htmlFor="travel_support_required" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Travel Support Required
                              </label>
                              <select name="travel_support_required" id="travel_support_required"
                                className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                              >
                                <option value="">Choose</option>
                                <option value="TO">Travel Only</option>
                                <option value="AO">Accomodation Only</option>
                                <option value="TA">Travel and Accomodation Both</option>
                                <option value="NO">None</option>
                              </select>
                              {!isSpeaker && (
                                <p className="mt-2 text-sm text-red-600">
                                  {fieldErrors["travel_support_required"]}
                                </p>
                              )}
                            </div>
                            <div>
                              <label htmlFor="topics_of_expertise" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Topics of Expertise
                              </label>
                              <Select closeMenuOnSelect={false} isMulti options={technologiesList as MultiSelectOptionsType[]} name="topics_of_expertise"
                                onChange={(e: MultiValue<MultiSelectOptionsType>) => handleMultiChange(e, 's')}
                              />
                              {fieldErrors["topics_of_expertise"] && (
                                <p className="mt-2 text-sm text-red-600">
                                  {fieldErrors["topics_of_expertise"]}
                                </p>
                              )}
                            </div>
                            <Switch.Group
                              as="div"
                              className="flex items-center justify-between mt-8"
                            >
                              <span className="flex flex-grow flex-col">
                                <label htmlFor="has_spoken_previously" className="block text-xl font-medium text-gray-700 dark:text-gray-200">
                                  Previously Talked At GCCD Kolkata ?
                                </label>
                              </span>
                              <Switch id="has_spoken_previously" checked={has_spoken_previously} onChange={setHasSpokenPreviously}
                                className={`${has_spoken_previously ? 'bg-google-blue' : 'bg-gray-200'
                                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-google-blue focus:ring-offset-2`}
                              >
                                <span
                                  aria-hidden="true"
                                  className={`${has_spoken_previously ? 'translate-x-5' : 'translate-x-0'
                                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                />
                              </Switch>
                            </Switch.Group>

                            <div>
                              <button type="submit" onClick={handleSubmit}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
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
            {!isLoading && !isSubmitted && <div className="hidden lg:block relative w-0 flex-1">
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
