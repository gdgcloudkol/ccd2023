import { useState } from "react";
import Spinner from "../components/Spinner/Spinner";
import { ApiPostFeedback } from "../services/signin.service";
import { Link } from "react-router-dom";
import { PROFILE_ROUTE } from "../services/constants";

const Feedback = () => {

  const [isSpinnerLoading, setSpinnerLoading] = useState<boolean>(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(
      document.getElementById('cfs') as HTMLFormElement
    );

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    setSpinnerLoading(true);
    let result = await ApiPostFeedback({ title, description });
    if (result?.status > 199 && result?.status < 301) {
      setSpinnerLoading(false);
    } else if (result?.status > 399 && result?.status < 501) {
      setSpinnerLoading(false);
    }
  }

  return (
    <div className="flex m-10 lg:ml-auto lg:mr-auto justify-center align-middle lg:w-full">
      <div>
        <div>
          <h2 className="flex mt-6 text-2xl text-gray-900 dark:text-gray-100 items-center justify-center tracking-tight">
            Feedback form for GCCD Kolkata 2023
          </h2>
        </div>
        <div className="mt-8">
          <div className="mt-6">
            <form method="POST" className="space-y-6" id="cfs">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    name="title"
                    type="text"
                    autoComplete=""
                    required
                    id="title"
                    placeholder="Title of the feedback"
                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm}`}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    name="description"
                    rows={10}
                    autoComplete=""
                    required
                    id="description"
                    placeholder="Detailed Feedback"
                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-google-blue focus:border-google-blue sm:text-sm`}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-green hover:bg-google-green cursor-pointer"
                >
                  <Link to={PROFILE_ROUTE}>
                    <button>
                      Profile
                    </button>
                  </Link>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-google-green hover:bg-google-green"
                >
                  {isSpinnerLoading ? (
                    <Spinner color="red" />
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback;