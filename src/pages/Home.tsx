import CommunityPartners from '../components/CommunityPartners/CommunityPartners';

import Countdown from '../components/Countdown/Countdown';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const [applied, setApplied] = useState(false)
  // const [ticket, setTicket] = useState(false)
  // const [rejected, setRejected] = useState(false)

  // const navigate = useNavigate();

  return (
    <>
      <div
        // w-full max-w-7xl items-center flex flex-col lg:flex-row my-0 mx-auto gap-12 pt-20 lg:pt-28 lg:pb-[62px] px-4
        className="w-full max-w-7xl justify-center items-center flex flex-col lg:flex-row my-0 mx-auto gap-12 pt-20 lg:pt-28 lg:pb-[62px] px-4"
        id="home-grid"
      >
        <div className="w-full lg:w-1/2">
          <div>
            <div className="flex flex-col items-center ">
              <img className="w-2/4" src="/logo.png" alt="Logo" />
              <p className="text-2xl pt-4 pb-5 mb-0 text-g-gray-8">Presents</p>
              <p className="text-4xl font-normal text-[#4285f4] mb-6 text-center">
                Cloud Community Days 2023
              </p>

              <p className="text-base text-g-gray-6 mb-0 text-center pb-6">
                An event organized by the community that features industry
                experts presenting on exciting cloud topics. The shared belief
                powering this conference is that when developers come together
                to exchange ideas, amazing things can happen.
              </p>

              <p className="text-xl mb-6 text-g-gray-8">
                Dates: TBD<sup className="mr-0.5"></sup>
              </p>
              <div className="flex flex-row items-center justify-center min-w-full">
                <button className="transition ease-in-out bg-blue-500 hover:bg-blue-600 duration-300 mr-6 text-white h-fit w-fit text-base py-2 px-4 rounded">
                  Get Started
                </button>

                <a
                  className="transition ease-in-out ml-6 bg-gray-500 duration-300 text-center w-fit rounded disabled"
                  href="#"
                  aria-disabled={true}
                >
                  <button className="text-white  h-fit w-fit text-base py-2 px-4 rounded ">
                    CFS Closed
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 ">
          <Countdown />
        </div>
      </div>
      <CommunityPartners />
    </>
  );
};

export default Home;
