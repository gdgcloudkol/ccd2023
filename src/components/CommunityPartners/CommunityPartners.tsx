import { useEffect, useRef, useState } from 'react';
import { PartnersContent } from '../../assets/models/partners/datatype';
import { CurrentTheme, rawRandomColor } from '../../services/common.service';
import { getContent } from '../../services/content.service';
import { getFeature } from '../../services/feature.service';
import GdscBanner from '../GdscBanner/GdscBanner';

const CommunityPartners = () => {
  const [content, setContent] = useState({} as PartnersContent);
  useEffect(() => {
    getContent<PartnersContent>('partners').then(
      (data: void | PartnersContent) => {
        if (data) setContent(data);
      }
    );
  }, []);

  const [disabledCommunityPartners, setdisabledCommunityPartners] = useState(
    []
  );
  useEffect(() => {
    getFeature().then((data) => {
      if (data) {
        setdisabledCommunityPartners(data.disabledCommunityPartners);
      }
    });
  }, []);

  const image = useRef(null);
  const [valid, setValid] = useState(true);

  const checkValid = () => {
    //@ts-ignore
    if (image.current.complete) setValid(true);
  };

  const [rawColor, setColor] = useState<string>('text-google-gray-3');
  useEffect(() => {
    return setColor(rawRandomColor());
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
        {content?.community_partners?.sponsors?.map((sponsor) => {
          return (
            (disabledCommunityPartners.every(i => i !== sponsor.sponsorId)) ? (
              <div
                className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1 img-border h-full w-full"
                key={sponsor.sponsorId}
              >
                <a
                  className="w-fit rounded cursor-pointer flex justify-center items-center"
                  href={sponsor.hyperlink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* Put all images in the assets/images/communityPartners/ */}
                  {sponsor.sponsorId.startsWith('dsc') ? (
                    <GdscBanner label={sponsor?.sponsorName} />
                  ) : valid ? (
                    <img
                      src={`../../assets/images/communityPartners/${sponsor.sponsorId}.png`}
                      onLoad={checkValid}
                      onError={() => setValid(false)}
                      ref={image}
                      alt={`${sponsor.sponsorName} logo`}
                      className="w-full h-20 object-contain"
                      aria-label={`${sponsor.sponsorName} logo`}
                    />
                  ) : (
                    <p>{sponsor?.sponsorName}</p>
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
