import { useEffect, useState } from 'react';
import { PartnerContent, PartnerSponsorContent } from '../../assets/models/partners/datatype';
import { CurrentTheme, rawRandomGoogleColor } from '../../services/common.service';
import { DARK, PARTNERS_CONTENT_KEY } from '../../services/constants';
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
      <div
        className={`block text-center pt-[16px] lg:pl-32 lg:pr-32 font-bold text-3xl leading-normal lg:text-6xl lg:leading-normal ${CurrentTheme() === DARK ? 'bg-white stroke-b-1px lg:stroke-b-2px text-white' : 'bg-black stroke-w-1px lg:stroke-w-2px text-black'}`}>
        {content?.title}
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
