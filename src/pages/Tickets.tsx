import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import FeatureRuleData from '../assets/content/feature.rule.json';
import {
  TownscriptProfileData,
  UserData
} from '../assets/models/login/datatype';
import GoogleDotsLoader from '../components/Loader/GoogleDotsLoader';
import Spinner from '../components/Spinner/Spinner';
import { CurrentTheme } from '../services/common.service';
import {
  DARK,
  PROFILE_ROUTE,
  TICKET_PURCHASED_KEY
} from '../services/constants';
import { ApiPostProfile } from '../services/signin.service';
import { LoggedInContext } from '../services/state.service';
import { ApiReferral, ApiViewTickets } from '../services/ticket.service';
import { HiOutlineIdentification } from "react-icons/hi"

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

const identification = {
  student: [
    "College Id card with photo",
    "College Library card with photo",
    "Fee Receipt - Semester or Admission",
    "Semester Marksheet",
    "Original bonafied Letter from College"
  ],
  professional: [
    "Government Photo Id card",
    "Digilocker Govenment Photo Id card"
  ]
}


const Tickets = () => {
  const { loggedInState } = useContext(LoggedInContext);
  const [profileData] = useState<UserData>(loggedInState?.user);
  const [ticket, setTicket] = useState<{ [key: string]: string | number }>({});
  const [buyTicket, setBuyTicket] = useState<boolean>(true);
  const [loader, setLoader] = useState<boolean>(true);
  const [isApplied, setIsApplied] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [referralEmail, setReferralEmail] = useState<string>('');
  const [referralAllowed] = useState<boolean>(FeatureRuleData.referral);
  const [editFormdata, setEditFormData] = useState<EditFormData>({
    first_name: loggedInState?.user?.profile?.first_name,
    last_name: loggedInState?.user?.profile?.last_name,
    phone: loggedInState?.user?.profile?.phone
  });
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [tnc, setTnc] = useState<boolean>(false);

  let inputBoxStyle = !editMode
    ? 'bg-transparent text-lg lg:text-xl w-full'
    : 'text-black text-lg lg:text-2xl appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400';


  let trimmedStr = (ticket?.ts_ticket_name as string)?.toLocaleLowerCase()?.includes("student") ? "Student Ticket" : "General/Professional Ticket";
  const handleEdit = async () => {
    validateFields();
    setEditFormData({ ...editFormdata });
    if (Object.keys(fieldErrors).length > 0) return;
    const userData = { ...loggedInState?.user };
    userData.profile.first_name = editFormdata.first_name;
    userData.profile.last_name = editFormdata.last_name + '';
    userData.profile.phone = editFormdata.phone;
    let result = await ApiPostProfile(userData);
    if (result.status === 200) {
      setEditMode(!editMode);
      setFieldErrors({});
    }
  };

  function validateFields() {
    formFields.forEach((field) => {
      if (field.name !== 'email') {
        const value = editFormdata[field.name as keyof EditFormData];
        if (
          field.validation?.required &&
          (!value ||
            value === '' ||
            value === 'Wildcat' ||
            value === 'Anonymous')
        ) {
          fieldErrors[field.name] = `${field.label} is required.`;
        } else delete fieldErrors[field.name];
        if (
          value &&
          field.validation?.pattern &&
          !field.validation.pattern.test(value)
        ) {
          fieldErrors[field.name] = field.validation.message;
        } else {
          setFieldErrors({
            ...fieldErrors,
            [field.name]: ''
          });
        }
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
        pattern: /^[a-zA-Z.\s]*$/,
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
        pattern: /^[a-zA-Z.\s]*$/,
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
        pattern: /^\d{10}$/,
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
    setEditFormData({ ...editFormdata });
  };

  const handleApplyReferral = async () => {
    if (referralEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setFieldErrors({ invalidEmail: '' });
      let result = await ApiReferral({ referrer: referralEmail });
      if (result.status === 200) setIsApplied(!isApplied);
      else setFieldErrors({ invalidEmail: 'Please apply again' });
    } else setFieldErrors({ invalidEmail: 'Please enter a valid email.' });
  };

  useEffect(() => {
    validateFields();
    Promise.resolve(ApiViewTickets()).then((data) => {
      if (data.data.length > 0) {
        sessionStorage.setItem(TICKET_PURCHASED_KEY, 'true');
        setBuyTicket(false);
        setTicket(data.data[0]);
      }
      setLoader(false);
    });
    console.log(ticket)
  }, [buyTicket && ticket]);

  useEffect(() => {
    if (
      editFormdata.first_name === '' ||
      editFormdata.last_name === '' ||
      editFormdata.phone === ''
    ) {
      setDisabled(true);
      setFieldErrors({
        incomplete: 'Please update all the fields to buy tickets.'
      });
    } else if (!tnc) {
      setDisabled(true);
    } else {
      setDisabled(false);
      setFieldErrors({});
    }
    if (Object.keys(fieldErrors).length > 0) {
      setDisabled(true);
    }
  }, [editFormdata, fieldErrors.incomplete]);

  function handleBuy() {
    validateFields();
    if (
      fieldErrors['invalidEmail'] ||
      Object.keys(fieldErrors).length > 1 ||
      !tnc
    ) {
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

  async function downloadTicket(e: HTMLElement | null) {
    if (e) {
      const originalImage = `https://storage.googleapis.com/gccdkol23/tickets/${ticket.ts_booking_id}.png`;
      const image = await fetch(originalImage);
      const imageBlog = await image.blob();
      const imageURL = URL.createObjectURL(imageBlog);
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = 'GCCDKol23-Ticket-' + originalImage.split('/').pop();
      link.click();
    }
  }

  if (loader) return <GoogleDotsLoader />;

  return (
    <>
      <Helmet>
        <title>Ticket | Google Cloud Community Days Kolkata 2023</title>
        <meta
          name="description"
          content="Avail your ticket for Google Cloud Community Days Kolkata 2023"
        />
      </Helmet>
      {buyTicket ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`block text-center pt-[16px] lg:pl-32 lg:pr-32 font-bold text-3xl leading-normal lg:text-6xl lg:leading-normal ${CurrentTheme() === DARK
              ? 'stroke-w-1px lg:stroke-w-2px text-black'
              : 'stroke-b-1px lg:stroke-b-2px text-white'
              }`}
          >
            Buy Ticket
          </div>
          {isDisabled && fieldErrors['incomplete'] && (
            <div className="items-center flex justify-center mt-8">
              {fieldErrors['incomplete'] && (
                <div
                  className="rounded-md w-full lg:w-1/2 bg-red-50 p-4"
                  data-aos="fade-in"
                >
                  <div className=" text-center">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {fieldErrors['incomplete']}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex text-white justify-center text-xl text-justify m-5">
            Please edit the fields if not accurate or incomplete and update
            profile from profile section
          </div>

          <div className="flex mt-3 divide-y divider-gray-200 dark:divide-gray-700 justify-center items-center">
            <div className="flex flex-col w-full lg:w-1/3 p-3  lg:p-5 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-base font-normal">
              {formFields.map((field) => (
                <div key={field.name}>
                  <span className="flex my-1 text-gray-900 dark:text-white w-full justify-end items-center">
                    <span className="flex text-lg lg:text-xl font-regular align-middle justify-start w-3/6 lg:w-3/6 mr-3">
                      {field.label}:{' '}
                    </span>
                    <input
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e)}
                      {...field}
                    />
                  </span>
                  {fieldErrors[field.name] && (
                    <div className="flex text-red-500 text-md justify-end items-center">
                      {fieldErrors[field.name]}
                    </div>
                  )}
                </div>
              ))}
              {!editMode && referralAllowed && (
                <div className="flex flex-col items-center justify-center  ">
                  <div className="flex items-center border-b py-2 border-teal-500 justify-center w-4/5 md:w-3/5 lg:w-3/6">
                    <input
                      disabled={!isApplied}
                      value={referralEmail}
                      onChange={(e) => setReferralEmail(e.target.value)}
                      className={`appearance-none ${isApplied && 'focus:text-white'
                        } bg-transparent border-none w-full text-g-gray-4 mr-3 py-1 px-2 leading-tight focus:outline-none`}
                      type="email"
                      placeholder="Referrer Email ID"
                      aria-label="Referral Email"
                    />
                    {!isApplied ? (
                      <svg
                        className="h-8 w-8 text-green-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />{' '}
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    ) : (
                      <button
                        onClick={handleApplyReferral}
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {fieldErrors['invalidEmail'] && (
                    <p className="mt-2 text-sm text-red-600">
                      {fieldErrors['invalidEmail']}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mt-3 text-sm text-white">
              <input
                type="checkbox"
                className="h-[15px] w-[15px]"
                onChange={() => {
                  setTnc(!tnc);
                  setDisabled(tnc);
                }}
              />{' '}
              I agree to the{' '}
              <a
                href="https://docs.google.com/document/d/1Ph3wfOQ9mcCzBSrCWkHQgtC1TdpPRedlfumyYieKO2Q/edit?usp=sharing"
                referrerPolicy="no-referrer"
                className="text-google-yellow"
              >
                Refund Policy and Terms and Conditions
              </a>
            </div>
            <div className="mt-1 flex items-center space-x-4">
              {!editMode && (
                <button
                  onClick={() => {
                    !isDisabled && handleBuy();
                  }}
                  disabled={isDisabled}
                  type="button"
                  className={`py-2 ${isDisabled
                    ? 'cursor-not-allowed opacity-60 '
                    : 'cursor-pointer'
                    } mt-5 px-10 rounded-3xl h-fit w-fit 
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
                    first_name: loggedInState?.user?.profile?.first_name,
                    last_name: loggedInState?.user?.profile?.last_name,
                    phone: loggedInState?.user?.profile?.phone
                  });
                  validateFields();
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
                    !isDisabled && handleEdit();
                  }}
                  disabled={isDisabled}
                  className={` ${isDisabled
                    ? 'cursor-not-allowed opacity-60 '
                    : 'cursor-pointer'
                    } ${editMode ? '' : 'hidden'
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
            Ticket Bought
          </div>
          <div className="flex flex-col lg:flex-row lg:space-y-4 lg:space-x-6 justify-center items-center">
            <div id="ticket-container">
              <div id="ticket" className="mt-10" style={{ height: '458px' }}>
                <img
                  id="ticketImg"
                  src={`http://storage.googleapis.com/gccdkol23/tickets/${ticket.ts_booking_id}.png`}
                  width={200}
                  alt=""
                />
              </div>
            </div>
            <div className="mt-20">
              <div
                className="text-xs w-full inline-flex flex-col font-bold leading-sm uppercase  py-3 bg-blue-200 text-blue-700 rounded-lg"
              >
                <div className=''>
                  <span className="px-2 flex items-center justify-start w-full"><HiOutlineIdentification color='' size={24} />Documents required during registration</span>
                  <span className="px-2 flex items-center justify-center text-google-red w-full">Any one from 
                    {
                      (ticket?.ts_ticket_name as string).toLocaleLowerCase().includes("student") ? " both the " : " the "
                    }
                    list</span>
                  <ol className="pl-5 px-3 mt-2 flex flex-col items-center justify-start w-full space-y-1 list-decimal list-inside">
                    <div>
                      {
                        identification["professional"].map((el, key) => {
                          return <li className=' align-top' key={key}>{el}</li>
                        })
                      }
                    </div>
                  </ol>
                  {
                    (ticket?.ts_ticket_name as string).toLocaleLowerCase().includes("student") ?
                      <>
                        <hr className='mt-1 mb-1 h-2 block bg-black'/>
                        <ol className="pl-5 px-3 mt-2 flex flex-col items-center justify-start w-full space-y-1 list-decimal list-inside">
                          <div>
                            {
                              identification["student"].map((el, key) => {
                                return <li className=' align-top' key={key}>{el}</li>
                              })
                            }
                          </div>
                        </ol>
                      </> : null
                  }
                </div>
              </div>
              <div className="flex flex-row text-white justify-center mt-10 lg:space-x-4">
                <div className="flex flex-col items-start space-y-4 ">
                  <div>Ticket Type: &nbsp;</div>
                  <div>Booking Id: &nbsp;</div>
                </div>
                <div className="flex flex-col items-start space-y-4 ">
                  <div>{trimmedStr ? trimmedStr : ticket?.ts_ticket_name}</div>
                  <div>{ticket?.ts_booking_id}</div>
                </div>
              </div>
              <div className="flex flex-col text-white pt-10 items-center justify-center text-xl">
                Please contact &nbsp;
                <a
                  className="text-google-blue"
                  href="mailto:gdgcloudkol@gmail.com"
                >
                  gdgcloudkol@gmail.com
                </a>
                &nbsp; for further queries
                <a
                  href="https://docs.google.com/document/d/1Ph3wfOQ9mcCzBSrCWkHQgtC1TdpPRedlfumyYieKO2Q/edit?usp=sharing"
                  referrerPolicy="no-referrer"
                  className="text-sm mt-3 text-google-yellow"
                >
                  Refund Policy and Terms and Conditions
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col lg:flex-row justify-center items-center lg:space-x-4 space-y-4 lg:space-y-0">
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
            <button
              className={`py-2 px-10 rounded-3xl h-fit w-fit 
                      text-white bg-google-green border font-medium text-1xl lg:text-2xl
        transition ease-in-out duration-300
        hover:shadow-xl hover:scale-105 hover:ease-in 
        cursor-pointer'}
        
      `}
              onClick={() => {
                downloadTicket(document.getElementById('ticket'));
              }}
            >
              Download
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Tickets;
