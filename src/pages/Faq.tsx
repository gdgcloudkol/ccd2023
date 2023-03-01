import { useEffect, useState } from 'react';
import { FAQContent, FAQContentFAQ } from '../assets/models/faq/datatype';
import { randomTextGoogleColor } from '../services/common.service';
import { FAQ_CONTENT_KEY } from '../services/constants';
import { getContent } from '../services/content.service';

const FaqPage = () => {
  const [content, setContent] = useState<FAQContent>({} as FAQContent);
  useEffect(() => {
    getContent<FAQContent>(FAQ_CONTENT_KEY).then((data: void | FAQContent) => {
      if (data) setContent(data);
    });
  }, []);

  const [selectedQuestion, setSelectedQuestion] = useState<number>(content?.faq?.length);
  const [borderOpen, setOpen] = useState<boolean>(false);

  const openAQuestion = (index: number) => {
    setSelectedQuestion(index);
    setOpen(true);
  };

  const questionSelector = (index: number) => {
    openAQuestion(index);
  };

  const [headingColor, setColor] = useState<string>('text-google-gray-3');
  useEffect(() => {
    return setColor(randomTextGoogleColor());
  }, []);

  return (
    <div className=" h-full flex flex-col flex-1 dark:bg-black">
      <div
        className="lg:max-w-5xl md:px-10 px-6 mx-auto my-6"
        data-aos="fade-in"
      >
        <div className={`text-4xl font-bold ${headingColor} mb-4`}>
          {content?.title}
        </div>
        <div>
          <p
            className=" text-lg text-justify lg:text-clip text-g-gray-7 dark:text-white"
            dangerouslySetInnerHTML={{ __html: content?.description?.substring(3) }}
          ></p>
        </div>
      </div>
      <div className="lg:max-w-5xl md:px-10 px-6 my-10 lg:my-12 md:my-16 mx-auto space-y-2">
        {content?.faq?.map((el: FAQContentFAQ, i: number) => {
          return (
            <div data-aos="fade-in" data-aos-delay={i * 100} key={el.question}>
              <div
                className={` border-2 ${borderOpen && selectedQuestion === i
                  ? 'border-b-google-blue border-t-google-red border-r-google-yellow border-l-google-green'
                  : 'border-g-gray-3 dark:border'
                  }  rounded-md p-3 text-g-gray-7 dark:text-white hover:text-g-gray-9 hover:bg-g-gray-1 transition-all duration-400 ease-in-out dark:hover:bg-g-gray-9`}
                onClick={() => questionSelector(i)}
              >
                <div className="flex items-center cursor-pointer ">
                  <div className="ml-3 md:ml-4 lg:ml-6 text-lg font-normal">
                    <span>{el.question}</span>
                  </div>
                </div>
                <div
                  className={`relative ${selectedQuestion === i ? 'max-h-72' : 'max-h-0'
                    } overflow-hidden transition-all duration-700`}
                >
                  <div className="text-g-gray-8 dark:text-g-gray-4 pl-3 text-md font-normal md:pl-4 lg:pl-6 py-2 space-y-3">
                    <div>
                      {el.answer.substring(0, 3) === '~!~' ? (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: el.answer.substring(3)
                          }}
                        ></p>
                      ) : (
                        el.answer
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqPage;
