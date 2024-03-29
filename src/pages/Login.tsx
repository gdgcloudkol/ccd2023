import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import FeatureRuleData from '../assets/content/feature.rule.json';
import LoginContentData from '../assets/content/login/content.json';
import { SignInRule } from '../assets/models/datatype';
import {
  SignInContent,
  SignInPayload,
  SigninFieldButtonContent,
  SigninFieldContent
} from '../assets/models/login/datatype';
import GoogleDotsLoader from '../components/Loader/GoogleDotsLoader';
import { BACKGROUND_ASSETS, PROFILE_ROUTE } from '../services/constants';
import { ApiSignIn } from '../services/signin.service';
import { LoggedInContext } from '../services/state.service';

const Login = () => {
  const nav = useNavigate();
  const { loggedInState, setLoggedInState } = useContext(LoggedInContext);
  const [signInContent] = useState<SignInContent>(
    LoginContentData as SignInContent
  );
  const [signInRule] = useState<SignInRule>(
    FeatureRuleData.login as SignInRule
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [signInFields, setSignInFields] = useState<SigninFieldContent[]>([]);
  const [resendVerification, setResendVerification] = useState<boolean>(false);

  useEffect(() => {
    if (loggedInState.isLoggedIn) nav(PROFILE_ROUTE);
  }, [loggedInState, nav]);

  useEffect(() => {
    const tmpArr: SigninFieldContent[] = [];
    for (let el of signInContent.fields) {
      el.show = signInRule[el.name] || false;
      fieldErrors[el.name] = '';
      el.error = fieldErrors[el.name];
      tmpArr.push(el);
    }
    setSignInFields(tmpArr);
    // eslint-disable-next-line
  }, [signInRule]);

  async function handleSubmit(e: any): Promise<void> {
    setResendVerification(false);
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(
      document.getElementById('login') as HTMLFormElement
    );

    const username = (formData.get('username') as string) || '';
    const password = (formData.get('password') as string) || '';
    const email = (formData.get('email') as string) || '';

    const payload: SignInPayload = {
      username,
      email,
      password
    };

    if (username === '') {
      setFieldErrors({
        username: 'Username cannot be blank'
      });
      setIsLoading(false);
      return;
    }

    if (password === '') {
      setFieldErrors({
        password: 'Password cannot be blank'
      });
      setIsLoading(false);
      return;
    }

    const res = await ApiSignIn(payload, setLoggedInState);

    if (res.status === 200) {
      nav(PROFILE_ROUTE);
    } else if (res.status === 400) {
      setFieldErrors(res.data);
      if (res.data['non_field_errors'][0].includes('verified.'))
        setResendVerification(true);
    }
    setIsLoading(false);
  }

  return (
    <>
      <Helmet>
        <title>Login | Google Cloud Community Days Kolkata 2023</title>
        <meta
          name="description"
          content="Login to Google Cloud Community Days Kolkata 2023"
        />
      </Helmet>
      {isLoading ? (
        <GoogleDotsLoader />
      ) : (
        <div className="max-w-7xl mx-auto" data-aos="fade-up">
          <div className="min-h-full flex">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
              <div className="mx-auto w-full max-w-sm lg:w-96">
                <div>
                  <h2 className="mt-6 text-3xl text-gray-900 dark:text-gray-100 tracking-tight">
                    {signInContent?.title}
                  </h2>
                </div>

                <div className="mt-8">
                  {fieldErrors.non_field_errors && (
                    <div
                      className="rounded-md bg-red-50 p-4"
                      data-aos="fade-in"
                    >
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            {fieldErrors.non_field_errors}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <div className="mt-6">
                    <form method="POST" className="space-y-6" id="login">
                      {signInFields.map(
                        (field: SigninFieldContent, k: number) =>
                          field?.show ? (
                            <div key={k} id={field?.name + k}>
                              <label
                                htmlFor={field?.name}
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200 capitalize"
                              >
                                {field?.name}
                              </label>
                              <div className="mt-1">
                                <input
                                  id={field?.name}
                                  name={field?.name}
                                  type={field?.type}
                                  autoComplete={field?.name}
                                  required
                                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                                            focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm 
                                            ${
                                              fieldErrors[field?.name] &&
                                              'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                                            }`}
                                />
                              </div>
                              {field?.error && (
                                <p
                                  className="mt-2 text-sm text-red-600"
                                  id={`${field?.name}-error`}
                                >
                                  {field?.error}
                                </p>
                              )}
                            </div>
                          ) : null
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <Link
                            to={signInContent?.signUpLink}
                            className="font-medium text-google-yellow hover:text-google-yellow hover:underline cursor-pointer"
                          >
                            {signInContent?.signUp}
                          </Link>
                        </div>
                        <div className="text-sm">
                          {resendVerification ? (
                            <Link
                              to={signInContent?.resendVerificationLink}
                              className="font-medium text-google-yellow hover:text-google-yellow hover:underline cursor-pointer"
                            >
                              {signInContent?.resendVerification}
                            </Link>
                          ) : (
                            <Link
                              to={signInContent?.forgotPasswordLink}
                              className="font-medium text-google-yellow hover:text-google-yellow hover:underline cursor-pointer"
                            >
                              {signInContent?.forgotPassword}
                            </Link>
                          )}
                        </div>
                      </div>
                      <div>
                        {signInContent?.button?.map(
                          (btn: SigninFieldButtonContent, i: number) =>
                            signInRule[btn.name] ? (
                              <div key={btn.name}>
                                <button
                                  onClick={
                                    btn?.name === 'submit'
                                      ? handleSubmit
                                      : () => {}
                                  }
                                  key={i}
                                  className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue transition ease-in-out 
                                  hover:shadow-xl hover:scale-105 hover:ease-in 
                                  cursor-pointer"
                                >
                                  {btn?.title}
                                </button>
                              </div>
                            ) : null
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
              <img
                className="absolute inset-0 h-full w-full object-fill"
                src={BACKGROUND_ASSETS + `victoria.png`}
                alt="Victoria SVG"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
