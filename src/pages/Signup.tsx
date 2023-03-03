import { Link } from 'react-router-dom';
import { SignUpPayload } from '../assets/models/login/datatype';
import { ApiSignup } from '../services/signin.service';
import { useEffect, useState, useContext } from 'react';
import { BACKGROUND_ASSETS, SIGNUP_CONTENT_KEY } from '../services/constants';
import { InitialProfileDataAndContent, SignupContent } from '../assets/models/signup/datatype';
import { getContent } from '../services/content.service';
import { FeatureRule } from '../assets/models/datatype';
import { getFeature } from '../services/feature.service';
import { LoggedInContext } from '../services/state.service';

const Signup = () => {
  const [signupContent, setSignupContent] = useState<SignupContent>({} as SignupContent);
  const { setLoggedInState } = useContext(LoggedInContext);
  useEffect(() => {
    getContent<SignupContent>(SIGNUP_CONTENT_KEY).then((data: void | SignupContent) => {
      if (data) setSignupContent(data);
    });
  }, []);

  const [signupRule, setSignupRule] = useState<string[]>(['']);
  useEffect(() => {
    getFeature().then((data: FeatureRule) => {
      if (data) setSignupRule(data.signup);
    });
  }, []);

  const [initialProfileFileds, setInitialProfileFields] = useState<InitialProfileDataAndContent>({} as InitialProfileDataAndContent);
  useEffect(() => {
    if (signupContent?.initialProfile) {
      Object.keys(signupContent?.initialProfile).forEach((key: string) => {
        if (signupRule.every(i => i !== key)) {
          console.log(signupContent?.initialProfile)
        } else {
          console.log('not allowed', key)
        }
      })
    }
  }, [signupRule, signupContent]);
  const signupFields = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Email',
      required: true
    },
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'Username',
      required: true
    },
    {
      name: 'password1',
      type: 'password',
      label: 'Password',
      placeholder: 'Password',
      required: true
    },
    {
      name: 'password2',
      type: 'password',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      required: true
    }
  ];

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(
      document.getElementById('signup') as HTMLFormElement
    );

    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const password1 = formData.get('password1') as string;
    const password2 = formData.get('password2') as string;

    const payload: SignUpPayload = {
      email,
      username,
      password1,
      password2
    };

    if (password1 !== password2) {
      setFieldErrors({
        password1: 'Passwords do not match',
        password2: 'Passwords do not match'
      });
      return;
    }

    const res = await ApiSignup(payload, setLoggedInState);
    if (res.status === 400) {
      setFieldErrors(res.data);
    }
  }
  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(
      document.getElementById('signup') as HTMLFormElement
    );

    const password1 = formData.get('password1') as string;
    const password2 = formData.get('password2') as string;

    if (password1 && password2 && password1 !== password2) {
      setFieldErrors({
        password1: 'Passwords do not match',
        password2: 'Passwords do not match'
      });
    } else {
      setFieldErrors({});
    }
  }

  return (
    <div className="max-w-7xl mx-auto" data-aos="fade-up">
      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl text-gray-900 dark:text-gray-100 tracking-tight">
                {signupContent?.title}
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
                  id="signup"
                  onSubmit={handleSubmit}
                  onChange={handleChange}
                >
                  {signupFields.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        {field.label}
                      </label>
                      <div className="mt-1">
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          autoComplete={field.name}
                          required={field.required}
                          className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm
                          
                          ${fieldErrors[field.name] &&
                            'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                            }
                          
                          `}
                        />
                      </div>
                      {fieldErrors[field.name] && (
                        <p className="mt-2 text-sm text-red-600">
                          {fieldErrors[field.name]}
                        </p>
                      )}
                    </div>
                  ))}

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <Link to={signupContent?.signinLink}
                        className="font-medium text-google-blue hover:text-google-blue"
                      >
                        {signupContent?.signin}
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                    >
                      {signupContent?.button?.submit}
                    </button>
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

export default Signup;
