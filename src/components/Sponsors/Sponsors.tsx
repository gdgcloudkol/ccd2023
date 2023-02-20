import GoogleDevelopers from '../../assets/images/sponsors/GoogleDevelopers.svg';
import Dynopii from '../../assets/images/sponsors/Dynopii.svg';
import Sessionize from '../../assets/images/sponsors/Sessionize.svg';
import Wandb from '../../assets/images/sponsors/Wandb.svg';
import SponsorCard from './SponsorCard';

const Sponsors = () => {
  const sponsorsData = [
    {
      name: 'Google Developers',
      image: GoogleDevelopers,
      link: 'https://developers.google.com/',
      type: 'Title Sponsor'
    },
    {
      name: 'Wandb',
      image: Wandb,
      link: 'https://wandb.ai/',
      type: 'Gold Sponsor'
    },
    {
      name: 'Dynopii',
      image: Dynopii,
      link: 'https://dynopii.com/',
      type: 'Silver Sponsor'
    },
    {
      name: 'Sessionize',
      image: Sessionize,
      link: 'https://sessionize.com/',
      type: 'Media Partners'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-6xl flex justify-center font-normal mt-12 text-g-gray-8 dark:text-white">
        Partners
      </div>
      <div className=" flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 172 19"
          width="120"
          height="20"
          className="flex justify-center"
        >
          <path
            stroke="#db3236"
            strokeWidth="9"
            d="M1.00061 11.9939C39.5016 5.88017 70.8093 4.74491 80.3785 4.82192C89.9477 4.89892 136.465 6.78043 170.019 14.4154"
            opacity=".6"
            className="colorStroke4AE5EF svgStroke"
          ></path>
        </svg>
      </div>

      <p className="mb-4 lg:mb-16 font-light text-center text-black dark:text-white mt-8 sm:text-xl ">
        We're thankful to all our sponsors who are making CCD 2023 Kolkata
        amazing. <br />
        To become a sponsor, please email as at{' '}
        <a
          href="mailto:partners@gdgcloud.kolkata.dev"
          className="text-google-blue"
        >
          partners@gdgcloud.kolkata.dev
        </a>
      </p>
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <div className="grid grid-cols-1 gap-6 gap-y-10 place-items-center">
        {sponsorsData.map((sponsor) => (
          <SponsorCard
            name={sponsor.name}
            image={sponsor.image}
            link={sponsor.link}
            type={sponsor.type}
            key={sponsor.name}
          />
        ))}
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
    </div>
  );
};

export default Sponsors;
