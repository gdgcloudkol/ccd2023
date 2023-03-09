import { useContext, useEffect, useState } from 'react';
import { TownscriptProfileData, UserData } from '../assets/models/login/datatype';
import { CurrentTheme } from '../services/common.service';
import { DARK, PROFILE_ROUTE } from '../services/constants';
import { LoggedInContext } from '../services/state.service';
import { ApiViewTickets } from '../services/ticket.service';
import { Link } from 'react-router-dom';
import GoogleDotsLoader from '../components/Loader/GoogleDotsLoader';

declare global {
  interface Window {
    popupWithParams: (eventName: string, data: TownscriptProfileData) => void;
  }
}

const Tickets = () => {
  const { loggedInState } = useContext(LoggedInContext);
  const [profileData] = useState<UserData>(loggedInState.user);
  const [discountcode, setDiscountCode] = useState<string>('');
  const [ticket, setTicket] = useState<{ [key: string]: string | number }>({})
  const [buyTicket, setBuyTicket] = useState<boolean>(true);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([ApiViewTickets()])
      .then(([data]) => {
        if (data.data.length > 0) {
          setBuyTicket(false);
          setTicket(data.data[0]);
        }
        setLoader(false);
      })
  })

  function handleBuy() {
    window.popupWithParams('google-cloud-community-days-kolkata-2023', { emailid: profileData.email, firstname: profileData.profile.first_name, lastname: profileData.profile.last_name, cq1: profileData.profile.phone ? profileData.profile.phone : '', discountcode: discountcode })
  }

  return (
    loader ?
      <GoogleDotsLoader />
      :
      buyTicket ?
        <div>
          <div
            className={`block text-center pt-[16px] lg:pl-32 lg:pr-32 font-bold text-3xl leading-normal lg:text-6xl lg:leading-normal ${CurrentTheme() === DARK ? 'stroke-w-1px lg:stroke-w-2px text-black' : 'stroke-b-1px lg:stroke-b-2px text-white'}`}>
            Buy Tickets
          </div>

          <div className='flex flex-row text-white justify-center mt-10 space-x-4'>
            <div className='flex flex-col items-end space-y-4 w-2/3'>
              <div>First Name: &nbsp;</div>
              <div>Last Name: &nbsp;</div>
              <div>Email Id: &nbsp;</div>
              <div>Phone No: &nbsp;</div>
              <div>Discount Code &nbsp;</div>
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
              <div>
                <input type="text" className='text-black' onChange={(e) => setDiscountCode(e.currentTarget.value)} />
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
        :
        <div>
          <div
            className={`block text-center pt-[16px] lg:pl-32 lg:pr-32 font-bold text-3xl leading-normal lg:text-6xl lg:leading-normal ${CurrentTheme() === DARK ? 'stroke-w-1px lg:stroke-w-2px text-black' : 'stroke-b-1px lg:stroke-b-2px text-white'}`}>
            Tickets Brought
          </div>

          <div className='flex flex-row text-white justify-center mt-10 space-x-4'>
            <div className='flex flex-col items-end space-y-4 w-2/3'>
              <div>Ticket Type: &nbsp;</div>
              <div>Email Id: &nbsp;</div>
              <div>Amount Paid &nbsp;</div>
              <div>Booking Id: &nbsp;</div>
            </div>
            <div className='flex flex-col items-start space-y-4 w-2/3'>
              <div>
                {ticket?.ts_ticket_name}
              </div>
              <div>
                {ticket?.ts_user_email_id}
              </div>
              <div>
              ₹ {ticket?.amount}
              </div>
              <div>
                {ticket?.ts_booking_id}
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center">
            <Link to={PROFILE_ROUTE}>
              <button
                className={`py-2 px-10 rounded-3xl h-fit w-fit 
                  text-white bg-transparent border font-medium text-1xl lg:text-2xl
                  transition ease-in-out duration-300
                  hover:shadow-xl hover:scale-105 hover:ease-in duration-300
                  cursor-pointer'}
                `}>Profile</button>
            </Link>
          </div>
        </div>
  );
};

export default Tickets