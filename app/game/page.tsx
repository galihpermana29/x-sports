/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import GET from '@/api/get';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import MatchCard from '@/components/shared/MatchCard';
import NewsCard from '@/components/shared/NewsCard';
import RectangleSkeleton from '@/components/shared/RectangleSkeleton';
import { Game, MatchDetail, News } from '@/utils/types';
import { Listbox, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

function GamePage() {
  const [ongoingMatches, setOngoingMatches] = useState<MatchDetail[]>();
  const [news, setNews] = useState<News[]>();
  const [gameList, setGameList] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<Game>({
    id: 1,
    game_names: 'Mobile Legends',
    game_icons: null,
  });

  const getGames = async () => {
    const res = await GET.getAllGames();
    setGameList(res.data);
  };

  const getNews = async () => {
    const res = await GET.getAllNews();
    const filteredNews = res.data.filter((data, index) => {
      return data.game_names === currentGame.game_names && index < 5;
    });
    setNews(filteredNews);
  };

  const getMatchDetail = async () => {
    const res = await GET.getAllMatch();
    const ongoing = res.data.filter((data, index) => {
      return (
        data.status === 'ongoing' &&
        data.game_names === currentGame.game_names &&
        index < 5
      );
    });
    setOngoingMatches(ongoing);
  };

  useEffect(() => {
    getGames();
    getMatchDetail();
    getNews();
  }, []);

  useEffect(() => {
    getMatchDetail();
    getNews();
  }, [currentGame]);

  return (
    <main className="flex flex-col gap-10 max-w-screen-xl mx-auto px-5 py-10 md:px-10">
      <section className="w-full">
        <Listbox value={currentGame} onChange={setCurrentGame}>
          <div className="relative text-base md:text-xs w-full">
            <Listbox.Button className="group mb-10 min-w-[12rem] bg-xport-black-light border border-xport-light py-3 pl-3 pr-2 rounded-md text-end flex items-center justify-between">
              <div className="flex items-center gap-1 mr-10">
                <span className="block font-medium">
                  {currentGame.game_names}
                </span>
              </div>
              <ArrowDownIcon className="w-4 h-4 fill-xport-light" />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              enter="transition ease-in duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100">
              <Listbox.Options className="absolute w-72 border-t border-xport-black-primary -mt-9 divide-y divide-xport-black-primary z-10 overflow-auto rounded bg-xport-gray-alternate text-white">
                {gameList?.map((game, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-pointer select-none font-medium py-3 pl-5 pr-4 ${
                        active
                          ? 'bg-xport-gray-primary text-xport-orange-primary'
                          : 'text-white'
                      }`
                    }
                    value={game}>
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}>
                          {game.game_names}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <Link
          href={`/game/${currentGame.id}`}
          className="font-semibold flex items-center">
          <h2>
            <span className="text-xport-orange-primary">
              {currentGame.game_names}
            </span>{' '}
            Today&apos;s Match{' '}
          </h2>
          <span>
            <ArrowRightIcon className="w-3 h-3 ml-2" />
          </span>
        </Link>
        <div className="flex flex-col gap-5 mt-5">
          {!ongoingMatches && (
            <RectangleSkeleton
              lines={3}
              className="w-full h-20 rounded bg-xport-black-light animate-pulse"
            />
          )}
          {ongoingMatches?.length <= 0 && (
            <span className="italic text-xport-gray-primary font-medium">
              Not Match Found
            </span>
          )}
          {ongoingMatches?.map((match) => {
            return <MatchCard key={match.id} {...match} />;
          })}
        </div>
      </section>
      <section className="w-full">
        <Link href={`/news`} className="font-semibold flex items-center">
          <h2>
            <span className="text-xport-orange-primary">
              {currentGame.game_names}
            </span>{' '}
            Latest News{' '}
          </h2>
          <span>
            <ArrowRightIcon className="w-3 h-3 ml-2" />
          </span>
        </Link>
        <div className="flex flex-col gap-10 md:gap-5 mt-5">
          {!news && (
            <RectangleSkeleton
              lines={3}
              className="w-full h-26 rounded bg-xport-black-light animate-pulse"
            />
          )}
          {news?.length <= 0 && (
            <span className="italic text-xport-gray-primary font-medium">
              No Recent News
            </span>
          )}
          {news?.map((item) => {
            return <NewsCard key={item.id} {...item} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default GamePage;
