import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FeatureRule } from "../../assets/models/datatype";
import { HomeButtonContent, HomeCFSContent, HomeEventContent } from "../../assets/models/home/datatype";
import { CurrentTheme } from "../../services/common.service";
import { ACTIVE, DARK, HOME_CONTENT_KEY, HOME_ROUTE, INACTIVE } from "../../services/constants";
import { getContent } from "../../services/content.service";
import { getFeature } from "../../services/feature.service";
import { LoggedInContext } from "../../services/state.service";
import { Disclosure } from "@headlessui/react";

export default function HomeCFS() {
  const { loggedInState } = useContext(LoggedInContext)
  const [cfsContent, setCfsContent] = useState<HomeCFSContent>({} as HomeCFSContent);
  const [buttonContent, setButtonContent] = useState<HomeButtonContent[]>([{}] as HomeButtonContent[])
  useEffect(() => {
    getContent<HomeEventContent>(HOME_CONTENT_KEY).then(
      (data: void | HomeEventContent) => {
        if (data) {
          setButtonContent(data.cfsButton)
          setCfsContent(data.cfs);
        }
      }
    );
  }, []);

  const [cfsRule, setCfsRule] = useState<boolean>(false);
  const [buttonDisplay, setButtonDisplay] = useState<HomeButtonContent>({} as HomeButtonContent)
  const [buttonLocalColor, setButtonLocalColor] = useState<string>(buttonDisplay.color)
  useEffect(() => {
    getFeature().then((data: FeatureRule) => {
      if (data) {
        setCfsRule(data.home?.cfs);
        for (let i of buttonContent) {
          if (
            (loggedInState && i?.id === data.home?.cfsButtonStateLogin) ||
            (!loggedInState && i?.id === data.home?.cfsButtonStateNotLogin)
          ) {
            i.state = INACTIVE
            if (
              data.home.disabledCfsButton.every(
                (item: string) => i.id !== item
              )
            )
              i.state = ACTIVE;
            setButtonDisplay(i);
            setButtonLocalColor(i.color)
          }
        }
      }
    });
  }, [cfsRule, loggedInState, buttonContent]);

  return (
    <div className={`relative z-10 -mt-80 lg:-mt-96 lg:pb-36 lg:pl-60 lg:pr-60 lg:pt-0`}>
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col items-center mb-5 lg:mr-20">
          <div className="stroke-w-1px lg:stroke-w-2px text-4xl lg:text-8xl font-bold text-black uppercase">
            {cfsContent?.title}
          </div>
          <p className={`no-shadow text-4xl lg:text-8xl font-bold uppercase ${CurrentTheme() === DARK ? 'text-white ' : 'text-black'}`}>{cfsContent?.subtitle}</p>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <p className="p-5 lg:p-0 lg:pb-10 text-justify lg:text-4xl dark:text-white">
            {cfsContent?.description}
          </p>
          {
            cfsRule ? (
              <Disclosure>
                <Link to={buttonDisplay?.state === ACTIVE ? buttonDisplay?.link : HOME_ROUTE}>
                  <button
                    className={`py-2 px-10 rounded-3xl h-fit w-fit mt-5 lg:mt-0
                                text-white bg-google-red border font-medium text-1xl lg:text-2xl
                                transition ease-in-out duration-300
                                hover:shadow-xl hover:scale-105 hover:ease-in duration-300
                                cursor-${buttonDisplay?.state === INACTIVE ? 'not-allowed' : 'pointer'}
                              `}
                    aria-disabled={buttonDisplay?.state === INACTIVE}
                    onMouseEnter={() => { setButtonLocalColor(buttonDisplay.hoverColor) }}
                    onMouseLeave={() => { setButtonLocalColor(buttonDisplay.color) }}
                  >
                    {buttonDisplay?.title}
                  </button>
                </Link>
              </Disclosure>
            ) : null
          }
        </div>
      </div>
    </div>
  )
}