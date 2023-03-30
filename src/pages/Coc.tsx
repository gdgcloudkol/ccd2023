import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import COCContentData from '../assets/content/coc/content.json';
import { COCContent, COCContentSection } from '../assets/models/coc/datatype';
import { randomTextGoogleColor } from '../services/common.service';

const Coc = () => {
  const [content] = useState<COCContent>(COCContentData as COCContent);
  const [headingColor, setColor] = useState<string>('text-google-gray-3');

  useEffect(() => {
    return setColor(randomTextGoogleColor());
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Code of Conduct | Google Cloud Community Days Kolkata 2023
        </title>
        <meta
          name="description"
          content="Code of Conduct | Google Cloud Community Days Kolkata 2023"
        />
        <meta name="author" content="GDG Cloud Kolkata" />
      </Helmet>
      <div
        className="flex items-center"
        data-aos="fade-in"
        data-aos-delay="100 dark:bg-black"
      >
        <div className="md:w-full max-w-7xl mx-auto my-12">
          <div className="px-4">
            <div className="text-3xl font-normal text-g-gray-8 dark:text-white">
              <div className={`text-4xl font-bold ${headingColor} mb-4`}>
                {content?.title}
              </div>
            </div>
            <div className="text-base text-g-gray-7 dark:text-white lg:w-3/4 mt-4">
              {content?.description}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-around bg-g-gray-1 dark:bg-black lg:rounded-2xl p-4 mt-12">
            {content?.sections?.map((el: COCContentSection, i: number) => {
              return (
                <div className="lg:w-1/3 md:w-full" key={i + ''}>
                  <div className="text-xl text-g-gray-8 dark:text-white mb-4">
                    {el.title}
                  </div>
                  <div className="text-base text-g-gray-7 dark:text-white text-justify">
                    {el.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Coc;
