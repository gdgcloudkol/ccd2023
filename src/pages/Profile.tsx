import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiLogout } from '../services/signin.service';
import { LoggedInContext } from '../services/state.service';

const Profile = () => {
  const { setLoggedInState } = useContext(LoggedInContext)
  const [type] = useState('Speaker');
  const nav = useNavigate()

  const logout = () => {
    ApiLogout(setLoggedInState, nav)
  }

  return (
    <div>
      <img
        className="h-32 w-full object-cover lg:h-72"
        src="https://images.unsplash.com/photo-1600080077823-a44592513861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 flex flex-col justify-between items-center sm:-mt-16 sm:space-x-5">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src="https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="lg:text-2xl text-5xl flex justify-center font-normal mt-4 text-g-gray-8 dark:text-white">
        Hello, User!
      </div>
      <div className="lg:text-2xl text-5xl flex justify-center font-normal mt-1 text-g-gray-8 dark:text-white">
        We are excited for your {type === 'Speaker' ? 'talk' : 'participation'}{' '}
        at #CCDKol 2023!
      </div>
      <section className="flex max-w-screen-xl mx-auto py-4 px-4 sm:px-8 justify-center items-center">
        <div className="max-w-xl ">
          <div className="py-4 ">
            <h3 className="text-3xl text-gray-800 font-semibold md:text-4xl">
              Be a part of the{' '}
              <span className="text-indigo-600">
                largest developer conference
              </span>{' '}
              of Eastern India
            </h3>
            <p className="text-gray-500 leading-relaxed mt-3">
              Please note that entry to Cloud Community Days Kolkata 2023 is
              exclusively through the purchase of tickets. We encourage you to
              buy your tickets as soon as possible to secure your attendance at
              the event.
            </p>
            {type === 'Speaker' ? (
              <p className="text-gray-800 text-xl leading-relaxed mt-3">
                Speakers accomodation will be provided by us on an approval
                basis. If you are interested in accomodation, please fill out the form here.
              </p>
            ) : null}
          </div>

          <div className="flex flex-row items-center justify-center min-w-2/3">
            <Link
              to="/cfs"
              className="transition ease-in-out duration-300 mr-6 text-white h-fit w-fit text-base py-2 px-4 rounded 
                  bg-google-blue
                  hover:bg-google-yellow 
                  cursor:timer"
            >
              Become a Speaker
            </Link>
            <button
              className="transition ease-in-out duration-300 mr-6 text-white h-fit w-fit text-base py-2 px-4 rounded 
                  bg-google-red
                  hover:bg-google-green 
                  cursor:timer "
              onClick={logout}
            >
              Logout
            </button>
            <button
              className="transition ease-in-out duration-300 mr-6 text-white h-fit w-fit text-base py-2 px-4 rounded 
                  bg-black bg-google-yellow
                  hover:bg-google-red 
                  cursor:timer "
              onClick={() => { }}
            >
              Edit Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;