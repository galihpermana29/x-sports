import CalendarIcon from '@/components/icons/CalendarIcon';
import GameIcon from '@/components/icons/GameIcon';
import { News } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';

function NewsCard({
  date,
  description,
  game_names,
  image_news,
  title,
  id,
}: News) {
  return (
    <Link
      href={`/news/${id}`}
      className="flex flex-col md:flex-row gap-5 cursor-pointer hover:bg-xport-black-light transition-all duration-150 rounded">
      <div className="relative overflow-hidden md:basis-[30%] bg-xport-black-alternate rounded w-full aspect-video">
        <Image
          src={image_news}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="md:basis-[70%] flex flex-col gap-2">
        <h3 className="font-semibold text-xl">{title}</h3>
        <div className="flex gap-5">
          <div className="flex items-center gap-2 text-xport-gray-primary">
            <CalendarIcon className="w-6 aspect-square fill-xport-gray-primary" />
            <span className="font-medium text-sm">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-xport-gray-primary">
            <GameIcon className="w-6 aspect-square fill-xport-gray-primary" />
            <span className="font-medium text-sm">{game_names}</span>
          </div>
        </div>
        <p className="line-clamp-4">{description}</p>
      </div>
    </Link>
  );
}

export default NewsCard;
