import { useEffect, useState } from 'react';
import { PartnerContent } from '../../assets/models/partners/datatype';
import { CurrentTheme } from '../../services/common.service';
import { getFeature } from '../../services/feature.service';

const SponsorCard = ({ title, sponsors }: PartnerContent) => {
  const [disabledPartners, setdisabledPartners] = useState([]);
  const [disabledPartnerTitles, setdisabledPartnerTitles] = useState([]);
  useEffect(() => {
    getFeature().then((data) => {
      if (data) {
        setdisabledPartners(data.disabledPartners);
        setdisabledPartnerTitles(data.disabledPartnerTitles);
      }
    });
  }, []);

  return (
    (disabledPartnerTitles.every(i => i !== title)) ? (
      <div className="flex flex-col items-center justify-center space-y-4 max-w-xs">
        <p className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-widest leading-loose">
          {title}
        </p>
        {
          sponsors?.map((sponsor, i) => {
            return disabledPartners?.every((i) => i !== sponsor?.sponsorId) ? (
              <a
                className="rounded cursor-pointer flex justify-center items-center hover:shadow-xl hover:scale-105 hover:ease-in duration-300"
                href={sponsor?.hyperlink}
                target="_blank"
                rel="noreferrer"
                key={i}
              >
                <img
                  className={`w-full h-32 object-contain img-border ${
                    CurrentTheme() === 'white'
                      ? ' filter invert invisible-1'
                      : ' '
                  }`}
                  src={sponsor?.imgSrc}
                  alt={`${sponsor?.sponsorName} logo`}
                  aria-label={`${sponsor?.sponsorName} logo`}
                />
              </a>
            ) : null;
          })
        }
      </div>
    ) : null
  );
};

export default SponsorCard;
