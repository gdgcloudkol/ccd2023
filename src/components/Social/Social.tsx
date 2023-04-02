import { useState } from 'react';
import FeatureRuleData from '../../assets/content/feature.rule.json';
import SocialContentData from '../../assets/content/social/content.json';
import { ReactComponent as FacebookSVGIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as GitHubSVGIcon } from '../../assets/icons/github.svg';
import { ReactComponent as GmailSVGIcon } from '../../assets/icons/gmail.svg';
import { ReactComponent as InstagramSVGIcon } from '../../assets/icons/instagram.svg';
import { ReactComponent as LinkedInSVGIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as TwitterSVGIcon } from '../../assets/icons/twitter.svg';
import { SocialContent, SocialItem } from '../../assets/models/social/datatype';
import RandomColorWrapper from '../Utils/RandomColorWrapper';

const Social = () => {
  const [content] = useState(SocialContentData as SocialContent);
  const [disabledSocial] = useState<string[]>(FeatureRuleData.disabledSocial as string[]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="mb-6 font-semibold text-gray-900 dark:text-white">
        {content?.title}
      </h2>
      <div className="flex flex-row items-center justify-center space-x-4">
        {
          content?.social?.map((el: SocialItem, i: number) => {
            return (
              (disabledSocial?.every(i => i !== el.imgSrc)) ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={el.hyperlink}
                  key={i}
                >
                  <div className="relative inline-block text-left group ">
                    <RandomColorWrapper>
                      {(el.imgSrc === 'facebook') ? <FacebookSVGIcon fill="currentColor" className="w-8 h-8" /> : null}
                      {(el.imgSrc === 'twitter') ? <TwitterSVGIcon fill="currentColor" className="w-8 h-8" /> : null}
                      {(el.imgSrc === 'instagram') ? <InstagramSVGIcon fill="currentColor" className="w-8 h-8" /> : null}
                      {(el.imgSrc === 'linkedin') ? <LinkedInSVGIcon fill="currentColor" className="w-8 h-8" /> : null}
                      {(el.imgSrc === 'github') ? <GitHubSVGIcon fill="currentColor" className="w-8 h-8" /> : null}
                      {(el.imgSrc === 'gmail') ? <GmailSVGIcon fill="currentColor" className="w-8 h-8" /> : null}
                    </RandomColorWrapper>
                  </div>
                </a>
              ) : null
            )
          })
        }
      </div>
    </div>
  );
};

export default Social;
