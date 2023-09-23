'use client';

import GET from '@/api/get';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import GameIcon from '@/components/icons/GameIcon';
import NewsCard from '@/components/shared/NewsCard';
import RectangleSkeleton from '@/components/shared/RectangleSkeleton';
import { Game, News } from '@/utils/types';
import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

function NewsPage() {
  const param = useSearchParams();
  const parsedParam = parseInt(param.get('game_id'));
  const paramId = isNaN(parsedParam) ? 1 : parsedParam;

  const [news, setNews] = useState<News[]>();
  const [gameList, setGameList] = useState<Game[]>([]);
  const [currentId, setCurrentId] = useState<number>(paramId);

  const currentGame = gameList?.find((el) => el.id === currentId);

  let firstHeadline, secondHeadline, thirdHeadline;

  if (news) {
    firstHeadline = news[0];
    secondHeadline = news[1];
    thirdHeadline = news[2];
  }

  const getNews = async () => {
    const res = await GET.getAllNews();
    const filteredNews = res.data.filter((data) => {
      return data.game_id === currentId;
    });
    setNews(filteredNews);
  };

  const getGames = async () => {
    const res = await GET.getAllGames();
    setGameList(res.data);
  };

  useEffect(() => {
    getGames();
    getNews();
  }, [paramId]);

  useEffect(() => {
    getNews();
  }, [currentId]);

  return (
    <main className="flex flex-col max-w-screen-xl mx-auto px-5 py-10 md:px-10">
      <Listbox value={currentId} onChange={setCurrentId}>
        <div className="relative text-base md:text-xs w-full">
          <Listbox.Button className="group mb-10 min-w-[12rem] bg-xport-black-light border border-xport-light py-3 pl-3 pr-2 rounded-md text-end flex items-center justify-between">
            <div className="flex items-center gap-1 mr-10">
              <span className="block font-medium">
                {currentGame?.game_names}
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
                  value={game.id}>
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
      <div className="font-semibold flex items-center">
        <h2>
          <span className="text-xport-orange-primary">
            {currentGame?.game_names}
          </span>{' '}
          Latest News{' '}
        </h2>
        <span>
          <ArrowRightIcon className="w-3 h-3 ml-2" />
        </span>
      </div>
      {news?.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 mt-7">
          <div className="md:basis-[35%] flex flex-col gap-4">
            <Link
              href={`/news/${firstHeadline?.id}`}
              className="relative text-sm group p-3 flex flex-col justify-end z-0 overflow-hidden bg-gradient-to-t from-black aspect-video md:h-1/2 w-full bg-xport-black-light rounded-md">
              <Image
                src={firstHeadline?.image_news}
                alt={firstHeadline?.title}
                fill
                className="object-cover -z-10 opacity-50 group-hover:opacity-90 transition-all duration-150"
              />
              <h2 className="font-semibold line-clamp-2">
                {firstHeadline?.title}
              </h2>
              <div className="flex gap-4 items-center text-xs">
                <span>{firstHeadline?.date}</span>
                <div className="flex items-center gap-2">
                  <GameIcon className="fill-white h-5 w-5" />
                  <span>{firstHeadline?.game_names}</span>
                </div>
              </div>
            </Link>
            <Link
              href={`/news/${secondHeadline?.id}`}
              className="relative text-sm group p-3 flex flex-col justify-end z-0 overflow-hidden bg-gradient-to-t from-black aspect-video md:h-1/2 w-full bg-xport-black-light rounded-md">
              <Image
                src={secondHeadline?.image_news}
                alt={secondHeadline?.title}
                fill
                className="object-cover -z-10 opacity-50 group-hover:opacity-90 transition-all duration-150"
              />
              <h2 className="font-semibold line-clamp-2">
                {secondHeadline?.title}
              </h2>
              <div className="flex gap-4 items-center text-xs">
                <span>{secondHeadline?.date}</span>
                <div className="flex items-center gap-2">
                  <GameIcon className="fill-white h-5 w-5" />
                  <span>{secondHeadline?.game_names}</span>
                </div>
              </div>
            </Link>
          </div>
          <Link
            href={`/news/${thirdHeadline?.id}`}
            className="md:basis-[75%] relative p-5 group flex flex-col justify-end bg-gradient-to-t from-black z-0 overflow-hidden w-full aspect-video bg-xport-black-light rounded-md">
            <Image
              src={thirdHeadline?.image_news}
              alt={thirdHeadline?.title}
              fill
              className="object-cover -z-10 opacity-50  group-hover:opacity-90 transition-all duration-150"
            />
            <h2 className="font-semibold line-clamp-2 text-xl">
              {thirdHeadline?.title}
            </h2>
            <div className="flex gap-4 items-center text-sm">
              <span>{thirdHeadline?.date}</span>
              <div className="flex items-center gap-2">
                <GameIcon className="fill-white h-5 w-5" />
                <span>{secondHeadline?.game_names}</span>
              </div>
            </div>
          </Link>
        </div>
      )}

      <div className="w-full mt-5">
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
          {news?.map((item, index) => {
            return (
              ![0, 1, 2].includes(index) && <NewsCard key={item.id} {...item} />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default NewsPage;
