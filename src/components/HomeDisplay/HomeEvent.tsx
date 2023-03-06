import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FeatureRule, HomeRule } from '../../assets/models/datatype';
import { HomeButtonContent, HomeEventContent } from '../../assets/models/home/datatype';
import { CurrentTheme, randomTextGoogleColor } from '../../services/common.service';
import { ACTIVE, DARK, HOME_CONTENT_KEY, HOME_ROUTE, INACTIVE, LOGO_ASSETS } from '../../services/constants';
import { getContent } from '../../services/content.service';
import { getFeature } from '../../services/feature.service';
import { LoggedInContext } from '../../services/state.service';
import { Disclosure } from '@headlessui/react';

const HomeEvent = () => {
  const { loggedInState } = useContext(LoggedInContext);
  const [homeContent, setContent] = useState<HomeEventContent>({} as HomeEventContent);
  useEffect(() => {
    getContent<HomeEventContent>(HOME_CONTENT_KEY).then(
      (data: void | HomeEventContent) => {
        if (data) setContent(data);
      }
    );
  }, []);

  const [homeRules, setHome] = useState<HomeRule>({} as HomeRule);
  const [ticketButtonRule, setTicketButton] = useState<HomeButtonContent>({} as HomeButtonContent);
  const [cfsButtonRule, setCfsButton] = useState<HomeButtonContent>({} as HomeButtonContent);
  const [ticketButtonColor, setTicketButtonColor] = useState<string>(ticketButtonRule.color);
  const [cfsButtonColor, setCfsButtonColor] = useState<string>(cfsButtonRule.color);

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
                i.state = INACTIVE;
                if (
                  data.home?.disabledTicketButton.every(
                    (item: string) => i.id !== item
                  )
                )
                  i.state = ACTIVE;
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
                i.state = INACTIVE;
                if (
                  data.home?.disabledCfsButton.every(
                    (item: string) => i.id !== item
                  )
                )
                  i.state = ACTIVE;
                setCfsButton(i);
                setCfsButtonColor(i.color);
              }
            }
        }
      });
  }, [ticketButtonRule, cfsButtonRule, homeContent, loggedInState]);

  const [headingColor, setColor] = useState<string>('text-google-gray-3');
  useEffect(() => {
    return setColor(randomTextGoogleColor());
  }, []);

  return (
    <div className="w-full lg:w-1/2 m-w-1/2">
      <div>
        <div className="flex flex-col lg:items-start lg:pl-10 lg:w-4/5">
          <img
            className={`w-1/2 lg:w-2/5 pb-4 ${CurrentTheme() === DARK ? 'filter brightness-0 invert' : ''}`}
            src={LOGO_ASSETS + `google_cloud_logo.png`}
            alt="GDG Cloud Kolkata Logo"
          />
          <p
            className={`text-4xl lg:text-7xl font-normal text-google-blue mb-6`}
          >
            {homeContent?.event}
          </p>

          <p className="dark:text-white mb-0 pb-6 text-justify">
            <span
              className={`text-1xl lg:text-2xl font-light text-center text-google-yellow`}
            >
              {homeContent?.hashtagEventName}
            </span>
            <span
              className='text-1xl lg:text-2xl font-light'
            >
              {' - '} {homeContent?.description}
            </span>
          </p>

          <p className="text-xl mb-5 text-g-gray-8 dark:text-g-gray-4">
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

          <div className="flex flex-col lg:flex-row items-center justify-center min-w-3/4">
            <Link to={ticketButtonRule?.state === ACTIVE ? ticketButtonRule?.link : HOME_ROUTE}>
              <button type="button"
                className={`py-2 px-10 rounded-3xl h-fit w-fit 
                            text-white bg-transparent border font-medium text-1xl lg:text-2xl
                            transition ease-in-out duration-300
                            hover:shadow-xl hover:scale-105 hover:ease-in duration-300
                            cursor-${ticketButtonRule?.state === INACTIVE ? 'not-allowed' : 'pointer'}
                          `}
                aria-disabled={ticketButtonRule?.state === INACTIVE}
              >
                {ticketButtonRule?.title}
              </button>
            </Link>
            {loggedInState ? (
              <Link to={cfsButtonRule?.state === ACTIVE ? cfsButtonRule?.link : HOME_ROUTE}>
                <button type="button"
                  className={`py-2 px-10 rounded-3xl h-fit w-fit mt-5 lg:ml-10 lg:mt-0
                              text-white bg-google-red border font-medium text-1xl lg:text-2xl
                              transition ease-in-out duration-300
                              hover:shadow-xl hover:scale-105 hover:ease-in duration-300
                              cursor-${ticketButtonRule?.state === INACTIVE ? 'not-allowed' : 'pointer'}
                            `}
                  aria-disabled={cfsButtonRule?.state === INACTIVE}
                >
                  {cfsButtonRule?.title}
                </button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeEvent;
