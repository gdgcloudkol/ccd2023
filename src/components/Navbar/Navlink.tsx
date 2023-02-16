import { Disclosure } from '@headlessui/react'
import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Router from '../../Router'
import { randomColor } from '../../services/common.service'
import {
  ACTIVE_CLASS_DESKTOP,
  ACTIVE_CLASS_MOBILE,
  INACTIVE_CLASS_DESKTOP,
  INACTIVE_CLASS_MOBILE
} from './constants'

interface NavlinkProps {
  variant?: 'desktop' | 'mobile'
  path: string
  label: string
  type?: 'none' | 'button'
}

const Navlink = ({ variant = 'desktop', path, label, type = 'none' }: NavlinkProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = location.pathname === path

  const [underlyingColor, setColor] = React.useState<string>('text-google-gray-3')

  useEffect(() => {
    return setColor(randomColor())
  }, [])

  const getVariant = (): JSX.Element => {
    switch (variant) {
      case 'desktop':
        switch (type) {
          case 'none':
            return (
              <Link
                to={path}
                className={`${isActive ? ACTIVE_CLASS_DESKTOP : INACTIVE_CLASS_DESKTOP
                  } hover:border-${underlyingColor}  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                {label}
              </Link>
            )
          case 'button':
            return (
              <div className="flex space-x-2 py-3.5">
                <button type="button"
                  onClick={() => { navigate(path) }}
                  className="inline-block px-6 py-2.5 bg-gray-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">{label}</button>
              </div>
            )
        }
      case 'mobile':
        switch (type) {
          case 'none':
            return (
              <Link to={path}>
                <Disclosure.Button
                  as="span"
                  className={`${isActive ? ACTIVE_CLASS_MOBILE : INACTIVE_CLASS_MOBILE
                    } `}
                >
                  {label}
                </Disclosure.Button>
              </Link>
            )
          case 'button':
            return (
              <div className="flex space-x-2 pl-3 py-2">
                <button type="button" 
                onClick={() => { navigate(path) }} 
                className="inline-block px-6 py-2.5 bg-gray-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">{label}</button>
              </div>
            )
        }
    }
  }

  return <>{getVariant()}</>
}

export default Navlink
