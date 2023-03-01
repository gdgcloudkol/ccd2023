import { useState } from "react";
import { CurrentTheme } from "../../services/common.service";
import { DARK } from "../../services/constants";
import { ReactComponent as FacebookSVGIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as GitHubSVGIcon } from '../../assets/icons/github.svg';
import { ReactComponent as GmailSVGIcon } from '../../assets/icons/gmail.svg';
import { ReactComponent as InstagramSVGIcon } from '../../assets/icons/instagram.svg';
import { ReactComponent as LinkedInSVGIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as TwitterSVGIcon } from '../../assets/icons/twitter.svg';
import RandomColorWrapper from "../Utils/RandomColorWrapper";

interface LinkType {
  title: string;
  url: string;
}

export interface PeopleData {
  fullName: string;
  description: string;
  profilePicture: string;
  links: LinkType[];
  tagLine: string;
}

export interface PeopleGridProp {
  peopleGrid: PeopleData[],
  rule?: string[]
}

const PeopleGrid = ({ peopleGrid, rule = [''] }: PeopleGridProp) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData]: any = useState<[]>([]);

  return (
    <div
      className="grid sm:grid-cols-1 md:grid-cols-3 grid-flow-row place-items-center p-5 lg:grid-cols-4 gap-4 max-w-7xl mx-auto "
      style={{ gridAutoRows: '1fr' }}
      id="speakers-grid"
    >
      {
        peopleGrid.map((data: PeopleData, i: number) =>
          rule?.every((i) => i !== data?.fullName) ? (
            <div
              key={i}
              className="flex w-full h-full dark:text-white flex-col rounded-2xl items-center border border-g-gray-8 p-4 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer transition duration-300"
              onClick={() => {
                setModalData(data);
                setShowModal(true);
              }}
            >
              <img
                loading="lazy"
                className="inline-block h-36 w-36 border-4 border-solid rounded-full ring-2 border-b-google-blue border-t-google-red border-r-google-yellow border-l-google-green"
                src={data?.profilePicture}
                alt=""
              />
              <div className="text-lg font-light mt-4 text-center">
                {data?.fullName}
              </div>
              <div className="text-sm font-light mt-2 text-center flex align-middle h-12">
                <div>{data?.tagLine}</div>
              </div>
              <div className="flex mt-5">
                {data?.links.map((social: LinkType, j: number) => {
                  return (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={social.url}
                      key={j}
                    >
                      <RandomColorWrapper>
                        {social?.title === 'Facebook' ? (<FacebookSVGIcon fill="currentColor" className="w-8 h-8" />) : null}
                        {social?.title === 'Twitter' ? (<TwitterSVGIcon fill="currentColor" className="w-8 h-8" />) : null}
                        {social?.title === 'Instagram' ? (<InstagramSVGIcon fill="currentColor" className="w-8 h-8" />) : null}
                        {social?.title === 'LinkedIn' ? (<LinkedInSVGIcon fill="currentColor" className="w-8 h-8" />) : null}
                        {social?.title === 'Github' ? (<GitHubSVGIcon fill="currentColor" className="w-8 h-8" />) : null}
                        {social?.title === 'Email' ? (<GmailSVGIcon fill="currentColor" className="w-8 h-8" />) : null}
                      </RandomColorWrapper>
                    </a>
                  );
                })}
              </div>
            </div>
          ) : null
        )}
      {showModal ? (
        <>
          <div className="justify-center lg:items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col md:w-full bg-white dark:bg-black outline-none focus:outline-none mx-2 md:mx-0 top-[100px] md:top-0">
                <div className="flex items-center p-4 lg:flex-row flex-col-reverse justify-between border-b border-solid border-slate-200 ">
                  <div className="w-fit rounded-t">
                    <div className="text-3xl lg:w-fit w-full dark:text-white font-normal text-center">
                      {modalData?.name}
                    </div>
                    <div className="text-sm w-full max-w-sm text-g-gray-7 dark:text-white mt-2">
                      {modalData?.tagLine}
                    </div>
                    <div>
                      <div className="pt-3 flex relative justify-start">
                        {modalData?.links.map((social: any, j: number) => {
                          return (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={social.url}
                              key={j}
                            >
                              {social?.title === 'Facebook' ? (
                                <FacebookSVGIcon fill="currentColor" className={`w-8 h-8 ${CurrentTheme() === DARK ? 'text-white ' : 'text-black'}`} />) : null}
                              {social?.title === 'Twitter' ? (
                                <TwitterSVGIcon fill="currentColor" className={`w-8 h-8 ${CurrentTheme() === DARK ? 'text-white ' : 'text-black'}`} />) : null}
                              {social?.title === 'Instagram' ? (
                                <InstagramSVGIcon fill="currentColor" className={`w-8 h-8 ${CurrentTheme() === DARK ? 'text-white ' : 'text-black'}`} />) : null}
                              {social?.title === 'LinkedIn' ? (
                                <LinkedInSVGIcon fill="currentColor" className={`w-8 h-8 ${CurrentTheme() === DARK ? 'text-white ' : 'text-black'}`} />) : null}
                              {social?.title === 'Github' ? (
                                <GitHubSVGIcon fill="currentColor" className={`w-8 h-8 ${CurrentTheme() === DARK ? 'text-white ' : 'text-black'}`} />) : null}
                              {social?.title === 'Email' ? (
                                <GmailSVGIcon fill="currentColor" className={`w-8 h-8 ${CurrentTheme() === DARK ? 'text-white ' : 'text-black'}`} />) : null}
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
                      src={modalData?.profilePic}
                      alt="profile"
                    />
                  </div>
                </div>

                <div className="relative px-6 py-2 flex-auto">
                  <p className="my-2 text-g-gray-5 dark:text-white font-light text-base leading-relaxed">
                    {modalData?.description}
                  </p>
                </div>
                <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default PeopleGrid