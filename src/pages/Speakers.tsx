import { useState } from 'react';
import { Helmet } from 'react-helmet';
import SpeakerContent from '../assets/content/speakers/content.json';
import { SpeakerContentData } from '../assets/models/speaker/datatype';
import GoogleDotsLoader from '../components/Loader/GoogleDotsLoader';
import PeopleGrid from '../components/PeopleGrid/PeopleGrid';

const Speakers = () => {
  const [speakersDetails] = useState<SpeakerContentData[]>(SpeakerContent as SpeakerContentData[]);

  return (
    <>
      <Helmet>
        <title>Speakers | Google Cloud Community Days Kolkata 2023</title>
        <meta
          name="description"
          content="Meet the speakers of Google Cloud Community Days Kolkata 2023"
        />
      </Helmet>
      {!speakersDetails.length ? (
        <GoogleDotsLoader />
      ) : (
        speakersDetails.map((speakerType: SpeakerContentData) => {
          return (
            <>
              <div className="flex justify-center items-center flex-col px-5 pt-5">
                <div className="text-4xl lg:text-5xl font-normal text-g-gray-8 mb-5 dark:text-white text-center">
                  {speakerType?.title}
                </div>
                <div className="hidden lg:block text-xl lg:text-2xl max-w-6xl w-fit text-center font-light text-g-gray-5 dark:text-white mt-2 mb-10">
                  {speakerType?.description}
                </div>
              </div>
              <div className='ml-5 mr-5 mb-20'>
                <PeopleGrid peopleGrid={speakerType.speakers} />
              </div>
            </>
          )
        })
      )}
    </>
  );
};

export default Speakers;
