import { AiOutlineShareAlt } from "react-icons/ai"
import { Popover, Transition } from "@headlessui/react"
import { ReactComponent as FacebookSVGIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as TwitterSVGIcon } from '../../assets/icons/twitter.svg';
import { ReactComponent as InstagramSVGIcon } from '../../assets/icons/instagram.svg';
import { ReactComponent as LinkedInSVGIcon } from '../../assets/icons/linkedin.svg';

const Share = () => {
    return (
        <div className='flex items-center'>
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button>
                            <AiOutlineShareAlt color='white' size={35} />
                        </Popover.Button>
                        <Transition
                            show={open}
                            enter="transition ease-out duration-400"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-200"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Popover.Panel className="absolute z-10 top-0 right-0">
                                <div className='flex p-4 gap-x-2 items-center justify-center rounded-md bg-g-gray-9'>
                                    <a target="_blank" rel='noreferrer' href="https://www.facebook.com" className="hover:bg-blue-500 rounded">
                                        <FacebookSVGIcon fill="white" className="text-4xl py-1 hover:cursor-pointer flex items-center w-10 h-10" />
                                    </a>
                                    <a target="_blank" rel='noreferrer' href="https://www.linkedin.com" className="hover:bg-blue-500 rounded">
                                        <LinkedInSVGIcon fill="white" className="text-4xl py-1 hover:cursor-pointer flex items-center w-10 h-10" />
                                    </a>
                                    <a target="_blank" rel='noreferrer' href="https://www.instagram.com" className="hover:bg-pink-400 rounded">
                                        <InstagramSVGIcon fill="white" className="text-4xl py-1 hover:cursor-pointer flex items-center w-10 h-10" />
                                    </a>
                                    <a target="_blank" rel='noreferrer' href="https://www.twitter.com" className="hover:bg-blue-400 rounded">
                                        <TwitterSVGIcon fill="white" className="text-4xl py-1 hover:cursor-pointer flex items-center w-10 h-10" />
                                    </a>
                                    {/* <a target="_blank" rel='noreferrer' href="https://www.twitter.com" className=" hover:bg-green-400 rounded">
                                        <AiOutlineWhatsApp />
                                    </a> */}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}

export default Share