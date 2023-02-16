import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import * as Content from '../../assets/content/navbar/content.json'
import { NavbarItemContent } from '../../assets/models/navbar/datatype'
import { loggedIn } from '../../services/state.service'
import Navlink from './Navlink'

const NavbarPage = () => {
  const content = Content
  const navigation: {
    navbar_permanent: NavbarItemContent[]
    navbar_additional: NavbarItemContent[]
  } = { navbar_permanent: content.navbar_permanent, navbar_additional: [] }
  if (loggedIn) {
    navigation.navbar_additional = content.navbar_spatial_loggedin
  } else {
    navigation.navbar_additional = content.navbar_spatial_not_loggedin
  }
  return (
    <Disclosure as="nav" className="bg-transparent w-full z-10">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-10 w-auto"
                    src="/logo.svg"
                    alt="GDG Cloud Kolkata Logo"
                  />
                  <img
                    className="hidden lg:block h-10 w-auto"
                    src="/logo.svg"
                    alt="GDG Cloud Kolkata Logo"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.navbar_permanent.map((item) => (
                    <Navlink
                      key={item.title}
                      label={item.title}
                      path={item.link}
                    />
                  ))}
                  {navigation.navbar_additional.map((item) => (
                    <Navlink
                      key={item.title}
                      label={item.title}
                      path={item.link}
                    />
                  ))}
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
              {navigation.navbar_permanent.map((item) => (
                <Navlink
                  key={item.title}
                  label={item.title}
                  path={item.link}
                  variant="mobile"
                />
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NavbarPage