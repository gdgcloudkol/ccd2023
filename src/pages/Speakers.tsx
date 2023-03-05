import { useEffect, useState } from 'react';
import GoogleDotsLoader from '../components/Loader/GoogleDotsLoader';
import PeopleGrid from '../components/PeopleGrid/PeopleGrid';
import { getContent } from '../services/content.service';
import { getFeature } from '../services/feature.service';

const Speakers = () => {
  const [speakersDetails, setSpeakersDetails] = useState([]);

  useEffect(() => {
    fetch('https://sessionize.com/api/v2/kirmfltc/view/Speakers')
      .then((response) => response.json())
      .then((data) => {
        setSpeakersDetails(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [speakerContent, setContent] = useState(
    {} as { title: string; description: string }
  );
  useEffect(() => {
    getContent<{ title: string; description: string }>('navbar').then(
      (data: void | { title: string; description: string }) => {
        if (data) setContent(data);
      }
    );
  }, []);

  const [speakerRule, setFeature] = useState(['']);
  useEffect(() => {
    getFeature().then((data) => {
      if (data) {
        setFeature(data.disabledSpeakers);
      }
    });
  }, []);

  return (
    <>
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
