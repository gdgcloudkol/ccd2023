import { useEffect, useState } from 'react';
import { HomeEventContent, LandingPageContent } from '../assets/models/home/datatype';
import CommunityPartners from '../components/CommunityPartners/CommunityPartners';
import HomeCFS from '../components/HomeDisplay/HomeCFS';
import HomeDisplay from '../components/HomeDisplay/HomeDisplay';
import HomeSection3 from '../components/HomeDisplay/HomeSection3';
import HomeEvent from '../components/HomeDisplay/HomeEvent';
import Sponsors from '../components/Sponsors/Sponsors';
import Youtube from '../components/Youtube/Youtube';
import { CurrentTheme } from '../services/common.service';
import { getContent } from '../services/content.service';
import { getFeature } from '../services/feature.service';
import Timer from '../components/Timer/Timer';
import HomeSocials from '../components/HomeDisplay/HomeSocials';
import { BACKGROUND_ASSETS, DARK, HOME_CONTENT_KEY } from '../services/constants';
import { SponsorRule } from '../assets/models/datatype';

const Home = () => {
  const [landingPageContent, setLandingPageContent] = useState<LandingPageContent>({} as LandingPageContent);
  useEffect(() => {
    getContent<HomeEventContent>(HOME_CONTENT_KEY).then(
      (data: void | HomeEventContent) => {
        if (data) setLandingPageContent(data.landingPage);
      }
    );
  }, []);

  const [homeRule, setHome] = useState<SponsorRule>({} as SponsorRule);
  useEffect(() => {
    getFeature().then((data) => {
      if (data) setHome({ showCommunityPartners: data?.home?.showCommunityPartners, showSponsors: data?.home?.showSponsors, timer: data?.home?.timer });
    });
  }, []);

  return (
    <>
      {/* home section 1 starts here */}
      <div
        id="home-grid"
        className={`relative z-10 w-full items-center justify-start flex flex-col lg:flex-row pt-10 px-5 lg:pt-36`}
      >
        {/* event description starts here */}
        <HomeEvent />
        {/* event description ends here */}
        {/* photos section starts here */}
        <div className='hidden lg:block'>
          <HomeDisplay />
        </div>
        {/* photos section ends here */}
        {/* timer starts here */}
        {
          homeRule.timer &&
          <div className="w-full lg:fixed lg:right-0 lg:w-auto lg:inline-block lg:z-50 mt-10 lg:-mt-10 home-timer">
            <Timer />
          </div>
        }
        {/* timer ends here */}
      </div>
      <div className="opacity-50 lg:opacity-80 relative z-0 -mt-32 lg:-mt-80">
        <img src={BACKGROUND_ASSETS + `victoria.svg`} className='w-full' alt="Victoria Memorial" />
      </div>
      {/* home section 1 ends here */}
      {/* home section 2 starts here */}
      <div
        className={`block text-center pt-[16px] lg:pl-32 lg:pr-32 font-bold text-3xl leading-normal lg:text-6xl lg:leading-normal ${CurrentTheme() === DARK ? 'bg-white stroke-b-1px lg:stroke-b-2px text-white' : 'bg-black stroke-w-1px lg:stroke-w-2px text-black'}`}>
        {landingPageContent?.subTitle1}
        <p
          className={`no-shadow ${CurrentTheme() === DARK ? 'text-black' : 'text-white'} pb-10`}>
          {landingPageContent?.description1}
        </p>
      </div>
      {/* home section 2 ends here */}
      {/* home section 3 starts here */}
      <HomeSection3 {...landingPageContent} />
      {/* home section 3 ends here */}
      {/* youtube section starts here */}
      <div>
        <div className={`block h-40 lg:h-[35rem] ${CurrentTheme() === DARK ? 'bg-white' : 'bg-black'}`}>
        </div>
        <Youtube
          youtubeLink={landingPageContent?.youtubeLink}
          youtubeLinkTitle={landingPageContent?.youtubeLinkTitle}
        />
      </div>
      {/* youtube section ends here */}
      <div className="opacity-80 relative z-0 pt-48 lg:pt-0">
        <img src={BACKGROUND_ASSETS + `howrahBridge.svg`} className='w-full' alt="Howrah Bridge" />
      </div>
      {/* cfs section starts here */}
      <HomeCFS />
      {/* cfs section ends here */}
      <div className='mt-6 dark:bg-white'>
        {/* sponsors section starts here */}
        {homeRule?.showSponsors ? (
          <Sponsors />
        ) : null}
        {/* sponsors section ends here */}
        {/* community partner starts here */}
        {homeRule?.showCommunityPartners ? <CommunityPartners /> : null}
        {/* community partner ends here */}
      </div>
      {/* Home Socials starts here */}
      <HomeSocials />
      {/* Home Socials ends here */}
    </>
  );
};

export default Home;
