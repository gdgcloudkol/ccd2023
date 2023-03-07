import {
  FaGithub,
  FaGlobeAsia,
  FaLinkedin,
  FaPlus,
  FaTwitter
} from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { Popover, Transition } from '@headlessui/react';
import { useState } from 'react';
import React from 'react';

const iconsMap: { [key: string]: IconType } = {
  linkedin: FaLinkedin,
  github: FaGithub,
  twitter: FaTwitter,
  website: FaGlobeAsia
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const getIconName = (url: string) => {
  if (url.includes('linkedin')) return 'linkedin';
  if (url.includes('github')) return 'github';
  if (url.includes('twitter')) return 'twitter';
  return 'website';
};

interface Socials {
  [key: string]: string;
}

const SocialProfile = ({
  socials,
  setSocials,
  editMode
}: {
  socials: Socials;
  setSocials: React.Dispatch<React.SetStateAction<Socials>>;
  editMode: boolean;
}) => {
  const [addSocial, setAddSocial] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setAddSocial(e.target.value);
    if (isValidUrl(e.target.value)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleDelete = (key: string) => {
    setSocials((prev: any) => {
      const newSocials = { ...prev };
      delete newSocials[key];
      return newSocials;
    });
  };

  const addSocialHandler = () => {
    if (!error && addSocial !== '') {
      setSocials((prev: any) => {
        return { ...prev, [getIconName(addSocial)]: addSocial };
      });
    }
    setAddSocial('');
  };

  return (
    <div className="flex flex-row dark:text-white text-g-gray-8 ">
      {Object.keys(socials).map((key) => {
        const Icon: IconType = iconsMap[key] as IconType;
        return (
          <div className="relative">
            <a href={socials[key]} target="_blank" rel="noreferrer">
              <Icon
                className="text-4xl p-1 hover:text-[#1da1f2] hover:cursor-pointer"
                key={key}
              />
            </a>
            {editMode && (
              <div className="absolute -top-1 right-0">
                <button
                  className=" text-google-red text-xs rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleDelete(key)}
                ></button>
              </div>
            )}
          </div>
        );
      })}

      {editMode && (
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`${
                  open ? 'text-[#1da1f2]' : 'text-g-gray-8'
                } text-3xl p-1 hover:text-[#1da1f2] hover:cursor-pointer flex items-center`}
              >
                <FaPlus />
              </Popover.Button>
              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Popover.Panel className="absolute z-10 top-0 right-0">
                  <div className="bg-white dark:bg-[#1c1c1c] rounded-md shadow-lg p-4">
                    <form className="flex flex-col gap-2">
                      <div className="flex flex-row justify-between gap-2 items-center">
                        <UrlIcon url={addSocial} />
                        <input
                          type="url"
                          placeholder="Enter your social profile link"
                          className={`bg-[#3c3c3c] text-white rounded-md p-2 mt-2 ${
                            isValidUrl(addSocial)
                              ? 'focus:ring-[#1da1f2] focus:ring-2 focus:outline-none'
                              : 'focus:ring-red-500 focus:ring-2 focus:outline-none'
                          }`}
                          value={addSocial}
                          onChange={handleChange}
                        />
                        <button
                          type="submit"
                          className="bg-[#3c3c3c] text-white rounded-md p-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={addSocialHandler}
                          disabled={error}
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      )}
    </div>
  );
};

const UrlIcon = ({ url }: { url: string }) => {
  const Icon: IconType = iconsMap[getIconName(url)] as IconType;

  return (
    <Icon className="text-4xl p-1 hover:cursor-pointer flex items-center" />
  );
};

export default SocialProfile;
