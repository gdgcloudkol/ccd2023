import React from 'react';

const Timer = () => {
  let difference = new Date('2023/05/06').getTime() - new Date().getTime();
  let seconds = Math.floor(difference / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;
  const [parsedTime, setParsed] = React.useState({
    day: days.toString().padStart(2, '0'),
    hour: hours.toString().padStart(2, '0'),
    minute: minutes.toString().padStart(2, '0'),
    second: seconds.toString().padStart(2, '0')
  });
  const converter = () => {
    let difference = new Date('2023/05/06').getTime() - new Date().getTime();
    let seconds = Math.floor(difference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
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
  });

  return (
    <div className=" flex justify-center flex-col lg:inline-block py-2 md:w-10 bg-[#ffffff26] rounded-lg lg:rounded lg:w-20 h-1/2 lg:text-center lg:py-3 px-3 lg:px-0 text-timer-blue">
      <p className=" text-left w-full lg:text-center text-xl lg:text-sm font-normal capitalize text-white pb-3">
        starting in
      </p>
      <div className=" w-full flex items-center lg:inline-block font-normal lg:font-bold">
        <div className=" mr-1 lg:mr-0 py-1 text-4xl lg:text-4xl">
          {parsedTime.day}
        </div>
        <span className=" mr-3 lg:mr-0 text-lg">d</span>
        <div className=" mr-1 lg:mr-0 py-1 text-4xl lg:text-4xl">
          {parsedTime.hour}
        </div>
        <span className=" mr-3 lg:mr-0 text-lg">h</span>
        <div className=" mr-1 lg:mr-0 py-1 text-4xl lg:text-4xl">
          {parsedTime.minute}
        </div>
        <span className=" mr-3 lg:mr-0 text-lg">m</span>
        <div className=" mr-1 lg:mr-0 py-1 text-4xl lg:text-4xl">
          {parsedTime.second}
        </div>
        <span className=" mr-3 lg:mr-0 text-lg">s</span>
      </div>
    </div>
  );
};

export default Timer;
