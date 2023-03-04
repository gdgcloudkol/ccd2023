import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FeatureRule, SignInRule } from '../assets/models/datatype';
import { SignInContent, SigninFieldButtonContent, SigninFieldContent, SignInPayload } from '../assets/models/login/datatype';
import { BACKGROUND_ASSETS, LOGIN_CONTENT_KEY, PROFILE_ROUTE } from '../services/constants';
import { getContent } from '../services/content.service';
import { getFeature } from '../services/feature.service';
import { ApiSignIn } from '../services/signin.service';
import { LoggedInContext } from '../services/state.service';

const Login = () => {
  const { setLoggedInState } = useContext(LoggedInContext);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const [signInRule, setsignInRule] = useState<SignInRule>({} as SignInRule);
  useEffect(() => {
    getFeature().then((data: FeatureRule) => {
      if (data) setsignInRule(data.login as SignInRule);
    });
  }, []);

  const [signInFields, setSignInFields] = useState<SigninFieldContent[]>([]);

  const [signInContent, setSignInContent] = useState<SignInContent>({} as SignInContent);
  useEffect(() => {
    getContent<SignInContent>(LOGIN_CONTENT_KEY).then(
      (data: void | SignInContent) => {
        if (data) {
          setSignInContent(data);
          const tmpArr: SigninFieldContent[] = []
          for (let el of data.fields) {
            el.show = signInRule[el.name] || false
            fieldErrors[el.name] = ''
            el.error = fieldErrors[el.name]
            tmpArr.push(el)
          }
          setSignInFields(tmpArr)
        }
      }
    );
    // eslint-disable-next-line
  }, [signInRule]);

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
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

    const res = await ApiSignIn(payload, setLoggedInState);

    if (res.status === 200) {
      navigate(PROFILE_ROUTE);
    } else if (res.status === 400) {
      setFieldErrors(res.data);
    }
  }

  return (
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
                <div className="rounded-md bg-red-50 p-4" data-aos="fade-in">
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
                <form
                  method="POST"
                  className="space-y-6"
                  id="login"
                >
                  {signInFields.map((field: SigninFieldContent, k: number) => (
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
                            className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm
                          ${fieldErrors[field?.name] &&
                              'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                              }
                          `}
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
                  ))}

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <Link to={signInContent?.signUpLink}
                        className="font-medium text-google-blue hover:text-google-blue"
                      >
                        {signInContent?.signUp}
                      </Link>
                    </div>
                    <div className="text-sm">
                      <Link to={signInContent?.forgotPasswordLink}
                        className="font-medium text-google-blue hover:text-google-blue"
                      >
                        {signInContent?.forgotPassword}
                      </Link>
                    </div>
                  </div>
                  <div>
                    {
                      signInContent?.button?.map((btn: SigninFieldButtonContent, i: number) => (
                        signInRule[btn.name] ? (
                          <div>
                            <button
                              onClick={btn?.name === 'submit' ? handleSubmit : () => { }}
                              key={i}
                              className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue cursor-pointer"
                            >
                              {btn?.title}
                            </button>
                          </div>
                        ) : null
                      ))
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-fill"
            src={BACKGROUND_ASSETS + `victoria.svg`}
            alt="Victoria SVG"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
