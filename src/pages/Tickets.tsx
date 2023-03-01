import React from 'react';
import BuyTicketsCard from '../components/BuyTickets/BuyTicketsCard';

const DATA = [
  {
    id: 1,
    title: 'Professional',
    href: '#',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.`,
    imageSrc:
      'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    imageAlt: 'Professional Alt Text',
    btnText: 'Buy Tickets'
  },
  {
    id: 2,
    title: 'Student',
    href: '#',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.`,
    imageSrc:
      'https://images.unsplash.com/photo-1605142859862-978be7eba909?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    imageAlt: 'Professional Alt Text',
    btnText: 'Buy Tickets'
  },
  {
    id: 3,
    title: 'Merit Based Scholarships',
    href: '#',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.`,
    imageSrc:
      'https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    imageAlt: 'Professional Alt Text',
    btnText: 'Apply Now'
  }
];

const Tickets = () => {
  return (
    <div className="">
      <div className="lg:text-6xl text-5xl flex flex-col justify-center items-center font-normal mt-12 text-black dark:text-white">
        Buy Tickets
        <svg
          fill="none"
          viewBox="0 0 172 19"
          width="120"
          height="20"
          className="flex justify-center"
        >
          <path
            stroke={`blue`}
            strokeWidth="9"
            d="M1.00061 11.9939C39.5016 5.88017 70.8093 4.74491 80.3785 4.82192C89.9477 4.89892 136.465 6.78043 170.019 14.4154"
            opacity=".6"
            className="colorStroke4AE5EF svgStroke"
          ></path>
        </svg>
      </div>
      <div className="m-10 flex flex-col md:flex-row justify-around">
        {DATA.map((data) => {
          return (
            <BuyTicketsCard
              key={data.id}
              title={data.title}
              description={data.description}
              imageSrc={data.imageSrc}
              imageAlt={data.imageAlt}
              btnText={data.btnText}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Tickets