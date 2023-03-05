import React from 'react';
import { useParams } from 'react-router-dom';
import { ApiEmailVerification, ApiResendVerification } from '../services/signin.service';
import Spinner from '../components/Spinner/Spinner';

const VerifyEmail = () => {
  const defaultMessage = 'Please wait while we are confirming your email';
  const [isVerifed, setVerified] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<string>(defaultMessage);
  const [resendEnabler, setEnabler] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const param = useParams();
  let key: string = param.key + '';
  const handleClick = async (email: string) => {
    if (email) {
      let result = await ApiResendVerification(email);
      if (result.status === 200) {
        setVerified(true);
        setStatus('Email sent successfully. Please check you inbox');
      } else {
        setStatus('something bad happened');
      }
    }
  };

  React.useEffect(() => {
    const validate = async () => {
      let result: any = await ApiEmailVerification(key);
      if (result.status === 200) {
        setVerified(true);
        setEnabler(true);
        setStatus('The email is verified.');
      } else {
        setStatus('Some problem occured');
      }
    };
    validate();
  }, []);
  return (
    <>
      <div className=" dark:text-white py-10">
        {isVerifed ? (
          <div className="text-center">
            <h1>{status}</h1>
            {!resendEnabler && <Spinner />}
          </div>
        ) : (
          <div className="">
            <div className="text-center">
              <h1>{!resendEnabler && status}</h1>
              {status === defaultMessage && <Spinner />}
            </div>
            <div className="text-center">
              {!resendEnabler && status !== defaultMessage && (
                <h3
                  onClick={() => setEnabler(true)}
                  className="hover:underline cursor-pointer text-google-blue"
                >
                  Resend Verification Email
                </h3>
              )}
              {resendEnabler && (
                <div className=" max-w-xs mx-auto">
                  <label
                    htmlFor="email"
                    className="block text-left px-1 py-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    id="email"
                    name="Email"
                    type="email"
                    required
                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm                                  
                  `}
                  />
                  <button
                    onClick={() => {
                      handleClick(email);
                    }}
                    className=" mt-5 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VerifyEmail;
