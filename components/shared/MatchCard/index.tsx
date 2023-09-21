import ArrowDownIcon from '@/components/icons/ArrowDownIcon';

function MatchCard() {
  return (
    <div className="bg-xport-black-light w-full flex flex-col md:flex-row gap-3 md:gap-0">
      <div className="flex items-center gap-3 pl-5 pt-3 md:pt-0">
        <div className="w-10 aspect-square bg-xport-black-alternate rounded-full"></div>
        <span className="font-semibold text-xport-game-mlbb">
          Mobile Legends: Bang Bang
        </span>
      </div>
      <div className="bg-xport-black-light w-full flex flex-col xs:flex-row gap-2 basis-[60%] text-xs md:text-base">
        <div className="bg-xport-gray-alternate w-full px-5 py-3 rounded-r-full flex gap-1 justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-xport-black-light rounded-full"></div>
            <h3 className="font-medium">Evos Esport</h3>
          </div>
          <p className="font-bold text-xport-orange-light">2.73</p>
        </div>
        <div className="basis-[15%] flex justify-center items-center italic">
          vs
        </div>
        <div className="bg-xport-gray-alternate w-full px-5 py-3 rounded-l-full flex gap-1 justify-between items-center">
          <p className="font-bold text-xport-orange-light">1.40</p>
          <div className="flex items-center gap-3">
            <h3 className="font-medium text-end">RRQ Esport</h3>
            <div className="h-10 w-10 bg-xport-black-light rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="md:basis-[20%] bg-xport-gray-alternate md:bg-transparent md:py-0 group cursor-pointer flex justify-center items-center font-medium">
        <div className="grow flex justify-center items-center px-1">
          <span>Join Livestream</span>
        </div>
        <div className="flex items-center py-3 md:py-0 bg-xport-gray-primary group-hover:bg-xport-orange-primary transition-all duration-150 h-full">
          <ArrowDownIcon className="h-5 w-5 fill-slate-50 -rotate-90" />
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
