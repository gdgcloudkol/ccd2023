import { Fragment, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { LoggedInContext } from '../../services/state.service';
import { UserData } from '../../assets/models/login/datatype';
import { ApiPostProfile } from '../../services/signin.service';

export default function CofirmationDialog({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { loggedInState, setLoggedInState } = useContext(LoggedInContext);
  const {
    user
  }: {
    user: UserData;
  } = loggedInState;

  const handleConfirm = () => {
    ApiPostProfile({ ...user }).then((res) => {
      if (res.status === 200) {
        setLoggedInState({
          ...loggedInState,
          user: { ...user }
        });
      }
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-[#1a1a1a] dark:bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 dark:bg-[#1c1c1c]">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-[#3c3c3c] dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-blue-500 dark:focus:ring-offset-[#1c1c1c]"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10 dark:bg-blue-500">
                  <InformationCircleIcon
                    className="h-6 w-6 text-blue-600 dark:text-blue-50"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
                  >
                    Confirm Details
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      I hereby confirm that the details provided are correct and
                      I am aware that I will not be able to change them later.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm dark:bg-blue-700 dark:hover:bg-blue-800"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm dark:bg-[#3c3c3c] dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-blue-500 dark:border-gray-700"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
