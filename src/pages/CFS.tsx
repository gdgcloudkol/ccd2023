import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FeatureRule } from '../assets/models/datatype';
import { SignUpPayload } from '../assets/models/login/datatype';
import {
  InitialProfileContent,
  InputDataType,
  SignupContent
} from '../assets/models/signup/datatype';
import {
  BACKGROUND_ASSETS,
  PROFILE_ROUTE,
  SIGNUP_CONTENT_KEY,
  VERIFY_EMAIL_ROUTE
} from '../services/constants';
import { getContent } from '../services/content.service';
import { getFeature } from '../services/feature.service';
import { ApiSignup } from '../services/signin.service';
import { LoggedInContext } from '../services/state.service';
import { Combobox, Switch } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

const CFS = () => {
  const [enabled, setEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const nav = useNavigate();
  const [signupContent, setSignupContent] = useState<SignupContent>(
    {} as SignupContent
  );
  const { loggedInState } = useContext(LoggedInContext);
  useEffect(() => {
    getContent<SignupContent>(SIGNUP_CONTENT_KEY).then(
      (data: void | SignupContent) => {
        if (data) setSignupContent(data);
      }
    );
  }, [loggedInState, nav]);

  const [signupRule, setSignupRule] = useState<string[]>(['']);
  useEffect(() => {
    getFeature().then((data: FeatureRule) => {
      if (data) setSignupRule(data.signup);
    });
  }, []);

  const [initialProfileContentFileds, setInitialProfileContentFields] =
    useState<InputDataType[]>([] as InputDataType[]);
  useEffect(() => {
    if (signupContent?.initialProfile) {
      const order = signupContent?.initialProfile?.order;
      const locArr: InputDataType[] = new Array(order.length);
      Object.keys(signupContent?.initialProfile).forEach((key: string) => {
        if (signupRule.every((i) => i !== key) && key !== 'order') {
          locArr[order.indexOf(key)] = signupContent?.initialProfile[
            key as keyof InitialProfileContent
          ] as InputDataType;
        }
        setInitialProfileContentFields(locArr);
      });
    }
  }, [signupRule, signupContent]);

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  async function handleSubmit(e: any) {
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

    const res = await ApiSignup(payload);
    if (res.status === 400) {
      setFieldErrors(res.data);
    } else if (res.status === 200) nav(VERIFY_EMAIL_ROUTE);
  }

  // function handleChange(e: React.FormEvent<HTMLFormElement>) {
  //   const formData = new FormData(
  //     document.getElementById('signup') as HTMLFormElement
  //   );

  //   const password1 = formData.get('password1') as string;
  //   const password2 = formData.get('password2') as string;

  //   if (password1 && password2 && password1 !== password2) {
  //     setFieldErrors({
  //       password1: 'Passwords do not match',
  //       password2: 'Passwords do not match'
  //     });
  //   } else {
  //     setFieldErrors({});
  //   }
  // }

  return (
    <div className="max-w-7xl mx-auto" data-aos="fade-up">
      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-2xl text-gray-900 dark:text-gray-100 tracking-tight">
                {'Call for Speakers for CCD Kol 2023'}
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
                <form method="POST" className="space-y-6" id="signup">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Title
                    </label>
                    <div className="mt-1">
                      <input
                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Description
                    </label>
                    <div className="mt-1">
                      <input
                        className={`appearance-none block w-full px-3 py-5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Previous Talk Links
                    </label>
                    <div className="mt-1">
                      <input
                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm`}
                      />
                    </div>
                  </div>
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Type of Talk
                    </label>
                    <select
                      value={selectedOption}
                      className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Choose</option>
                      <option value="option1">Lightning Talk</option>
                      <option value="option2">Regular Talk</option>
                      <option value="option3">Long Talk</option>
                    </select>
                  </div>

                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Travel Support Required
                    </label>
                    <select
                      value={selectedOption}
                      className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Choose</option>
                      <option value="option1">Travel Only</option>
                      <option value="option2">Accomodation Only</option>
                      <option value="option3">
                        Travel and Accomodation both
                      </option>
                      <option value="option4">None</option>
                    </select>
                  </div>
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Topic of Expertise
                    </label>
                    <select
                      value={selectedOption}
                      className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Choose</option>
                      <option value="option1">Javascript</option>
                      <option value="option2">Python</option>
                      <option value="option3">Java</option>
                      <option value="option4">C#</option>
                      <option value="option5">PHP</option>
                      <option value="option6">Android</option>
                      <option value="option7">Web Dev</option>
                      <option value="option8">Google Cloud Platform</option>
                    </select>
                  </div>
                  <Switch.Group
                    as="div"
                    className="flex items-center justify-between mt-8"
                  >
                    <span className="flex flex-grow flex-col">
                      <label className="block text-xl font-medium text-gray-700 dark:text-gray-200">
                        Previously talked at CCD Kol ?
                      </label>
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={`${
                        enabled ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
                    >
                      <span
                        aria-hidden="true"
                        className={`${
                          enabled ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </Switch.Group>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                      onClick={handleSubmit}
                    >
                      Apply
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

export default CFS;
