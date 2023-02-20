import { useEffect, useState } from 'react';
import { COCContent } from '../assets/models/coc/datatype';
import { textRandomColor } from '../services/common.service';
import { getContent } from '../services/content.service';

const Coc = () => {
  const [content, setContent] = useState({} as COCContent);

  useEffect(() => {
    getContent<COCContent>('coc').then((data: void | COCContent) => {
      if (data) setContent(data);
    });
  }, []);

  const [headingColor, setColor] = useState<string>('text-google-gray-3');
  useEffect(() => {
    return setColor(textRandomColor());
  }, []);

  return (
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
          {content?.sections?.map((el, i) => {
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
  );
};

export default Coc;
