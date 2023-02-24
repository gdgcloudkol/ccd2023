import { useContext, useEffect, useState } from "react";
import { FeatureRule } from "../../assets/models/datatype";
import { HomeButtonContent, HomeCFSContent, HomeEventContent } from "../../assets/models/home/datatype";
import { CurrentTheme } from "../../services/common.service";
import { getContent } from "../../services/content.service";
import { getFeature } from "../../services/feature.service";
import { LoggedInContext } from "../../services/state.service";

export default function HomeCFS() {
  const { loggedInState } = useContext(LoggedInContext)
  const [cfsContent, setCfsContent] = useState({} as HomeCFSContent);
  const [buttonContent, setButtonContent] = useState([{}] as HomeButtonContent[])
  useEffect(() => {
    getContent<HomeEventContent>('home').then(
      (data: void | HomeEventContent) => {
        if (data) {
          setButtonContent(data.cfsButton)
          setCfsContent(data.cfs);
        }
      }
    );
  }, []);

  const [cfsRule, setCfsRule] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState({} as HomeButtonContent)
  const [buttonLocalColor, setButtonLocalColor] = useState(buttonDisplay.color)
  useEffect(() => {
    getFeature().then((data: FeatureRule) => {
      if (data) {
        setCfsRule(data.home?.cfs);
        for (let i of buttonContent) {
          if (
            (loggedInState && i?.id === data.home?.cfsButtonStateLogin) ||
            (!loggedInState && i?.id === data.home?.cfsButtonStateNotLogin)
          ) {
            i.state = 'disabled'
            if (
              data.home.disabledCfsButton.every(
                (item: string) => i.id !== item
              )
            )
              i.state = 'active';
            setButtonDisplay(i);
            setButtonLocalColor(i.color)
          }
        }
      }
    });
  }, [cfsRule, loggedInState, buttonContent]);

  return (
    <div
      className={`hidden lg:block h-96 text-center event-sec-2 pl-52 pr-52 pt-10 text-white bg-transparent relative cfs z-10`}
    >
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col justify-center items-center pl-32 pr-32">
          <div className="event-sec-3 block strokeme-w text-black pt-5 uppercase">
            {cfsContent?.title}
          </div>
          <p className={`no-shadow uppercase ${CurrentTheme() === 'white' ? 'text-white ' : 'text-black'}`}>{cfsContent?.subtitle}</p>
        </div>
        <div className="flex flex-col justify-start items-start">
          <p className=" text-lg text-start lg:text-clip text-g-gray-7 pb-6 dark:text-white">
            {cfsContent?.description}
          </p>
          {
            cfsRule ? (
              <a
                className={`mr-6 text-white h-fit w-fit text-base py-2 px-4 
                            transition ease-in-out duration-300  
                            hover:shadow-xl hover:scale-105 hover:ease-in duration-300 rounded-3xl
                            cursor-${buttonDisplay?.state === 'disabled' ? 'not-allowed' : 'pointer'}
                            bg-google-${buttonLocalColor}
                          `}
                href={buttonDisplay?.state === 'active' ? buttonDisplay?.hyperlink : '/'}
                aria-disabled={buttonDisplay?.state === 'disabled'}
                onMouseEnter={() => { setButtonLocalColor(buttonDisplay.hoverColor) }}
                onMouseLeave={() => { setButtonLocalColor(buttonDisplay.color) }}
              >
                {buttonDisplay?.title}
              </a>
            ) : null
          }
        </div>
      </div>
    </div>
  )
}