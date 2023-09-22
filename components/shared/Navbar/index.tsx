'use client';

import GET from '@/api/get';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import GameIcon from '@/components/icons/GameIcon';
import HomeIcon from '@/components/icons/HomeIcon';
import { MenuIcon } from '@/components/icons/MenuIcon';
import NewsIcon from '@/components/icons/NewsIcon';
import ReceiptIcon from '@/components/icons/ReceiptIcon';
import ThreadsIcon from '@/components/icons/ThreadsIcon';
import WalletIcon from '@/components/icons/WalletIcon';
import type { GamesData } from '@/utils/types';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LogoWithText from '../LogoWithText';

function Navbar() {
  const [games, setGames] = useState<GamesData>();

  useEffect(() => {
    const getAllGames = async () => {
      const res = await GET.getAllGames();
      setGames(res);
    };

    getAllGames();
  }, []);

  return (
    <nav className="py-5 px-5 md:px-10 sticky top-0 z-30 bg-xport-black-light">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <Link href={'/'}>
          <LogoWithText className="h-16" />
        </Link>

        <ul className="hidden lg:flex items-center gap-10 text-xport-light">
          <li>
            <Link
              href={'/'}
              className="group flex items-center gap-3 font-semibold hover:text-xport-gray-primary transition-all duration-150">
              <HomeIcon className="w-6 h-6 fill-xport-light group-hover:fill-xport-gray-primary transition-all duration-150" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Menu as={'div'}>
              {({ open }) => (
                <>
                  <Menu.Button
                    className={
                      'group flex items-center gap-3 font-semibold hover:text-xport-gray-primary text-xport-light'
                    }>
                    <GameIcon className="w-6 h-6 fill-xport-light group-hover:fill-xport-gray-primary transition-all duration-150" />
                    <span>Games</span>
                    <ArrowDownIcon className="w-4 h-4 -ml-2 fill-xport-light group-hover:fill-xport-gray-primary" />
                  </Menu.Button>

                  <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0">
                    <Menu.Items
                      className={
                        'absolute left-0 mt-3 flex flex-col overflow-hidden rounded border border-xport-gray-primary divide-y divide-xport-gray-primary bg-xport-black-alternate shadow-xl'
                      }>
                      <div className="p-2">
                        <p className="font-medium">List of Games</p>
                      </div>
                      <div className="grid grid-cols-5 w-96 divide-xport-gray-primary">
                        {games?.data?.map(({ game_names, id, game_icons }) => {
                          return (
                            <Menu.Item key={id}>
                              {() => (
                                <div className="p-5 w-26 h-full cursor-pointer hover:bg-xport-black-light transition-all duration-150 flex flex-col gap-3 justify-start items-center">
                                  <div className="relative w-10 h-10 bg-xport-black-light rounded-full overflow-hidden">
                                    <Image
                                      src={game_icons}
                                      alt={`${game_names} logo`}
                                      fill
                                    />
                                  </div>
                                  <span className="text-xs text-center font-semibold text-white">
                                    {game_names}{' '}
                                  </span>
                                </div>
                              )}
                            </Menu.Item>
                          );
                        })}
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </li>
          <li>
            <Link
              href={'/'}
              className="group flex items-center gap-3 font-semibold hover:text-xport-gray-primary transition-all duration-150">
              <NewsIcon className="w-6 h-6 fill-xport-light group-hover:fill-xport-gray-primary transition-all duration-150" />
              <span>News</span>
            </Link>
          </li>
          <li>
            <Link
              href={'/'}
              className="group flex items-center gap-3 font-semibold hover:text-xport-gray-primary transition-all duration-150">
              <ThreadsIcon className="w-6 h-6 fill-xport-light group-hover:fill-xport-gray-primary transition-all duration-150" />
              <span>Threads</span>
            </Link>
          </li>
          <li>
            <Link
              href={'/'}
              className="group flex items-center gap-3 font-semibold hover:text-xport-gray-primary transition-all duration-150">
              <ReceiptIcon className="w-6 h-6 fill-xport-light group-hover:fill-xport-gray-primary transition-all duration-150" />
              <span>Your Bet</span>
            </Link>
          </li>
        </ul>

        <button className="hidden lg:flex items-center gap-3 px-5 py-2 rounded-[15px] font-semibold bg-gradient-to-r from-xport-orange-light text-white via-xport-orange-primary to-xport-orange-primary hover:scale-105 transition-all duration-150 active:translate-y-1">
          <WalletIcon className="w-6 h-6 fill-white" />
          <span>Connect wallet</span>
        </button>

        <button className="flex lg:hidden">
          <MenuIcon className="w-10 h-10" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
