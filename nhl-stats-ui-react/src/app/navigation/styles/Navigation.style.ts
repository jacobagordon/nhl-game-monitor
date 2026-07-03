import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

export const StyledNavigationHeader = styled("header")`
  position: sticky;
  top: 0;
  z-index: 20;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;

  min-height: 72px;
  padding: 0 24px;

  border-bottom: 1px solid rgba(71, 104, 138, 0.3);
  background: linear-gradient(180deg, rgba(4, 8, 13, 0.98), rgba(2, 5, 9, 0.98));
  box-shadow:
    0 18px 50px rgba(0, 0, 0, 0.55),
    inset 0 -1px 0 rgba(0, 136, 255, 0.1);

  backdrop-filter: blur(18px);
`;

export const StyledAppLogo = styled("div")`
  display: flex;
  align-items: baseline;
  gap: 10px;
  justify-self: start;

  min-width: max-content;
  text-transform: uppercase;
`;

export const StyledAppLogoPrimary = styled("div")`
  color: #f8fbff;
  font-size: 26px;
  font-weight: 950;
  font-style: italic;
  letter-spacing: 0.04em;
  line-height: 1;
`;

export const StyledAppLogoSecondary = styled("div")`
  color: #a3aab8;
  font-size: 16px;
  font-weight: 500;
  font-style: italic;
  letter-spacing: 0.12em;
  line-height: 1;
`;

export const StyledNavigationRow = styled("nav")`
  grid-column: 2;

  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 10px;

  height: 100%;
`;

export const StyledNavigationTabLink = styled(NavLink)`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  min-width: 104px;
  height: 72px;
  padding: 0 16px;

  color: #8d96a8;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;

  border-left: 1px solid transparent;
  border-right: 1px solid transparent;

  transition:
    color 160ms ease,
    background 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;

  &::after {
    content: "";
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: 0;

    height: 2px;
    border-radius: 999px;
    background: transparent;

    transition:
      background 160ms ease,
      box-shadow 160ms ease;
  }

  &:hover {
    color: #f8fbff;
    background: rgba(255, 255, 255, 0.035);
  }

  &.active {
    color: #ffffff;
    background: linear-gradient(180deg, rgba(0, 116, 255, 0.16), rgba(0, 116, 255, 0.04));
    border-left-color: rgba(0, 136, 255, 0.18);
    border-right-color: rgba(0, 136, 255, 0.18);
    box-shadow:
      inset 0 1px 0 rgba(96, 177, 255, 0.25),
      0 0 24px rgba(0, 116, 255, 0.18);
  }

  &.active::after {
    background: #168bff;
    box-shadow:
      0 0 10px rgba(22, 139, 255, 0.95),
      0 0 22px rgba(22, 139, 255, 0.55);
  }

  & svg {
    color: currentColor;
    font-size: 19px;
  }
`;

export const StyledNavigationSettingsButton = styled(IconButton)`
  justify-self: end;

  width: 42px;
  height: 42px;

  border: 1px solid rgba(71, 104, 138, 0.45);
  border-radius: 12px;

  color: #8d96a8;
  background: linear-gradient(180deg, rgba(9, 15, 24, 0.98), rgba(4, 8, 13, 0.98));

  transition:
    color 160ms ease,
    border-color 160ms ease,
    background 160ms ease,
    box-shadow 160ms ease;

  &:hover {
    color: #f8fbff;
    border-color: rgba(22, 139, 255, 0.72);
    background: linear-gradient(180deg, rgba(12, 22, 36, 0.98), rgba(4, 10, 18, 0.98));
    box-shadow:
      0 0 18px rgba(22, 139, 255, 0.2),
      inset 0 1px 0 rgba(96, 177, 255, 0.2);
  }
`;
