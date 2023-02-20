import { useEffect, useState } from 'react';
import { HomeButtonContent, HomeContent } from '../assets/models/home/datatype';
import CommunityPartners from '../components/CommunityPartners/CommunityPartners';
import Countdown from '../components/Countdown/Countdown';
import { randomColor } from '../services/common.service';
import { getContent } from '../services/content.service';
import { getFeature } from '../services/feature.service';
import { loggedIn } from '../services/state.service';
import Footer from '../components/Footer/Footer';
import { ThemeState } from '../components/utils/ThemeState';
import Sponsors from '../components/Sponsors/Sponsors';

const Home = () => {
  // const [applied, setApplied] = useState(false)
  // const [ticket, setTicket] = useState(false)
  // const [rejected, setRejected] = useState(false)

  // const navigate = useNavigate();

  const [content, setContent] = useState({} as HomeContent);
  useEffect(() => {
    getContent<HomeContent>('home').then((data: void | HomeContent) => {
      if (data) setContent(data);
    });
  }, []);

  const [buttonLeft, setButtonLeft] = useState({} as HomeButtonContent);
  const [buttonRight, setButtonRight] = useState({} as HomeButtonContent);

  const [features, setHome] = useState({
    buttonLeftStateNotLogin: 'gs',
    buttonLeftStateLogin: 'bt',
    disabledLeftButton: [],
    buttonRightStateNotLogin: 'cfscs',
    buttonRightStateLogin: 'cfs',
    disabledRightButton: [],
    timer: false,
    cfs: false,
    location: false,
    date: false,
    showCommunityPartners: false
  });

  useEffect(() => {
    if (!buttonLeft?.id || !buttonRight?.id)
      getFeature().then((data) => {
        console.log(data);
        if (data) {
          setHome(data.home);
          if (content?.buttonLeft)
            for (let i of content?.buttonLeft) {
              if (
                (loggedIn && i?.id === data.home.buttonLeftStateLogin) ||
                (!loggedIn && i?.id === data.home.buttonLeftStateNotLogin)
              ) {
                if (
                  data.home.disabledLeftButton.every(
                    (item: string) => i.id !== item
                  )
                )
                  i.state = 'active';
                setButtonLeft(i);
              }
            }
          if (content?.buttonRight)
            for (let i of content?.buttonRight) {
              if (
                (loggedIn && i?.id === data.home.buttonRightStateLogin) ||
                (!loggedIn && i?.id === data.home.buttonRightStateNotLogin)
              ) {
                if (
                  data.home.disabledRightButton.every(
                    (item: string) => i.id !== item
                  )
                )
                  i.state = 'active';
                setButtonRight(i);
              }
            }
        }
      });
  }, [features]);

  const [headingColor, setColor] = useState<string>('text-google-gray-3');
  useEffect(() => {
    return setColor(randomColor());
  }, []);

  return (
    <>
      <div
        // w-full max-w-7xl items-center flex flex-col lg:flex-row my-0 mx-auto gap-12 pt-20 lg:pt-28 lg:pb-[62px] px-4
        className={`w-full ${
          features?.timer ? 'max-w-7xl' : ''
        } justify-between items-start flex flex-col lg:flex-row my-0 mx-auto gap-12 pt-20 lg:pt-28 lg:pb-[62px] px-4`}
        id="home-grid"
      >
        <div className="w-full lg:w-1/2">
          <div>
            <div className="flex flex-col items-start pl-10">
              <img
                className={`w-2/4 ${
                  ThemeState() === 'white' ? ' filter invert invisible-1' : ' '
                }`}
                src="/logo.png"
                alt="Logo"
              />
              <p
                className={`text-4xl font-normal text-google-blue mb-6 text-center`}
              >
                {content?.event}
              </p>

              <p className="text-base text-g-gray-6 dark:text-white mb-0 text-center text-justify pb-6">
                <a className="text-base text-yellow-600 mb-0 text-center text-justify pb-6">
                  {content?.hashtagEventName}
                  {' - '}
                </a>
                {content?.description}
              </p>

              <p className="text-xl mb-6 text-g-gray-8 dark:text-g-gray-4">
                {features?.date
                  ? content?.dateTitle + ' : ' + content.date
                  : ''}

                {/* <sup className="mr-0.5"></sup> &nbsp;
                {features?.location
                 
                  ? content?.locationTitle + ' : ' + content.location
                 
                  : ''}
                
                <sup className="mr-0.5"></sup> */}
              </p>

              <div className="flex flex-row items-center justify-center min-w-2/3">
                <button
                  className={`transition ease-in-out duration-300 mr-6 text-white h-fit w-fit text-base py-2 px-4 rounded bg-google-${
                    buttonLeft?.color
                  }  hover:bg-google-${buttonLeft?.hoverColor} cursor:${
                    buttonLeft?.state === 'disabled' ? 'not-allowed' : 'timer'
                  } `}
                >
                  {buttonLeft?.title}
                </button>

                <a
                  className={`transition ease-in-out ml-6 duration-300 text-center w-fit rounded bg-google-${
                    buttonRight?.color
                  } hover:bg-google-${buttonRight?.hoverColor} cursor:${
                    buttonRight?.state === 'disabled' ? 'not-allowed' : 'timer'
                  }`}
                  href={buttonRight?.hyperLink}
                  aria-disabled={
                    buttonLeft?.state === 'disabled' ? true : false
                  }
                >
                  <button className="text-white h-fit w-fit img-borde text-base py-2 px-4 rounded ">
                    {buttonRight?.title}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        {features?.timer ? (
          <div className="w-full lg:w-1/2 ">
            <Countdown />
          </div>
        ) : null}
      </div>
      {features?.showCommunityPartners ? (
        <>
          <Sponsors />
          <CommunityPartners />
        </>
      ) : null}
      <Footer />
    </>
  );
};

export default Home;
