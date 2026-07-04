import {
    StyledAppLogo,
    StyledAppLogoPrimary,
    StyledAppLogoSecondary,
} from "../styles/Navigation.style";

export const AppLogo = () => {
    return (
        <StyledAppLogo>
            <StyledAppLogoPrimary>NHL</StyledAppLogoPrimary>
            <StyledAppLogoSecondary>Game Monitor</StyledAppLogoSecondary>
        </StyledAppLogo>
    );
};
