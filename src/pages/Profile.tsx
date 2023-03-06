import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiLogout } from '../services/signin.service';
import { LoggedInContext } from '../services/state.service';
import { LOGIN_ROUTE } from '../services/constants';
import { countryCodeChoices } from '../services/countryCodes';

const Profile = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const nav = useNavigate();

  const { loggedInState } = useContext(LoggedInContext);
  const { isLoggedIn } = loggedInState;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) nav(LOGIN_ROUTE);
  }, [isLoggedIn, loggedInState, nav]);

  const { setLoggedInState } = useContext(LoggedInContext);

  const logout = async () => {
    await ApiLogout(setLoggedInState, nav)
  }

  const profileFields = [
    {
      label: 'Phone',
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
      type: 'text',
      value: loggedInState.user?.profile.graduation_year
    },
    {
      label: 'Company',
      name: 'company',
      type: 'text',
      value: loggedInState.user?.profile.company
    },
    {
      label: 'Role',
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
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-start text-center dark:text-white text-g-gray-8 ">
              <span className="opacity-50">
                @
                <input
                  type="text"
                  className={`bg-transparent text-lg ${editMode ? EDIT_MODE_CLASS : ''
                    }`}
                  defaultValue={loggedInState.user?.username}
                  disabled={!editMode}
                  placeholder="Username"
                />
              </span>

              <span className="font-bold text-lg">
                <input
                  type="text"
                  className={`bg-transparent text-lg ${editMode ? EDIT_MODE_CLASS : ''
                    }`}
                  defaultValue={loggedInState.user?.first_name}
                  disabled={!editMode}
                  placeholder="First Name"
                />
              </span>
            </div>
            <div className='space-x-4'>
              <button
                type="button"
                className={` ${editMode ? 'inline-flex' : 'hidden'} items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-google-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-google-blue focus:border-google-blue sm:text-sm`}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Submit' : ''}
              </button>

              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-google-blue focus:border-google-blue sm:text-sm"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancel' : 'Edit Profile'}
              </button>

              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-google-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-google-blue focus:border-google-blue sm:text-sm"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-2 border-l-google-blue border-t-google-red border-b-google-yellow border-r-google-green rounded-lg p-4">
            <div className="mt-2 mb-8 w-full">
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                Personal Details
              </h4>
              <p className="mt-2 px-2 text-base text-gray-600">
                Please fill in your personal details to complete your profile.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 px-2 w-full">
              {profileFields.map((field) => {
                if (field.type === 'select') {
                  return (
                    <div
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
                      >
                        {field &&
                          field.options &&
                          field?.options.map((option: any) => {
                            return (
                              <option value={option.value}>
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
                        className="block w-full border-0 p-0 focus:ring-0 sm:text-sm h-16 dark:bg-[#1c1c1c] dark:text-white text-right text-xl"
                        placeholder={field.label}
                        defaultValue={field.value}
                        readOnly={!editMode}
                        disabled={!editMode}
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
