import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../assets/models/login/datatype';
import SocialProfile from '../components/SocialProfile/SocialProfile';
import Spinner from '../components/Spinner/Spinner';
import {
  BACKGROUND_ASSETS,
  CFS_ROUTE,
  DP_ASSETS,
  LOGIN_ROUTE,
  TICKET_ROUTE,
  TICKET_PURCHASED_KEY
} from '../services/constants';
import { countryCodeChoices } from '../services/countryCodes';
import { ApiLogout, ApiPostProfile } from '../services/signin.service';
import { ApiSpeakerList } from '../services/speaker.service';
import { LoggedInContext } from '../services/state.service';
import { ApiViewTickets } from '../services/ticket.service';

const Profile = () => {
  const nav = useNavigate();
  const { loggedInState, setLoggedInState } = useContext(LoggedInContext);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [submitButtonText, setSubmitButtonText] = useState<string>('Submit');
  const [submitButton, setSubmitButton] = useState<boolean>(true);
  const [formData, setFormData] = useState<UserData>(
    loggedInState.user as UserData
  );
  const [socials, setSocials] = useState(loggedInState.user?.profile?.socials);
  const [buyTicket, setBuyTicket] = useState<boolean>(true);
  const [dp, setDp] = useState<1 | 2 | 3 | 4>(1);
  const [fieldErrors, setFieldErrors] = useState<any>({});

  useEffect(() => {
    if (!loggedInState.isLoggedIn) nav(LOGIN_ROUTE);
  }, [loggedInState, nav]);

  useEffect(() => {
    Promise.all([ApiViewTickets(), ApiSpeakerList()]).then(
      ([data, speaker]) => {
        if (data.data.length > 0) {
          sessionStorage.setItem(TICKET_PURCHASED_KEY, 'true');
          setDp(2);
          setBuyTicket(false);
        } else {
          setDp(4);
        }
        if (speaker.data.length > 0) {
          setDp(3);
        }
      }
    );
  }, []);

  const logout = async () => {
    await ApiLogout(setLoggedInState, nav);
  };

  function validateFields() {
    const data: any = formData;
    const fieldErrors: any = {};

    profileFields.forEach((field) => {
      const value = data.profile[field.name];
      if (field?.options) {
        // for select fields
        const option = field.options.find(
          (option: any) => option.value === value
        );
        if (!option) {
          fieldErrors[field.name] = field.validation.message;
        }
      } else if (field.validation?.required && (!value || value === '')) {
        fieldErrors[field.name] = `${field.label} is required.`;
      } else if (
        field.validation?.pattern &&
        !field.validation.pattern.test(value)
      ) {
        fieldErrors[field.name] = field.validation.message;
      }
    });
    setFieldErrors(fieldErrors);
  }

  function handleEdit() {
    if (editMode) {
      setFormData(loggedInState.user as UserData);
      setSocials(loggedInState.user?.profile?.socials);
    }
    setEditMode(!editMode);
    setSubmitButtonText('Submit');
  }

  const handleBlur = () => {
    validateFields();
  };

  const handleChange = (e: any, type: string, name: string) => {
    setFormData({
      ...formData,
      profile: { ...formData.profile, [name]: e.target.value }
    });
  };

  async function handleSubmit() {
    // chack field errors and set submit button to false
    validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      return;
    }
    setSubmitButton(false);
    const payload = {
      ...formData,
      profile: { ...formData.profile, socials }
    } as UserData;
    const result = await ApiPostProfile(payload);
    if (result.status === 200) {
      setEditMode(false);
      setSubmitButtonText('Submit');
      const userData = loggedInState.user;
      userData.profile.first_name = result.data.first_name;
      userData.profile.last_name = result.data.last_name;
      userData.profile.phone = result.data.phone;
      userData.profile.college = result.data.college;
      userData.profile.company = result.data.company;
      userData.profile.country_code = result.data.country_code;
      userData.profile.course = result.data.course;
      userData.profile.food_choice = result.data.food_choice;
      userData.profile.graduation_year = result.data.graduation_year;
      userData.profile.role = result.data.role;
      userData.profile.tsize = result.data.tsize;
      userData.profile.socials = result.data.socials;
      setLoggedInState({
        accessToken: loggedInState.accessToken,
        isLoggedIn: loggedInState.isLoggedIn,
        refreshToken: loggedInState.refreshToken,
        user: userData
      });
    } else {
      setSubmitButtonText('Submit Again');
    }
    setSubmitButton(true);
  }

  const profileFields = [
    {
      label: 'Pronoun',
      name: 'pronoun',
      type: 'select',
      value: loggedInState.user?.profile.pronoun,
      options: [
        { label: 'Prefer not to say', value: 'NA' },
        { label: 'He/Him', value: 'he' },
        { label: 'She/Her', value: 'she' },
        { label: 'They/Them', value: 'they' },
        { label: 'Other', value: 'other' }
      ],
      validation: {
        required: true,
        message: 'Select an option from the list'
      }
    },
    {
      label: 'Phone No',
      name: 'phone',
      type: 'text',
      value: loggedInState.user?.profile.phone,
      validation: {
        required: true,
        pattern: /^\d{10}$/,
        message: 'Phone number must be a valid 10 digit number.'
      }
    },
    {
      label: 'College',
      name: 'college',
      type: 'text',
      value: loggedInState.user?.profile.college,
      validation: {
        required: true,
        pattern: /^[a-zA-Z0-9\s]*$/,
        message: 'Invalid college name.'
      }
    },
    {
      label: 'Course',
      name: 'course',
      type: 'text',
      value: loggedInState.user?.profile.course,
      validation: {
        required: true,
        pattern: /^[a-zA-Z0-9\s]*$/,
        message: 'Invalid course name.'
      }
    },
    {
      label: 'Graduation Year',
      name: 'graduation_year',
      type: 'number',
      value: loggedInState.user?.profile.graduation_year,
      validation: {
        required: true,
        pattern: /^\d{4}$/,
        message: 'Graduation year must be a valid 4 digit number.'
      }
    },
    {
      label: 'Company',
      name: 'company',
      type: 'text',
      value: loggedInState.user?.profile.company,
      validation: {
        required: false
      }
    },
    {
      label: 'Designation',
      name: 'role',
      type: 'text',
      value: loggedInState.user?.profile.role,
      validation: {
        required: false
      }
    },
    {
      label: 'Food Choice',
      name: 'food_choice',
      type: 'select',
      value: loggedInState.user?.profile.food_choice,
      options: [
        { label: 'Veg', value: 'VEG' },
        { label: 'Non-Veg', value: 'NON-VEG' }
      ],
      validation: {
        required: true,
        message: 'Food choice is required.'
      }
    },
    {
      label: 'T-Shirt Size',
      name: 'tsize',
      type: 'select',
      value: loggedInState.user?.profile.tsize,
      options: [
        { label: 'S', value: 'S' },
        { label: 'M', value: 'M' },
        { label: 'L', value: 'L' },
        { label: 'XL', value: 'XL' },
        { label: 'XXL', value: 'XXL' }
      ],
      validation: {
        required: true,
        message: 'T-Shirt size is required.'
      }
    },
    {
      label: 'Country Code',
      name: 'country_code',
      type: 'select',
      value: loggedInState.user?.profile.country_code,
      options: countryCodeChoices,
      validation: {
        required: true,
        message: 'Country code is required.'
      }
    }
  ];

  const EDIT_MODE_CLASS =
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl rounded-md border border-gray-300';

  return (
    <>
      <div className="max-w-3xl mt-8 mx-auto rounded-lg dark:bg-[#121212] bg-white shadow-lg">
        <img
          className="h-32 w-full object-cover lg:h-72 rounded-lg"
          src={BACKGROUND_ASSETS + 'victoria.png'}
          alt=""
        />
        <div className="flex flex-row mt-10 mb-10 lg:mt-0 lg:mb-0">
          <div className="max-w-5xl px-4 sm:px-6 lg:px-8 w-1/2">
            <div className="-mt-12 flex flex-col justify-start items-start sm:-mt-16 sm:space-x-5">
              <div className="flex">
                {dp !== 4 ? (
                  <img
                    className="h-24 w-24 border-2 rounded-full border-r-google-green border-l-google-blue border-t-google-red border-b-google-yellow lg:h-32 lg:w-32"
                    src={DP_ASSETS + 'yoda-' + dp + '.png'}
                    alt=""
                  />
                ) : (
                  <>
                    <img
                      className="hidden lg:block bg-gray-300 h-24 w-24 border-2 rounded-full border-r-google-green border-l-google-blue border-t-google-red border-b-google-yellow lg:h-32 lg:w-32"
                      src={DP_ASSETS + 'yoda-' + dp + '.2.png'}
                      alt=""
                    />
                    <img
                      className="block lg:hidden bg-gray-300 h-24 w-24 border-2 rounded-full border-r-google-green border-l-google-blue border-t-google-red border-b-google-yellow lg:h-32 lg:w-32"
                      src={DP_ASSETS + 'yoda-' + dp + '.1.png'}
                      alt=""
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-col items-center w-full">
            {
              <div className=" flex flex-col lg:flex-row md:flex-row items-end w-full justify-end">
                <Link to={TICKET_ROUTE}>
                  <button
                    className={`${editMode ? 'hidden' : null
                      } mr-5 mb-4 lg:mb-0 md:mb-0  py-2 bg-google-green px-10 rounded-3xl h-fit w-fit 
                text-white border font-medium text-1xl lg:text-2xl
                transition ease-in-out 
                hover:shadow-xl hover:scale-105 hover:ease-in 
                cursor-pointer`}
                  >
                    {buyTicket ? 'Buy Ticket' : 'View Ticket'}
                  </button>
                </Link>
                <button
                  onClick={handleEdit}
                  className={` mr-5 py-2 px-10 rounded-3xl h-fit w-fit 
                text-white bg-transparent border font-medium text-1xl lg:text-2xl
                transition ease-in-out duration-300
                hover:shadow-xl hover:scale-105 hover:ease-in
                cursor-pointer`}
                >
                  {!editMode ? 'Edit Profile' : 'Cancel Edit'}
                </button>
              </div>
            }
          </div>
        </div>
        <section className="mt-4 pb-12 px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex lg:my-5 flex-row justify-between items-center">
            <div
              className={`flex flex-col items-start dark:text-white text-g-gray-8 pb-0 lg:pb-5 space-y-2`}
            >
              <span className="flex flex-row items-center text-2xl space-x-2">
                <span>Hi,</span>
                {!editMode ? (
                  <div>
                    <span className=" text-2xl text-white">
                      {loggedInState.user?.profile.first_name + ' '}
                    </span>
                    <span className=" text-2xl text-white">
                      {loggedInState.user?.profile.last_name}
                    </span>
                  </div>
                ) : (
                  <div className=" flex">
                    <input
                      type="text"
                      disabled={!editMode}
                      placeholder="Name"
                      defaultValue={loggedInState.user?.profile?.first_name}
                      className={`bg-transparent capitalize w-5/6 lg:w-full mr-2 pl-2 ${EDIT_MODE_CLASS}`}
                      onChange={(e) => {
                        handleChange(e, 'user', 'first_name');
                      }}
                    />
                    <input
                      type="text"
                      disabled={!editMode}
                      placeholder="Last Name"
                      defaultValue={loggedInState.user?.profile?.last_name}
                      className={`bg-transparent capitalize w-5/6 lg:w-full pl-2 ${EDIT_MODE_CLASS}`}
                      onChange={(e) => {
                        handleChange(e, 'user', 'last_name');
                      }}
                    />
                  </div>
                )}
              </span>

              <span className="flex flex-row font-bold text-2xl">
                <span>@</span>
                {/* no provision to change username as of now */}
                <input
                  type="text"
                  disabled
                  placeholder="Username"
                  defaultValue={loggedInState.user?.username}
                  className={`bg-transparent ${editMode ? '' : ''}`}
                />
              </span>
            </div>
          </div>
          <div
            className={`flex flex-row justify-end ${loggedInState.user?.profile?.refferal &&
              !editMode &&
              'justify-between'
              }`}
          >
            {!editMode && loggedInState.user?.profile?.refferal && (
              <div className="mr-2 mb-5 ">
                <div className="animate-border inline-block rounded-md bg-white bg-gradient-to-r from-google-red via-google-blue to-google-green bg-[length:400%_400%] p-1">
                  <span
                    className={`block rounded-md whitespace-nowrap bg-slate-900 px-2 lg:px-5 py-3 lg:font-bold ${loggedInState.user?.profile.refferal
                      ? 'text-white'
                      : 'text-g-gray-5'
                      }`}
                  >
                    Total referral : {loggedInState.user?.profile?.refferal}
                  </span>
                </div>
              </div>
            )}
            <SocialProfile
              socials={socials}
              setSocials={setSocials}
              editMode={editMode}
            />
          </div>

          <div className="flex flex-col items-center justify-center border-2 border-l-google-blue border-t-google-red border-b-google-yellow border-r-google-green rounded-lg p-4">
            <div className="mt-2 mb-8 w-full">
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                Profile Details
              </h4>
              <p className="mt-2 px-2 text-base text-white opacity-60">
                Please fill in your details to complete your profile.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 px-2 w-full">
              {profileFields.map((field: any, i: number) => {
                if (field.type === 'select') {
                  return (
                    <>
                      <div
                        key={i}
                        className={`rounded-md px-3 py-2 shadow-sm  dark:bg-[#1c1c1c] dark:text-white ${editMode ? EDIT_MODE_CLASS : ''
                          }`}
                      >
                        <label
                          htmlFor="name"
                          className="block text-lg lg:text-xl font-medium"
                        >
                          {field.label}
                        </label>
                        <select
                          name={field.name}
                          id={field.name}
                          disabled={!editMode}
                          defaultValue={field.value}
                          className="block w-full border-0 px-4 focus:ring-0 sm:text-sm h-16 dark:bg-[#1c1c1c] dark:text-white text-right text-xl"
                          onChange={(e) => {
                            handleChange(e, 'profile', field.name);
                          }}
                          onBlur={handleBlur}
                        >
                          {field &&
                            field.options &&
                            field?.options.map((option: any, j: number) => {
                              return (
                                <option value={option.value} key={j}>
                                  {option.label}
                                </option>
                              );
                            })}
                        </select>
                        {fieldErrors[field.name] && (
                          <div className="text-red-500 text-xs">
                            {fieldErrors[field.name]}
                          </div>
                        )}
                      </div>
                    </>
                  );
                } else {
                  return (
                    <div
                      key={i}
                      className={`rounded-md px-3 py-2 shadow-sm focus-within:ring-1 dark:bg-[#1c1c1c] dark:text-white focus:outline-none ${editMode ? EDIT_MODE_CLASS : ''
                        }`}
                    >
                      <label
                        htmlFor="name"
                        className="block text-lg lg:text-xl font-medium"
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        placeholder={field.label}
                        defaultValue={field.value}
                        readOnly={!editMode}
                        disabled={!editMode}
                        className="block w-full border-0 px-4 focus:ring-0 sm:text-base h-16 dark:bg-[#1c1c1c] dark:text-white text-right text-xl"
                        onChange={(e) => {
                          handleChange(e, 'profile', field.name);
                        }}
                        onBlur={handleBlur}
                      />
                      {fieldErrors[field.name] && (
                        <div className="text-red-500 text-xs">
                          {fieldErrors[field.name]}
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-row justify-center lg:justify-end space-x-4">
              <button
                onClick={handleEdit}
                className=" items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-google-blue focus:border-google-blue sm:text-sm"
              >
                {editMode ? 'Cancel' : 'Edit Profile'}
              </button>

              {submitButton ? (
                <button
                  onClick={() => handleSubmit()}
                  className={` ${editMode ? '' : 'hidden'
                    } items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-google-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-google-blue focus:border-google-blue sm:text-sm`}
                >
                  {editMode ? submitButtonText : ''}
                </button>
              ) : (
                <Spinner color="red" />
              )}
              <button
                onClick={() => nav(CFS_ROUTE)}
                className={` ${editMode ? 'hidden' : ''
                  } items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-google-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-google-blue focus:border-google-blue sm:text-sm`}
              >
                {editMode ? '' : 'Speaker Profile'}
              </button>
              <button
                onClick={logout}
                className=" items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-google-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-google-blue focus:border-google-blue sm:text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
