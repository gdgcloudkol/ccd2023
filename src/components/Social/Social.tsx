import { ReactComponent as FacebookIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as TwitterIcon } from '../../assets/icons/twitter.svg';
import { ReactComponent as InstagramIcon } from '../../assets/icons/instagram.svg';
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as GitHubIcon } from '../../assets/icons/github.svg';
import { ReactComponent as GmailIcon } from '../../assets/icons/gmail.svg';

import RandomColorWrapper from '../utils/RandomColorWrapper';

const Social = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <div className="text-sm text-gray-600 dark:text-white ">
        Connect with us
      </div>

      <div className="flex flex-row items-center justify-center space-x-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://facebook.com/gdgcloudkol"
        >
          <div className="relative inline-block text-left group ">
            <RandomColorWrapper>
              <FacebookIcon fill="currentColor" className="w-8 h-8" />
            </RandomColorWrapper>
          </div>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/gdgcloudkol"
        >
          <RandomColorWrapper>
            <TwitterIcon fill="currentColor" className="w-8 h-8" />
          </RandomColorWrapper>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://instagram.com/gdgcloudkol"
        >
          <RandomColorWrapper>
            <InstagramIcon fill="currentColor" className="w-8 h-8" />
          </RandomColorWrapper>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/company/gdgcloudkol"
        >
          <RandomColorWrapper>
            <LinkedInIcon fill="currentColor" className="w-8 h-8" />
          </RandomColorWrapper>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/gdgcloudkol"
          className="text-g-gray-7 font-light no-underline"
        >
          <RandomColorWrapper>
            <GitHubIcon fill="currentColor" className="w-8 h-8" />
          </RandomColorWrapper>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:gdgcloudkol@gmail.com"
          className="text-g-gray-7 font-light no-underline"
        >
          <RandomColorWrapper>
            <GmailIcon fill="currentColor" className="w-8 h-8" />
          </RandomColorWrapper>
        </a>
      </div>
    </div>
  );
};

export default Social;
