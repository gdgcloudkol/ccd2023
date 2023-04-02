import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SpeakerContentData from '../assets/content/speakers/content.json';
import GoogleDotsLoader from '../components/Loader/GoogleDotsLoader';
import PeopleGrid from '../components/PeopleGrid/PeopleGrid';

const Speakers = () => {
  const [speakersDetails, setSpeakersDetails] = useState([]);
  const [speakerRule, setFeature] = useState(['']);

  useEffect(() => {
    fetch('https://sessionize.com/api/v2/kirmfltc/view/Speakers')
      .then((response) => response.json())
      .then((data) => {
        setSpeakersDetails(data);
      })
      .catch((error) => console.error(error));
  }, []);

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
            <div className="text-2xl lg:text-3xl font-normal text-g-gray-8 dark:text-white">
              {speakerContent?.title}
            </div>
            <div className="text-base max-w-2xl w-fit text-center font-light text-g-gray-5 dark:text-white mt-2">
              {speakerContent?.description}
            </div>
          </div>
          <PeopleGrid peopleGrid={speakersDetails} rule={speakerRule} />
        </>
      )}
    </>
  );
};

export default Speakers;
