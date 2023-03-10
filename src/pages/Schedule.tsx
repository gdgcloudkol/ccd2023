import React from 'react';
import {
  SpeakerData,
  SessionData,
  RoomData,
  TimeSlot,
  ScheduleData,
  CategoryData,
  CategoryItems
} from '../assets/models/schedule/datatype';
import { getContent } from '../services/content.service';

const Schedule = () => {
  const [day, setDay] = React.useState(1);
  const [currentDayData, setData] = React.useState<ScheduleData>();
  const [sessionData, setSessionData] = React.useState<ScheduleData[]>([]);

  const eventLength = Array.from(
    { length: sessionData.length },
    (_, i) => i + 1
  );

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
  React.useEffect(() => {
    getContent<ScheduleData[]>('schedule').then(
      (data: void | ScheduleData[]) => {
        if (data) {
          setData(data[0]);
          setSessionData(data);
        }
      }
    );
  }, []);

  return (
    <div
      className="dark:text-white w-full max-w-6xl items-center justify-center flex flex-col lg:flex-row my-0 mx-auto gap-12 pt-12 lg:pb-[62px] px-4"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="w-full">
        <div className="text-5xl font-medium text-g-gray-8 dark:text-white mb-8">
          Schedule
        </div>
        <div className="h-10 flex lg:h-14 w-full border-b-[1px] border-g-gray-3  gap-5 my-5">
          {eventLength.map((i: number, key: number) => {
            return (
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
            );
          })}
        </div>

        <div>
          <div>
            {currentDayData?.timeSlots.map((slot: TimeSlot, key: number) => {
              const startTime = getTime(slot['rooms'][0].session.startsAt);
              const endTime = getTime(slot['rooms'][0].session.endsAt);
              const rooms = slot['rooms'];

              return (
                <div key={key} className="flex w-full lg:w-auto ">
                  <div className="w-3/10 lg:w-1/5 border-b-[1px]  lg:border-r-[1px] border-g-gray-3 flex flex-col items-end px-3 py-3 text-right lg:text-start">
                    <div className="text-base lg:text-xl"> {startTime}</div>
                    <div className="text-xs lg:text-sm font-light">
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
                          data-aos-delay="100"
                        >
                          <div className="text-xs bg-green-100 dark:bg-red-100 dark:text-black px-2 py-1 mb-2 w-fit">
                            {name === 'Lunch' ? 'Cafeteria' : room.session.room}
                          </div>
                          <div className="text-2xl font-light">{name}</div>
                          {info.speakers && (
                            <div className="flex items-center gap-2">
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
                                          className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
                                          src={speakerImage}
                                          alt=""
                                        />
                                        <span className="text-xs ml-2  ">
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
                            <div className="text-sm lg:text-base font-light">
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
  );
};

export default Schedule;
