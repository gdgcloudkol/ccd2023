import { useEffect, useRef, useState } from 'react';
import { PartnersContent } from '../../assets/models/partners/datatype';
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
  }, [content]);

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

  return (
    <section
      id="partners"
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8"
    >
      <h2 className="text-center text-3xl font-bold text-gray-900">
        {content?.community_partners?.title}
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-6 lg:grid-cols-4 place-items-center">
        {content?.community_partners?.sponsors?.map((sponsor) => {
          return (
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
          );
        })}
      </div>
    </section>
  );
};

export default CommunityPartners;
