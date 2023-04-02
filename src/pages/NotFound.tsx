import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GoogleDotsLoader from '../components/Loader/GoogleDotsLoader';
import { HOME_ROUTE, LOGIN_ROUTE, LOGO_ASSETS } from '../services/constants';

const NotFound = () => {
  const nav = useNavigate();
  const [wait, setWait] = useState<boolean>(true);
  const param = useParams();
  useEffect(() => {
    if (['tickets', 'dashboard'].includes(param.route + '')) {
      nav(LOGIN_ROUTE);
      return
    }
    setTimeout(() => {
      setWait(false);
    }, 3000);
  });
  return (
    wait ? <GoogleDotsLoader /> :
      < div className="flex flex-col items-center justify-center h-screen max-w-full p-4 mx-auto space-y-4 text-center -mt-20" >
        <img
          className="object-contain max-w-7xl w-full"
          src={LOGO_ASSETS + `404.svg`}
          alt="404"
        />
        <p className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Uh oh! that page doesn't exist
        </p>
        <Link to={HOME_ROUTE}
          type="button"
          className="dark:bg-gray-800 dark:text-white inline-block px-6 py-2.5 bg-gray-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Go Back
        </Link>
      </div >
  );
};

export default NotFound;
