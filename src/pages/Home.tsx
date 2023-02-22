import { useEffect, useState } from 'react';
import { HomeEventContent, LandingPageContent } from '../assets/models/home/datatype';
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

  const [landingPageContent, setLandingPageContent] = useState({} as LandingPageContent);
  useEffect(() => {
    getContent<HomeEventContent>('home').then((data: void | HomeEventContent) => {
      if (data) setLandingPageContent(data.landingPage);
    });
  }, []);

  const [features, setHome] = useState({
    showCommunityPartners: false,
    showSponsors: false
  });

  useEffect(() => {
    // if (features.showCommunityPartners === null || features.showCommunityPartners === undefined)
    getFeature().then((data) => {
      if (data) {
        setHome({ showCommunityPartners: data.home?.showCommunityPartners, showSponsors: data.home?.showSponsors })
      }
    });
  }, []);

  return (
    <>
      <div className={`relative z-10 w-full justify-between items-start flex flex-col lg:flex-row my-0 mx-auto gap-12 pt-20 lg:pt-26 lg:pb-[62px] px-4`} id="home-grid">
        <HomeEvent
        />
      </div>
      <div className='hidden lg:block opacity-50 lg:-mt-80 relative lg: zoom-120'>
        <img src="images/background/victoria.svg" alt="Victoria Memorial Picture" />
      </div>
      <div className={`hidden lg:block h-72 text-center event-sec-2 strokeme pl-52 pr-52 pt-10 text-white ${CurrentTheme() === 'white' ? 'bg-white' : 'bg-black'}`}>
        {landingPageContent?.subTitle1}
        <p className={`no-shadow ${CurrentTheme() === 'white' ? 'text-black' : 'text-white'}`}>
          {landingPageContent?.description1}
        </p>
      </div>
      <div className='hidden lg:block h-40'>
        <div className='grid grid-cols-4 text-white text-left'>
          <div className='event-sec-3 strokeme-w text-black pl-28 pt-5'>
            2
            <p className={`no-shadow ${CurrentTheme() === 'white' ? 'text-white' : 'text-black'}`}>
              Fun Filled Days
            </p>
          </div>
          <div className='event-sec-3 strokeme-w text-black pl-32 pr-32 pt-5'>
            2500+
            <p className={`no-shadow ${CurrentTheme() === 'white' ? 'text-white' : 'text-black'}`}>
              Excited Attnedees
            </p>
          </div>
          <div className='event-sec-3 strokeme-w text-black pl-32 pr-32 pt-5'>
            20+
            <p className={`no-shadow ${CurrentTheme() === 'white' ? 'text-white' : 'text-black'}`}>
              Expert Speakers
            </p>
          </div>
          <div className='event-sec-3 strokeme-w text-black pl-32 pr-32 pt-5'>
            4
            <p className={`no-shadow ${CurrentTheme() === 'white' ? 'text-white' : 'text-black'}`}>
              Speciality Track
            </p>
          </div>
        </div>
      </div>
      <div className={`hidden lg:block h-80 ${CurrentTheme() === 'white' ? 'bg-white' : 'bg-black'}`}>
      </div>
      {features?.showCommunityPartners ? (
        <>
          <Sponsors />
          <CommunityPartners />
        </>
      ) : null}
    </>
  );
};

export default Home;
