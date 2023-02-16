import React from 'react'
import * as Content from '../assets/content/faq/content.json'
import { FAQContent } from '../assets/models/faq/datatype'

const content = Content;

const FAQ: FAQContent = {
  title: content.title,
  description: content.description,
  subHeading1: content.subHeading1,
  subheading2: content.subheading2,
  faq: content.faq
}
const FaqPage = () => {
  const [selectedQuestion, setSelectedQuestion] = React.useState<number>(5)
  const [borderOpen, setOpen] = React.useState<boolean>(false)

  const openAQuestion = (index: number) => {
    setSelectedQuestion(index)
  }

  const questionSelector = (index: number) => {
    openAQuestion(index)
    setOpen(true)
  }

  return (
    <div>
      <div>
        {FAQ.title}
      </div>
      <div>
        <p dangerouslySetInnerHTML={{ __html: FAQ.description.substring(3) }}></p>
      </div>
      <div>
        {FAQ.subHeading1}
      </div>
      <div>
        {FAQ.subheading2}
      </div>
      <div className="lg:max-w-4xl px-6 my-10 lg:my-20 md:my-16 mx-auto space-y-2">
        {FAQ.faq.map((el, i) => {
          return (
            <div
              className={` border-2 ${borderOpen && selectedQuestion === i
                ? 'border-b-google-blue border-t-google-red border-r-google-yellow border-l-google-green'
                : 'border-g-gray-3'
                }  rounded-md p-3 text-g-gray-7 hover:text-g-gray-9 hover:bg-g-gray-1`}
              onClick={() => questionSelector(i)}
              key={i + ''}
            >
              <div className="flex items-center cursor-pointer ">
                <div className="ml-3 md:ml-4 lg:ml-6 md:text-lg font-light">
                  <span>{el.question}</span>
                </div>
              </div>
              <div
                className="relative overflow-hidden transition-all duration-700"
                style={
                  selectedQuestion === i
                    ? { maxHeight: '240px' }
                    : { maxHeight: '0px' }
                }
              >
                <div className="text-gray-700 pl-3 md:pl-4 lg:pl-6 py-2 space-y-3">
                  <div>{
                    el.answer.substring(0, 3) === "~!~" ? <p dangerouslySetInnerHTML={{ __html: el.answer.substring(3) }}></p> : el.answer
                  }</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FaqPage
