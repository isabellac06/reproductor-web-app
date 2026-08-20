import { Icon } from "@iconify/react";
import { SearchBar } from "../03-search/SearchBar";
import { ICONS } from "../../data/icons";

export const Header = () => {
  return (
    <div>
      <header className="h-16 bg-neutral-800 grid grid-cols-3 px-4 py-3 gap-4">
        <div className="header-left"></div>
        <div className="header-center flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <Icon
              className="text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2"
              width="20"
              height="20"
              icon={ICONS.search}
            ></Icon>
            <SearchBar />
          </div>
        </div>
        <div className="header-right flex gap-10 px-4 justify-end">
          <Icon
            className="cursor-pointer text-neutral-100"
            width="24"
            height="24"
            icon={ICONS.metronome}
          />
          <Icon
            className="cursor-pointer text-neutral-100"
            width="24"
            height="24"
            icon={ICONS.user}
          />
        </div>
      </header>
    </div>
  );
};
