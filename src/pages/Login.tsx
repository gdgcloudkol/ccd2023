import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeatureRule, SignInRule } from '../assets/models/datatype';
import { SignInContent, SigninFieldButtonContent, SigninFieldContent, SignInPayload } from '../assets/models/login/datatype';
import { getContent } from '../services/content.service';
import { getFeature } from '../services/feature.service';
import { ApiLogin } from '../services/rest.service';
import { LoggedInContext } from '../services/state.service';

const Login = () => {
  const { setLoggedInState } = useContext(LoggedInContext);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

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

    const res = await ApiLogin(payload, setLoggedInState);

    if (res.status === 200) {
      navigate('/profile');
    } else if (res.status === 400) {
      setFieldErrors(res.data);
    }
  }

  const [signInRule, setsignInRule] = useState({} as SignInRule);
  useEffect(() => {
    getFeature().then((data: FeatureRule) => {
      if (data)
        setsignInRule(data.login as SignInRule);
    });
  }, []);

  const [signInFields, setSignInFields] = useState<SigninFieldContent[]>([]);

  const [signInContent, setSignInContent] = useState<SignInContent>({} as SignInContent);
  useEffect(() => {
    getContent<SignInContent>('login').then(
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
  }, [signInRule]);


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
                  onSubmit={handleSubmit}
                >
                  {signInFields.map((field) => (
                    field.show ? (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium text-gray-700 dark:text-gray-200 capitalize"
                        >
                          {field.name}
                        </label>
                        <div className="mt-1">
                          <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            autoComplete={field.name}
                            required
                            className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm
                          ${fieldErrors[field.name] &&
                              'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                              }
                          `}
                          />
                        </div>
                        {field.error && (
                          <p
                            className="mt-2 text-sm text-red-600"
                            id={`${field.name}-error`}
                          >
                            {field.error}
                          </p>
                        )}
                      </div>
                    ) : null
                  ))}

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <a
                        href={signInContent?.signUpLink}
                        className="font-medium text-google-blue hover:text-google-blue"
                      >
                        {signInContent?.signUp}
                      </a>
                    </div>
                    <div className="text-sm">
                      <a
                        href={signInContent?.forgotPasswordLink}
                        className="font-medium text-google-blue hover:text-google-blue"
                      >
                        {signInContent?.forgotPassword}
                      </a>
                    </div>
                  </div>
                  <div className='flex box-border justify-between'>
                    {
                      signInContent?.button?.map((btn: SigninFieldButtonContent, i: number) => (
                        signInRule[btn.name] ? (
                          <div className='pr-10 pl-10'>
                            <a
                              onClick={btn.name === 'submit' ? handleSubmit : () => { }}
                              href={btn.name !== 'submit' ? btn.hyperlink : ''}
                              key={i}
                              className="w-full content-fill flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue cursor-pointer"
                            >
                              {btn?.title}
                            </a>
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
            src="/ccd2023/images/background/victoria.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
