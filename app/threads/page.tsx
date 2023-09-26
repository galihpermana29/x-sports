import GET from '@/api/get';
import FireIcon from '@/components/icons/FIreIcon';
import GameIcon from '@/components/icons/GameIcon';
import ThreadsCard from '@/components/shared/ThreadsCard';
import { shuffleArray } from '@/utils/functions';
import Image from 'next/image';
import Link from 'next/link';

async function ThreadsPage() {
  const { data: threads } = await GET.getAllThreads();

  return (
    <main className="flex flex-col-reverse md:flex-row gap-10 max-w-screen-xl mx-auto px-5 py-10 md:px-10">
      <section className="flex basis-[60%] sm:px-5 lg:px-20 lg:basis-[70%] flex-col gap-5">
        {threads?.map((item) => {
          return <ThreadsCard key={item.id} {...item} />;
        })}
      </section>
      <aside className="basis-[40%] overflow-hidden lg:basis-[30%] w-full h-fit rounded-md bg-xport-black-light">
        <div className="flex px-5 pt-5 items-center gap-2 text-lg font-semibold">
          <FireIcon className="w-7 h-7 fill-xport-light" />
          <h3>Hot Threads</h3>
        </div>
        <div className="flex flex-col mt-5">
          {threads &&
            shuffleArray(threads)?.map(
              ({ id, title, game_names, image_thread }, index) => {
                return (
                  index < 5 && (
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
                  )
                );
              }
            )}
        </div>
      </aside>
    </main>
  );
}

export default ThreadsPage;
