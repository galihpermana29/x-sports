import GameIcon from '@/components/icons/GameIcon';
import HomeIcon from '@/components/icons/HomeIcon';
import { MenuIcon } from '@/components/icons/MenuIcon';
import NewsIcon from '@/components/icons/NewsIcon';
import ThreadsIcon from '@/components/icons/ThreadsIcon';
import WalletIcon from '@/components/icons/WalletIcon';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';

function MobileMenuButton() {
  return (
    <Menu as="div" className="lg:hidden relative inline-block text-left">
      <div>
        <Menu.Button className="w-full justify-center rounded-md text-sm font-medium text-white">
          <MenuIcon className="w-10 h-10" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-xport-gray-alternate text-sm text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={'/'}
                  className={`${
                    active ? ' text-xport-orange-primary' : 'text-xport-light'
                  } group flex items-center w-full gap-3 font-semibold hover:text-xport-gray-primary transition-all duration-150 py-2 px-3`}>
                  <HomeIcon className="w-6 h-6 fill-xport-light group-hover:fill-xport-gray-primary transition-all duration-150" />
                  <span>Home</span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={'/game'}
                  className={`${
                    active ? ' text-xport-orange-primary' : 'text-xport-light'
                  } group flex items-center w-full gap-3 font-semibold hover:text-xport-gray-primary transition-all duration-150 p-3`}>
                  <GameIcon className="w-6 h-6 fill-xport-light group-hover:fill-xport-gray-primary transition-all duration-150" />
                  <span>Games</span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={'/news'}
                  className={`${
                    active ? ' text-xport-orange-primary' : 'text-xport-light'
                  } group flex items-center w-full gap-3 font-semibold hover:text-xport-gray-primary transition-all duration-150 py-2 px-3`}>
                  <NewsIcon className="w-6 h-6 fill-xport-light group-hover:fill-xport-gray-primary transition-all duration-150" />
                  <span>News</span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={'/threads'}
                  className={`${
                    active ? ' text-xport-orange-primary' : 'text-xport-light'
                  } group flex items-center w-full gap-3 font-semibold hover:text-xport-gray-primary transition-all duration-150 py-2 px-3`}>
                  <ThreadsIcon className="w-6 h-6 fill-xport-light group-hover:fill-xport-gray-primary transition-all duration-150" />
                  <span>Threads</span>
                </Link>
              )}
            </Menu.Item>

            <div className="p-3 mt-3 w-full">
              <button className="flex items-center gap-3 w-full text-xs px-5 py-2 rounded-[15px] font-semibold bg-gradient-to-r from-xport-orange-light text-white via-xport-orange-primary to-xport-orange-primary text-start hover:scale-105 transition-all duration-150 active:translate-y-1">
                <WalletIcon className="w-6 h-6 fill-white" />
                <span>Connect wallet</span>
              </button>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default MobileMenuButton;
