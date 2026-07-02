import "../styles/navigation.css";
import { AppLogo } from "../components/AppLogo";
import { NavigationRow } from "../components/NavigationRow";

export function NavigationHeader() {
  return (
    <header className="navigation-header">
      <AppLogo />
      <NavigationRow />
    </header>
  );
}