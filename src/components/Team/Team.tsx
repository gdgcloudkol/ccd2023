import { useState } from 'react';
import { ReactComponent as FacebookSVGIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as GitHubSVGIcon } from '../../assets/icons/github.svg';
import { ReactComponent as GmailSVGIcon } from '../../assets/icons/gmail.svg';
import { ReactComponent as InstagramSVGIcon } from '../../assets/icons/instagram.svg';
import { ReactComponent as LinkedInSVGIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as TwitterSVGIcon } from '../../assets/icons/twitter.svg';
import RandomColorWrapper from '../../components/utils/RandomColorWrapper';
import { CurrentTheme } from '../../services/common.service';

interface LinkType {
  title: string;
  url: string; 
}

interface TeamDataType {
  name: string;
  description: string;
  profilePic: string;
  links: LinkType[];
  tagLine: string;
}

interface TeamNameType {
  team: string;
  data: TeamDataType[];
}

const TeamData: TeamNameType[] = [
  {
    team: 'Web team',
    data: [
      {
        name: 'Maaz',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePic:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Web Dev'
      },
      {
        name: 'Nasirul',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePic:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Web Dev'
      },
      {
        name: 'srijan',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePic:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Web Dev'
      },
      {
        name: 'sugato',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePic:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: 'Web Dev'
      }
    ]
  },
  {
    team: 'App team',
    data: [
      {
        name: 'person1',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePic:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: ''
      },
      {
        name: 'person2',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePic:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: ''
      },
      {
        name: 'person3',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePic:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: ''
      },
      {
        name: 'person4',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        profilePic:
          'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
        links: [
          { title: 'Facebook', url: '' },
          { title: 'Twitter', url: '' },
          { title: 'LinkedIn', url: '' },
          { title: 'GitHub', url: '' }
        ],
        tagLine: ''
      }
    ]
  }
];

const Team = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData]: any = useState([]);
  return (
    <>
      {TeamData.map((teams: TeamNameType, key: number) => {
        return (
          <div key={key} className="">
            <h1 className=" px:5 text-center lg:text-start md:text-start md:px-10 lg:px-20 py-2 lg:py-5 text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 via-red-300 to-pink-600">
              {teams.team}
            </h1>
            <div
              className="grid sm:grid-cols-1 md:grid-cols-4 grid-flow-row place-items-center p-5 lg:grid-cols-4 gap-4 max-w-7xl mx-auto "
              style={{ gridAutoRows: '1fr' }}
              id="speakers-grid"
            >
              {teams.data.map((data: TeamDataType, key: number) => {
                return (
                  <>
                    <div
                      className="flex w-full h-full dark:text-white flex-col rounded-2xl items-center border border-g-gray-8 p-4 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer transition duration-300"
                      onClick={() => {
                        setModalData(data);
                        setShowModal(true);
                      }}
                    >
                      <img
                        loading="lazy"
                        className="inline-block h-36 w-36 border-4 border-solid rounded-full ring-2 border-b-google-blue border-t-google-red border-r-google-yellow border-l-google-green"
                        src={data?.profilePic}
                        alt=""
                      />
                      <div className="text-lg font-light mt-4 text-center">
                        {data?.name}
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
                                  <GmailSVGIcon
                                    fill="currentColor"
                                    className="w-8 h-8"
                                  />
                                ) : null}
                              </RandomColorWrapper>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                    {showModal ? (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                                      {modalData?.links.map(
                                        (social: any, j: number) => {
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
                                                  className={`w-8 h-8 ${
                                                    CurrentTheme() === 'white'
                                                      ? 'text-white '
                                                      : 'text-black'
                                                  }`}
                                                />
                                              ) : null}
                                              {social?.title === 'Twitter' ? (
                                                <TwitterSVGIcon
                                                  fill="currentColor"
                                                  className={`w-8 h-8 ${
                                                    CurrentTheme() === 'white'
                                                      ? 'text-white '
                                                      : 'text-black'
                                                  }`}
                                                />
                                              ) : null}
                                              {social?.title === 'Instagram' ? (
                                                <InstagramSVGIcon
                                                  fill="currentColor"
                                                  className={`w-8 h-8 ${
                                                    CurrentTheme() === 'white'
                                                      ? 'text-white '
                                                      : 'text-black'
                                                  }`}
                                                />
                                              ) : null}
                                              {social?.title === 'LinkedIn' ? (
                                                <LinkedInSVGIcon
                                                  fill="currentColor"
                                                  className={`w-8 h-8 ${
                                                    CurrentTheme() === 'white'
                                                      ? 'text-white '
                                                      : 'text-black'
                                                  }`}
                                                />
                                              ) : null}
                                              {social?.title === 'Github' ? (
                                                <GitHubSVGIcon
                                                  fill="currentColor"
                                                  className={`w-8 h-8 ${
                                                    CurrentTheme() === 'white'
                                                      ? 'text-white '
                                                      : 'text-black'
                                                  }`}
                                                />
                                              ) : null}
                                              {social?.title === 'Email' ? (
                                                <GmailSVGIcon
                                                  fill="currentColor"
                                                  className={`w-8 h-8 ${
                                                    CurrentTheme() === 'white'
                                                      ? 'text-white '
                                                      : 'text-black'
                                                  }`}
                                                />
                                              ) : null}
                                            </a>
                                          );
                                        }
                                      )}
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

                              {/*footer*/}
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
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Team;
