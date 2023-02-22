import { useEffect, useState } from 'react';
import CommunityPartners from '../components/CommunityPartners/CommunityPartners';
import HomeEvent from '../components/HomeEvent/HomeEvent';
import Sponsors from '../components/Sponsors/Sponsors';
import { CurrentTheme } from '../services/common.service';
import { getFeature } from '../services/feature.service';
import { postTestLogin } from '../services/rest.service';

const Home = () => {
  // const [applied, setApplied] = useState(false)
  // const [ticket, setTicket] = useState(false)
  // const [rejected, setRejected] = useState(false)

  // const navigate = useNavigate();

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
      <div className='hidden lg:block opacity-30 lg:-mt-80 relative lg: zoom-120'>
        <img src="images/background/victoria.svg" alt="Victoria Memorial Picture" />
      </div>
      <div className={`hidden lg:block h-72 text-center event-sec-2 strokeme pl-52 pr-52 pt-10 ${CurrentTheme() === 'white' ? 'bg-white' : 'bg-black'}`}>
        COLLARDS AND CODE. WAFFLES AND WINGS. 1 DAY. 20+ SPEAKERS.
        <p>
          THIS IS A TECH CONFERENCE
        </p>
      </div>
      <div className='hidden lg:block h-40'>
        COLLARDS AND CODE. WAFFLES AND WINGS. 3 DAYS. 80+ SPEAKERS.
      </div>
      <div className='hidden lg:block bg-white h-80'>
        COLLARDS AND CODE. WAFFLES AND WINGS. 3 DAYS. 80+ SPEAKERS. THIS IS A TECH CONFERENCE
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
