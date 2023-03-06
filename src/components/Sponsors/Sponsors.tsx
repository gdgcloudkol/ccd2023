import { useEffect, useState } from 'react';
import { PartnerContent, PartnerSponsorContent } from '../../assets/models/partners/datatype';
import { rawRandomGoogleColor } from '../../services/common.service';
import { PARTNERS_CONTENT_KEY } from '../../services/constants';
import { getContent } from '../../services/content.service';
import SponsorCard from './SponsorCard';

const Sponsors = () => {
  const [content, setContent] = useState({} as PartnerSponsorContent);
  useEffect(() => {
    getContent<PartnerSponsorContent>(PARTNERS_CONTENT_KEY).then((data: void | PartnerSponsorContent) => {
      if (data) setContent(data);
    });
  }, []);

  const [rawColor, setColor] = useState<string>('text-google-gray-3');
  useEffect(() => {
    return setColor(rawRandomGoogleColor());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:text-6xl text-5xl flex justify-center font-normal mt-12 text-g-gray-8 dark:text-black">
        {content?.title}
      </div>
      <div className=" flex justify-center">
        <svg
          fill="none"
          viewBox="0 0 172 19"
          width="120"
          height="20"
          className="flex justify-center"
        >
          <path
            stroke={`${rawColor}`}
            strokeWidth="9"
            d="M1.00061 11.9939C39.5016 5.88017 70.8093 4.74491 80.3785 4.82192C89.9477 4.89892 136.465 6.78043 170.019 14.4154"
            opacity=".6"
            className="colorStroke4AE5EF svgStroke"
          ></path>
        </svg>
      </div>
      <br />
      <span className="mb-4 lg:mb-16 font-light text-center text-black dark:text-black mt-8 sm:text-xl ">
        <p
          className=" text-lg text-center lg:text-clip text-g-gray-7 dark:text-black"
          dangerouslySetInnerHTML={{ __html: content?.description?.substring(3) }}
        ></p>
      </span>
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <div className="grid grid-cols-1 gap-6 gap-y-10 place-items-center">
        {content?.partners?.map((partner: PartnerContent, i: number) => (
          <SponsorCard
            title={partner?.title}
            sponsors={partner?.sponsors}
            key={i}
          />
        ))}
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
    </div>
  );
};

export default Sponsors;
