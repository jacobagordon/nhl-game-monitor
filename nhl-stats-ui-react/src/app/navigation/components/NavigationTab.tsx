import { NavLink } from "react-router-dom";
import type { NavItem } from "../interfaces/NavItem";

interface NavigationTabProps {
  item: NavItem;
}

export function NavigationTab({ item }: NavigationTabProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        isActive ? "navigation-tab navigation-tab-active" : "navigation-tab"
      }
    >
      <Icon size={17} strokeWidth={1.8} />
      <span>{item.label}</span>
    </NavLink>
  );
}