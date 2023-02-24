import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect, useState } from 'react';
import { FeatureRule } from '../../assets/models/datatype';
import { NavbarContent, NavbarItemContent } from '../../assets/models/navbar/datatype';
import { CurrentTheme } from '../../services/common.service';
import { getContent } from '../../services/content.service';
import { getFeature } from '../../services/feature.service';
import { LoggedInContext } from '../../services/state.service';
import Toggle from '../Theme/ThemeToggle';
import Navlink from './Navlink';

const NavbarPage = () => {
  const {loggedInState,} = useContext(LoggedInContext)
  const [content, setContent] = useState({} as NavbarContent);
  useEffect(() => {
    getContent<NavbarContent>('navbar').then((data: void | NavbarContent) => {
      if (data) setContent(data);
    });
  }, []);


  const [rule, setFeature] = useState({
    navbarPermanent: false,
    navbarSpatialLoggedIn: false,
    navbarSpatialNotLoggedIn: false
  });

  const navigation: {
    navbarPermanent: NavbarItemContent[];
    navbar_additional: NavbarItemContent[];
  } = {
    navbarPermanent: rule?.navbarPermanent ? content?.navbarPermanent : [],
    navbar_additional: []
  };

  const [disabledRoutes, setDisabledRoutes] = useState(['']);
  useEffect(() => {
    getFeature().then((data: FeatureRule) => {
      if (data) {
        setFeature(data.navbar);
        setDisabledRoutes(data.disabledRoutes);
      }
    });
  }, [loggedInState]);

  if (loggedInState) {
    navigation.navbar_additional = rule?.navbarSpatialLoggedIn
      ? content?.navbarSpatialLoggedIn
      : [];
  } else {
    navigation.navbar_additional = rule?.navbarSpatialNotLoggedIn
      ? content?.navbarSpatialNotLoggedIn
      : [];
  }

  return (
    <Disclosure as="nav" className="bg-transparent w-full z-10">
      {({ open }) => (
        <>
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20">
            <div className="flex justify-between">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className={`block lg:hidden h-12 w-auto mt-2 ${CurrentTheme() === 'white' ? 'filter brightness-0 invert' : ''}`}
                    src="/images/logos/cloud_kol_logo.svg"
                    alt="GDG Cloud Kolkata Logo"
                  />
                  <img
                    className={`hidden lg:block h-12 w-auto mt-3 ${CurrentTheme() === 'white' ? 'filter brightness-0 invert' : ''}`}
                    src="/images/logos/cloud_kol_logo.svg"
                    alt="GDG Cloud Kolkata Logo"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation?.navbarPermanent?.map((item) =>
                    disabledRoutes?.every((i) => item.link !== i) ? (
                      <Navlink
                        key={item.title}
                        label={item.title}
                        path={item.link}
                      />
                    ) : null
                  )}
                  {navigation?.navbar_additional?.map((item) =>
                    disabledRoutes?.every((i) => item.link !== i) ? (
                      <Navlink
                        key={item.title}
                        label={item.title}
                        path={item.link}
                        type="button"
                      />
                    ) : null
                  )}
                </div>
                <div className=" hidden select-none sm:flex items-center pl-4 -mr-4">
                  <Toggle />
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation?.navbarPermanent?.map((item) =>
                disabledRoutes?.every((i) => item.link !== i) ? (
                  <Navlink
                    key={item.title}
                    label={item.title}
                    path={item.link}
                    variant="mobile"
                  />
                ) : null
              )}
              {navigation?.navbar_additional?.map((item) =>
                disabledRoutes?.every((i) => item.link !== i) ? (
                  <Navlink
                    key={item.title}
                    label={item.title}
                    path={item.link}
                    variant="mobile"
                    type="button"
                  />
                ) : null
              )}
              <div className="pl-2 pr-3 ">
                <Toggle />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavbarPage;
