import { useEffect, useState } from 'react';
import { FeatureRule } from '../../assets/models/datatype';
import { PartnerSponsorContent, SponsorContent } from '../../assets/models/partners/datatype';
import { rawRandomGoogleColor } from '../../services/common.service';
import { COMMUNITY_PARTNER_ASSETS, PARTNERS_CONTENT_KEY } from '../../services/constants';
import { getContent } from '../../services/content.service';
import { getFeature } from '../../services/feature.service';
import GdscBanner from '../GdscBanner/GdscBanner';

const CommunityPartners = () => {
  const [content, setContent] = useState<PartnerSponsorContent>({} as PartnerSponsorContent);
  useEffect(() => {
    getContent<PartnerSponsorContent>(PARTNERS_CONTENT_KEY).then(
      (data: void | PartnerSponsorContent) => {
        if (data) setContent(data);
      }
    );
  }, []);

  const [disabledCommunityPartners, setdisabledCommunityPartners] = useState<string[]>(['']);
  useEffect(() => {
    getFeature().then((data: FeatureRule) => {
      if (data) setdisabledCommunityPartners(data.disabledCommunityPartners);
    });
  }, []);

  const [rawColor, setColor] = useState<string>('text-google-gray-3');
  useEffect(() => {
    return setColor(rawRandomGoogleColor());
  }, []);

  return (
    <section
      id="partners"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:space-y-3 space-y-4"
    >
      <div className="lg:text-6xl text-4xl flex justify-center font-normal mt-12 text-g-gray-8 dark:text-white">
        {content?.community_partners?.title}
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

      <div className="grid grid-cols-1 gap-8 md:grid-cols-6 lg:grid-cols-4 place-items-center">
        {content?.community_partners?.sponsors?.map((sponsor: SponsorContent) => {
          return (
            (disabledCommunityPartners.every(i => i !== sponsor?.sponsorId)) ? (
              <div
                className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1 img-border h-full w-full hover:shadow-xl hover:scale-105 hover:ease-in duration-300"
                key={sponsor?.sponsorId}
              >
                <a
                  className="w-fit rounded cursor-pointer flex justify-center items-center"
                  href={sponsor?.hyperlink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {sponsor?.sponsorId.startsWith('dsc') ? (
                    <GdscBanner label={sponsor?.sponsorName} />
                  ) : (
                    <img
                      className="w-full h-20 object-contain"
                      src={COMMUNITY_PARTNER_ASSETS + `${sponsor?.sponsorId}.png`}
                      alt={`${sponsor?.sponsorName} logo`}
                      aria-label={`${sponsor?.sponsorName} logo`}
                    />
                  )}
                </a>
              </div>
            ) : null)
        })}
      </div>
    </section>
  );
};

export default CommunityPartners;
