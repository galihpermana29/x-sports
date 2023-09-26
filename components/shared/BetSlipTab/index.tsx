'use client';

import BitTorentCoinIcon from '@/components/icons/BitTorentCoinIcon';
import LogoWithText from '../LogoWithText';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import XIcon from '@/components/icons/XIcon';
import { Listbox, Transition } from '@headlessui/react';
import { useState, Fragment, SetStateAction } from 'react';
import Image from 'next/image';

const bids = [5, 10, 20, 30, 50, 100];

type BetData = {
  odds: number;
  teams: string[];
  gameIcon: string;
  chosenTeam: {
    name: string;
    icon: string;
  };
  onClickBet: React.Dispatch<SetStateAction<any>>;
};

function BetSlipTab({
  odds,
  teams,
  chosenTeam,
  gameIcon,
  onClickBet,
}: BetData) {
  const [selectedPayout, setSelectedPayout] = useState<number>(bids[0]);

  return (
    <section className="md:basis-[30%] lg:basis-[20%] flex flex-col justify-between bg-xport-black-primary h-[60vh] md:h-[80vh] border-l border-b border-xport-gray-primary">
      <div className="py-5 px-5 md:px-3">
        <h2 className="font-semibold text-center mb-5">Bet Slip</h2>
        <div className="w-full bg-xport-gray-alternate text-xs rounded">
          <div className="flex justify-between items-center px-3 py-2 ">
            <LogoWithText className="h-7 w-16" />
            <span>
              <XIcon className="w-3 h-3" />
            </span>
          </div>
          <div className="bg-xport-gray-primary px-3 py-2 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <div className="aspect-square relative h-8 rounded-full bg-xport-gray-alternate">
                <Image
                  src={gameIcon}
                  alt={'Game Icon'}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <span className="font-semibold text-xport-game-mlbb text-base md:text-xs">
                {teams[0] ?? '-'} vs {teams[1] ?? '-'}
              </span>
            </div>
            {chosenTeam && odds && (
              <div className="flex justify-between items-center font-semibold">
                <div className="flex items-center gap-2">
                  <div className="h-8 relative aspect-square bg-xport-gray-alternate">
                    <Image
                      src={chosenTeam?.icon}
                      alt={`${chosenTeam?.name} logo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>{chosenTeam?.name}</span>
                </div>
                <div>
                  ODDS: <span className="text-xport-orange-light">{odds}</span>
                </div>
              </div>
            )}
          </div>
          <div className="bg-xport-gray-alternate w-full flex rounded-b">
            <div className="basis-1/2 flex items-center justify-between border-r border-xport-black-primary">
              <Listbox value={selectedPayout} onChange={setSelectedPayout}>
                <div className="relative text-base md:text-xs w-full">
                  <Listbox.Button className="group bg-transparent py-2 pl-3 pr-2 w-full text-end flex items-center justify-between">
                    <BitTorentCoinIcon className="h-5 w-5" />

                    <div className="flex items-center gap-1">
                      <span className="block font-medium">
                        {selectedPayout}K
                      </span>
                      <ArrowDownIcon
                        className={`fill-xport-orange-light h-4 w-4`}
                      />
                    </div>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    enter="transition ease-in duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100">
                    <Listbox.Options className="absolute max-h-60 border-t border-xport-black-primary divide-y divide-xport-black-primary w-full z-10 overflow-auto rounded-b bg-xport-gray-alternate text-white">
                      {bids.map((bid, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-pointer select-none font-medium py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-xport-gray-primary text-xport-orange-primary'
                                : 'text-white'
                            }`
                          }
                          value={bid}>
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate text-end ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}>
                                {bid}K
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className="basis-1/2 py-2 font-semibold flex items-center justify-between px-2 ">
              <span>PAYOUT</span>
              <span>{selectedPayout * odds}K</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-xport-orange-primary text-xs flex items-center">
        <div className="bg-xport-gray-alternate w-2/3 flex flex-col gap2 pl-3 pr-4 py-5 rounded-r-full">
          <div className="flex justify-between">
            <span>Stake</span>
            <span>{selectedPayout}K BTTC</span>
          </div>
          <div className="flex justify-between">
            <span>Payout</span>
            <span>{selectedPayout * odds}K BTTC</span>
          </div>
        </div>
        <button
          onClick={() => onClickBet(selectedPayout)}
          className="text-center w-1/3 h-full cursor-pointer hover:underline px-3">
          PLACE BETS
        </button>
      </div>
    </section>
  );
}

export default BetSlipTab;
