import { ICONS } from "./icons";


export interface Item {
  label: string;
  iconName: string;
}

export const sidebarItems: Item[] = [
  {
    label: "Inicio",
    iconName: ICONS.home,
  },
  {
    label: "Favoritos",
    iconName: ICONS.favorite,
  },
];
