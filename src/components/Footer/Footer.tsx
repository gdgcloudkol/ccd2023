import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FeatureRule, FooterRule } from '../../assets/models/datatype';
import { FooterContent, FooterListContent, FooterSectionContent } from '../../assets/models/footer/datatype';
import { FOOTER_CONTENT_KEY } from '../../services/constants';
import { getContent } from '../../services/content.service';
import { getFeature } from '../../services/feature.service';
import Social from '../Social/Social';

const Footer = () => {
  const [content, setContent] = useState<FooterContent>({} as FooterContent);
  useEffect(() => {
    getContent<FooterContent>(FOOTER_CONTENT_KEY).then(
      (data: void | FooterContent) => {
        if (data) setContent(data);
      }
    );
  }, []);

  const [disabledFooterContent, setdisabledFooterContent] = useState<FooterRule>({} as FooterRule);
  useEffect(() => {
    getFeature().then((data: FeatureRule) => {
      if (data) setdisabledFooterContent(data.disabledFooterContent);
    });
  }, []);

  return (
    <footer className="p-4 bg-white dark:bg-black sm:p-6">
      {(disabledFooterContent?.footer) ? (
        <>
          <hr className="my-6 border-gray-200 dark:border-g-gray-9 sm:mx-auto lg:my-8" />
          <div className="md:flex md:justify-start">
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              {content?.sections?.map((sec: FooterSectionContent, i: number) => {
                return (
                  ((disabledFooterContent?.section[i]?.title === sec.title &&
                    !disabledFooterContent?.section[i]?.hide) ||
                    !disabledFooterContent?.section[i]?.hide) ? (
                    <div key={'section-' + i}>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-white uppercase ">
                        {sec.title}
                      </h2>
                      <ul className="text-gray-600 dark:text-g-gray-4  ">
                        {sec?.list.map((li: FooterListContent, j: number) => {
                          return (
                            (!disabledFooterContent?.section[i]?.nOI ||
                              disabledFooterContent?.section[i]?.nOI - 1 >= j) ? (
                              <li key={'list-' + j} className="mb-2">
                                {
                                  li?.hyperlink ? (
                                    <a
                                      href={li?.hyperlink}
                                      className="hover:underline"
                                    >
                                      {li?.title}
                                    </a>
                                  ) : null
                                }
                                {
                                  li?.link ? (
                                    <Link
                                      to={li?.link}
                                      className="hover:underline"
                                    >
                                      {li?.title}
                                    </Link>
                                  ) : null
                                }
                              </li>
                            ) : null
                          )
                        })}
                      </ul>
                    </div>
                  ) : null
                )
              })}
            </div>
          </div>
        </>
      ) : null}
      <hr className="my-6 border-gray-200 dark:border-g-gray-9 sm:mx-auto lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-center">
        <Social />
      </div>
    </footer>
  );
};

export default Footer;
