import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function Notification({
  title,
  message,
  color = 'yellow',
  show,
  setShow
}: {
  title: string;
  message: string;
  color?: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start md:top-16 z-50"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden dark:bg-google-${color}`}
              role="alert"
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <InformationCircleIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                      color={color === 'red' ? 'white' : 'black'}
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className={`text-md font-medium dark:${color === 'red' ? 'text-white' : 'text-black'}`}>{title}</p>
                    <p className={`mt-1 text-sm text-gray-500 dark:${color === 'red' ? 'text-white' : 'text-black'}`}>
                      {message}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className={`rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-google-${color} dark:${color === 'red' ? 'text-white' : 'text-black'}`}
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
