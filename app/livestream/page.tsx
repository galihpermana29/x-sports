import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import BetSlipCard from '@/components/shared/BetSlipCard';

function Livestream() {
  return (
    <main className="flex flex-col md:flex-row max-w-screen-xl mx-auto">
      <section className="bg-xport-black-primary hidden lg:block basis-[15%] text-white h-[80vh] border-r border-b border-xport-gray-primary">
        <div className="border-b border-xport-gray-primary p-5">
          <h2 className="font-semibold text-center">Stream Chat</h2>
        </div>
      </section>
      <section className="md:basis-[70%] lg:basis-[65%] p-5 flex flex-col gap-7 bg-xport-black-primary text-xs md:text-base">
        <div className="bg-xport-black-light animate-pulse rounded-md w-full aspect-video"></div>
        <div>
          <h1 className="font-bold text-2xl">
            Mobile Legends: Bang Bang Professional League
          </h1>
          <p className="font-semibold text-xl text-xport-light">
            Mobile Legends: Bang Bang
          </p>
        </div>
        <div className="bg-xport-black-light w-full flex text-xs md:text-base">
          <div className="bg-xport-orange-primary basis-[45%] rounded-r-full flex">
            <div className="bg-xport-gray-alternate basis-[70%] px-5 py-3 rounded-r-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-xport-black-light animate-pulse rounded-full"></div>
                <h3 className="font-medium">Evos Esport</h3>
              </div>
              <p className="font-bold text-xport-orange-light">2.73</p>
            </div>
            <div className="flex basis-[30%] justify-center items-center font-medium">
              Bet Now
            </div>
          </div>
          <div className="basis-[10%] flex justify-center items-center italic">
            vs
          </div>
          <div className="bg-xport-orange-primary basis-[45%] rounded-l-full flex">
            <div className="flex basis-[30%] justify-center items-center font-medium">
              Bet Now
            </div>
            <div className="bg-xport-gray-alternate basis-[70%] px-5 py-3 rounded-l-full flex justify-between items-center">
              <p className="font-bold text-xport-orange-light">1.40</p>
              <div className="flex items-center gap-3">
                <h3 className="font-medium">RRQ Esport</h3>
                <div className="h-10 w-10 bg-xport-black-light animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-semibold flex items-center">
            <h3>
              <span className="text-xport-orange-primary">
                Mobile Legends : Bang Bang
              </span>{' '}
              Ongoing Livestream{' '}
            </h3>
            <span>
              <ArrowRightIcon className="w-3 h-3 ml-2" />
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="w-full aspect-video bg-xport-black-light animate-pulse rounded"></div>
            <div className="w-full aspect-video bg-xport-black-light animate-pulse rounded"></div>
            <div className="w-full aspect-video bg-xport-black-light animate-pulse rounded"></div>
          </div>
        </div>
      </section>
      <section className="md:basis-[30%] lg:basis-[20%] flex flex-col justify-between bg-xport-black-primary h-[50vh] md:h-[90vh] border-l border-b border-xport-gray-primary">
        <div className="py-5 px-3">
          <h2 className="font-semibold text-center mb-5">Bet Slip</h2>
          <BetSlipCard />
        </div>
        <div className="bg-xport-orange-primary text-xs flex items-center">
          <div className="bg-xport-gray-alternate w-2/3 flex flex-col gap2 pl-3 pr-4 py-5 rounded-r-full">
            <div className="flex justify-between">
              <span>Stake</span>
              <span>20K BTTC</span>
            </div>
            <div className="flex justify-between">
              <span>Payout</span>
              <span>54K BTTC</span>
            </div>
          </div>
          <span className="text-center px-3">PLACE BETS</span>
        </div>
      </section>
    </main>
  );
}

export default Livestream;
