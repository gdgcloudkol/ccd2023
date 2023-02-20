const loader = require('../../assets/images/gdsc-logo.gif');

function Loading() {
  return (
    <div
      className="bg-white dark:bg-black flex items-center flex-col justify-center h-full w-full fixed top-0 ;
            z-index: 200000;"
    >
      <img src={loader} alt="GDG Cloud Kolkata Logo" className="rounded-full w-48 h-48 " />
      <div className="flex items-center justify-center h-40">
        <div className=" bg-google-blue h-8 w-8 rounded-full mx-4 animate-bounce animation-delay-0 " />
        <div className=" bg-google-red h-8 w-8 rounded-full mx-4 animate-bounce animation-delay-75" />
        <div className=" bg-google-yellow h-8 w-8 rounded-full mx-4 animate-bounce animation-delay-150" />
        <div className=" bg-google-green h-8 w-8 rounded-full mx-4 animate-bounce animation-delay-225" />
      </div>
    </div>
  );
}

export default Loading;
