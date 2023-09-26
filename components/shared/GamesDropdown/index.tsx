import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import { Game } from '@/utils/types';
import { Listbox, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction } from 'react';

export interface GamesDropdownProps {
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
  items: Game[];
  currentGame: Game;
}

function GamesDropdown({
  items,
  onChange,
  value,
  currentGame,
}: GamesDropdownProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative text-base md:text-xs w-full">
        <Listbox.Button className="group mb-10 min-w-[12rem] bg-xport-black-light border border-xport-light py-3 pl-3 pr-2 rounded-md text-end flex items-center justify-between">
          <div className="flex items-center gap-1 mr-10">
            <span className="block font-medium">{currentGame?.game_names}</span>
          </div>
          <ArrowDownIcon className="w-4 h-4 fill-xport-light" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          enter="transition ease-in duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100">
          <Listbox.Options className="absolute w-72 border-t border-xport-black-primary -mt-9 divide-y divide-xport-black-primary z-10 overflow-auto rounded bg-xport-gray-alternate text-white">
            {items?.map((game, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-pointer select-none font-medium py-3 pl-5 pr-4 ${
                    active
                      ? 'bg-xport-gray-primary text-xport-orange-primary'
                      : 'text-white'
                  }`
                }
                value={game.id}>
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}>
                      {game.game_names}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default GamesDropdown;
