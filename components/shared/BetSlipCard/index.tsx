'use client';

import BitTorentCoinIcon from '@/components/icons/BitTorentCoinIcon';
import LogoWithText from '../LogoWithText';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import XIcon from '@/components/icons/XIcon';
import { Listbox, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';

const bids = [5, 10, 20, 30, 50, 100];

function BetSlipCard() {
  const [selected, setSelected] = useState<number>(bids[0]);

  return (
    <div className="w-full bg-xport-gray-alternate text-xs rounded">
      <div className="flex justify-between items-center px-3 py-2 ">
        <LogoWithText className="h-7 w-16" />
        <span>
          <XIcon className="w-3 h-3" />
        </span>
      </div>
      <div className="bg-xport-gray-primary px-3 py-2 flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <div className="aspect-square w-5 basis-[15%] rounded-full bg-xport-black-light animate-pulse"></div>
          <span className="font-semibold text-xport-game-mlbb">
            Evos Esports vs RRQ Esports
          </span>
        </div>
        <div className="flex justify-between items-center font-semibold">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-xport-black-light animate-pulse"></div>
            <span>Evos Esport</span>
          </div>
          <div>
            ODDS: <span className="text-xport-orange-light">2.73</span>
          </div>
        </div>
      </div>
      <div className="bg-xport-gray-alternate w-full flex rounded-b">
        <div className="basis-1/2 flex items-center justify-between border-r border-xport-black-primary">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative text-xs w-full">
              <Listbox.Button className="group bg-transparent py-2 pl-3 pr-2 w-full text-end flex items-center justify-between">
                <BitTorentCoinIcon className="h-5 w-5" />

                <div className="flex items-center gap-1">
                  <span className="block font-medium">{selected}K</span>
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
                <Listbox.Options className="absolute max-h-60 border-t border-xport-black-primary divide-y divide-xport-black-primary w-full overflow-auto rounded-b bg-xport-gray-alternate text-white">
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
          <span>54K</span>
        </div>
      </div>
    </div>
  );
}

export default BetSlipCard;
