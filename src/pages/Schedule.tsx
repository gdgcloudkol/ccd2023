import { useState } from 'react';
import { Helmet } from 'react-helmet';
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
import { useNavigate } from 'react-router-dom';

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
                            {info.speakers && (
                              <div className="flex items-center gap-2 cursor-pointer" onClick={() => { nav('/speakers') }}>
                                {info.speakers?.map(
                                  (speaker: SpeakerData, key: number) => {
                                    const speakerName = speaker.name;
                                    const speakerImage = speaker.profilePicture;
                                    return (
                                      speakerName && (
                                        <div
                                          key={key}
                                          className="flex items-center my-2 p-1 border-1 border-g-blue-3 w-fit rounded-full bg-g-blue-3 text-white"
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

                            {description && (
                              <div className="text-md lg:text-base font-light">
                                {description}
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
      </div>
    </>
  );
};

export default Schedule;
