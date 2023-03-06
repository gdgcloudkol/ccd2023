import { LandingPageContent } from "../../assets/models/home/datatype";
import { CurrentTheme } from "../../services/common.service";
import { DARK } from "../../services/constants";

export default function HomeSection3(landingPageContent: LandingPageContent) {
  return (
    <div className="flex flex-col lg:flex-row w-full py-10 items-center font-medium text-4xl lg:text-6xl">
      <div className={`lg:pl-32 lg:pr-32 flex flex-row items-center mb-10 lg:mb-0 lg:items-start justify-end w-1/2 lg:w-full lg:flex-col ${CurrentTheme() === DARK ? 'stroke-w-1px lg:stroke-w-2px text-black ' : ' stroke-b-1px lg:stroke-b-2px text-white'}`}>
        <p className="flex mr-5 lg:mr-0">
          {landingPageContent?.subTitle2}
        </p>
        <p
          className={`no-shadow flex flex-col w-2/3 lg:w-full ${CurrentTheme() === DARK ? 'text-white' : 'text-black'}`}
        >
          {landingPageContent?.description2}
        </p>
      </div>
      <div className={`lg:pr-32 flex flex-row items-center mb-10 lg:mb-0 lg:items-start justify-end w-1/2 lg:w-full lg:flex-col ${CurrentTheme() === DARK ? 'stroke-w-1px lg:stroke-w-2px text-black ' : ' stroke-b-1px lg:stroke-b-2px text-white'}`}>
        <p className="flex mr-5 lg:mr-0">
          {landingPageContent?.subTitle3}
        </p>
        <p
          className={`no-shadow flex flex-col w-2/3 lg:w-full ${CurrentTheme() === DARK ? 'text-white' : 'text-black'}`}
        >
          {landingPageContent?.description3}
        </p>
      </div>
      <div className={`lg:pr-32 flex flex-row items-center mb-10 lg:mb-0 lg:items-start justify-end w-1/2 lg:w-full lg:flex-col ${CurrentTheme() === DARK ? 'stroke-w-1px lg:stroke-w-2px text-black ' : ' stroke-b-1px lg:stroke-b-2px text-white'}`}>
        <p className="flex mr-5 lg:mr-0">
          {landingPageContent?.subTitle4}
        </p>
        <p
          className={`no-shadow flex flex-col w-2/3 lg:w-full ${CurrentTheme() === DARK ? 'text-white' : 'text-black'}`}
        >
          {landingPageContent?.description4}
        </p>
      </div>
      <div className={`flex flex-row items-center lg:items-start justify-end w-1/2 lg:w-full lg:flex-col ${CurrentTheme() === DARK ? 'stroke-w-1px lg:stroke-w-2px text-black ' : ' stroke-b-1px lg:stroke-b-2px text-white'}`}>
        <p className="flex mr-5 lg:mr-0">
          {landingPageContent?.subTitle5}
        </p>
        <p
          className={`no-shadow flex flex-col w-2/3 lg:w-full ${CurrentTheme() === DARK ? 'text-white' : 'text-black'}`}
        >
          {landingPageContent?.description5}
        </p>
      </div>
    </div>
  )
}