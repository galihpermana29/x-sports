/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import GET from '@/api/get';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import BetSlipTab from '@/components/shared/BetSlipTab';
import { parseVideoId } from '@/utils/functions';
import { MatchDetail, type MatchDetailData } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function Livestream() {
  const [match, setMatch] = useState<MatchDetailData>();
  const [filteredMatches, setFilteredMatches] = useState<MatchDetail[]>();
  const [currentOdds, setCurrentOdds] = useState<number | null>(null);
  const [currentTeam, setCurrentTeam] = useState<string | null>(null);

  const path = usePathname();
  const matchId = parseInt(path.split('/').pop());

  const getMatchDetail = async () => {
    const res = await GET.getMatchById(matchId);
    setMatch(res);
  };
  const getAllMatch = async () => {
    const res = await GET.getAllMatch();
    console.log(res);
    const ongoing = res.data.filter((data, index) => {
      return (
        data.id !== match?.data.id &&
        data.status === 'ongoing' &&
        data.game_names === match?.data.game_names &&
        index < 3
      );
    });

    setFilteredMatches(ongoing);
  };

  useEffect(() => {
    getMatchDetail();
  }, []);

  useEffect(() => {
    getAllMatch();
  }, [match]);

  return (
    <main className="flex flex-col md:flex-row max-w-screen-xl mx-auto">
      <section className="bg-xport-black-primary hidden lg:block basis-[15%] text-white h-[80vh] border-r border-b border-xport-gray-primary">
        <div className="border-b border-xport-gray-primary p-5">
          <h2 className="font-semibold text-center">Stream Chat</h2>
        </div>
      </section>
      <section className="md:basis-[70%] lg:basis-[65%] p-5 flex flex-col gap-7 bg-xport-black-primary text-xs md:text-base">
        <div className="bg-xport-black-light overflow-hidden rounded-md w-full aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${parseVideoId(
              match?.data.match_link
            )}?si=a4q6Ta7KnMnohmVj`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
        <div>
          <h1 className="font-bold text-xl md:text-2xl">
            {match?.data.tournament_names}
          </h1>
          <p className="font-semibold text-lg md:text-xl text-xport-light">
            {match?.data.game_names}
          </p>
        </div>
        <div className="bg-xport-black-light w-full flex flex-col sm:flex-row gap-2 text-xs md:text-base">
          <div className="bg-xport-orange-primary basis-[45%] rounded-r-full flex">
            <div className="bg-xport-gray-alternate basis-[70%] px-5 py-3 rounded-r-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 relative">
                  <Image
                    src={match?.data.team_a_icons}
                    alt={`${match?.data.team_a_names} logo`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium">{match?.data.team_a_names}</h3>
              </div>
              <p className="font-bold text-xport-orange-light">
                {match?.data.team_a_odds}
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentOdds(match?.data.team_a_odds);
                setCurrentTeam(match?.data.team_a_names);
              }}
              className="flex basis-[30%] cursor-pointer hover:underline justify-center items-center font-medium">
              Bet Now
            </button>
          </div>
          <div className="basis-[10%] flex justify-center items-center italic">
            vs
          </div>
          <div className="bg-xport-orange-primary basis-[45%] rounded-l-full flex">
            <button
              onClick={() => {
                setCurrentOdds(match?.data.team_b_odds);
                setCurrentTeam(match?.data.team_b_names);
              }}
              className="flex cursor-pointer hover:underline basis-[30%] justify-center items-center font-medium">
              Bet Now
            </button>
            <div className="bg-xport-gray-alternate basis-[70%] px-5 py-3 rounded-l-full flex justify-between items-center">
              <p className="font-bold text-xport-orange-light">
                {match?.data.team_b_odds}
              </p>
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-end">
                  {match?.data.team_b_names}
                </h3>
                <div className="h-10 w-10 relative">
                  <Image
                    src={match?.data.team_b_icons}
                    alt={`${match?.data.team_b_names} logo`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href={'/game'}
            className="group font-semibold flex gap-1 items-center">
            <span className="text-xport-orange-primary">
              {match?.data.game_names}
            </span>
            <span>Ongoing Livestream</span>
            <span className="group-hover:translate-x-1 transition-all duration-150">
              <ArrowRightIcon className="w-3 h-3 ml-2" />
            </span>
          </Link>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredMatches?.length === 0 && (
              <div className=" text-xport-gray-primary font-medium italic">
                No Ongoing Matches
              </div>
            )}
            {filteredMatches?.map(({ id, tournament_names }) => {
              return (
                <Link
                  href={`/livestream/${id}`}
                  key={id}
                  className="group relative overflow-hidden w-full aspect-video bg-xport-black-light rounded">
                  <Image
                    src={`https://img.youtube.com/vi/${parseVideoId(
                      match?.data.match_link
                    )}/sddefault.jpg`}
                    alt={tournament_names}
                    fill
                    className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-150"
                  />
                  <span className="font-semibold line-clamp-2 absolute z-[5] bottom-2 left-2">
                    {tournament_names}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <BetSlipTab
        gameIcon={match?.data.game_icons}
        chosenTeam={currentTeam}
        odds={currentOdds}
        teams={[match?.data.team_a_names, match?.data.team_b_names]}
      />
    </main>
  );
}

export default Livestream;
