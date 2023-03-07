import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiLogout, ApiUpdateProfile } from '../services/signin.service';
import { LoggedInContext } from '../services/state.service';
import { LOGIN_ROUTE } from '../services/constants';
import { countryCodeChoices } from '../services/countryCodes';
import { UserData } from '../assets/models/login/datatype';

const Profile = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { loggedInState } = useContext(LoggedInContext);
  const { isLoggedIn } = loggedInState;
  const [formData, setFormData] = useState<UserData>(
    loggedInState.user as UserData
  );
  const nav = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) nav(LOGIN_ROUTE);
  }, [isLoggedIn, loggedInState, nav]);

  const { setLoggedInState } = useContext(LoggedInContext);

  const logout = async () => {
    await ApiLogout(setLoggedInState, nav);
  };

  const userFields = {
    username: {
      label: 'Username',
      name: 'username',
      type: 'text',
      value: formData?.username,
      handler: (e: any) => {
        setFormData({ ...formData, username: e.target.value });
      }
    },
    first_name: {
      label: 'Your Name',
      name: 'first_name',
      type: 'text',
      value: formData?.first_name,
      handler: (e: any) => {
        setFormData({ ...formData, first_name: e.target.value });
      }
    }
  };
  const profileFields = [
    {
      label: 'Phone',
      name: 'phone',
      type: 'text',
      value: formData?.profile.phone,
      handler: (e: any) => {
        setFormData({
          ...formData,
          profile: { ...formData.profile, phone: e.target.value }
        });
      }
    },
    {
      label: 'College',
      name: 'college',
      type: 'text',
      value: formData?.profile.college,
      handler: (e: any) => {
        setFormData({
          ...formData,
          profile: { ...formData.profile, college: e.target.value }
        });
      }
    },
    {
      label: 'Course',
      name: 'course',
      type: 'text',
      value: formData?.profile.course,
      handler: (e: any) => {
        setFormData({
          ...formData,
          profile: { ...formData.profile, course: e.target.value }
        });
      }
    },
    {
      label: 'Graduation Year',
      name: 'graduation_year',
      type: 'year',
      value: formData?.profile.graduation_year,
      handler: (e: any) => {
        setFormData({
          ...formData,
          profile: {
            ...formData.profile,
            graduation_year: e.target.value as unknown as number
          }
        });
      }
    },
    {
      label: 'Company',
      name: 'company',
      type: 'text',
      value: formData?.profile.company,
      handler: (e: any) => {
        setFormData({
          ...formData,
          profile: { ...formData.profile, company: e.target.value }
        });
      }
    },
    {
      label: 'Role',
      name: 'role',
      type: 'text',
      value: formData?.profile.role,
      handler: (e: any) => {
        setFormData({
          ...formData,
          profile: { ...formData.profile, role: e.target.value }
        });
      }
    },
    {
      label: 'Food Choice',
      name: 'food_choice',
      type: 'select',
      value: formData?.profile.food_choice,
      options: [
        { label: 'Veg', value: 'VEG' },
        { label: 'Non-Veg', value: 'NON-VEG' }
      ],
      handler: (e: any) => {
        setFormData({
          ...formData,
          profile: { ...formData.profile, food_choice: e.target.value }
        });
      }
    },
    {
      label: 'T-Shirt Size',
      name: 'tsize',
      type: 'select',
      value: formData?.profile.tsize,
      options: [
        { label: 'S', value: 'S' },
        { label: 'M', value: 'M' },
        { label: 'L', value: 'L' },
        { label: 'XL', value: 'XL' },
        { label: 'XXL', value: 'XXL' }
      ],
      handler: (e: any) => {
        setFormData({
          ...formData,
          profile: { ...formData.profile, tsize: e.target.value }
        });
      }
    },
    {
      label: 'Country Code',
      name: 'country_code',
      type: 'select',
      value: formData?.profile.country_code,
      options: countryCodeChoices,
      handler: (e: any) => {
        setFormData({
          ...formData,
          profile: { ...formData.profile, country_code: e.target.value }
        });
      }
    }
  ];

  const EDIT_MODE_CLASS =
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border border-gray-300';

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fieldsToRemove = ['pk', 'email', 'settings'];
    const json = JSON.stringify(formData);
    const data = JSON.parse(json, (key, value) =>
      fieldsToRemove.includes(key) ? undefined : value
    );
    const res = await ApiUpdateProfile(data, loggedInState.accessToken);
    if (res.status === 200) {
      setLoggedInState({ ...loggedInState, user: res.data });
      setEditMode(false);
      alert('Profile updated successfully');
    }
  };

  const handleCancel = () => {
    setFormData(loggedInState.user as UserData);
  };

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
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start text-center dark:text-white text-g-gray-8 ">
                <span className="opacity-50">
                  @
                  <input
                    type="text"
                    className={`bg-transparent text-lg ${
                      editMode ? EDIT_MODE_CLASS : ''
                    }`}
                    name={userFields.username.name}
                    value={formData?.username}
                    disabled={!editMode}
                    placeholder={userFields.username.label}
                    onChange={userFields.username.handler}
                  />
                </span>

                <span className="font-bold text-lg">
                  <input
                    type="text"
                    className={`bg-transparent text-lg ${
                      editMode ? EDIT_MODE_CLASS : ''
                    }`}
                    name={userFields.first_name.name}
                    value={formData?.first_name}
                    disabled={!editMode}
                    placeholder={userFields.first_name.label}
                    onChange={userFields.first_name.handler}
                  />
                </span>
              </div>
              <div className="space-x-4">
                <button
                  type="submit"
                  className={` ${
                    editMode ? 'inline-flex' : 'hidden'
                  } items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-google-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-google-blue focus:border-google-blue sm:text-sm`}
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode && 'Save'}
                </button>

                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-google-blue focus:border-google-blue sm:text-sm"
                  onClick={() => {
                    setEditMode(!editMode);
                    if (editMode) {
                      handleCancel();
                    }
                  }}
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
                        key={field.name}
                        className={`rounded-md px-3 py-2 shadow-sm  dark:bg-[#1c1c1c] dark:text-white ${
                          editMode ? EDIT_MODE_CLASS : ''
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
                          value={field.value ?? ''}
                          className="block w-full border-0 p-0 focus:ring-0 sm:text-sm h-16 dark:bg-[#1c1c1c] dark:text-white text-right text-xl"
                          onChange={field.handler}
                        >
                          {field &&
                            field.options &&
                            field?.options.map((option: any) => {
                              return (
                                <option value={option.value} key={option.value}>
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
                        className={`rounded-md px-3 py-2 shadow-sm focus-within:ring-1 dark:bg-[#1c1c1c] dark:text-white focus:outline-none ${
                          editMode ? EDIT_MODE_CLASS : ''
                        }`}
                        key={field.name}
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
                          value={field.value ?? ''}
                          readOnly={!editMode}
                          disabled={!editMode}
                          onChange={field.handler}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Profile;
