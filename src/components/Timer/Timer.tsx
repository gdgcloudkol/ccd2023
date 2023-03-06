import React from 'react';

const Timer = () => {
  const getTime = (_time: string) => {
    let date = { days: '', hours: '', minutes: '', seconds: '' };
    let difference = new Date(_time).getTime() - new Date().getTime();
    let seconds = Math.floor(difference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    date.seconds = (seconds % 60).toString().padStart(2, '0');
    date.minutes = (minutes % 60).toString().padStart(2, '0');
    date.hours = (hours % 24).toString().padStart(2, '0');
    date.days = days.toString().padStart(2, '0');
    return date;
  };

  let eventDate = getTime('2023/05/07');

  const [parsedTime, setParsed] = React.useState({
    day: eventDate.days,
    hour: eventDate.hours,
    minute: eventDate.minutes,
    second: eventDate.seconds
  });

  const converter = () => {
    setParsed({
      ...parsedTime,
      day: eventDate.days,
      hour: eventDate.hours,
      second: eventDate.seconds,
      minute: eventDate.minutes
    });
  };

  React.useEffect(() => {
    const tick = setInterval(() => converter(), 1000);
    return () => clearInterval(tick);
  }, [parsedTime]);

  return (
    <div className="flex flex-col flex-middle text-center
                    py-3 lg:px-5 rounded-3xl lg:rounded
                    text-timer-blue bg-timer-bg
                    ">
      <p className="w-full text-xl lg:text-2xl font-normal capitalize pb-3">
        starting in
      </p>
      <div className="w-full flex lg:flex-col justify-center items-center font-bold">
        <div className="mr-1 lg:mr-0 py-1 text-4xl lg:text-6xl">
          {parsedTime.day}
        </div>
        <div className="mr-3 lg:mr-0 text-xl lg:text-4xl lg:pb-10">d</div>
        <div className="mr-1 lg:mr-0 py-1 text-4xl lg:text-6xl">
          {parsedTime.hour}
        </div>
        <div className="mr-3 lg:mr-0 text-xl lg:text-4xl lg:pb-10">h</div>
        <div className="mr-1 lg:mr-0 py-1 text-4xl lg:text-6xl">
          {parsedTime.minute}
        </div>
        <div className="mr-3 lg:mr-0 text-xl lg:text-4xl lg:pb-10">m</div>
        <div className="mr-1 lg:mr-0 py-1 text-4xl lg:text-6xl">
          {parsedTime.second}
        </div>
        <div className="mr-3 lg:mr-0 text-xl lg:text-4xl lg:pb-5">s</div>
      </div>
    </div>
  );
};

export default Timer;
