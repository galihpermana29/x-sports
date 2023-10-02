import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import { MatchDetail } from '@/utils/types';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

function MatchCard(props: MatchDetail) {
  const {
    tournament_names,
    game_icons,
    team_a_icons,
    team_a_names,
    team_a_odds,
    team_b_icons,
    team_b_names,
    team_b_odds,
    id,
    status,
    date,
  } = props;

  return (
    <div className="bg-xport-black-light w-full flex flex-col md:flex-row gap-3 md:gap-0">
      <div className="flex items-center gap-3 px-5 pt-3 md:pt-0 basis-[20%]">
        <div className="w-10 relative aspect-square bg-xport-black-alternate rounded-full">
          <Image
            src={game_icons}
            alt={`${tournament_names} logo`}
            fill
            sizes="100vh"
          />
        </div>
        <span className="font-semibold text-xport-game-mlbb">
          {tournament_names.length > 13
            ? tournament_names.slice(0, 13) + '..'
            : tournament_names}
        </span>
      </div>
      <div className="bg-xport-black-light w-full flex flex-col xs:flex-row gap-2 basis-[60%] text-xs md:text-base">
        <div className="bg-xport-gray-alternate w-full px-5 py-3 rounded-r-full flex gap-1 justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src={team_a_icons}
                alt={`${team_a_names} logo`}
                fill
                sizes="100vh"
              />
            </div>
            <h3 className="font-medium">{team_a_names}</h3>
          </div>
          <p className="font-bold text-xport-orange-light">
            {team_a_odds / 100}
          </p>
        </div>
        <div className="basis-[15%] flex justify-center items-center italic">
          vs
        </div>
        <div className="bg-xport-gray-alternate w-full px-5 py-3 rounded-l-full flex gap-1 justify-between items-center">
          <p className="font-bold text-xport-orange-light">
            {team_b_odds / 100}
          </p>
          <div className="flex items-center gap-3">
            <h3 className="font-medium text-end">{team_b_names}</h3>
            <div className="relative h-10 w-10">
              <Image
                src={team_b_icons}
                alt={`${team_b_names} logo`}
                fill
                sizes="100vh"
              />
            </div>
          </div>
        </div>
      </div>
      {status === 'ongoing' && (
        <Link
          href={`/livestream/${id}`}
          className={`md:basis-[20%] bg-xport-gray-alternate md:bg-transparent md:py-0 group cursor-pointer flex justify-center items-center font-medium ${
            status === 'ongoing'
              ? 'bg-gradient-to-l from-xport-orange-primary'
              : ''
          }`}>
          <div className="grow flex gap-2 justify-center items-center px-1">
            <div className="h-2 w-2 rounded-full bg-xport-orange-primary"></div>
            <span>Join Livestream</span>
          </div>
          <div className="flex items-center py-3 md:py-0 bg-xport-gray-primary group-hover:bg-xport-orange-primary transition-all duration-150 h-full">
            <ArrowDownIcon className="h-5 w-5 fill-slate-50 -rotate-90" />
          </div>
        </Link>
      )}
      {status === 'upcoming' && (
        <div className="md:basis-[20%] bg-xport-gray-alternate md:bg-transparent md:py-0 group flex justify-center items-center font-medium">
          <div className="grow flex justify-center items-center px-1">
            <span>{dayjs(date).format('MMM DD HH:mm [GMT]Z')}</span>
          </div>
          <div className="flex items-center py-3 md:py-0 bg-xport-gray-primary h-full">
            <ArrowDownIcon className="h-5 w-5 fill-slate-50 -rotate-90" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchCard;
