import { useState } from "react";
import { Icon } from "@iconify/react";
import type { Item } from "../../data/sidebar-items";
import { ICONS } from "../../data/icons";

interface Props {
  items: Item[];
  activeView: string;
  onChangeView: (view: string) => void;
}

const labelToView = (label: string) => {
  if (label === "Favoritos") return "favorites";
  return "home";
};

export const Sidebar = ({ items, activeView, onChangeView }: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const onClicked = () => {
    setCollapsed((estadoAnterior) => !estadoAnterior);
  };

  return (
    <div className="sidebar px-2 py-2">
      <aside
        className={`transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
      >
        <Icon
          className="cursor-pointer"
          icon={ICONS.menu}
          width="24"
          height="24"
          onClick={() => onClicked()}
        />
        <ul className="flex flex-col gap-1 mt-4">
          {items.map(({ label, iconName }) => (
            <li
              key={label}
              onClick={() => onChangeView(labelToView(label))}
              className={`flex items-center gap-3 py-2 px-3 cursor-pointer hover:bg-neutral-100 rounded-lg ${
                activeView === labelToView(label) ? "bg-neutral-200" : ""
              }`}
            >
              <Icon icon={iconName} width="24" height="24" />
              {!collapsed && <span>{label}</span>}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};