import { LandingPageContent } from "../../assets/models/home/datatype";
import { CurrentTheme } from "../../services/common.service";

export default function HomeSection3(landingPageContent: LandingPageContent) {
  return (
    <div className="hidden lg:block h-44 -mt-120">
      <div className="grid grid-cols-4 text-white text-left">
        <div className={`event-sec-3 text-black pl-32 pr-32 pt-5 ${CurrentTheme() === 'white' ? 'strokeme-w text-black ' : ' strokeme text-white'}`}>
          {landingPageContent?.subTitle2}
          <p
            className={`no-shadow ${CurrentTheme() === 'white' ? 'text-white' : 'text-black'
              }`}
          >
            {landingPageContent?.description2}
          </p>
        </div>
        <div className={`event-sec-3 text-black pl-32 pr-32 pt-5 ${CurrentTheme() === 'white' ? 'strokeme-w text-black ' : ' strokeme text-white'}`}>
          {landingPageContent?.subTitle3}
          <p
            className={`no-shadow ${CurrentTheme() === 'white' ? 'text-white' : 'text-black'
              }`}
          >
            {landingPageContent?.description3}
          </p>
        </div>
        <div className={`event-sec-3 text-black pl-32 pr-32 pt-5 ${CurrentTheme() === 'white' ? 'strokeme-w text-black ' : ' strokeme text-white'}`}>
          {landingPageContent?.subTitle4}
          <p
            className={`no-shadow ${CurrentTheme() === 'white' ? 'text-white' : 'text-black'
              }`}
          >
            {landingPageContent?.description4}
          </p>
        </div>
        <div className={`event-sec-3 text-black pl-32 pr-32 pt-5 ${CurrentTheme() === 'white' ? 'strokeme-w text-black ' : ' strokeme text-white'}`}>
          {landingPageContent?.subTitle5}
          <p
            className={`no-shadow ${CurrentTheme() === 'white' ? 'text-white' : 'text-black'
              }`}
          >
            {landingPageContent?.description5}
          </p>
        </div>
      </div>
    </div>
  )
}