import React from 'react'

interface QAType {
  question: string
  answer: string
}
const QA: QAType[] = [
  {
    question: 'What is CCD 2023 Kolkata?',
    answer:
      'CCD 2023 Kolkata is short form of Cloud Community Days 2023 Kolkata which is among the largest free Cloud developer conferences inEastern India.'
  },
  {
    question: 'Where can I find updates related to CCD 2023 Kolkata?',
    answer:
      'All announcements related to the event are posted to the GDG CloudKolkata chapter mailing list which you can join by Joining th chapter at -'
  },
  {
    question: 'How can I attend CCD 2023 Kolkata? How much does it cost?',
    answer:
      '  CCD 2023 Kolkata is a Free event. There are no costs for the ticketto this event. However, you must apply to be a participant to the event and only upon a positive review of your application you shall be allowed to claim a ticket. You can apply to be a participant by clicking the "Reserve Your Seat" button on this website\'s home page.'
  },
  {
    question:
      'I want to present a talk/workshop at the conference. What should I do?',
    answer:
      ' You can submit your talk/workshop proposal on our CFP Page. The deadline for submitting CFP for this year’s conference is 12th    August, however, the earlier you submit, more the chances of us reviewing your submission in depth.'
  },
  {
    question:
      'Will I be provided travel/stay accommodation to attend the event?',
    answer:
      ' No. There is no provision for covering attendee travel/stay. For speakers, we will decide on case-by-case basis.'
  }
]
const Faq = () => {
  const [selectedQuestion, setSelectedQuestion] = React.useState<number>(5)
  const [borderOpen, setOpen] = React.useState<boolean>(false)
  const openAQuestion = (index: number) => {
    setSelectedQuestion(index)
  }
  const questionSelector = (index: number) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(5)
    } else {
      openAQuestion(index)
      setOpen(true)
    }
  }
  return (
    <div className="lg:max-w-4xl px-6 my-10 lg:my-20 md:my-16 mx-auto space-y-2">
      {QA.map((el, i) => {
        return (
          <div
            className={` border-2 ${
              borderOpen && selectedQuestion === i
                ? 'border-b-google-blue border-t-google-red border-r-google-yellow border-l-google-green'
                : 'border-g-gray-3'
            }  rounded-md p-3 text-g-gray-7 hover:text-g-gray-9 hover:bg-g-gray-1`}
            onClick={() => questionSelector(i)}
          >
            <div className="flex items-center cursor-pointer ">
              <div className="ml-3 md:ml-4 lg:ml-6 md:text-lg  font-light">
                <span>{el.question}</span>
              </div>
            </div>
            <div
              className="relative overflow-hidden transition-all  duration-700"
              style={
                selectedQuestion === i
                  ? { maxHeight: '240px' }
                  : { maxHeight: '0px' }
              }
            >
              <div className="text-gray-700   pl-3 md:pl-4 lg:pl-6 py-2 space-y-3">
                <div>{el.answer}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Faq
