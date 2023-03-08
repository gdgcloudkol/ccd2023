import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../assets/models/login/datatype';
import { BACKGROUND_ASSETS, CFS_ROUTE, DP_ASSETS, LOGIN_ROUTE } from '../services/constants';
import { countryCodeChoices } from '../services/countryCodes';
import { ApiLogout, ApiPostProfile } from '../services/signin.service';
import { LoggedInContext } from '../services/state.service';
import Spinner from '../components/Spinner/Spinner';
import SocialProfile from '../components/SocialProfile/SocialProfile';

const Profile = () => {
  const nav = useNavigate();
  const { loggedInState, setLoggedInState } = useContext(LoggedInContext);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [submitButtonText, setSubmitButtonText] = useState<string>('Submit');
  const [submitButton, setSubmitButton] = useState<boolean>(true);
  const [formData, setFormData] = useState<UserData>(loggedInState.user as UserData);
  const [socials, setSocials] = useState(loggedInState.user?.profile?.socials);

  useEffect(() => {
    if (!loggedInState.isLoggedIn) nav(LOGIN_ROUTE);
  }, [loggedInState, nav]);

  const logout = async () => {
    await ApiLogout(setLoggedInState, nav);
  };

  function handleEdit() {
    setEditMode(!editMode);
    setSubmitButtonText('Submit');
  }

  const handleChange = (e: any, type: string, name: string) => {
    // if (type === 'user') {
    //   setFormData({
    //     ...formData,
    //     [name]: e.target.value
    //   });
    // } else {
      setFormData({
        ...formData,
        profile: { ...formData.profile, [name]: e.target.value }
      });
    // }
  };

  async function handleSubmit() {
    setSubmitButton(false);
    const result = await ApiPostProfile(formData as UserData);
    if (result.status === 200) {
      setEditMode(false);
      setSubmitButtonText('Submit');
    } else {
      setSubmitButtonText('Submit Again');
    }
    setSubmitButton(true);
  }

  const profileFields = [
    {
      label: 'Phone No',
      name: 'phone',
      type: 'text',
      value: loggedInState.user?.profile.phone
    },
    {
      label: 'College',
      name: 'college',
      type: 'text',
      value: loggedInState.user?.profile.college
    },
    {
      label: 'Course',
      name: 'course',
      type: 'text',
      value: loggedInState.user?.profile.course
    },
    {
      label: 'Graduation Year',
      name: 'graduation_year',
      type: 'number',
      value: loggedInState.user?.profile.graduation_year
    },
    {
      label: 'Company',
      name: 'company',
      type: 'text',
      value: loggedInState.user?.profile.company
    },
    {
      label: 'Designation',
      name: 'role',
      type: 'text',
      value: loggedInState.user?.profile.role
    },
    {
      label: 'Food Choice',
      name: 'food_choice',
      type: 'select',
      value: loggedInState.user?.profile.food_choice,
      options: [
        { label: 'Veg', value: 'VEG' },
        { label: 'Non-Veg', value: 'NON-VEG' }
      ]
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
      ]
    },
    {
      label: 'Country Code',
      name: 'country_code',
      type: 'select',
      value: loggedInState.user?.profile.country_code,
      options: countryCodeChoices
    }
  ];

  const EDIT_MODE_CLASS =
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border border-gray-300';

  return (
    <>
      <div className="max-w-3xl mt-8 mx-auto rounded-lg dark:bg-[#121212] bg-white shadow-lg">
        <img
          className="h-32 w-full object-cover lg:h-72 rounded-lg"
          src={BACKGROUND_ASSETS + 'victoria.svg'}
          alt=""
        />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 flex flex-col justify-between items-start sm:-mt-16 sm:space-x-5">
            <div className="flex">
              <img
                className="h-24 w-24 border-2 rounded-full border-r-google-green border-l-google-blue border-t-google-red border-b-google-yellow lg:h-32 lg:w-32"
                src={DP_ASSETS + 'yoda-1.png'}
                alt=""
              />
            </div>
          </div>
        </div>
        <section className="mt-4 pb-12 px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col items-start dark:text-white text-g-gray-8 pb-5">
              <span className="flex flex-row text-lg">
                Hi,&nbsp;
                <input
                  type="text"
                  disabled={!editMode}
                  placeholder="Name"
                  defaultValue={loggedInState.user?.profile?.first_name}
                  className={`bg-transparent capitalize text-lg ${editMode ? EDIT_MODE_CLASS : ''
                    }`}
                  onChange={(e) => {
                    handleChange(e, 'user', 'first_name');
                  }}
                />
                <input
                  type="text"
                  disabled={!editMode}
                  placeholder="Last Name"
                  defaultValue={loggedInState.user?.profile?.last_name}
                  className={`bg-transparent capitalize text-lg ${editMode ? EDIT_MODE_CLASS : 'hidden'
                    }`}
                  onChange={(e) => {
                    handleChange(e, 'user', 'last_name');
                  }}
                />
              </span>

              <span className="flex flex-row font-bold text-lg">
                <span>@</span>
                {/* no provision to change username as of now */}
                <input
                  type="text"
                  disabled={!editMode || true}
                  placeholder="Username"
                  defaultValue={loggedInState.user?.username}
                  className={`bg-transparent text-lg ${editMode ? '' : ''}`}
                  // onChange={(e) => {
                  //   handleChange(e, 'user', 'username');
                  // }}
                />
              </span>
            </div>
            <SocialProfile
              socials={socials}
              setSocials={setSocials}
              editMode={editMode}
            />
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

          <div className="flex flex-col items-center justify-center border-2 border-l-google-blue border-t-google-red border-b-google-yellow border-r-google-green rounded-lg p-4">
            <div className="mt-2 mb-8 w-full">
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                Profile Details
              </h4>
              <p className="mt-2 px-2 text-base text-white opacity-60">
                Please fill in your details to complete your profile.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 px-2 w-full">
              {profileFields.map((field: any, i: number) => {
                if (field.type === 'select') {
                  return (
                    <div
                      key={i}
                      className={`rounded-md px-3 py-2 shadow-sm  dark:bg-[#1c1c1c] dark:text-white ${editMode ? EDIT_MODE_CLASS : ''
                        }`}
                    >
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium"
                      >
                        {field.label}
                      </label>
                      <select
                        name={field.name}
                        id={field.name}
                        disabled={!editMode}
                        defaultValue={field.value}
                        className="block w-full border-0 p-0 focus:ring-0 sm:text-sm h-16 dark:bg-[#1c1c1c] dark:text-white text-right text-xl"
                        onChange={(e) => {
                          handleChange(e, 'profile', field.name);
                        }}
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
                    </div>
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
                        className="block text-xs font-medium"
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
                        className="block w-full border-0 p-0 focus:ring-0 sm:text-sm h-16 dark:bg-[#1c1c1c] dark:text-white text-right text-xl"
                        onChange={(e) => {
                          handleChange(e, 'profile', field.name);
                        }}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
