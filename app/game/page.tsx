/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import GET from '@/api/get';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import GamesDropdown from '@/components/shared/GamesDropdown';
import MatchCard from '@/components/shared/MatchCard';
import NewsCard from '@/components/shared/NewsCard';
import RectangleSkeleton from '@/components/shared/RectangleSkeleton';
import { Game, MatchDetail, News } from '@/utils/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function GamePage() {
  const param = useSearchParams();
  const parsedParam = parseInt(param.get('game_id'));
  const paramId = isNaN(parsedParam) ? 7 : parsedParam;

  const [ongoingMatches, setOngoingMatches] = useState<MatchDetail[]>();
  const [news, setNews] = useState<News[]>();
  const [gameList, setGameList] = useState<Game[]>([]);
  const [currentId, setCurrentId] = useState<number>(paramId);

  const currentGame = gameList?.find((el) => el.id === currentId);

  const getGames = async () => {
    const { data } = await GET.getAllGames();
    setGameList(data);
  };

  const getNews = async () => {
    const { data } = await GET.getNewsByGameId(currentId);
    const filteredNews = data.filter((data, index) => {
      return index < 5;
    });
    setNews(filteredNews);
  };

  const getOngoingMatches = async () => {
    const { data } = await GET.getMatchByMultipleFilters([
      'status=ongoing',
      `game_id=${currentId}`,
    ]);
    const ongoing = data.filter((data, index) => {
      return index < 5;
    });
    setOngoingMatches(ongoing);
  };

  useEffect(() => {
    setCurrentId(paramId);
  }, [param]);

  useEffect(() => {
    getGames();
    getOngoingMatches();
    getNews();
  }, [paramId]);

  useEffect(() => {
    getOngoingMatches();
    getNews();
  }, [currentId]);

  return (
    <main className="flex flex-col gap-10 max-w-screen-xl mx-auto px-5 py-10 md:px-10">
      <section className="w-full">
        <GamesDropdown
          currentGame={currentGame}
          items={gameList}
          onChange={setCurrentId}
          value={currentId}
        />
        <Link
          href={`/game/stream-list/${currentId}`}
          className="font-semibold flex items-center">
          <h2>
            <span className="text-xport-orange-primary">
              {currentGame?.game_names}
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
              {currentGame?.game_names}
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
