import React from 'react';

import Social from '../Social/Social';
import { ThemeState } from '../utils/ThemeState';

const Footer = () => {
  console.log(ThemeState);
  return (
    <footer className="p-4 bg-white dark:bg-black sm:p-6">
      <hr className="my-6 border-gray-200 dark:border-g-gray-9 sm:mx-auto lg:my-8" />
      <div className="md:flex md:justify-start">
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-white uppercase ">
              About
            </h2>
            <ul className="text-gray-600 dark:text-g-gray-4  ">
              <li className="mb-2">
                <a
                  href="https://gdg.community.dev/gdg-cloud-kolkata/"
                  className="hover:underline"
                >
                  GDG Cloud Kolkata
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://developers.google.com/community/gdg"
                  className="hover:underline"
                >
                  Google Developer Groups
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://developers.google.com/womentechmakers"
                  className="hover:underline"
                >
                  Women Techmakers
                </a>
              </li>
              <li>
                <a
                  href="https://developers.google.com/community/gdsc"
                  className="hover:underline"
                >
                  Google Developer Student Clubs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-white uppercase">
              Resources
            </h2>
            <ul className="text-gray-600 dark:text-g-gray-4 ">
              <li className="mb-2">
                <a href="/" className="hover:underline disabled">
                  Become a Sponsor
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Call for Speakers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-white uppercase">
              Legal
            </h2>
            <ul className="text-gray-600 dark:text-g-gray-4 ">
              <li className="mb-2">
                <a href="/" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 dark:border-g-gray-9 sm:mx-auto lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-center">
        <Social />
      </div>
    </footer>
  );
};

export default Footer;
