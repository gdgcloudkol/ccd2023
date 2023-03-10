import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../assets/models/login/datatype';
import SocialProfile from '../components/SocialProfile/SocialProfile';
import Spinner from '../components/Spinner/Spinner';
import { BACKGROUND_ASSETS, CFS_ROUTE, DP_ASSETS, LOGIN_ROUTE, TICKET_ROUTE, TICKET_PURCHASED_KEY } from '../services/constants';
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
  const [formData, setFormData] = useState<UserData>(loggedInState.user as UserData);
  const [socials, setSocials] = useState(loggedInState.user?.profile?.socials);
  const [buyTicket, setBuyTicket] = useState<boolean>(true);
  const [dp, setDp] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    if (!loggedInState.isLoggedIn) nav(LOGIN_ROUTE);
  }, [loggedInState, nav]);

  useEffect(() => {
    Promise.all([ApiViewTickets(), ApiSpeakerList()])
      .then(([data, speaker]) => {
        if (data.data.length > 0) {
          sessionStorage.setItem(TICKET_PURCHASED_KEY, 'true');
          setDp(2);
          setBuyTicket(false);
        }
        if (speaker.data.length > 0) {
          setDp(3);
        }
      })
  }, [])

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
      })
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
        <div className='flex flex-row mt-10 mb-10 lg:mt-0 lg:mb-0'>
          <div className="max-w-5xl px-4 sm:px-6 lg:px-8 w-1/2">
            <div className="-mt-12 flex flex-col justify-start items-start sm:-mt-16 sm:space-x-5">
              <div className="flex">
                <img
                  className="h-24 w-24 border-2 rounded-full border-r-google-green border-l-google-blue border-t-google-red border-b-google-yellow lg:h-32 lg:w-32"
                  src={DP_ASSETS + 'yoda-' + dp + '.png'}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className='flex lg:hidden md:hidden justify-center items center w-full'>
            {!editMode &&
              <Link to={TICKET_ROUTE}>
                <button
                  className=" mr-5 py-2 px-10 rounded-3xl h-fit w-fit 
                text-white bg-transparent border font-medium text-1xl lg:text-2xl
                transition ease-in-out duration-300
                hover:shadow-xl hover:scale-105 hover:ease-in duration-300
                cursor-pointer"
                >
                  {buyTicket ? 'Buy Ticket' : 'View TIcket'}
                </button>
              </Link>
            }
          </div>
        </div>
        <section className="mt-4 pb-12 px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col items-start dark:text-white text-g-gray-8 pb-0 lg:pb-5 space-y-2">
              <span className="flex flex-row text-lg space-x-2">
                Hi,&nbsp;
                <input
                  type="text"
                  disabled={!editMode}
                  placeholder="Name"
                  defaultValue={loggedInState.user?.profile?.first_name}
                  className={`bg-transparent capitalize text-lg w-5/6 lg:w-full ${editMode ? EDIT_MODE_CLASS + ' pl-2 ' : ''
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
                  className={`bg-transparent capitalize text-lg w-5/6 lg:w-full ${editMode ? EDIT_MODE_CLASS + ' pl-2 ' : 'hidden'
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
                  disabled
                  placeholder="Username"
                  defaultValue={loggedInState.user?.username}
                  className={`bg-transparent text-lg ${editMode ? '' : ''}`}
                // onChange={(e) => {
                //   handleChange(e, 'user', 'username');
                // }}
                />
              </span>
            </div>
          </div>
          <SocialProfile
            socials={socials}
            setSocials={setSocials}
            editMode={editMode}
          />

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
