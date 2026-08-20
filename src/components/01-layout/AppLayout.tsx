import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { sidebarItems } from "../../data/sidebar-items";
import { Player } from "./Player";

interface Props {
  children: ReactNode;
  activeView: string;
  onChangeView: (view: string) => void;
}

export const AppLayout = ({ children, activeView, onChangeView }: Props) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Header />
      <main className="flex overflow-hidden">
        <Sidebar
          items={sidebarItems}
          activeView={activeView}
          onChangeView={onChangeView}
        />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
      <Player />
    </div>
  );
};