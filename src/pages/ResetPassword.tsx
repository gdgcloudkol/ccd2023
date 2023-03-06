import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import { HOME_ROUTE, LOGIN_ROUTE } from '../services/constants';
import { ApiResetPasswordConfirmLink, ApiResetPasswordLink } from '../services/signin.service';

const ForgotPassword = () => {
  const nav = useNavigate();
  const [resetFlag, setResetFlag] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [spinnerFlag, setSpinnerFlag] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const param = useParams();
  let uid: string = param.uid + '';
  let token: string = param.token + '';


  const handleClick = async (email: string) => {
    setSpinnerFlag(true);
    if (email) {
      let result = await ApiResetPasswordLink(email);
      if (result.status === 200) {
        setSpinnerFlag(false);
        nav(HOME_ROUTE)
      }
    }
  };

  const handlePasswordClick = async (e: any) => {
    setSpinnerFlag(true);
    const formData = new FormData(
      document.getElementById('passwordReset') as HTMLFormElement
    );

    const new_password1 = formData.get('password1') as string;
    const new_password2 = formData.get('password2') as string;

    if (new_password1 && new_password2 && new_password1 === new_password2) {
      let result = await ApiResetPasswordConfirmLink({ new_password1, new_password2, token, uid });
      if (result.status === 200) {
        setSpinnerFlag(false);
        nav(LOGIN_ROUTE)
      }
    }
    setSpinnerFlag(false);
  };

  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(
      document.getElementById('passwordReset') as HTMLFormElement
    );

    const password1 = formData.get('password1') as string;
    const password2 = formData.get('password2') as string;

    if (password1 && password2 && password1 !== password2) {
      setStatus('Passwords do not match');
    } else if (password1 && password2 && password1 === password2) {
      setStatus('');
    }
  }

  useEffect(() => {
    if (token !== 'undefined' && uid !== 'undefined') {
      setResetFlag(true);
    } else {
      setResetFlag(false);
    }
  }, [token, uid]);

  return (
    <>
      <div className=" dark:text-white py-10">
        {
          resetFlag ? (
            <>
              <form id="passwordReset" method="POST" onChange={handleChange}>
                <div className=" max-w-xs mx-auto">
                  {status !== '' ?
                    <div className="rounded-md bg-red-50 p-4" data-aos="fade-in">
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            {status}
                          </h3>
                        </div>
                      </div>
                    </div> : null
                  }
                  <label
                    htmlFor="password1"
                    className="block text-left px-1 py-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    New Password
                  </label>
                  <input id="password1" name="password1" type="password" required
                    className={`appearance-none block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 
              focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm`}
                  // onChange={(e) => setPassword1(e.currentTarget.value)}
                  />
                  <label
                    htmlFor="password2"
                    className="block text-left px-1 py-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Confirm Password
                  </label>
                  <input id="password2" name="password2" type="password" required
                    className={`appearance-none block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 
              focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm`}
                  // onChange={(e) => setPassword2(e.currentTarget.value)}
                  />
                  {spinnerFlag ? (<Spinner />) :
                    <button type="submit"
                      onClick={handlePasswordClick}
                      className=" mt-5 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue 
                hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue">
                      Change Password
                    </button>
                  }
                </div>
              </form>
            </>
          ) : (
            <div className=" max-w-xs mx-auto">
              <label
                htmlFor="email"
                className="block text-left px-1 py-2 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Registered Email
              </label>
              <input id="email" name="Email" type="email" required
                className={`appearance-none block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm`}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              {spinnerFlag ? (<Spinner />) :
                <button
                  onClick={() => {
                    handleClick(email);
                  }}
                  className=" mt-5 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue 
                  hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue">
                  Reset Password
                </button>
              }
            </div>
          )}
      </div>
    </>
  );
}

export default ForgotPassword
