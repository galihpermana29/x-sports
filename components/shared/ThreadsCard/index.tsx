import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import UserIcon from '@/components/icons/UserIcon';
import { Threads } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';

function ThreadsCard({ date, game_names, image_thread, title, id }: Threads) {
  return (
    <div className="flex flex-col gap-5 p-5 font-medium rounded bg-xport-black-light">
      <div className="flex items-center gap-2 text-xs text-xport-light">
        <UserIcon className="fill-xport-light h-7 w-7" />
        <div className="flex flex-col">
          <span>Admin</span>
          <div className="text-xport-gray-primary line-clamp-1">
            {game_names} {date}
          </div>
        </div>
      </div>
      <h3 className="line-clamp-2">{title}</h3>
      <div className="relative w-full aspect-video rounded overflow-hidden">
        <Image src={image_thread} alt={title} fill sizes="100vh" />
      </div>
      <div className="text-xs group text-end flex justify-end items-center">
        <Link href={`/threads/${id}`} className="group-hover:underline">
          See Threads
        </Link>
        <ArrowRightIcon className="w-5 group-hover:translate-x-1 transition-all duration-150" />
      </div>
    </div>
  );
}

export default ThreadsCard;
