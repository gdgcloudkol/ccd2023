import { LandingPageContent } from '../../assets/models/home/datatype';

export default function HomeSection3(landingPageContent: LandingPageContent) {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-4 w-full place-items-center font-medium text-4xl lg:text-5xl py-10 lg:py-20 px-5 lg:px-32 gap-10">
      <div className="flex flex-row items-center mb-10 lg:mb-0 lg:items-start justify-end lg:w-full lg:flex-col dark:stroke-w-1px dark:lg:stroke-w-2px dark:text-black stroke-b-1px lg:stroke-b-2px text-white">
        <p className="w-1/2 md:w-full text-right md:text-left">
          {landingPageContent?.subTitle2}
        </p>
        <p className="no-shadow dark:text-white text-black">
          {landingPageContent?.description2}
        </p>
      </div>
      <div className="flex flex-row items-center mb-10 lg:mb-0 lg:items-start justify-end lg:w-full lg:flex-col dark:stroke-w-1px dark:lg:stroke-w-2px dark:text-black stroke-b-1px lg:stroke-b-2px text-white">
        <p className="w-1/2 md:w-full text-right md:text-left">
          {landingPageContent?.subTitle3}
        </p>
        <p className="no-shadow dark:text-white text-black">
          {landingPageContent?.description3}
        </p>
      </div>
      <div className="flex flex-row items-center mb-10 lg:mb-0 lg:items-start justify-end lg:w-full lg:flex-col dark:stroke-w-1px dark:lg:stroke-w-2px dark:text-black stroke-b-1px lg:stroke-b-2px text-white">
        <p className="w-1/2 md:w-full text-right md:text-left">
          {landingPageContent?.subTitle4}
        </p>
        <p className="no-shadow dark:text-white text-black">
          {landingPageContent?.description4}
        </p>
      </div>
      <div className="flex flex-row items-center lg:items-start justify-end lg:w-full lg:flex-col dark:stroke-w-1px dark:lg:stroke-w-2px dark:text-black stroke-b-1px lg:stroke-b-2px text-white">
        <p className="w-1/2 md:w-full text-right md:text-left">
          {landingPageContent?.subTitle5}
        </p>
        <p className="no-shadow dark:text-white text-black">
          {landingPageContent?.description5}
        </p>
      </div>
    </div>
  );
}
