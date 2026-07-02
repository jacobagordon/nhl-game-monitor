import {
  BarChart3,
  CalendarDays,
  Flame,
  Home,
  Shield,
  Trophy,
  Users,
} from "lucide-react";
import { NavigationTab } from "./NavigationTab";
import type { NavItem } from "../interfaces/NavItem";

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/", icon: Home },
  { label: "Games", path: "/games", icon: CalendarDays },
  { label: "Calendar", path: "/calendar", icon: CalendarDays },
  { label: "Standings", path: "/standings", icon: Trophy },
  { label: "Teams", path: "/teams", icon: Shield },
  { label: "Players", path: "/players", icon: Users },
  { label: "Stats", path: "/stats", icon: BarChart3 },
  { label: "Streaks", path: "/streaks", icon: Flame },
];

export function NavigationRow() {
  return (
    <nav className="navigation-row">
      {navItems.map(item => (
        <NavigationTab key={item.path} item={item} />
      ))}
    </nav>
  );
}