import React from 'react';
import GoogleDevelopers from '../../assets/images/sponsors/GoogleDevelopers.svg';
import Dynopii from '../../assets/images/sponsors/Dynopii.svg';
import Sessionize from '../../assets/images/sponsors/Sessionize.svg';
import Wandb from '../../assets/images/sponsors/Wandb.svg';

const Sponsors = () => {
  return (
    <div className="max-w-7xl my-12 mx-auto">
      <div className="text-6xl flex justify-center font-normal mt-12 text-g-gray-8">
        Partners
      </div>
      <div className=" flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 172 19"
          width="120"
          height="20"
          className="flex justify-center"
        >
          <path
            stroke="#db3236"
            stroke-width="9"
            d="M1.00061 11.9939C39.5016 5.88017 70.8093 4.74491 80.3785 4.82192C89.9477 4.89892 136.465 6.78043 170.019 14.4154"
            opacity=".6"
            className="colorStroke4AE5EF svgStroke"
          ></path>
        </svg>
      </div>

      <p className="mb-4 lg:mb-16 font-light text-center text-black font-normal mt-8 sm:text-xl ">
        We're thankful to all our sponsors who are making CCD 2023 Kolkata
        amazing. <br />
        To become a sponsor, please email as at{' '}
        <a
          href="mailto:partners@gdgcloud.kolkata.dev"
          className="text-[#4885ed]"
        >
          partners@gdgcloud.kolkata.dev
        </a>
      </p>
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <div className="flex uppercase justify-center text-2xl pb-8 tracking-[.30rem] font-bold">
        Title Sponsor
      </div>
      <div className="flex flex-wrap justify-evenly items-center ">
        <div className="box-border p-3.75 w-2/5 h-[8rem] min-h-80 min-w-230 bg-white img-border rounded-lg relative mt-4 hover:scale-105 hover:ease-in duration-100">
          {/* <div className="absolute -top-1.25 left-1/2 -translate-x-1/2 -translate-y-[0.35rem] rounded-full bg-[#db3236] h-full w-1/3 w-3.14 h-2.5 z-0 "></div> */}
          <div className="h-full w-fill justify-center">
            <a
              href="https://developers.google.com/"
              className="no-underline"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="object-cover object-center w-fit px-10 py-6 mx-auto"
                src={GoogleDevelopers}
                alt="avatar"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="flex uppercase justify-center text-2xl pb-8 pt-20 tracking-[.30rem] font-bold">
        GOLD Sponsor
      </div>
      <div className="flex flex-wrap justify-evenly items-center">
        <div className="box-border p-3.75 w-2/5 h-[8rem] min-h-80 min-w-230 bg-white img-border rounded-lg relative mt-4 hover:scale-105 hover:ease-in duration-300">
          {/* <div className="absolute -top-1.25 left-1/2 -translate-x-1/2 -translate-y-[0.35rem] rounded-full bg-[#f4c20d] h-full w-1/3 w-3.14 h-2.5 z-0"></div> */}
          <a
            href="https://developers.google.com/"
            className="no-underline"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="object-cover object-center w-fit px-10 py-9 mx-auto "
              src={Wandb}
              alt="avatar"
            />
          </a>
        </div>
      </div>
      <div className="flex uppercase justify-center text-2xl pb-8 pt-20 tracking-[.30rem] font-bold">
        SILVER Sponsor
      </div>
      <div className="flex flex-wrap justify-evenly items-center">
        <div className="box-border p-3.75 w-2/5 h-[8rem] min-h-80 min-w-230 bg-white img-border rounded-lg relative mt-4 hover:scale-105 hover:ease-in duration-300">
          {/* <div className="absolute -top-1.25 left-1/2 -translate-x-1/2 -translate-y-[0.35rem] rounded-full bg-[#9CA3AF] h-full w-1/3 w-3.14 h-2.5 z-0"></div> */}
          <a
            href="https://developers.google.com/"
            className="no-underline"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="object-cover object-center w-fit px-9 mx-auto"
              src={Dynopii}
              alt="avatar"
            />
          </a>
        </div>
      </div>
      <div className="flex uppercase justify-center text-2xl pb-8 pt-20 tracking-[.30rem] font-bold">
        MEDIA Partners
      </div>
      <div className="flex flex-wrap justify-evenly items-center ">
        <div className="box-border p-3.75 w-2/5 h-[8rem] min-h-80 min-w-230 bg-white img-border rounded-lg relative mt-4 hover:scale-105 hover:ease-in duration-300">
          {/* <div className="absolute -top-1.25 left-1/2 -translate-x-1/2 -translate-y-[0.35rem] rounded-full bg-[#4885ed] h-full w-1/3 w-3.14 h-2.5 z-0"></div> */}
          <a
            href="https://developers.google.com/"
            className="no-underline"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="object-cover object-center w-fit px-9 py-6 mx-auto"
              src={Sessionize}
              alt="avatar"
            />
          </a>
        </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      {/* <div className="max-w-sm mx-auto">
        <a
          href="https://developers.google.com/"
          className="no-underline"
          target="_blank"
          rel="noreferrer"
        >
          <div className="m-8 bg-white overflow-hidden rounded-lg shadow-lg">
            <img
              className="object-cover object-center w-fit px-4 py-16 mx-auto"
              src={GoogleDevelopers}
              alt="avatar"
              //   E:\GitHub\ccd2023\src\assets\images\sponsors\google-developers.svg
              //   E:\GitHub\ccd2023\src\components\Sponsors\Sponsors.tsx
            />

            <div className="flex items-center px-6 py-2 bg-red-500 text-center justify-center">
              <h1 className="mx-3 text-lg font-semibold text-white">
                Title Sponsor
              </h1>
            </div>
          </div>
        </a>
      </div> */}
      {/* <div className="max-w-sm mx-auto">
        <a
          href="https://wandb.ai"
          className="no-underline"
          target="_blank"
          rel="noreferrer"
        >
          <div className="m-8 bg-white overflow-hidden rounded-lg shadow-lg">
            <img
              className="object-cover object-center w-fit px-4 py-16 mx-auto"
              src={Wandb}
              alt="avatar"
            />

            <div className="flex items-center px-6 py-2 bg-yellow-400 text-center justify-center">
              <h1 className="mx-3 text-lg font-semibold text-black">
                Gold Sponsor
              </h1>
            </div>
          </div>
        </a>
      </div> */}
      {/* <div className="max-w-sm mx-auto">
        <a
          href="https://dynopii.com/"
          className="no-underline"
          target="_blank"
          rel="noreferrer"
        >
          <div className="m-8 bg-white overflow-hidden rounded-lg shadow-lg">
            <img
              className="object-cover object-center w-fit px-4 py-16 mx-auto"
              src={Dynopii}
              alt="avatar"
            />

            <div className="flex items-center px-6 py-2 bg-gray-400 text-center justify-center">
              <h1 className="mx-3 text-lg font-semibold text-black">
                Silver Sponsor
              </h1>
            </div>
          </div>
        </a>
      </div> */}
      {/* <div className="flex justify-center md:justify-start text-2xl lg:text-xl font-light text-g-blue-3 mt-16">
        Also backed by
      </div> */}

      {/* <section>
        <div className="relative items-center w-full px-5 mx-auto md:px-12 lg:px-24 max-w-7xl">
          <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
            <a
              href="https://sessionize.com"
              className="no-underline"
              target="_blank"
              rel="noreferrer"
            >
              <div className="p-6">
                <img
                  className="object-cover object-center w-fit mb-8 rounded-xl"
                  src={Sessionize}
                  alt="blog"
                />
                <h2 className="mb-8 text-xs font-semibold tracking-widest text-blue-600 uppercase">
                  CFP Platform Sponsor
                </h2>
              </div>
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Sponsors;
