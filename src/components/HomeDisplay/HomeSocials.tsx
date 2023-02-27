import { useState, useEffect } from 'react';
import { ReactComponent as FacebookSVGIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as GitHubSVGIcon } from '../../assets/icons/github.svg';
import { ReactComponent as GmailSVGIcon } from '../../assets/icons/gmail.svg';
import { ReactComponent as InstagramSVGIcon } from '../../assets/icons/instagram.svg';
import { ReactComponent as LinkedInSVGIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as TwitterSVGIcon } from '../../assets/icons/twitter.svg';
import { SocialContent } from '../../assets/models/social/datatype';
import { CurrentTheme } from '../../services/common.service';
import { getContent } from '../../services/content.service';
import { getFeature } from '../../services/feature.service';

const HomeSocials = () => {
  const [socialContent, setContent] = useState({} as SocialContent);
  useEffect(() => {
    getContent<SocialContent>('social').then((data: void | SocialContent) => {
      if (data) setContent(data);
    });
  }, []);

  const [disabledSocial, setdisabledSocial] = useState(['']);
  useEffect(() => {
    getFeature().then((data) => {
      if (data) setdisabledSocial(data.disabledSocial);
    });
  }, []);

  return (
    <div
      className={`${
        CurrentTheme() === 'white'
          ? 'bg-white text-black'
          : 'bg-black text-white'
      }`}
    >
      <div className="flex flex-col items-center justify-center w-full mt-10 mb-2 lg:mb-5 pt-5">
        <div className="flex flex-row ">
          <div
            className={`font-medium leading-14 text-[20px] md:text-[54px] block uppercase ${
              CurrentTheme() === 'white'
                ? 'strokeme text-white '
                : ' strokeme-w text-black'
            }`}
          >
            Follow us for&nbsp;
          </div>
          <p
            className={`font-medium leading-14 text-[20px] md:text-[54px] no-shadow uppercase
              }`}
          >
            UPDATES
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center lg:space-x-7 space-x-2 pb-5">
        {socialContent?.social?.map((el, i) => {
          return disabledSocial?.every((i) => i !== el.imgSrc) ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={el.hyperlink}
              key={i}
            >
              <div className="relative inline-block text-left group ">
                {el.imgSrc === 'facebook' ? (
                  <FacebookSVGIcon
                    fill="currentColor"
                    className="w-8 h-8 lg:w-12 lg:h-12"
                  />
                ) : null}
                {el.imgSrc === 'twitter' ? (
                  <TwitterSVGIcon
                    fill="currentColor"
                    className="w-8 h-8 lg:w-12 lg:h-12"
                  />
                ) : null}
                {el.imgSrc === 'instagram' ? (
                  <InstagramSVGIcon
                    fill="currentColor"
                    className="w-8 h-8 lg:w-12 lg:h-12"
                  />
                ) : null}
                {el.imgSrc === 'linkedin' ? (
                  <LinkedInSVGIcon
                    fill="currentColor"
                    className="w-8 h-8 lg:w-12 lg:h-12"
                  />
                ) : null}
                {el.imgSrc === 'github' ? (
                  <GitHubSVGIcon
                    fill="currentColor"
                    className="w-8 h-8 lg:w-12 lg:h-12"
                  />
                ) : null}
                {el.imgSrc === 'gmail' ? (
                  <GmailSVGIcon
                    fill="currentColor"
                    className="w-8 h-8 lg:w-12 lg:h-12"
                  />
                ) : null}
              </div>
            </a>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default HomeSocials;
