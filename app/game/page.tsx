import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import MatchCard from '@/components/shared/MatchCard';
import NewsCard from '@/components/shared/NewsCard';

function Game() {
  return (
    <main className="flex flex-col gap-10 max-w-screen-xl mx-auto px-5 py-10 md:px-10">
      <section className="w-full">
        <div className="font-semibold flex items-center">
          <h2>
            <span className="text-xport-orange-primary">
              Mobile Legends : Bang Bang
            </span>{' '}
            Today&apos;s Match{' '}
          </h2>
          <span>
            <ArrowRightIcon className="w-3 h-3 ml-2" />
          </span>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <MatchCard />
          <MatchCard />
          <MatchCard />
          <MatchCard />
        </div>
      </section>
      <section className="w-full">
        <div className="font-semibold flex items-center">
          <h2>
            <span className="text-xport-orange-primary">
              Mobile Legends : Bang Bang
            </span>{' '}
            Latest News{' '}
          </h2>
          <span>
            <ArrowRightIcon className="w-3 h-3 ml-2" />
          </span>
        </div>
        <div className="flex flex-col gap-10 md:gap-5 mt-5">
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      </section>
    </main>
  );
}

export default Game;
