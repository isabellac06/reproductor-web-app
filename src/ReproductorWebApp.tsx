import { useState } from "react";
import { AppLayout } from "./components/01-layout/AppLayout";
import { FavoritesProvider } from "./context/FavoritesProvider";
import { Favorites } from "./pages/Favorites";
import { PlayerProvider } from "./context/PlayerProvider";
import { Home } from "./pages/Home";

export function ReproductorWebApp() {
  const [activeView, setActiveView] = useState<string>("home");

  return (
    <FavoritesProvider>
      <PlayerProvider>
        <AppLayout activeView={activeView} onChangeView={setActiveView}>
          {activeView === "favorites" ? <Favorites /> : <Home />}
        </AppLayout>
      </PlayerProvider>
    </FavoritesProvider>
  );
}
