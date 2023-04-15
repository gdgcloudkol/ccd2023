import { Dialog, Transition } from '@headlessui/react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import ScheduleContentData from '../assets/content/schedule/content.json';
import {
  CategoryData,
  CategoryItems,
  RoomData,
  ScheduleData,
  SessionData,
  SpeakerData,
  TimeSlot
} from '../assets/models/schedule/datatype';

const Schedule = () => {
  const [day, setDay] = useState(1);
  const [currentDayData, setData] = useState<ScheduleData>(
    ScheduleContentData[0] as ScheduleData
  );
  const [sessionData] = useState<ScheduleData[]>(
    ScheduleContentData as ScheduleData[]
  );

  const eventLength = Array.from(
    { length: sessionData.length },
    (_, i) => i + 1
  );

  const color = ['google-red', 'google-green', 'google-yellow', 'google-blue', 'white'];
  const nav = useNavigate();

  const getTime = (_time: string) => {
    const d = new Date(_time);
    const hour =
      d.getHours() === 0
        ? 12
        : d.getHours() > 12
          ? d.getHours() - 12
          : d.getHours();
    const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    const ampm = d.getHours() < 12 ? 'AM' : 'PM';
    const time = hour + ':' + min + ' ' + ampm;
    return time;
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData]: any = useState<{ speakerName: string; title: string; description: string; speakerImage: string; }>();

  return (
    <>
      <Helmet>
        <title>Schedule | Google Cloud Community Days Kolkata 2023</title>
        <meta
          name="description"
          content="Jam-packed with sessions, workshops, and more, the Google Cloud Community Days Kolkata 2023 is a great opportunity to learn, connect, and grow your cloud skills."
        />
        <meta name="author" content="GDG Cloud Kolkata" />
      </Helmet>
      <div
        className="dark:text-white w-full max-w-6xl items-center justify-center flex flex-col lg:flex-row my-0 mx-auto gap-12 pt-12 lg:pb-[62px] px-4"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="w-full">
          <div className="text-5xl font-medium text-g-gray-8 dark:text-white mb-8">
            Schedule
          </div>
          {eventLength.map((i: number, key: number) => {
            if (i > 1)
              return (
                <div className="h-10 flex lg:h-14 w-full border-b-[1px] border-g-gray-3 gap-5 my-5">
                  <div
                    key={key}
                    className={
                      'text-xl lg:text-2xl font-light px-8 h-full cursor-pointer' +
                      (day === i ? ' border-b-[2px] border-g-blue-3' : '')
                    }
                    onClick={() => {
                      setDay(i);
                      setData(sessionData[i - 1]);
                    }}
                  >
                    {`Day ${i}`}
                  </div>
                </div>
              );
            else
              return null
          })}

          <div>
            <div>
              {currentDayData?.timeSlots.map((slot: TimeSlot, key: number) => {
                const startTime = getTime(slot['rooms'][0].session.startsAt);
                const endTime = getTime(slot['rooms'][0].session.endsAt);
                const rooms = slot['rooms'];

                return (
                  <div key={key} className="flex w-full lg:w-auto ">
                    <div className="w-3/10 lg:w-1/5 border-b-[1px]  lg:border-r-[1px] border-g-gray-3 flex flex-col items-end px-3 py-3 text-right lg:text-start">
                      <div className="text-base text-sm lg:text-2xl"> {startTime}</div>
                      <div className="text-xs lg:text-xl font-light">
                        {endTime}
                      </div>
                    </div>
                    <div className="w-7/10 lg:w-4/5 flex flex-col p-3 border-b-[1px] border-g-gray-3 grow">
                      {rooms.map((room: RoomData, index: number) => {
                        const info: SessionData = room['session'];
                        const name = info.title;
                        const description = info.description;

                        const technologies = info.categories?.find(
                          (c: CategoryData) => c.name === 'Technology'
                        )?.categoryItems;
                        return (
                          <div
                            key={index}
                            data-aos="fade-right"
                            data-aos-delay="50"
                          >
                            <div className={`text-sm lg:text-md ${index !== 0 ? 'mt-10' : 'lg:mt-5'} bg-${color[index]} ${index == 4 ? 'text-black' : 'text-white'} px-2 py-1 mb-2 w-fit`}>
                              {room.session.room}
                            </div>
                            <div className="text-xl lg:text-3xl font-light">{name}</div>
                            {info.speakers && info.speakers?.length > 0 && (
                              <div className="flex items-center gap-2 cursor-pointer" >
                                {info.speakers?.map(
                                  (speaker: SpeakerData, key: number) => {
                                    const speakerName = speaker.name;
                                    const speakerImage = speaker.profilePicture;
                                    return (
                                      speakerName && (
                                        <div
                                          key={key}
                                          className="flex items-center my-2 p-1 border-1 border-g-blue-3 w-fit rounded-full bg-g-blue-3 text-white"
                                          onClick={() => {
                                            if (name && name !== '' && description && description !== '') {
                                              setModalData({ speakerName: speakerName, title: name, description: description, speakerImage: speakerImage });
                                              setShowModal(true)
                                            }
                                          }}
                                        >
                                          <img
                                            className="inline-block h-16 w-16 rounded-full ring-2 ring-white"
                                            src={speakerImage}
                                            alt=""
                                          />
                                          <span className="text-lg lg:text-xl ml-2  ">
                                            {speakerName}
                                          </span>
                                        </div>
                                      )
                                    );
                                  }
                                )}
                              </div>
                            )}
                            {technologies && (
                              <div className="flex items-center flex-wrap gap-2 my-2">
                                {technologies.map(
                                  (tech: CategoryItems, key: number) => {
                                    return (
                                      <div
                                        key={key}
                                        className="text-xs border-1 border-g-gray-5  bg-g-gray-1 dark:bg-g-gray-7 rounded-full px-2 py-1 w-fit"
                                      >
                                        {tech.name}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div >
      <Transition
        show={showModal}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <div className="fixed inset-0 bg-black/75" aria-hidden="true" />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel>
              <div className="min-h-[25rem] lg:max-w-[40rem] border-2 rounded-lg shadow-lg flex flex-col bg-white dark:bg-black outline-none focus:outline-none">
                <div className="flex min-items-center lg:items-start p-4 lg:flex-row flex-col border-b border-solid border-slate-200 lg:space-x-4">
                  <div className='min-w-[7rem]'>
                    <img
                      loading="lazy"
                      className="rounded-full mx-auto w-28 h-28 border-4 border-b-google-blue border-t-google-red border-r-google-yellow border-l-google-green"
                      src={modalData?.speakerImage}
                      alt="profile"
                    />
                  </div>
                  <div className="rounded-t flex flex-col w-full">
                    <div className="text-xl text-center lg:text-left lg:text-2xl mb-3 text-g-gray-7 dark:text-white mt-2">
                      {modalData?.title}
                    </div>
                    <div className="text-2xl w-full dark:text-white font-normal text-right">
                      ~{modalData?.speakerName}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-2">
                  {!modalData?.description?.startsWith('~!~') ?
                    (
                      <p className="my-2 max-h-72 overflow-y-scroll text-g-gray-5 dark:text-white font-light text-xl lg:text-2xl leading-relaxed text-justify">
                        {modalData?.description}
                      </p>
                    ) : (
                      <p
                        className="my-2 max-h-72 overflow-y-scroll text-g-gray-5 dark:text-white font-light text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: modalData?.description?.substring(3) }}
                      ></p>
                    )}
                </div>

                <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-google-red background-transparent font-bold uppercase px-6 py-2 text-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Schedule;
