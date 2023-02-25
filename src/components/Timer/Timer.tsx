import React from 'react';

const Timer = () => {
  const [parsedTime, setParsed] = React.useState({
    day: '0',
    hour: '0',
    minute: '0',
    second: '0'
  });
  const converter = () => {
    let difference = new Date('2023-05-06').getTime() - Date.now();
    let seconds = Math.floor(difference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = days % 24;
    setParsed({
      ...parsedTime,
      day: days.toString().padStart(2, '0'),
      hour: hours.toString().padStart(2, '0'),
      second: seconds.toString().padStart(2, '0'),
      minute: minutes.toString().padStart(2, '0')
    });
  };
  React.useEffect(() => {
    const tick = setInterval(() => converter(), 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <div className=" w-16 lg:w-20 h-1/2 text-center py-3 text-[#8AB4F8]">
      <p className=" text-sm font-normal">starting in</p>
      <div className=" font-bold">
        <div className=" py-1 text-4xl">{parsedTime.day}</div>
        <span className=" text-lg">d</span>
        <div className=" py-1 text-4xl">{parsedTime.hour}</div>
        <span className=" text-lg">h</span>
        <div className=" py-1 text-4xl">{parsedTime.minute}</div>
        <span className=" text-lg">m</span>
        <div className=" py-1 text-4xl">{parsedTime.second}</div>
        <span className=" text-lg">s</span>
      </div>
    </div>
  );
};

export default Timer;
