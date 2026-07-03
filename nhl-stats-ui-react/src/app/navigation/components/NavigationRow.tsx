import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SportsHockeyOutlinedIcon from "@mui/icons-material/SportsHockeyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SportsOutlinedIcon from "@mui/icons-material/SportsOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { NavigationTab } from "./NavigationTab";
import type { NavItem } from "../interfaces/NavItem";
import { StyledNavigationRow } from "../styles/Navigation.style";

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/", icon: DashboardOutlinedIcon },
  { label: "Games", path: "/games", icon: SportsHockeyOutlinedIcon },
  { label: "Calendar", path: "/calendar", icon: CalendarMonthOutlinedIcon },
  { label: "Standings", path: "/standings", icon: EmojiEventsOutlinedIcon },
  { label: "Teams", path: "/teams", icon: ShieldOutlinedIcon },
  { label: "Players", path: "/players", icon: PersonOutlineOutlinedIcon },
  { label: "Goalies", path: "/goalies", icon: SportsOutlinedIcon },
  { label: "Stats", path: "/stats", icon: BarChartOutlinedIcon },
  { label: "Streaks", path: "/streaks", icon: TrendingUpOutlinedIcon },
];

export const NavigationRow = () => {
  return (
    <StyledNavigationRow>
      {navItems.map(item => (
        <NavigationTab key={item.path} item={item} />
      ))}
    </StyledNavigationRow>
  );
}