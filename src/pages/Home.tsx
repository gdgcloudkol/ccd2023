import { useEffect, useState } from 'react';
import {
  HomeEventContent,
  LandingPageContent
} from '../assets/models/home/datatype';
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

const Home = () => {
  const [landingPageContent, setLandingPageContent] = useState(
    {} as LandingPageContent
  );
  useEffect(() => {
    getContent<HomeEventContent>('home').then(
      (data: void | HomeEventContent) => {
        if (data) setLandingPageContent(data.landingPage);
      }
    );
  }, []);

  const [homeRule, setHome] = useState({
    showCommunityPartners: false,
    showSponsors: false
  });

  useEffect(() => {
    getFeature().then((data) => {
      if (data) {
        setHome({
          showCommunityPartners: data.home?.showCommunityPartners,
          showSponsors: data.home?.showSponsors
        });
      }
    });
  }, []);

  return (
    <>
      {/* home section 1 starts here */}
      <div
        className={`relative z-10 w-full justify-between items-start flex flex-col lg:flex-row my-0 mx-auto gap-12 pt-20 lg:pt-26 lg:pb-[62px] px-4`}
        id="home-grid"
      >
        {/* event description starts here */}
        <HomeEvent />
        {/* event description ends here */}
        {/* photos section starts here */}
        <HomeDisplay />
        {/* photos section ends here */}
        <div className=" fixed right-0 top-1/4 z-50 bg-[#ffffff26] ">
          <Timer />
        </div>
      </div>
      <div className="hidden lg:block opacity-50 white-sec relative -z-0 lg: zoom-120">
        <img src="images/background/victoria.svg" alt="Victoria Memorial" />
      </div>
      {/* home section 1 ends here */}
      {/* home section 2 starts here */}
      <div
        className={`hidden lg:block h-72 text-center event-sec-2 strokeme pl-52 pr-52 pt-10 text-white ${
          CurrentTheme() === 'white' ? 'bg-white' : 'bg-black'
        }`}
      >
        {landingPageContent?.subTitle1}
        <p
          className={`no-shadow ${
            CurrentTheme() === 'white' ? 'text-black' : 'text-white'
          }`}
        >
          {landingPageContent?.description1}
        </p>
      </div>
      {/* home section 2 ends here */}
      {/* home section 3 starts here */}
      <HomeSection3 {...landingPageContent} />
      {/* home section 3 ends here */}
      {/* youtube section starts here */}
      <div
        className={`hidden lg:block h-80 ${
          CurrentTheme() === 'white' ? 'bg-white' : 'bg-black'
        }`}
      ></div>
      <Youtube
        youtubeLink={landingPageContent?.youtubeLink}
        youtubeLinkTitle={landingPageContent?.youtubeLinkTitle}
      />
      {/* youtube section ends here */}
      {/* cfs section starts here */}
      <div className="hidden lg:block opacity-50 relative lg: zoom-120 z-0">
        <img src="images/background/howrahBridge.svg" alt="Howrah Bridge" />
      </div>
      <HomeCFS />
      {/* cfs section ends here */}
      {/* sponsors section starts here */}
      {homeRule?.showSponsors ? <Sponsors /> : null}
      {/* sponsors section ends here */}
      {/* community partner starts here */}
      {homeRule?.showCommunityPartners ? <CommunityPartners /> : null}
      {/* community partner ends here */}
      {/* Home Socials starts here */}
      <HomeSocials />
      {/* Home Socials ends here */}
    </>
  );
};

export default Home;
