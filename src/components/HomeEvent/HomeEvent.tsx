import { useEffect, useState } from "react";
import { HomeRule } from "../../assets/models/datatype";
import { HomeButtonContent, HomeEventContent } from "../../assets/models/home/datatype";
import { CurrentTheme, textRandomColor } from "../../services/common.service";
import { getContent } from "../../services/content.service";
import { getFeature } from "../../services/feature.service";
import { loggedIn } from "../../services/state.service";

const HomeEvent = () => {
  const [content, setContent] = useState({} as HomeEventContent);
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
          if (content?.buttonLeft)
            for (let i of content?.buttonLeft) {
              if (
                (loggedIn && i?.id === data.home?.buttonLeftStateLogin) ||
                (!loggedIn && i?.id === data.home?.buttonLeftStateNotLogin)
              ) {
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
          if (content?.buttonRight)
            for (let i of content?.buttonRight) {
              if (
                (loggedIn && i?.id === data.home?.buttonRightStateLogin) ||
                (!loggedIn && i?.id === data.home?.buttonRightStateNotLogin)
              ) {
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
  }, [buttonLeftRule, buttonRightRule, content]);

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
            {content?.event}
          </p>

          <p className="text-g-gray-6 dark:text-white mb-0 text-center text-justify pb-6 text-1xl sm:text-base">
            <span
              className={`mb-0 text-center text-justify pb-6 ${headingColor}`}
            >
              {content?.hashtagEventName}
            </span>
            {' - '} {content?.description}
          </p>

          <p className="text-xl mb-6 text-g-gray-8 dark:text-g-gray-4">
            {homeRules?.date ? (
              <>
                {content?.dateTitle + ' : ' + content.date}
                <sup className="mr-0.5"></sup> &nbsp;
              </>
            ) : (
              ''
            )}

            {homeRules?.location ? (
              <>
                {content?.locationTitle + ' : ' + content.location}
                <sup className="mr-0.5"></sup>
              </>
            ) : (
              ''
            )}
          </p>

          <div className="flex flex-row items-center justify-center min-w-3/4">
            <a
              className={`transition ease-in-out duration-300 mr-6 text-white h-fit w-fit text-base py-2 px-4 rounded cursor-pointer hover:shadow-xl hover:scale-105 hover:ease-in duration-300 rounded-3xl
                          bg-google-${buttonLeftColor}
                          cursor:${buttonLeftRule?.state === 'disabled' ? 'not-allowed' : 'timer'} `}
              href={buttonRightRule?.hyperLink}
              aria-disabled={buttonLeftRule?.state === 'disabled' ? true : false}
              onMouseEnter={() => { setButtonLeftColor(buttonLeftRule.hoverColor) }}
              onMouseLeave={() => { setButtonLeftColor(buttonLeftRule.color) }}
            >
              {buttonLeftRule?.title}
            </a>

            <a
              className={`transition ease-in-out duration-300 mr-6 text-white h-fit w-fit text-base py-2 px-4 rounded cursor-pointer hover:shadow-xl hover:scale-105 hover:ease-in duration-300 rounded-3xl
                          bg-google-${buttonRightColor}
                          cursor:${buttonRightRule?.state === 'disabled' ? 'not-allowed' : 'timer'}`}
              href={buttonRightRule?.hyperLink}
              aria-disabled={buttonRightRule?.state === 'disabled' ? true : false}
              onMouseEnter={() => { setButtonRightColor(buttonLeftRule.hoverColor) }}
              onMouseLeave={() => { setButtonRightColor(buttonLeftRule.color) }}
            >
              {buttonRightRule?.title}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeEvent;