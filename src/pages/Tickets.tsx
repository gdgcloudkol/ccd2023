import { useContext, useState } from 'react';
import { TownscriptProfileData, UserData } from '../assets/models/login/datatype';
import { CurrentTheme } from '../services/common.service';
import { DARK } from '../services/constants';
import { LoggedInContext } from '../services/state.service';

declare global {
  interface Window {
    townscriptPopup: (eventName: string, data: TownscriptProfileData) => void;
  }
}

const Tickets = () => {
  const { loggedInState } = useContext(LoggedInContext);
  const [profileData] = useState<UserData>(loggedInState.user);

  function handleBuy() {
    window.townscriptPopup('google-cloud-community-days-kolkata-2023', { email: profileData.email, first_name: profileData.profile.first_name, last_name: profileData.profile.last_name, phoneNumber: profileData.profile.phone ? profileData.profile.phone : '' })
  }

  return (
    <div>
      <div
        className={`block text-center pt-[16px] lg:pl-32 lg:pr-32 font-bold text-3xl leading-normal lg:text-6xl lg:leading-normal ${CurrentTheme() === DARK ? 'stroke-w-1px lg:stroke-w-2px text-black' : 'stroke-b-1px lg:stroke-b-2px text-white'}`}>
        Buy Tickets
      </div>

      <div className='flex flex-row text-white justify-center mt-10 space-x-4'>
        <div className='flex flex-col items-end space-y-4 w-2/3'>
          <div>
            First Name: &nbsp;
          </div>
          <div>Last Name: &nbsp;
          </div>
          <div>Email Id: &nbsp;
          </div>
          <div>Phone No: &nbsp;
          </div>
        </div>
        <div className='flex flex-col items-start space-y-4 w-2/3'>
          <div>
            {profileData.profile.first_name}
          </div>
          <div>
            {profileData.profile.last_name}
          </div>
          <div>
            {profileData.email}
          </div>
          <div>
            {profileData.profile.phone}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <button onClick={handleBuy} type="button"
          className={`py-2 px-10 rounded-3xl h-fit w-fit 
                    text-white bg-transparent border font-medium text-1xl lg:text-2xl
                    transition ease-in-out duration-300
                    hover:shadow-xl hover:scale-105 hover:ease-in duration-300
                    cursor-pointer'}
                  `}>Buy</button>
      </div>
    </div>
  );
};

export default Tickets