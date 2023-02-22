import { useEffect, useState } from 'react';
import { AiFillLinkedin } from 'react-icons/ai';

const Speakers = () => {
  const [speakersDetails, setSpeakersDetails] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData]: any = useState([]);

  useEffect(() => {
    fetch('https://sessionize.com/api/v2/kirmfltc/view/Speakers')
      .then((response) => response.json())
      .then((data) => {
        setSpeakersDetails(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col px-5 pt-5">
        <div className="text-2xl lg:text-3xl font-normal text-g-gray-8 dark:text-white">
          Our Amazing Speakers
        </div>
        <div className="text-base max-w-2xl w-fit text-center font-light text-g-gray-5 dark:text-white mt-2">
          Hear from the Professionals who are building the future of cloud. Our
          speakers are influential folks & allies who have been associated with
          communities within their organisations, cities, country and beyond.
        </div>
      </div>
      <div
        className="grid 
        sm:grid-cols-1 md:grid-cols-3 grid-flow-row place-items-center p-5 lg:grid-cols-4  gap-4 max-w-7xl mx-auto "
        style={{ gridAutoRows: '1fr' }}
        id="speakers-grid"
      >
        {speakersDetails.map((speaker: any, id: number) => (
          <div
            key={id}
            className="flex w-full h-full dark:text-white flex-col rounded-2xl items-center border border-g-gray-8 p-4 transform hover:-translate-y-2 hover:shadow-xl transition duration-300"
            onClick={() => {
              setModalData(speaker);
              setShowModal(true);
            }}
          >
            <img
              loading="lazy"
              className="inline-block h-36 w-36 border-4 border-solid rounded-full ring-2 border-b-google-blue border-t-google-red border-r-google-yellow border-l-google-green"
              src={speaker.profilePicture}
              alt=""
            />
            <div className="text-lg font-light mt-4 text-center">
              {speaker.fullName}
            </div>
            <div className="text-sm font-light mt-2 text-center">
              {speaker.tagLine}
            </div>
            {speaker.fullName === 'Dikshita Desai' ? (
              <a
                className="py-2"
                href="https://www.linkedin.com/in/desaidikshita/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <AiFillLinkedin size={24} />
              </a>
            ) : null}
          </div>
        ))}
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col md:w-full bg-white dark:bg-black outline-none focus:outline-none mx-2 md:mx-0 top-[100px] md:top-0">
                  <div className="flex items-center p-4 lg:flex-row flex-col-reverse justify-between border-b border-solid border-slate-200 ">
                    <div className="w-fit rounded-t">
                      <div className="text-3xl lg:w-fit w-full dark:text-white font-normal text-center">
                        {modalData.fullName}
                      </div>
                      <div className="text-sm w-full max-w-sm text-g-gray-7 dark:text-white mt-2">
                        {modalData.tagLine}
                      </div>
                    </div>
                    <div>
                      <img
                        loading="lazy"
                        className="rounded-full mx-auto w-28 h-28 border-4 border-b-google-blue border-t-google-red border-r-google-yellow border-l-google-green"
                        src={modalData.profilePicture}
                        alt="profile"
                      />
                    </div>
                  </div>

                  <div className="relative px-6 py-2 flex-auto">
                    <p className="my-2 text-g-gray-5 dark:text-white font-light text-base leading-relaxed">
                      {modalData.bio}
                    </p>
                    <div className="pt-10">
                      {modalData.fullName === 'Dikshita Desai' ? (
                        <a
                          className="py-2 absolute bottom-4"
                          href="https://www.linkedin.com/in/desaidikshita/"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <AiFillLinkedin size={24} />
                        </a>
                      ) : null}
                    </div>
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
      </div>
    </>
  );
};

export default Speakers;
