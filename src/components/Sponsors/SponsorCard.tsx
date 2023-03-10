import { useEffect, useState } from 'react';
import { PartnerContent, SponsorContent } from '../../assets/models/partners/datatype';
import { CurrentTheme } from '../../services/common.service';
import { DARK, SPONSORS_ASSETS } from '../../services/constants';
import { getFeature } from '../../services/feature.service';

const SponsorCard = ({ title, sponsors }: PartnerContent) => {
  const [disabledPartners, setdisabledPartners] = useState(['']);
  const [disabledPartnerTitles, setdisabledPartnerTitles] = useState(['']);
  useEffect(() => {
    getFeature().then((data) => {
      if (data) {
        setdisabledPartners(data.disabledPartners);
        setdisabledPartnerTitles(data.disabledPartnerTitles);
      }
    });
  }, []);

  return disabledPartnerTitles.every((i) => i !== title) ? (
    <div className="flex flex-col items-center justify-center space-y-4 max-w-s">
      <p className="text-4xl font-bold text-gray-900 dark:text-black uppercase tracking-widest leading-loose">
        {title}
      </p>
      {sponsors?.map((sponsor: SponsorContent, i: number) => {
        return disabledPartners?.every((i) => i !== sponsor?.sponsorId) ? (
          <a
            className="border-[0.5rem] hover:border-t-google-red hover:border-l-google-blue hover:border-r-google-green hover:border-b-google-yellow rounded cursor-pointer flex justify-center items-center hover:shadow-xl hover:scale-105 hover:ease-in duration-300"
            href={sponsor?.hyperlink}
            target="_blank"
            rel="noreferrer"
            key={i}
          >
            <img
              className={`w-full h-32 object-contain border rounded-lg p-5
              ${CurrentTheme() === DARK ? '' : 'filter invert brightness-0 '}`}
              src={SPONSORS_ASSETS + sponsor?.imgSrc}
              alt={`${sponsor?.sponsorName} logo`}
              aria-label={`${sponsor?.sponsorName} logo`}
            />
          </a>
        ) : null;
      })}
    </div>
  ) : null;
};

export default SponsorCard;
