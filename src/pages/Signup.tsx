import { Link } from 'react-router-dom';
import { SignUpPayload } from '../assets/models/login/datatype';
import { ApiSignup } from '../services/rest.service';
import { useState } from 'react';

const Signup = () => {
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(
      document.getElementById('login') as HTMLFormElement
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
    }
  }

  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(
      document.getElementById('login') as HTMLFormElement
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

  const FIELDS = [
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

  return (
    <div className="max-w-7xl mx-auto" data-aos="fade-up">
      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl text-gray-900 dark:text-gray-100 tracking-tight">
                Sign up for an account
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
                  id="login"
                  onSubmit={handleSubmit}
                  onChange={handleChange}
                >
                  {FIELDS.map((field) => (
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
                      <Link to="/login"
                        className="font-medium text-google-blue hover:text-google-blue"
                      >
                        Already have an account?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                    >
                      Sign up
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
            src="/ccd2023/images/background/victoria.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
