import { useState } from 'react';
import { Helmet } from 'react-helmet';
import SpeakerContentData from '../assets/content/speakers/content.json';
import GoogleDotsLoader from '../components/Loader/GoogleDotsLoader';
import PeopleGrid, { PeopleData } from '../components/PeopleGrid/PeopleGrid';

const Speakers = () => {
  const [speakersDetails] = useState(SpeakerContentData.speakers as PeopleData[]);
  const [speakerRule, setFeature] = useState(['']);

  const [speakerContent] = useState(
    SpeakerContentData as { title: string; description: string }
  );

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
        <>
          <div className="flex justify-center items-center flex-col px-5 pt-5">
            <div className="text-4xl lg:text-5xl font-normal text-g-gray-8 mb-5 dark:text-white">
              {speakerContent?.title}
            </div>
            <div className="hidden lg:block text-xl lg:text-2xl max-w-6xl w-fit text-center font-light text-g-gray-5 dark:text-white mt-2 mb-10">
              {speakerContent?.description}
            </div>
          </div>
          <div className='ml-5 mr-5'>
          <PeopleGrid peopleGrid={speakersDetails} rule={speakerRule} />
          </div>
        </>
      )}
    </>
  );
};

export default Speakers;
