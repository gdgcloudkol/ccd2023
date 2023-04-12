import { useState } from 'react';
import FeatureRuleData from '../../assets/content/feature.rule.json';
import PartnerSponsorContentData from '../../assets/content/partners/content.json';
import { PartnerSponsorContent, SponsorContent } from '../../assets/models/partners/datatype';
import { CurrentTheme } from '../../services/common.service';
import { COMMUNITY_PARTNER_ASSETS, DARK } from '../../services/constants';
import GdscBanner from '../GdscBanner/GdscBanner';

const CommunityPartners = () => {
  const [content] = useState<PartnerSponsorContent>(PartnerSponsorContentData as PartnerSponsorContent);
  const [disabledCommunityPartners] = useState<string[]>(FeatureRuleData.disabledCommunityPartners);

  return (
    <section
      id="partners"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:space-y-3 space-y-4 pb-10"
    >
      <div
        className={`lg:pt-10 pb-10 flex font-bold leading-14 text-5xl lg:text-7xl justify-center text-center uppercase ${CurrentTheme() === DARK ? 'stroke-b-1px lg:stroke-b-2px text-white ' : ' stroke-w-1px lg:stroke-w-2px text-black'}`}>
        {content?.community_partners?.title}
      </div>
      <span className="mb-4 lg:mb-16 font-light text-center text-black dark:text-black mt-8 sm:text-xl ">
        <p
          className=" text-2xl text-center lg:text-clip text-g-gray-7 dark:text-black"
          dangerouslySetInnerHTML={{ __html: content?.community_partners?.description?.substring(3) + '' }}
        ></p>
      </span>
      <br />
      <hr className='border-[1px] border-g-gray-2' />
      <br />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-6 lg:grid-cols-4 place-items-center">
        {content?.community_partners?.sponsors?.map((sponsor: SponsorContent) => {
          return (
            (disabledCommunityPartners.every(i => i !== sponsor?.sponsorId)) ? (
              sponsor?.sponsorId.startsWith('dsc') || sponsor?.sponsorId.startsWith('gdg') ?
                <div
                  className="col-span-1 h-full flex justify-center md:col-span-2 lg:col-span-1 border-[0.5rem] rounded-lg p-5 hover:border-t-google-red hover:border-l-google-blue hover:border-r-google-green hover:border-b-google-yellow hover:shadow-xl hover:scale-105 hover:ease-in duration-300"
                  style={{ minHeight: '200px' }}
                  key={sponsor?.sponsorId}
                >
                  <a
                    className="w-fit rounded cursor-pointer flex justify-center items-center"
                    href={sponsor?.hyperlink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GdscBanner label={sponsor?.sponsorName} />
                  </a>
                </div>
                : (
                  <div key={sponsor?.sponsorId}
                    className='col-span-1 h-full md:col-span-2 lg:col-span-1 align-middle border-[0.5rem] rounded-lg hover:border-t-google-red hover:border-l-google-blue hover:border-r-google-green hover:border-b-google-yellow lg:grayscale hover:grayscale-0 hover:shadow-xl hover:scale-105 hover:ease-in duration-300'>
                    <a
                      className='text-center'
                      href={sponsor?.hyperlink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={COMMUNITY_PARTNER_ASSETS + sponsor?.imgSrc} alt={sponsor?.sponsorId} />
                    </a>
                  </div>
                )
            ) : null
          )
        })}
      </div>
    </section >
  );
};

export default CommunityPartners;
