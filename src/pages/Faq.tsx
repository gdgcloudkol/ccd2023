<<<<<<< HEAD
import React from 'react'
import * as Content from '../assets/content/faq/content.json'
import { FAQContent } from '../assets/models/faq/datatype'
import { randomColor } from '../services/common.service'
=======
import React from 'react';
import * as Content from '../assets/content/faq/content.json';
import { FAQContent } from '../assets/models/faq/datatype';
>>>>>>> 7f5020b (feat: schedule and transparent blur nav)

const content = Content;

const FAQ: FAQContent = {
  title: content.title,
  description: content.description,
  subHeading1: content.subHeading1,
  subheading2: content.subheading2,
  faq: content.faq
};
const FaqPage = () => {
<<<<<<< HEAD
  const [selectedQuestion, setSelectedQuestion] = React.useState<number>(FAQ.faq.length)
  const [borderOpen, setOpen] = React.useState<boolean>(false)
  const [headingColor, setColor] = React.useState<string>('text-google-gray-3')
=======
  const [selectedQuestion, setSelectedQuestion] = React.useState<number>(5);
  const [borderOpen, setOpen] = React.useState<boolean>(false);
  const [headingColor, setColor] = React.useState<string>('text-google-gray-3');
>>>>>>> 7f5020b (feat: schedule and transparent blur nav)
  const openAQuestion = (index: number) => {
    setSelectedQuestion(index);
    setOpen(true);
  };

<<<<<<< HEAD
=======
  const randomColor = () => {
    let color = [
      'text-google-blue',
      'text-google-red',
      'text-google-green',
      'text-google-yellow'
    ];
    setColor(color[Math.floor(Math.random() * color.length)]);
  };

>>>>>>> 7f5020b (feat: schedule and transparent blur nav)
  const questionSelector = (index: number) => {
    openAQuestion(index);
  };

  React.useEffect(() => {
<<<<<<< HEAD
    return setColor(randomColor())
  }, [])
=======
    return randomColor();
  }, []);
>>>>>>> 7f5020b (feat: schedule and transparent blur nav)

  return (
    <div>
      <div className="lg:max-w-5xl md:px-10 px-6 mx-auto my-6">
        <div className={`text-4xl font-bold ${headingColor} mb-4`}>
          {FAQ.title}
        </div>
        <div>
          <p
            className=" text-lg text-justify lg:text-clip text-g-gray-7"
            dangerouslySetInnerHTML={{ __html: FAQ.description.substring(3) }}
          ></p>
        </div>
      </div>
      <div className="lg:max-w-5xl md:px-10 px-6 my-10 lg:my-12 md:my-16 mx-auto space-y-2">
        {FAQ.faq.map((el, i) => {
          return (
            <div
              className={` border-2 ${borderOpen && selectedQuestion === i
                ? 'border-b-google-blue border-t-google-red border-r-google-yellow border-l-google-green'
                : 'border-g-gray-3'
                }  rounded-md p-3 text-g-gray-7 hover:text-g-gray-9 hover:bg-g-gray-1`}
              onClick={() => questionSelector(i)}
              key={i}
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
                <div className="text-g-gray-8 pl-3 text-md font-normal md:pl-4 lg:pl-6 py-2 space-y-3">
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
          );
        })}
      </div>
    </div>
  );
};

export default FaqPage;
