import ongoing from '@/public/assets/ongoing-icon.png';
import complete from '@/public/assets/complete-icon.png';
import news from '@/public/assets/news-icon.png';
import thread from '@/public/assets/thread-icon.png';
import game from '@/public/assets/game-icon.png';
import team from '@/public/assets/team-icon.png';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import logo from '@/public/assets/logo.png';

interface navRoutesI {
  name: string;
  link: string;
  image: StaticImageData;
}

export default function Sidebar() {
  const navRoutes: navRoutesI[] = [
    {
      name: 'Ongoing & Upcoming Match',
      link: '/cms/home/ongoing',
      image: ongoing,
    },
    {
      name: 'Completed Match',
      link: '/cms/home/completed',
      image: complete,
    },
    {
      name: 'News',
      link: '/cms/home/news',
      image: news,
    },
    {
      name: 'Threads',
      link: '/cms/home/threads',
      image: thread,
    },
    {
      name: 'Games',
      link: '/cms/home/games',
      image: game,
    },
    {
      name: 'Teams',
      link: '/cms/home/teams',
      image: team,
    },
    {
      name: 'Deposit',
      link: '/cms/home/deposit',
      image: team,
    },
  ];
  return (
    <div className="min-h-screen bg-[#2A313B] max-w-max p-[30px] flex flex-col justify-between">
      <div className="flex flex-col gap-[20px]">
        <div className="mb-[30px]">
          <Image src={logo} alt="t" />
        </div>
        {navRoutes.map((d) => (
          <Link
            href={d.link}
            key={d.name}
            className="flex items-center gap-[10px] text-white hover:text-orange-500 cursor-pointer">
            <div>
              <Image src={d.image} alt="t" />
            </div>
            <h1>{d.name}</h1>
          </Link>
        ))}
      </div>
      <div>
        <div className="text-white cursor-pointer">Logout</div>
      </div>
    </div>
  );
}
