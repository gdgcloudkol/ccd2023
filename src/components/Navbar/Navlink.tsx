import { useLocation } from 'react-router-dom'
import {
  ACTIVE_CLASS_DESKTOP,
  ACTIVE_CLASS_MOBILE,
  INACTIVE_CLASS_DESKTOP,
  INACTIVE_CLASS_MOBILE
} from './constants'
import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'

interface NavlinkProps {
  variant?: 'desktop' | 'mobile'
  path: string
  label: string
}

const Navlink = ({ variant = 'desktop', path, label }: NavlinkProps) => {
  const location = useLocation()

  const isActive = location.pathname === path

  const getVariant = (): JSX.Element => {
    switch (variant) {
      case 'desktop':
        return (
          <Link
            to={path}
            className={`${
              isActive ? ACTIVE_CLASS_DESKTOP : INACTIVE_CLASS_DESKTOP
            }  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
          >
            {label}
          </Link>
        )
      case 'mobile':
        return (
          <Link to={path}>
            <Disclosure.Button
              as="span"
              className={`${
                isActive ? ACTIVE_CLASS_MOBILE : INACTIVE_CLASS_MOBILE
              } `}
            >
              {label}
            </Disclosure.Button>
          </Link>
        )
    }
  }

  return <>{getVariant()}</>
}

export default Navlink
