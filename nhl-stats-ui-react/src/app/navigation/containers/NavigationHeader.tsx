import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import { AppLogo } from "../components/AppLogo";
import { NavigationRow } from "../components/NavigationRow";
import {
  StyledNavigationHeader,
  StyledNavigationSettingsButton,
} from "../styles/Navigation.style";

export const NavigationHeader = () => {
  const navigate = useNavigate();

  return (
    <StyledNavigationHeader>
      <AppLogo />
      <NavigationRow />

      <StyledNavigationSettingsButton
        onClick={() => navigate("/infrastructure")}
        aria-label="Open infrastructure status"
        title="Infrastructure"
      >
        <SettingsOutlinedIcon />
      </StyledNavigationSettingsButton>
    </StyledNavigationHeader>
  );
}