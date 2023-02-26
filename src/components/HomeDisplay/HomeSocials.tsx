import React from 'react';
import { useEffect, useState } from 'react';
import { CurrentTheme } from '../../services/common.service';
import { ReactComponent as FacebookSVGIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as TwitterSVGIcon } from '../../assets/icons/twitter.svg';
import { ReactComponent as InstagramSVGIcon } from '../../assets/icons/instagram.svg';
import { ReactComponent as LinkedInSVGIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as GitHubSVGIcon } from '../../assets/icons/github.svg';
import { ReactComponent as GmailSVGIcon } from '../../assets/icons/gmail.svg';
import RandomColorWrapper from '../utils/RandomColorWrapper';

const social = [
  {
    title: 'Twitter',
    hyperlink: 'https://twitter.com/gdgcloudkol',
    imgSrc: 'twitter'
  },
  {
    title: 'Facebook',
    hyperlink: 'https://facebook.com/gdgcloudkol',
    imgSrc: 'facebook'
  },

  {
    title: 'Instagram',
    hyperlink: 'https://instagram.com/gdgcloudkol',
    imgSrc: 'instagram'
  },
  {
    title: 'linkedIn',
    hyperlink: 'https://www.linkedin.com/company/gdgcloudkol',
    imgSrc: 'linkedin'
  },
];

const HomeSocials = () => {
  return (
    <div
      className={`${
        CurrentTheme() === 'white'
          ? 'bg-white text-black'
          : 'bg-black text-white'
      }`}
    >
      <div className="flex flex-col items-center justify-center w-full mt-10 mb-5 pt-5">
        <div className="flex flex-row ">
          <div className="event-sec-2 block strokeme-w text-black uppercase ">
            Follow us for&nbsp;
          </div>
          <p
            className={`event-sec-2  no-shadow uppercase ${
              CurrentTheme() === 'white' ? 'text-black ' : 'text-white'
            }`}
          >
            UPDATES
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-7 pb-5">
        {social?.map((el, i) => {
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${el.hyperlink}`}
              key={i}
            >
              <div className="relative inline-block text-left group ">
                {/* <RandomColorWrapper> */}
                  {el.imgSrc === 'facebook' ? (
                    <FacebookSVGIcon fill="white" className="w-12 h-12" />
                  ) : null}
                  {el.imgSrc === 'twitter' ? (
                    <TwitterSVGIcon fill="white" className="w-12 h-12" />
                  ) : null}
                  {el.imgSrc === 'instagram' ? (
                    <InstagramSVGIcon fill="white" className="w-12 h-12" />
                  ) : null}
                  {el.imgSrc === 'linkedin' ? (
                    <LinkedInSVGIcon fill="white" className="w-12 h-12" />
                  ) : null}
                  {el.imgSrc === 'github' ? (
                    <GitHubSVGIcon fill="white" className="w-12 h-12" />
                  ) : null}
                  {el.imgSrc === 'gmail' ? (
                    <GmailSVGIcon fill="currentColor" className="w-12 h-12" />
                  ) : null}
                {/* </RandomColorWrapper> */}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default HomeSocials;
