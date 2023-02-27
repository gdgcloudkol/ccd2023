import { useContext, useEffect, useState } from 'react';
import { FeatureRule, HomeRule } from '../../assets/models/datatype';
import {
  HomeButtonContent,
  HomeEventContent
} from '../../assets/models/home/datatype';
import { CurrentTheme, textRandomColor } from '../../services/common.service';
import { getContent } from '../../services/content.service';
import { getFeature } from '../../services/feature.service';
import { LoggedInContext } from '../../services/state.service';

const HomeEvent = () => {
  const { loggedInState } = useContext(LoggedInContext);
  const [homeContent, setContent] = useState({} as HomeEventContent);
  useEffect(() => {
    getContent<HomeEventContent>('home').then(
      (data: void | HomeEventContent) => {
        if (data) setContent(data);
      }
    );
  }, []);

  const [homeRules, setHome] = useState({} as HomeRule);
  const [ticketButtonRule, setTicketButton] = useState({} as HomeButtonContent);
  const [cfsButtonRule, setCfsButton] = useState({} as HomeButtonContent);
  const [ticketButtonColor, setTicketButtonColor] = useState(
    ticketButtonRule.color
  );
  const [cfsButtonColor, setCfsButtonColor] = useState(cfsButtonRule.color);

  useEffect(() => {
    if (!ticketButtonRule?.id || !cfsButtonRule?.id)
      getFeature().then((data: FeatureRule) => {
        if (data) {
          setHome(data.home);
          if (homeContent?.ticketButton)
            for (let i of homeContent?.ticketButton) {
              if (
                (loggedInState &&
                  i?.id === data.home?.ticketButtonStateLogin) ||
                (!loggedInState &&
                  i?.id === data.home?.ticketButtonStateNotLogin)
              ) {
                i.state = 'disabled';
                if (
                  data.home?.disabledTicketButton.every(
                    (item: string) => i.id !== item
                  )
                )
                  i.state = 'active';
                setTicketButton(i);
                setTicketButtonColor(i.color);
              }
            }
          if (homeContent?.cfsButton)
            for (let i of homeContent?.cfsButton) {
              if (
                (loggedInState && i.id === data.home?.cfsButtonStateLogin) ||
                (!loggedInState && i.id === data.home?.cfsButtonStateNotLogin)
              ) {
                i.state = 'disabled';
                if (
                  data.home?.disabledCfsButton.every(
                    (item: string) => i.id !== item
                  )
                )
                  i.state = 'active';
                setCfsButton(i);
                setCfsButtonColor(i.color);
              }
            }
        }
      });
  }, [ticketButtonRule, cfsButtonRule, homeContent, loggedInState]);

  const [headingColor, setColor] = useState<string>('text-google-gray-3');
  useEffect(() => {
    return setColor(textRandomColor());
  }, []);

  return (
    <div className="w-full m-w-1/2">
      <div>
        <div className="flex flex-col lg:items-start lg:pl-10 lg:w-4/5">
          <img
            className={`w-1/2 lg:w-2/5 pb-4 ${
              CurrentTheme() === 'white' ? 'filter brightness-0 invert' : ''
            }`}
            src="ccd2023/images/logos/google_cloud_logo.png"
            alt="GDG Cloud Kolkata Logo"
          />
          <p
            className={`text-4xl lg:text-6xl font-normal text-google-blue mb-6`}
          >
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
                          cursor-${
                            ticketButtonRule?.state === 'disabled'
                              ? 'not-allowed'
                              : 'pointer'
                          }
                          bg-google-${ticketButtonColor}
                        `}
              href={
                ticketButtonRule?.state === 'active'
                  ? ticketButtonRule?.hyperlink
                  : '/'
              }
              aria-disabled={ticketButtonRule?.state === 'disabled'}
              onMouseEnter={() => {
                setTicketButtonColor(ticketButtonRule.hoverColor);
              }}
              onMouseLeave={() => {
                setTicketButtonColor(ticketButtonRule.color);
              }}
            >
              {ticketButtonRule?.title}
            </a>
            {loggedInState ? (
              <a
                className={`mr-6 text-white h-fit w-fit text-base py-2 px-4 rounded-3xl
                          transition ease-in-out duration-300
                          hover:shadow-xl hover:scale-105 hover:ease-in duration-300
                          cursor-${
                            cfsButtonRule?.state === 'disabled'
                              ? 'not-allowed'
                              : 'pointer'
                          }
                          bg-google-${cfsButtonColor}
                        `}
                href={
                  cfsButtonRule?.state === 'active'
                    ? cfsButtonRule?.hyperlink
                    : '/'
                }
                aria-disabled={cfsButtonRule?.state === 'disabled'}
                onMouseEnter={() => {
                  setCfsButtonColor(cfsButtonRule.hoverColor);
                }}
                onMouseLeave={() => {
                  setCfsButtonColor(cfsButtonRule.color);
                }}
              >
                {cfsButtonRule?.title}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeEvent;
