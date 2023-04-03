import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeatureRuleData from '../../assets/content/feature.rule.json';
import HomeContentData from '../../assets/content/home/content.json';
import { HomeRule } from '../../assets/models/datatype';
import { HomeButtonContent, HomeEventContent } from '../../assets/models/home/datatype';
import { CurrentTheme } from '../../services/common.service';
import { ACTIVE, DARK, HOME_ROUTE, INACTIVE, LOGO_ASSETS } from '../../services/constants';
import { LoggedInContext } from '../../services/state.service';

const HomeEvent = () => {
  const { loggedInState } = useContext(LoggedInContext);
  const [homeContent] = useState<HomeEventContent>(HomeContentData as HomeEventContent);
  const [homeRules] = useState<HomeRule>(FeatureRuleData.home as HomeRule);
  const [ticketButtonRule, setTicketButton] = useState<HomeButtonContent>({} as HomeButtonContent);
  const [cfsButtonRule, setCfsButton] = useState<HomeButtonContent>({} as HomeButtonContent);

  useEffect(() => {
    if (!ticketButtonRule?.id || !cfsButtonRule?.id)
      if (homeContent?.ticketButton)
        for (let i of homeContent?.ticketButton) {
          if (
            (loggedInState.isLoggedIn && loggedInState.ticket &&
              i?.id === FeatureRuleData.home?.ticketButtonBought) ||
            (loggedInState.isLoggedIn &&
              i?.id === FeatureRuleData.home?.ticketButtonStateLogin) ||
            (!loggedInState.isLoggedIn &&
              i?.id === FeatureRuleData.home?.ticketButtonStateNotLogin)
          ) {
            i.state = INACTIVE;
            if (
              FeatureRuleData.home?.disabledTicketButton.every(
                (item: string) => i.id !== item
              )
            )
              i.state = ACTIVE;
            setTicketButton(i);
          }
        }
    if (homeContent?.cfsButton)
      for (let i of homeContent?.cfsButton) {
        if (
          (loggedInState.isLoggedIn && i.id === FeatureRuleData.home?.cfsButtonStateLogin) ||
          (!loggedInState.isLoggedIn && i.id === FeatureRuleData.home?.cfsButtonStateNotLogin)
        ) {
          i.state = INACTIVE;
          if (
            FeatureRuleData.home?.disabledCfsButton.every(
              (item: string) => i.id !== item
            )
          )
            i.state = ACTIVE;
          setCfsButton(i);
        }
      }
  }, [ticketButtonRule, cfsButtonRule, homeContent, loggedInState.isLoggedIn, loggedInState.ticket]);

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

          <div className="text-xl mb-5 flex flex-col text-g-gray-8 dark:text-g-gray-4">
            {homeRules?.date ? (
              <div className='text-[20px] py-1 text-google-yellow '>
                <span className=''>{homeContent?.dateTitle + " : "}</span>
                {homeContent.date}
              </div>
            ) : (
              ''
            )}

            {homeRules?.location ? (
              <div className=' flex py-1 text-[20px] text-google-yellow '>
                {homeContent?.locationTitle + " : "} &nbsp;
                <a className='block md:hidden  ' href={homeContent.location} rel="noreferrer" target={'_blank'} >BBCC</a>
                <a className=' hidden    md:block lg:block hover:underline ' href={homeContent.location} rel="noreferrer" target={'_blank'} >{homeContent.locationName}</a>
              </div>
            ) : (
              ''
            )}
          </div>

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
            {loggedInState.isLoggedIn ? (
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
    </div >
  );
};

export default HomeEvent;
