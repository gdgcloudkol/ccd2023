import { useEffect, useState } from 'react';
import {
  HomeEventContent,
  LandingPageContent
} from '../assets/models/home/datatype';
import CommunityPartners from '../components/CommunityPartners/CommunityPartners';
import HomeEvent from '../components/HomeEvent/HomeEvent';
import Sponsors from '../components/Sponsors/Sponsors';
import { CurrentTheme } from '../services/common.service';
import { getContent } from '../services/content.service';
import { getFeature } from '../services/feature.service';

const Home = () => {
  // const [applied, setApplied] = useState(false)
  // const [ticket, setTicket] = useState(false)
  // const [rejected, setRejected] = useState(false)

  // const navigate = useNavigate();

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

  const [features, setHome] = useState({
    showCommunityPartners: false,
    showSponsors: false
  });

  useEffect(() => {
    // if (features.showCommunityPartners === null || features.showCommunityPartners === undefined)
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
      <div
        className={`relative z-10 w-full justify-between items-start flex flex-col lg:flex-row my-0 mx-auto gap-12 pt-20 lg:pt-26 lg:pb-[62px] px-4`}
        id="home-grid"
      >
        <HomeEvent />
        <div className="flex flex-col justify-between pic-cont">
          <div className="flex flex-wrap">
            <div className="w-6/12 px-4">
              <img
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                alt=""
                className="shadow rounded-full max-w-full h-auto align-middle border-none"
              />
            </div>
            <div className="w-4/12 px-4 pic2">
              <img
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                alt=""
                className="shadow rounded-full max-w-full h-auto align-middle border-none"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="w-4/12 px-4 pic3">
              <img
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                alt=""
                className="shadow rounded-full max-w-full h-auto align-middle border-none"
              />
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:block opacity-50 white-sec relative -z-0 lg: zoom-120'>
        <img src="images/background/victoria.svg" alt="Victoria Memorial Picture" />
      </div>
      <div className={`hidden lg:block h-72 text-center event-sec-2 strokeme pl-52 pr-52 pt-10 text-white ${CurrentTheme() === 'white' ? 'bg-white' : 'bg-black'}`}>
        {landingPageContent?.subTitle1}
        <p
          className={`no-shadow ${CurrentTheme() === 'white' ? 'text-black' : 'text-white'
            }`}
        >
          {landingPageContent?.description1}
        </p>
      </div>
      <div className='hidden lg:block h-44 -mt-120'>
        <div className='grid grid-cols-4 text-white text-left'>
          <div className='event-sec-3 strokeme-w text-black pl-32 pr-32 pt-5'>
            {landingPageContent?.subTitle2}
            <p className={`no-shadow ${CurrentTheme() === 'white' ? 'text-white' : 'text-black'}`}>
              {landingPageContent?.description2}
            </p>
          </div>
          <div className='event-sec-3 strokeme-w text-black pl-32 pr-32 pt-5'>
            {landingPageContent?.subTitle3}
            <p className={`no-shadow ${CurrentTheme() === 'white' ? 'text-white' : 'text-black'}`}>
              {landingPageContent?.description3}
            </p>
          </div>
          <div className='event-sec-3 strokeme-w text-black pl-32 pr-32 pt-5'>
            {landingPageContent?.subTitle4}
            <p className={`no-shadow ${CurrentTheme() === 'white' ? 'text-white' : 'text-black'}`}>
              {landingPageContent?.description4}
            </p>
          </div>
          <div className='event-sec-3 strokeme-w text-black pl-32 pr-32 pt-5'>
            {landingPageContent?.subTitle5}
            <p className={`no-shadow ${CurrentTheme() === 'white' ? 'text-white' : 'text-black'}`}>
              {landingPageContent?.description5}
            </p>
          </div>
        </div>
      </div>
      <div className={`hidden lg:block h-80 ${CurrentTheme() === 'white' ? 'bg-white' : 'bg-black'}`}>
      </div>
      <div className="text-center lg:-mt-60 mt-20 object-fill pl-10 pr-10 lg:pl-32 lg:pr-32 yt max-h-fit">
        <iframe
          width="100%"
          height="100%"
          className='iframe'
          src={landingPageContent?.youtubeLink}
          title={landingPageContent?.youtubeLinkTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className='hidden lg:block opacity-50 relative lg: zoom-120'>
        <img src="images/background/howrahBridge.svg" alt="Howrah Bridge Picture" />
      </div>
      <div className={`hidden lg:block h-72 text-center event-sec-2 pl-52 pr-52 pt-10 text-white bg-transparent cfs`}>
        <div
          className='grid grid-rows-3 grid-col-4'
        >
          <div className='row-span-2 col-span-1'>
            Call for Speakers
          </div>
          <div className='row-span-2 col-span-1'>
            Details goes here
          </div>
          <div className=''>
            Button
          </div>
        </div>
      </div>
      {
        features?.showCommunityPartners ? (
          <>
            <Sponsors />
            <CommunityPartners />
          </>
        ) : null
      }
    </>
  );
};

export default Home;