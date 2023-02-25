import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApiLogin } from '../services/rest.service';
import { LoggedInContext } from '../services/state.service';

const Login = () => {
  const { setLoggedInState } = useContext(LoggedInContext);

  function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(
      document.getElementById('login') as HTMLFormElement
    );

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    ApiLogin(username, password, setLoggedInState);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto brightness-0 invert"
                src="/images/logos/cloud_kol_logo.svg"
                alt="GDG Cloud Kolkata Logo"
              />
              <h2 className="mt-6 text-3xl text-gray-900 dark:text-gray-100 tracking-tight">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form
                  action="#"
                  method="POST"
                  className="space-y-6"
                  id="login"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <Link
                        to="/signup"
                        className="font-medium text-google-blue hover:text-google-blue"
                      >
                        Create an account
                      </Link>
                    </div>
                    <div className="text-sm">
                      <a
                        href="/"
                        className="font-medium text-google-blue hover:text-google-blue"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-blue hover:bg-google-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue"
                    >
                      Sign in
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
            src="/images/background/victoria.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
