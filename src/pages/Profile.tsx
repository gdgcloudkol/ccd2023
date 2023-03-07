import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfileData } from '../assets/models/login/datatype';
import { CFS_ROUTE, LOGIN_ROUTE } from '../services/constants';
import { countryCodeChoices } from '../services/countryCodes';
import { ApiLogout, ApiPostProfile } from '../services/signin.service';
import { LoggedInContext } from '../services/state.service';
import Spinner from '../components/Spinner/Spinner';

const Profile = () => {
  const nav = useNavigate();
  const { loggedInState, setLoggedInState } = useContext(LoggedInContext);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [submitButtonText, setSubmitButtonText] = useState<string>('Submit');
  const [submitButton, setSubmitButton] = useState<boolean>(true);

  useEffect(() => {
    if (!loggedInState.isLoggedIn) nav(LOGIN_ROUTE);
  }, [loggedInState, nav]);

  const logout = async () => {
    await ApiLogout(setLoggedInState, nav);
  }

  function handleEdit() {
    setEditMode(!editMode);
    setSubmitButtonText('Submit');
  }

  async function handleSubmit() {
    setSubmitButton(false);
    const result = await ApiPostProfile(loggedInState.user)
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

  const EDIT_MODE_CLASS = 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border border-gray-300';

  return (
    <>
      <div className="max-w-3xl mt-8 mx-auto rounded-lg dark:bg-[#121212] bg-white shadow-lg">
        <img
          className="h-32 w-full object-cover lg:h-72 rounded-lg"
          src="https://images.unsplash.com/photo-1600080077823-a44592513861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 flex flex-col justify-between items-start sm:-mt-16 sm:space-x-5">
            <div className="flex">
              <img
                className="h-24 w-24 rounded-full border border-l-google-blue border-t-google-red border-b-google-yellowx sm:h-32 sm:w-32"
                src="https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <section className="mt-4 pb-12 px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="">
            <div className="flex flex-col items-start text-center dark:text-white text-g-gray-8 pb-5">
              <span className="flex flex-row text-lg">
                Hi,&nbsp;
                <input type="text" disabled={!editMode} placeholder="Name" defaultValue={loggedInState.user?.first_name}
                  className={`bg-transparent capitalize text-lg ${editMode ? EDIT_MODE_CLASS : ''}`}
                  onChange={(e) => { loggedInState.user.first_name = e.currentTarget.value }} />
              </span>

              <span className="flex flex-row font-bold text-lg">
                @
                <input type="text" disabled={!editMode} placeholder="Username" defaultValue={loggedInState.user?.username}
                  className={`bg-transparent text-lg ${editMode ? EDIT_MODE_CLASS : ''}`}
                  onChange={(e) => { loggedInState.user.username = e.currentTarget.value }} />
              </span>
            </div>

            <div className='space-y-4'>
              <div className='flex flex-row justify-center lg:justify-end space-x-4'>
                <button onClick={handleEdit}
                  className=" items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-google-blue focus:border-google-blue sm:text-sm"
                >
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </button>

                {submitButton ?
                  <button onClick={() => handleSubmit()}
                    className={` ${editMode ? '' : 'hidden'} items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-google-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-google-blue focus:border-google-blue sm:text-sm`}>
                    {editMode ? submitButtonText : ''}
                  </button> : <Spinner color='red' />
                }
                <button onClick={() => nav(CFS_ROUTE)}
                  className={` ${editMode ? 'hidden' : ''} items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-google-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-google-blue focus:border-google-blue sm:text-sm`}>
                  {editMode ? '' : 'Speaker Profile'}
                </button>
                <button onClick={logout}
                  className=" items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-google-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-google-blue focus:border-google-blue sm:text-sm"
                >
                  Logout
                </button>
              </div>
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
                    <div key={i} className={`rounded-md px-3 py-2 shadow-sm  dark:bg-[#1c1c1c] dark:text-white ${editMode ? EDIT_MODE_CLASS : ''}`}>
                      <label htmlFor="name" className="block text-xs font-medium">
                        {field.label}
                      </label>
                      <select name={field.name} id={field.name} disabled={!editMode} defaultValue={field.value}
                        className="block w-full border-0 p-0 focus:ring-0 sm:text-sm h-16 dark:bg-[#1c1c1c] dark:text-white text-right text-xl">
                        {field && field.options && field?.options.map((option: any, j: number) => {
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
                    <div key={i} className={`rounded-md px-3 py-2 shadow-sm focus-within:ring-1 dark:bg-[#1c1c1c] dark:text-white focus:outline-none ${editMode ? EDIT_MODE_CLASS : ''}`}>
                      <label htmlFor="name" className="block text-xs font-medium">
                        {field.label}
                      </label>
                      <input type={field.type} name={field.name} id={field.name} placeholder={field.label} defaultValue={field.value} readOnly={!editMode} disabled={!editMode}
                        className="block w-full border-0 p-0 focus:ring-0 sm:text-sm h-16 dark:bg-[#1c1c1c] dark:text-white text-right text-xl"
                        onChange={(e) => { loggedInState.user.profile[field.name as keyof UserProfileData] = e.currentTarget.value }} />
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
