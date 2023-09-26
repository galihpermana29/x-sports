'use client';

import GET from '@/api/get';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import GameIcon from '@/components/icons/GameIcon';
import HomeIcon from '@/components/icons/HomeIcon';
import NewsIcon from '@/components/icons/NewsIcon';
import ThreadsIcon from '@/components/icons/ThreadsIcon';
import WalletIcon from '@/components/icons/WalletIcon';
import type { GamesData } from '@/utils/types';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LogoWithText from '../LogoWithText';
import MobileMenuButton from '../MobileMenuButton';

function Navbar() {
  const [games, setGames] = useState<GamesData>();

  const path = usePathname();

  useEffect(() => {
    const getAllGames = async () => {
      const res = await GET.getAllGames();
      setGames(res);
    };

    getAllGames();
  }, []);

  return (
    <nav
      className={`py-5 px-5 md:px-10 top-0 z-30 bg-xport-black-light ${
        path.includes('/cms') ? 'hidden' : 'sticky'
      }`}>
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <Link href={'/'}>
          <LogoWithText className="h-16" />
        </Link>

        <ul className="hidden lg:flex items-center gap-10">
          <li>
            <Link
              href={'/'}
              className={`group flex items-center gap-3 font-semibold transition-all duration-150 ${
                path === '/'
                  ? 'text-xport-orange-primary hover:text-xport-orange-light'
                  : 'text-xport-light hover:text-xport-gray-primary'
              }`}>
              <HomeIcon
                className={`w-6 h-6 transition-all duration-150 ${
                  path === '/'
                    ? 'fill-xport-orange-primary group-hover:fill-xport-orange-light'
                    : 'fill-xport-light group-hover:fill-xport-gray-primary'
                }`}
              />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Menu as={'div'}>
              {({ open }) => (
                <>
                  <Menu.Button
                    className={`group flex items-center gap-3 font-semibold transition-all duration-150 ${
                      path.includes('/game')
                        ? 'text-xport-orange-primary hover:text-xport-orange-light'
                        : 'text-xport-light hover:text-xport-gray-primary'
                    }`}>
                    <GameIcon
                      className={`w-6 h-6 transition-all duration-150 ${
                        path.includes('/game')
                          ? 'fill-xport-orange-primary group-hover:fill-xport-orange-light'
                          : 'fill-xport-light group-hover:fill-xport-gray-primary'
                      }`}
                    />
                    <span>Games</span>
                    <ArrowDownIcon
                      className={`w-4 h-4 -ml-2 ${
                        path.includes('/game')
                          ? 'fill-xport-orange-primary group-hover:fill-xport-orange-light'
                          : 'fill-xport-light group-hover:fill-xport-gray-primary'
                      }`}
                    />
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
                      <div className="flex flex-wrap w-96 divide-xport-gray-primary">
                        {games?.data?.map(({ game_names, id, game_icons }) => {
                          return (
                            <Menu.Item key={id}>
                              {() => (
                                <Link
                                  href={`/game?game_id=${id}`}
                                  className="p-5 basis-1/4 w-full aspect-square cursor-pointer hover:bg-xport-black-light transition-all duration-150 flex flex-col gap-3 justify-start items-center">
                                  <div className="relative w-10 h-10 bg-xport-black-light">
                                    <Image
                                      src={game_icons}
                                      alt={`${game_names} logo`}
                                      fill
                                      sizes="100vh"
                                    />
                                  </div>
                                  <span className="text-xs line-clamp-1 text-center font-semibold text-white">
                                    {game_names}{' '}
                                  </span>
                                </Link>
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
              href={'/news'}
              className={`group flex items-center gap-3 font-semibold transition-all duration-150 ${
                path.includes('/news')
                  ? 'text-xport-orange-primary hover:text-xport-orange-light'
                  : 'text-xport-light hover:text-xport-gray-primary'
              }`}>
              <NewsIcon
                className={`w-6 h-6 transition-all duration-150 ${
                  path.includes('/news')
                    ? 'fill-xport-orange-primary group-hover:fill-xport-orange-light'
                    : 'fill-xport-light group-hover:fill-xport-gray-primary'
                }`}
              />
              <span>News</span>
            </Link>
          </li>
          <li>
            <Link
              href={'/threads'}
              className={`group flex items-center gap-3 font-semibold transition-all duration-150 ${
                path.includes('/threads')
                  ? 'text-xport-orange-primary hover:text-xport-orange-light'
                  : 'text-xport-light hover:text-xport-gray-primary'
              }`}>
              <ThreadsIcon
                className={`w-6 h-6 transition-all duration-150 ${
                  path.includes('/threads')
                    ? 'fill-xport-orange-primary group-hover:fill-xport-orange-light'
                    : 'fill-xport-light group-hover:fill-xport-gray-primary'
                }`}
              />
              <span>Threads</span>
            </Link>
          </li>
        </ul>

        <button className="hidden lg:flex items-center gap-3 px-5 py-2 rounded-[15px] font-semibold bg-gradient-to-r from-xport-orange-light text-white via-xport-orange-primary to-xport-orange-primary hover:scale-105 transition-all duration-150 active:translate-y-1">
          <WalletIcon className="w-6 h-6 fill-white" />
          <span>Connect wallet</span>
        </button>

        <MobileMenuButton />
      </div>
    </nav>
  );
}

export default Navbar;
