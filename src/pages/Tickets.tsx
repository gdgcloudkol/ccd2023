import { useContext, useEffect, useState } from 'react';
import { TownscriptProfileData, UserData } from '../assets/models/login/datatype';
import { CurrentTheme } from '../services/common.service';
import { DARK, PROFILE_ROUTE, TICKET_PURCHASED_KEY } from '../services/constants';
import { LoggedInContext } from '../services/state.service';
import { ApiViewTickets } from '../services/ticket.service';
import { Link } from 'react-router-dom';
import GoogleDotsLoader from '../components/Loader/GoogleDotsLoader';
import Spinner from '../components/Spinner/Spinner';
import { ApiPostProfile } from '../services/signin.service';

declare global {
  interface Window {
    popupWithParams: (eventName: string, data: TownscriptProfileData) => void;
  }
}

interface EditFormData {
  first_name: string;
  last_name: string | undefined;
  phone: string | undefined;
}

const Tickets = () => {
  const { loggedInState } = useContext(LoggedInContext);
  const [profileData] = useState<UserData>(loggedInState.user);
  const [ticket, setTicket] = useState<{ [key: string]: string | number }>({});
  const [buyTicket, setBuyTicket] = useState<boolean>(true);
  const [loader, setLoader] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editFormdata, setEditFormData] = useState<EditFormData>({
    first_name: loggedInState.user.profile.first_name,
    last_name: loggedInState.user.profile.last_name,
    phone: loggedInState.user.profile.phone
  });
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const [fieldErrors, setFieldErrors] = useState<any>({});

  let inputBoxStyle = !editMode ? 'bg-transparent text-lg lg:text-2xl w-full' : 'text-black text-lg lg:text-2xl appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400';
  const handleEdit = async () => {
    const userData = { ...loggedInState.user };
    userData.profile.first_name = editFormdata.first_name;
    userData.profile.last_name = editFormdata.last_name + '';
    userData.profile.phone = editFormdata.phone;
    let result = await ApiPostProfile(userData);
    if (result.status === 200) {
      setEditMode(!editMode);
      setFieldErrors({})
    }
  };

  function validateFields() {
    formFields.forEach((field) => {
      const value = editFormdata[field.name as keyof EditFormData];
      if (field.validation?.required && (!value || value === '')) {
        fieldErrors[field.name] = `${field.label} is required.`;

      } else if (
        field.validation?.pattern &&
        !field.validation.pattern.test(value + '')
      ) {
        fieldErrors[field.name] = field.validation.message;
      } else {
        delete (fieldErrors[field.name]);
      }
    });
    setFieldErrors(fieldErrors);
  }

  const formFields = [
    {
      name: 'email',
      label: 'Email Id',
      type: 'email',
      value: profileData.email,
      placeholder: 'Email',
      disabled: true,
      readOnly: true,
      className: inputBoxStyle
    },
    {
      name: 'first_name',
      label: 'First Name',
      type: 'text',
      value: editFormdata.first_name,
      placeholder: 'First Name',
      disabled: !editMode,
      readOnly: !editMode,
      className: inputBoxStyle,
      validation: {
        required: true,
        pattern: /^[a-zA-Z0-9\s]*$/,
        message: 'Invalid First Name.'
      }
    },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
      value: editFormdata.last_name,
      placeholder: 'Last Name',
      disabled: !editMode,
      readOnly: !editMode,
      className: inputBoxStyle,
      validation: {
        required: true,
        pattern: /^[a-zA-Z0-9\s]*$/,
        message: 'Invalid Last Name.'
      }
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      value: editFormdata.phone,
      placeholder: 'Phone',
      disabled: !editMode,
      readOnly: !editMode,
      className: inputBoxStyle,
      validation: {
        required: true,
        pattern: /^\d{9}$/,
        message: 'Phone number must be a valid 10 digit number.'
      }
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let current = e.target.name;
    validateFields();
    setEditFormData({ ...editFormdata, [current]: e.target.value });
  };

  const handleBlur = () => {
    validateFields();
  };

  useEffect(() => {
    Promise.all([ApiViewTickets()]).then(([data]) => {
      if (data.data.length > 0) {
        sessionStorage.setItem(TICKET_PURCHASED_KEY, 'true');
        setBuyTicket(false);
        setTicket(data.data[0]);
      }
      setLoader(false);
    });
  }, [ticket]);

  useEffect(() => {
    if (editFormdata.first_name === "" || editFormdata.last_name === "" || editFormdata.phone === "") {
      setDisabled(true)
      setFieldErrors({ incomplete: "Please update all the fields to buy tickets." })
    }
    else setDisabled(false)
  }, [editFormdata, fieldErrors.incomplete])

  function handleBuy() {
    validateFields();
    console.log("clicked")
    console.log(editFormdata.first_name, editFormdata.last_name, editFormdata.phone)
    if (Object.keys(fieldErrors).length > 0) {
      return;
    }
    if (editFormdata.first_name && editFormdata.last_name && editFormdata.phone)
      window.popupWithParams('google-cloud-community-days-kolkata-2023', {
        emailid: profileData.email,
        firstname: profileData.profile.first_name,
        lastname: profileData.profile.last_name,
        cq1: profileData.profile.phone ? profileData.profile.phone : ''
      });
  }

  return loader ? (
    <GoogleDotsLoader />
  ) : buyTicket ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className={`block text-center pt-[16px] lg:pl-32 lg:pr-32 font-bold text-3xl leading-normal lg:text-6xl lg:leading-normal ${CurrentTheme() === DARK
          ? 'stroke-w-1px lg:stroke-w-2px text-black'
          : 'stroke-b-1px lg:stroke-b-2px text-white'
          }`}
      >
        Buy Tickets
      </div>
      {isDisabled && <div className="items-center flex justify-center mt-8">
        {fieldErrors["incomplete"] && (
          <div className="rounded-md w-full lg:w-1/2 bg-red-50 p-4" data-aos="fade-in">
            <div className=" text-center">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {fieldErrors["incomplete"]}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>}
      <div className="flex text-white justify-center text-xl text-justify m-5">
        Please edit the fields if not accurate or incomplete and update profile
        from profile section
      </div>

      <div className="flex mt-3 divide-y divider-gray-200 dark:divide-gray-700 justify-center items-center">
        <div className="flex flex-col w-full lg:w-4/5 p-3 lg:p-5 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-base font-normal">
          {formFields.map((field) => (
            <>
              <span key={field.name} className="flex my-1 text-gray-900 dark:text-white w-full justify-end items-center">
                <span className='flex text-lg lg:text-2xl font-bold align-middle justify-end w-3/6 lg:w-3/6 mr-3'>{field.label}: </span>
                <input onBlur={handleBlur} onChange={(e) => handleChange(e)} {...field} />
              </span>
              {fieldErrors[field.name] && (
                <div className="flex text-red-500 text-md justify-end items-center">
                  {fieldErrors[field.name]}
                </div>
              )}
            </>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="mt-5 flex items-center space-x-4">
          {!editMode && (
            <button
              onClick={handleBuy}
              disabled={isDisabled}
              type="button"
              className={`py-2 ${isDisabled ? "cursor-not-allowed opacity-60 " : "cursor-pointer"} mt-5 px-10 rounded-3xl h-fit w-fit 
                    text-white border font-medium text-1xl lg:text-xl
                    transition ease-in-out duration-300
                    hover:shadow-xl hover:scale-105 hover:ease-in
                     bg-google-green
                `}
            >
              Buy Ticket
            </button>
          )}
          <button
            onClick={() => {
              setEditFormData({
                first_name: loggedInState.user.profile.first_name,
                last_name: loggedInState.user.profile.last_name,
                phone: loggedInState.user.profile.phone
              })
              setEditMode(!editMode);
            }}
            className=" py-2 mt-5 px-10 rounded-3xl h-fit w-fit 
                text-white bg-transparent border font-medium text-1xl lg:text-xl
                transition ease-in-out duration-300
                hover:shadow-xl hover:scale-105 hover:ease-in
                cursor-pointer"
          >
            {editMode ? 'Cancel' : 'Update Details'}
          </button>
          {editMode && (
            <button
              onClick={() => {
                handleEdit();
              }}
              className={` ${editMode ? '' : 'hidden'
                } py-2 mt-5 px-10 rounded-3xl h-fit w-fit 
                    text-white bg-transparent border font-medium text-1xl lg:text-xl
                    transition ease-in-out duration-300
                    hover:shadow-xl hover:scale-105 hover:ease-in
                    cursor-pointer`}
            >
              {editMode ? 'Submit' : <Spinner color="red" />}
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div
        className={`block text-center pt-[16px] lg:pl-32 lg:pr-32 font-bold text-3xl leading-normal lg:text-6xl lg:leading-normal ${CurrentTheme() === DARK
          ? 'stroke-w-1px lg:stroke-w-2px text-black'
          : 'stroke-b-1px lg:stroke-b-2px text-white'
          }`}
      >
        Tickets Bought
      </div>

      <div className="flex flex-col text-white items-center justify-center text-xl m-5">
        Please contact &nbsp;
        <a className="text-google-blue" href="mailto:gdgcloudkol@gmail.com">
          gdgcloudkol@gmail.com
        </a>
        &nbsp; for further queries
      </div>

      <div className="flex flex-row text-white justify-center mt-10 space-x-4">
        <div className="flex flex-col items-end space-y-4 w-2/3">
          <div>Ticket Type: &nbsp;</div>
          <div>Email Id: &nbsp;</div>
          <div>Amount Paid &nbsp;</div>
          <div>Booking Id: &nbsp;</div>
        </div>
        <div className="flex flex-col items-start space-y-4 w-2/3">
          <div>{ticket?.ts_ticket_name}</div>
          <div>{ticket?.ts_user_email_id}</div>
          <div>₹ {ticket?.amount}</div>
          <div>{ticket?.ts_booking_id}</div>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center">
        <Link to={PROFILE_ROUTE}>
          <button
            className={`py-2 px-10 rounded-3xl h-fit w-fit 
                  text-white bg-transparent border font-medium text-1xl lg:text-2xl
                  transition ease-in-out duration-300
                  hover:shadow-xl hover:scale-105 hover:ease-in 
                  cursor-pointer'}
                `}
          >
            Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Tickets;
