import { Dialog, Transition } from '@headlessui/react';
import { useState } from 'react';
import { ReactComponent as FacebookSVGIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as GitHubSVGIcon } from '../../assets/icons/github.svg';
import { ReactComponent as GmailSVGIcon } from '../../assets/icons/gmail.svg';
import { ReactComponent as InstagramSVGIcon } from '../../assets/icons/instagram.svg';
import { ReactComponent as LinkedInSVGIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as TwitterSVGIcon } from '../../assets/icons/twitter.svg';
import RandomColorWrapper from '../Utils/RandomColorWrapper';

interface LinkType {
  title: string;
  url: string;
}

export interface PeopleData {
  fullName: string;
  profilePicture: string;
  links: LinkType[];
  tagLine: string;
  bio: string;
}

export interface PeopleGridProp {
  peopleGrid: PeopleData[];
  rule?: string[];
  tagline?: boolean;
  modelAllowed?: boolean;
}

const PeopleGrid = ({ peopleGrid, rule = [''], tagline = true, modelAllowed = true }: PeopleGridProp) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData]: any = useState<[]>([]);

  return (
    <div
      className="grid sm:grid-cols-1 md:grid-cols-3 grid-flow-row place-items-center lg:grid-cols-4 gap-4 max-w-7xl mx-auto"
      id="speakers-grid"
    >
      {peopleGrid?.map((data: PeopleData, i: number) =>
        rule?.every((i) => i !== data?.fullName) ? (
          <div
            key={i}
            className="flex w-full h-full dark:text-white flex-col rounded-2xl items-center p-4 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer transition duration-300 border border-g-gray-8"
            onClick={() => {
              setModalData(data);
              modelAllowed && setShowModal(true);
            }}
          >
            <img
              loading="lazy"
              className="inline-block h-36 w-36 border-4 border-solid rounded-full ring-2 border-b-google-blue border-t-google-red border-r-google-yellow border-l-google-green bg-white"
              src={data?.profilePicture}
              alt=""
            />
            <div className="text-2xl font-light mt-8 text-center mb-2">
              {data?.fullName}
            </div>
            {
              tagline ?
                <div className='mt-2 ml-5 mr-5 h-12 text-md text-center'>
                  {data?.tagLine}
                </div> : null
            }
            <div className="flex mt-5">
              {data?.links?.map((social: LinkType, j: number) => {
                return (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={social?.url}
                    key={j}
                  >
                    <RandomColorWrapper defaultColor="text-white">
                      {social?.title === 'Facebook' ? (
                        <FacebookSVGIcon
                          fill="currentColor"
                          className="w-8 h-8"
                        />
                      ) : null}
                      {social?.title === 'Twitter' ? (
                        <TwitterSVGIcon
                          fill="currentColor"
                          className="w-8 h-8"
                        />
                      ) : null}
                      {social?.title === 'Instagram' ? (
                        <InstagramSVGIcon
                          fill="currentColor"
                          className="w-8 h-8"
                        />
                      ) : null}
                      {social?.title === 'LinkedIn' ? (
                        <LinkedInSVGIcon
                          fill="currentColor"
                          className="w-8 h-8"
                        />
                      ) : null}
                      {social?.title === 'Github' ? (
                        <GitHubSVGIcon
                          fill="currentColor"
                          className="w-8 h-8"
                        />
                      ) : null}
                      {social?.title === 'Email' ? (
                        <GmailSVGIcon fill="currentColor" className="w-8 h-8" />
                      ) : null}
                    </RandomColorWrapper>
                  </a>
                );
              })}
            </div>
          </div>
        ) : null
      )}

      <Transition
        show={showModal}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog open={showModal} onClose={() => modelAllowed && setShowModal(false)}>
          <div className="fixed inset-0 bg-black/75" aria-hidden="true" />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel>
              <div className="border-2 rounded-lg shadow-lg flex flex-col bg-white dark:bg-black outline-none focus:outline-none max-w-lg">
                <div className="flex items-center p-4 lg:flex-row flex-col-reverse justify-between border-b border-solid border-slate-200 ">
                  <div className="w-fit rounded-t">
                    <div className="text-3xl lg:w-fit w-full dark:text-white font-normal text-center">
                      {modalData?.fullName}
                    </div>
                    <div className="text-sm w-full max-w-sm text-g-gray-7 dark:text-white mt-2">
                      {modalData?.tagLine}
                    </div>
                    <div>
                      <div className="pt-3 flex justify-start">
                        {modalData?.links?.map((social: any, j: number) => {
                          return (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={social.url}
                              key={j}
                            >
                              {social?.title === 'Facebook' ? (
                                <FacebookSVGIcon
                                  fill="currentColor"
                                  className="w-8 h-8 dark:text-white text-black"
                                />
                              ) : null}
                              {social?.title === 'Twitter' ? (
                                <TwitterSVGIcon
                                  fill="currentColor"
                                  className="w-8 h-8 dark:text-white text-black"
                                />
                              ) : null}
                              {social?.title === 'Instagram' ? (
                                <InstagramSVGIcon
                                  fill="currentColor"
                                  className="w-8 h-8 dark:text-white text-black"
                                />
                              ) : null}
                              {social?.title === 'LinkedIn' ? (
                                <LinkedInSVGIcon
                                  fill="currentColor"
                                  className="w-8 h-8 dark:text-white text-black"
                                />
                              ) : null}
                              {social?.title === 'Github' ? (
                                <GitHubSVGIcon
                                  fill="currentColor"
                                  className="w-8 h-8 dark:text-white text-black"
                                />
                              ) : null}
                              {social?.title === 'Email' ? (
                                <GmailSVGIcon
                                  fill="currentColor"
                                  className="w-8 h-8 dark:text-white text-black"
                                />
                              ) : null}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      loading="lazy"
                      className="rounded-full mx-auto w-28 h-28 border-4 border-b-google-blue border-t-google-red border-r-google-yellow border-l-google-green"
                      src={modalData?.profilePicture}
                      alt="profile"
                    />
                  </div>
                </div>

                <div className="px-6 py-2 flex-auto">
                  <p className="my-2 text-g-gray-5 dark:text-white font-light text-base leading-relaxed">
                    {modalData?.bio}
                  </p>
                </div>
                <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-google-red background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => modelAllowed && setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default PeopleGrid;
