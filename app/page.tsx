'use client';

import GET from '@/api/get';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import GameIcon from '@/components/icons/GameIcon';
import NewsCard from '@/components/shared/NewsCard';
import RectangleSkeleton from '@/components/shared/RectangleSkeleton';
import ThreadsCard from '@/components/shared/ThreadsCard';
import { parseVideoId } from '@/utils/functions';
import { MatchDetail, News, Threads } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [livestreams, setOngoingLivestreams] = useState<MatchDetail[]>();
  const [news, setNews] = useState<News[]>();
  const [threads, setThreads] = useState<Threads[]>();

  const ongoingLivestreams = livestreams?.filter(({ status }) => {
    return status === 'ongoing';
  });
  const spotlight = livestreams?.find(({ status }) => {
    return status === 'upcoming';
  });

  let firstHeadline, secondHeadline, thirdHeadline;

  if (news) {
    firstHeadline = news[0];
    secondHeadline = news[1];
    thirdHeadline = news[2];
  }

  const getMatches = async () => {
    const res = await GET.getAllMatch();
    console.log(res);
    const ongoing = res.data.filter(({ game_id }, index) => {
      return game_id === 1 && index < 5;
    });

    setOngoingLivestreams(ongoing);
  };

  const getNews = async () => {
    const res = await GET.getAllNews();
    const filteredNews = res.data.filter(({ game_id }, index) => {
      return game_id === 1 && index < 5;
    });
    setNews(filteredNews);
  };

  const getThreads = async () => {
    const { data } = await GET.getAllThreads();
    const filteredThreads = data.filter(({ game_id }, index) => {
      return game_id === 1 && index < 4;
    });
    setThreads(filteredThreads);
  };

  useEffect(() => {
    getMatches();
    getNews();
    getThreads();
  }, []);

  return (
    <main className="flex flex-col gap-10 max-w-screen-xl mx-auto px-5 py-10 md:px-10">
      {spotlight && (
        <section>
          <h2 className="font-semibold text-xl mb-5">Livestream Spotlight</h2>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full relative overflow-hidden rounded basis-[40%] aspect-video bg-xport-black-alternate">
              <Image
                src={`https://img.youtube.com/vi/${parseVideoId(
                  spotlight.match_link
                )}/sddefault.jpg`}
                alt={spotlight.tournament_names}
                fill
                className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-150"
              />
            </div>
            <div className="basis-[60%] flex flex-col gap-5 justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  <span className="text-xport-orange-primary">
                    Match of The Day -{' '}
                  </span>{' '}
                  {spotlight.team_a_names} vs {spotlight.team_b_names}
                </h3>
                <p>Game on stream - {spotlight.game_names}</p>
                <p>Stream begins - {spotlight.date}</p>
              </div>
              <div className="flex flex-col w-full">
                <div className="font-bold">
                  <span className="text-xport-orange-primary">MLBB</span>{' '}
                  {spotlight.tournament_names}
                </div>
                <div className="bg-xport-black-light w-full flex flex-col md:flex-row gap-3 md:gap-0">
                  <div className="bg-xport-black-light w-full flex flex-col xs:flex-row gap-2 text-xs md:text-base">
                    <div className="bg-xport-gray-alternate w-full px-5 py-3 rounded-r-full flex gap-1 justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 bg-xport-black-light rounded-full">
                          <Image
                            src={spotlight.team_a_icons}
                            alt={`${spotlight.team_a_names} logo`}
                            fill
                            sizes="100vh"
                            className="object-cover"
                          />
                        </div>
                        <h3 className="font-medium">
                          {spotlight.team_a_names}
                        </h3>
                      </div>
                      <p className="font-bold text-xport-orange-light">
                        {spotlight.team_a_odds}
                      </p>
                    </div>
                    <div className="basis-[15%] flex justify-center items-center italic">
                      vs
                    </div>
                    <div className="bg-xport-gray-alternate w-full px-5 py-3 rounded-l-full flex gap-1 justify-between items-center">
                      <p className="font-bold text-xport-orange-light">
                        {spotlight.team_b_odds}
                      </p>
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-end">
                          {spotlight.team_b_names}
                        </h3>
                        <div className="relative h-10 w-10 bg-xport-black-light rounded-full">
                          <Image
                            src={spotlight.team_b_icons}
                            alt={`${spotlight.team_b_names} logo`}
                            fill
                            sizes="100vh"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <Link href={'/game?game_id=1'}>
          <h2 className="font-semibold group w-fit text-xl mb-5 flex items-center gap-1">
            <span className="text-xport-orange-primary">Mobile Legends</span>{' '}
            Ongoing Livestream{' '}
            <ArrowRightIcon className="w-5 group-hover:translate-x-1 transition-all duration-150" />
          </h2>
        </Link>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {ongoingLivestreams?.length === 0 && (
            <div className=" text-xport-gray-primary font-medium italic">
              No Ongoing Matches
            </div>
          )}
          {ongoingLivestreams?.map(
            ({ id, match_link, tournament_names }, index) => {
              return (
                index > 0 && (
                  <Link
                    href={`/livestream/${id}`}
                    key={id}
                    className="group relative overflow-hidden w-full aspect-video bg-xport-black-light rounded">
                    <Image
                      src={`https://img.youtube.com/vi/${parseVideoId(
                        match_link
                      )}/sddefault.jpg`}
                      alt={tournament_names}
                      fill
                      className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-150"
                    />
                    <span className="font-semibold line-clamp-2 absolute z-[5] bottom-2 left-2">
                      {tournament_names}
                    </span>
                  </Link>
                )
              );
            }
          )}
        </div>
      </section>
      <section>
        <Link href={'/news'}>
          <h2 className="font-semibold group w-fit text-xl mb-5 flex items-center gap-1">
            <span className="text-xport-orange-primary">Latest</span> News{' '}
            <ArrowRightIcon className="w-5 group-hover:translate-x-1 transition-all duration-150" />
          </h2>
        </Link>
        <div className="flex flex-col md:flex-row gap-4">
          {news?.length > 0 && (
            <div className="flex gap-4 w-full">
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
        </div>
        <div className="flex flex-col gap-10 md:gap-5 mt-5">
          {!news && (
            <RectangleSkeleton
              lines={3}
              className="w-full h-26 rounded bg-xport-gray-alternate animate-pulse"
            />
          )}
          {news?.length === 0 && (
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
      </section>
      <section>
        <Link href={'/threads'}>
          <h2 className="font-semibold group w-fit text-xl mb-5 flex items-center gap-1">
            <span className="text-xport-orange-primary">Hot</span> Threads{' '}
            <ArrowRightIcon className="w-5 group-hover:translate-x-1 transition-all duration-150" />
          </h2>
        </Link>
        <div className="grid grid-cols-4 gap-2">
          {threads?.map((item) => {
            return <ThreadsCard key={item.id} {...item} />;
          })}
        </div>
      </section>
    </main>
  );
}
