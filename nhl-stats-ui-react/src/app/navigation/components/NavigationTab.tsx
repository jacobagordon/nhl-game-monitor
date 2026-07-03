import type { NavItem } from "../interfaces/NavItem";
import { StyledNavigationTabLink } from "../styles/Navigation.style";

interface NavigationTabProps {
  item: NavItem;
}

export const NavigationTab = ({ item }: NavigationTabProps) => {
  const Icon = item.icon;

  return (
    <StyledNavigationTabLink to={item.path}>
      <Icon />
      <span>{item.label}</span>
    </StyledNavigationTabLink>
  );
};
