import { useEffect, useState } from "react";
import { HomeRule } from "../../assets/models/datatype";
import { HomeButtonContent, HomeEventContent } from "../../assets/models/home/datatype";
import { CurrentTheme, textRandomColor } from "../../services/common.service";
import { getContent } from "../../services/content.service";
import { getFeature } from "../../services/feature.service";
import { loggedIn } from "../../services/state.service";

const HomeEvent = () => {
  const [homeContent, setContent] = useState({} as HomeEventContent);
  useEffect(() => {
    getContent<HomeEventContent>('home').then((data: void | HomeEventContent) => {
      if (data) setContent(data);
    });
  }, []);


  const [buttonLeftRule, setButtonLeft] = useState({} as HomeButtonContent);
  const [buttonRightRule, setButtonRight] = useState({} as HomeButtonContent);

  const [homeRules, setHome] = useState({} as HomeRule);

  const [buttonLeftColor, setButtonLeftColor] = useState(buttonLeftRule.color)
  const [buttonRightColor, setButtonRightColor] = useState(buttonRightRule.color)

  useEffect(() => {
    if (!buttonLeftRule?.id || !buttonRightRule?.id)
      getFeature().then((data) => {
        if (data) {
          setHome(data.home);
          if (homeContent?.buttonLeft)
            for (let i of homeContent?.buttonLeft) {
              if (
                (loggedIn && i?.id === data.home?.buttonLeftStateLogin) ||
                (!loggedIn && i?.id === data.home?.buttonLeftStateNotLogin)
              ) {
                i.state = 'disabled'
                if (
                  data.home.disabledLeftButton.every(
                    (item: string) => i.id !== item
                  )
                )
                  i.state = 'active';
                setButtonLeft(i);
                setButtonLeftColor(i.color)
              }
            }
          if (homeContent?.buttonRight)
            for (let i of homeContent?.buttonRight) {
              if (
                (loggedIn && i?.id === data.home?.buttonRightStateLogin) ||
                (!loggedIn && i?.id === data.home?.buttonRightStateNotLogin)
              ) {
                i.state = 'disabled'
                if (
                  data.home.disabledRightButton.every(
                    (item: string) => i.id !== item
                  )
                )
                  i.state = 'active';
                setButtonRight(i);
                setButtonRightColor(i.color)
              }
            }
        }
      });
  }, [buttonLeftRule, buttonRightRule, homeContent]);

  const [headingColor, setColor] = useState<string>('text-google-gray-3');
  useEffect(() => {
    return setColor(textRandomColor());
  }, []);



  return (
    <div className="w-full m-w-1/2">
      <div>
        <div className="flex flex-col lg:items-start lg:pl-10 lg:w-4/5">
          <img
            className={`w-1/2 lg:w-2/5 pb-4 ${CurrentTheme() === 'white' ? 'filter brightness-0 invert' : ''}`}
            src="/images/logos/google_cloud_logo.png"
            alt="GDG Cloud Kolkata Logo"
          />
          <p className={`text-4xl lg:text-6xl font-normal text-google-blue mb-6`}>
            {homeContent?.event}
          </p>

          <p className="text-g-gray-6 dark:text-white mb-0 text-center text-justify pb-6 text-1xl sm:text-base">
            <span
              className={`mb-0 text-center text-justify pb-6 ${headingColor}`}
            >
              {homeContent?.hashtagEventName}
            </span>
            {' - '} {homeContent?.description}
          </p>

          <p className="text-xl mb-6 text-g-gray-8 dark:text-g-gray-4">
            {homeRules?.date ? (
              <>
                {homeContent?.dateTitle + ' : ' + homeContent.date}
                <sup className="mr-0.5"></sup> &nbsp;
              </>
            ) : (
              ''
            )}

            {homeRules?.location ? (
              <>
                {homeContent?.locationTitle + ' : ' + homeContent.location}
                <sup className="mr-0.5"></sup>
              </>
            ) : (
              ''
            )}
          </p>

          <div className="flex flex-row items-center justify-center min-w-3/4">
            <a
              className={`mr-6 text-white h-fit w-fit text-base py-2 px-4 rounded-3xl
                          transition ease-in-out duration-300
                          hover:shadow-xl hover:scale-105 hover:ease-in duration-300
                          cursor-${buttonLeftRule?.state === 'disabled' ? 'not-allowed' : 'pointer'}
                          bg-google-${buttonLeftColor}
                        `}
              href={buttonLeftRule?.state === 'active' ? buttonLeftRule?.hyperLink : ''}
              aria-disabled={buttonLeftRule?.state === 'disabled'}
              onMouseEnter={() => { setButtonLeftColor(buttonLeftRule.hoverColor) }}
              onMouseLeave={() => { setButtonLeftColor(buttonLeftRule.color) }}
            >
              {buttonLeftRule?.title}
            </a>
            {loggedIn ? (
              <a
                className={`mr-6 text-white h-fit w-fit text-base py-2 px-4 rounded-3xl
                          transition ease-in-out duration-300
                          hover:shadow-xl hover:scale-105 hover:ease-in duration-300
                          cursor-${buttonRightRule?.state === 'disabled' ? 'not-allowed' : 'pointer'}
                          bg-google-${buttonRightColor}
                        `}
                href={buttonRightRule?.state === 'active' ? buttonRightRule?.hyperLink : ''}
                aria-disabled={buttonRightRule?.state === 'disabled'}
                onMouseEnter={() => { setButtonRightColor(buttonRightRule.hoverColor) }}
                onMouseLeave={() => { setButtonRightColor(buttonRightRule.color) }}
              >
                {buttonRightRule?.title}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeEvent;