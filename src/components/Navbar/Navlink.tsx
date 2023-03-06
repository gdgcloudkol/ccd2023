import { Disclosure } from '@headlessui/react'
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { randomTextGoogleColor } from '../../services/common.service'
import { ACTIVE_CLASS_DESKTOP, ACTIVE_CLASS_MOBILE, INACTIVE_CLASS_DESKTOP, INACTIVE_CLASS_MOBILE } from './constants'

interface NavlinkProps {
  variant?: 'desktop' | 'mobile'
  path: string
  label: string
  type?: 'none' | 'button'
}

const Navlink = ({ variant = 'desktop', path, label, type = 'none' }: NavlinkProps) => {
  const location = useLocation()

  const isActive = location.pathname === path

  const [underlyingColor, setColor] = React.useState<string>('text-google-gray-3')

  useEffect(() => {
    return setColor(randomTextGoogleColor())
  }, [])

  const getVariant = (): JSX.Element => {
    switch (variant) {
      case 'mobile':
        switch (type) {
          case 'button':
            return (
              <Link to={path}>
                <div className="flex space-x-2 pl-3 py-2">
                  <Disclosure.Button
                    className="inline-block px-6 py-2.5 bg-transparent border text-white font-medium text-sm leading-tight rounded-3xl shadow-md transition duration-150 ease-in-out">{label}
                  </Disclosure.Button>
                </div>
              </Link>
            )
          default:
          case 'none':
            return (
              <Link to={path}>
                <Disclosure.Button
                  as="span"
                  className={`${isActive ? ACTIVE_CLASS_MOBILE : INACTIVE_CLASS_MOBILE} `}
                >
                  {label}
                </Disclosure.Button>
              </Link>
            )
        }
      default: // default case is desktop case only
      case 'desktop':
        switch (type) {
          case 'button':
            return (
              <Link to={path}>
                <div className="flex space-x-2 py-3.5">
                  <button
                    className="inline-block px-8 py-2.5 bg-transparent border text-white font-medium text-xl leading-tight rounded-3xl shadow-md transition duration-150 ease-in-out">{label}
                  </button>
                </div>
              </Link>
            )
          default:
          case 'none':
            return (
              <Link to={path}
                className={`${isActive ? ACTIVE_CLASS_DESKTOP : INACTIVE_CLASS_DESKTOP
                  } hover:border-${underlyingColor}  inline-flex items-center px-1 pt-6 border-b-2 text-xl font-medium h-12`}
              >
                {label}
              </Link>
            )
        }
    }
  }
  return <>{getVariant()}</>
}

export default Navlink
