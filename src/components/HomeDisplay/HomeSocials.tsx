import { useEffect, useState } from 'react';
import { ReactComponent as FacebookSVGIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as GitHubSVGIcon } from '../../assets/icons/github.svg';
import { ReactComponent as GmailSVGIcon } from '../../assets/icons/gmail.svg';
import { ReactComponent as InstagramSVGIcon } from '../../assets/icons/instagram.svg';
import { ReactComponent as LinkedInSVGIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as TwitterSVGIcon } from '../../assets/icons/twitter.svg';
import { SocialContent, SocialItem } from '../../assets/models/social/datatype';
import { CurrentTheme } from '../../services/common.service';
import { DARK, SOCIAL_CONTENT_KEY } from '../../services/constants';
import { getContent } from '../../services/content.service';
import { getFeature } from '../../services/feature.service';

const HomeSocials = () => {
  const [socialContent, setContent] = useState<SocialContent>({} as SocialContent);
  useEffect(() => {
    getContent<SocialContent>(SOCIAL_CONTENT_KEY).then((data: void | SocialContent) => {
      if (data) setContent(data);
    });
  }, []);

  const [disabledSocial, setdisabledSocial] = useState<string[]>(['']);
  useEffect(() => {
    getFeature().then((data) => {
      if (data) setdisabledSocial(data.disabledSocial);
    });
  }, []);

  return (
    <div className={`dark:bg-black dark:text-white bg-white text-black`}>
      <div className="flex flex-col items-center justify-center w-full mt-10 mb-2">
        <div className="flex flex-row ">
          <div className={`font-medium leading-14 text-2xl lg:text-8xl block uppercase ${CurrentTheme() === DARK ? 'stroke-w-1px lg:stroke-w-2px text-black ' : ' stroke-b-1px lg:stroke-b-2px text-white'}`}>
            Follow us for&nbsp;
          </div>
          <p className={`font-medium leading-14 text-2xl lg:text-8xl no-shadow uppercase}`}>
            UPDATES
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center lg:space-x-10 space-x-2 lg:mt-10">
        {socialContent?.social?.map((el: SocialItem, i: number) => {
          return disabledSocial?.every((i: string) => i !== el.imgSrc) ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={el.hyperlink}
              key={i}
            >
              <div className="relative inline-block text-left group ">
                {el.imgSrc === 'facebook' ? (<FacebookSVGIcon fill="currentColor" className="w-8 h-8 lg:w-24 lg:h-24" />) : null}
                {el.imgSrc === 'twitter' ? (<TwitterSVGIcon fill="currentColor" className="w-8 h-8 lg:w-24 lg:h-24" />) : null}
                {el.imgSrc === 'instagram' ? (<InstagramSVGIcon fill="currentColor" className="w-8 h-8 lg:w-24 lg:h-24" />) : null}
                {el.imgSrc === 'linkedin' ? (<LinkedInSVGIcon fill="currentColor" className="w-8 h-8 lg:w-24 lg:h-24" />) : null}
                {el.imgSrc === 'github' ? (<GitHubSVGIcon fill="currentColor" className="w-8 h-8 lg:w-24 lg:h-24" />) : null}
                {el.imgSrc === 'gmail' ? (<GmailSVGIcon fill="currentColor" className="w-8 h-8 lg:w-24 lg:h-24" />) : null}
              </div>
            </a>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default HomeSocials;
