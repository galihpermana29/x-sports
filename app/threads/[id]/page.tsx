/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import GET from '@/api/get';
import FireIcon from '@/components/icons/FIreIcon';
import GameIcon from '@/components/icons/GameIcon';
import UserIcon from '@/components/icons/UserIcon';
import { Threads } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function ThreadsDetailPage() {
  const path = usePathname();
  const newsId = parseInt(path.split('/').pop());

  const [threadDetail, setThreadDetail] = useState<Threads>();
  const [hotThreads, setHotThreads] = useState<Threads[]>();

  const getThreadsById = async () => {
    const { data } = await GET.getThreadById(newsId);

    setThreadDetail(data);
  };

  const getThreads = async () => {
    const { data } = await GET.getAllThreads();
    const filtered = data.filter((item, index) => {
      return item.id !== newsId && index < 6;
    });
    setHotThreads(filtered);
  };

  useEffect(() => {
    getThreads();
    getThreadsById();
  }, []);

  return (
    <main className="flex flex-col md:flex-row gap-5 max-w-screen-xl mx-auto px-5 py-10 md:px-10">
      <section className="basis-[60%] lg:basis-[70%] flex flex-col gap-5 p-5 w-full bg-xport-black-light rounded-md">
        <div className="text-xport-light font-medium flex gap-2 items-center">
          <UserIcon className="fill-xport-light w-7 h-7" />
          <span>Admin</span>
        </div>
        <h1 className="font-semibold text-2xl">{threadDetail?.title}</h1>
        <div className="flex gap-4 items-center text-xport-gray-primary font-medium">
          <div className="flex items-center gap-2">
            <GameIcon className="h-7 w-7 fill-xport-gray-primary" />
            <span>{threadDetail?.game_names}</span>
          </div>
          <span>{threadDetail?.date}</span>
        </div>
        <div className="w-full relative rounded overflow-hidden bg-xport-gray-alternate aspect-video">
          <Image
            src={threadDetail?.image_thread}
            alt={threadDetail?.title}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-sm">{threadDetail?.description}</p>
      </section>
      <aside className="basis-[40%] overflow-hidden lg:basis-[30%] w-full h-fit rounded-md bg-xport-black-light">
        <div className="flex px-5 pt-5 items-center gap-2 text-lg font-semibold">
          <FireIcon className="w-7 h-7 fill-xport-light" />
          <h3>Hot Threads</h3>
        </div>
        <div className="flex flex-col mt-5">
          {hotThreads?.map(({ id, title, game_names, image_thread }) => {
            return (
              <Link
                href={`/threads/${id}`}
                key={id}
                className="flex gap-2 cursor-pointer p-5 hover:bg-xport-gray-alternate transition-all duration-150">
                <div className="basis-[70%] font-medium w-full flex flex-col justify-between">
                  <h4 className="line-clamp-2">{title}</h4>
                  <div className="flex gap-4 items-center text-sm text-xport-gray-primary">
                    <span>21/21/12</span>
                    <div className="flex items-center gap-2">
                      <GameIcon className="h-5 w-5 fill-xport-gray-primary" />
                      <span className="line-clamp-1">{game_names}</span>
                    </div>
                  </div>
                </div>
                <div className="basis-[30%]">
                  <div className="bg-xport-gray-alternate relative overflow-hidden rounded w-full aspect-square">
                    <Image
                      src={image_thread}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>
    </main>
  );
}

export default ThreadsDetailPage;
