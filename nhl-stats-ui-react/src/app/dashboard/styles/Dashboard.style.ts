import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const BaseCardStyles = `
  border: 1px solid rgba(71, 104, 138, 0.35);
  border-radius: 16px;
  background:
    linear-gradient(180deg, rgba(8, 14, 22, 0.98), rgba(4, 8, 13, 0.98));
  box-shadow:
    0 18px 55px rgba(0, 0, 0, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
`;

export const StyledDashboardPage = styled("main")`
    min-height: calc(100vh - 72px);
    padding: 32px;

    @media (max-width: 720px) {
        padding: 16px;
    }
`;

export const StyledDashboardHeader = styled("section")`
    margin-bottom: 24px;
`;

export const StyledDashboardTitle = styled("h1")`
    margin: 0;
    color: #f8fbff;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0.02em;
`;

export const StyledDashboardSubtitle = styled("p")`
    margin: 8px 0 0;
    color: #8f9baa;
    font-size: 14px;
`;

export const StyledBackfillNotice = styled("aside")`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
    padding: 14px 16px;
    border: 1px solid rgba(226, 172, 69, 0.3);
    border-left: 3px solid #e2ac45;
    border-radius: 8px;
    background: rgba(113, 76, 13, 0.14);
    color: #f2e5c9;
    font-size: 14px;
    line-height: 1.45;

    strong {
        display: block;
        margin-bottom: 2px;
        color: #f4d596;
        font-weight: 700;
    }
`;

export const StyledSummaryGrid = styled("section")`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 18px;

    @media (max-width: 1100px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
    }
`;

export const StyledStatSummaryCard = styled("div")`
    ${BaseCardStyles}

    display: flex;
    align-items: center;
    gap: 16px;
    min-height: 112px;
    padding: 20px;
`;

export const StyledStatSummaryIcon = styled("div")`
    display: grid;
    place-items: center;
    flex-shrink: 0;

    width: 42px;
    height: 42px;
    border-radius: 14px;
    border: 1px solid rgba(22, 139, 255, 0.6);
    background: radial-gradient(circle, rgba(22, 139, 255, 0.22), transparent 60%);
    box-shadow: 0 0 24px rgba(22, 139, 255, 0.18);

    color: #4da6ff;
    font-size: 22px;

    svg {
        width: 22px;
        height: 22px;
    }
`;

export const StyledStatSummaryValue = styled("div")`
    color: #f8fbff;
    font-size: 26px;
    font-weight: 850;
`;

export const StyledStatSummaryLabel = styled("div")`
    margin-top: 3px;
    color: #c3cad8;
    font-size: 13px;
    font-weight: 700;
`;

export const StyledStatSummarySubtitle = styled("div")`
    margin-top: 4px;
    color: #697386;
    font-size: 12px;
`;

export const StyledDashboardGrid = styled("section")`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;

    @media (max-width: 1100px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
    }
`;

export const StyledDashboardCard = styled("section")`
    ${BaseCardStyles}

    padding: 20px;
`;

export const StyledDashboardCardHeader = styled("div")`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(71, 104, 138, 0.24);

    h2 {
        margin: 0;
        color: #dce5f5;
        font-size: 15px;
        font-weight: 850;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }
`;

export const StyledDashboardCardBody = styled("div")``;

export const StyledDashboardCardAction = styled(Button)`
    min-width: unset;
    padding: 0;

    border: 0;
    background: transparent;
    color: #168bff;

    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    text-transform: none;

    &:hover {
        background: transparent;
        color: #4da6ff;
    }
`;

export const StyledRecentGamesList = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const StyledRecentGameRow = styled("div")`
    position: relative;
    overflow: hidden;

    border-radius: 14px;
    border: 1px solid rgba(71, 104, 138, 0.2);
    background: rgba(255, 255, 255, 0.015);

    padding: 14px 18px;
`;

export const StyledRecentGameBackdrop = styled("div")`
    position: absolute;
    inset: 0;
    z-index: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
`;

export const StyledRecentGameBackdropLogo = styled("img")<{
    $side: "left" | "right";
    $isWinner: boolean;
}>`
    width: 280px;
    height: 280px;
    object-fit: contain;
    flex-shrink: 0;
    opacity: ${({ $isWinner }) => ($isWinner ? 0.38 : 0.07)};
    filter: ${({ $isWinner }) =>
        $isWinner ? "drop-shadow(0 0 30px rgba(22, 139, 255, 0.65))" : "none"};
    transform: ${({ $side }) => ($side === "left" ? "translateX(-30%)" : "translateX(30%)")};
`;

export const StyledRecentGameContent = styled("div")`
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const StyledRecentGameMeta = styled("div")`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

export const StyledRecentGameDate = styled("span")`
    color: #7f8898;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
`;

export const StyledRecentGameMatchup = styled("div")`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 16px;
`;

export const StyledRecentGameTeam = styled("div")<{
    $align: "left" | "right";
    $isWinner?: boolean;
}>`
    display: flex;
    align-items: center;
    justify-content: ${({ $align }) => ($align === "right" ? "flex-end" : "flex-start")};
    gap: 10px;

    color: ${({ $isWinner }) => ($isWinner ? "#f8fbff" : "#8a93a3")};
    font-size: 14px;
    font-weight: ${({ $isWinner }) => ($isWinner ? 850 : 700)};
    letter-spacing: 0.04em;
`;

export const StyledTeamLogo = styled("img")<{ $isWinner: boolean }>`
    width: 36px;
    height: 36px;
    object-fit: contain;
    flex-shrink: 0;
    opacity: ${({ $isWinner }) => ($isWinner ? 1 : 0.55)};
`;

export const StyledRecentGameScore = styled("div")`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 21px;
    font-weight: 900;
`;

export const StyledRecentGameScoreValue = styled("span")<{ $isWinner?: boolean }>`
    color: ${({ $isWinner }) => ($isWinner ? "#168bff" : "#f8fbff")};
`;

export const StyledRecentGamePeriodType = styled("span")`
    color: #7f8898;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
`;

export const StyledRecentGameStatRow = styled("div")`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 16px;

    color: #697386;
    font-size: 12px;
    font-weight: 700;
`;

export const StyledRecentGameStatValue = styled("span")<{ $align: "left" | "right" }>`
    text-align: ${({ $align }) => $align};
`;

export const StyledRecentGameStatLabel = styled("span")`
    color: #4d5566;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-align: center;
`;

export const StyledRecentGameVenue = styled("div")`
    color: #697386;
    font-size: 12px;
`;

export const StyledRecentGamesEmpty = styled("div")`
    padding: 12px 0;
    color: #8f9baa;
    font-size: 13px;
`;

export const StyledPerformersList = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const StyledPerformerGroup = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const StyledPerformerGroupLabel = styled("div")`
    color: #7f8898;
    font-size: 12px;
    font-weight: 850;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const StyledPerformerRow = styled("div")`
    display: flex;
    align-items: center;
    gap: 12px;

    border-radius: 12px;
    border: 1px solid rgba(71, 104, 138, 0.2);
    background: rgba(255, 255, 255, 0.015);

    padding: 10px 14px;
`;

export const StyledPerformerLogo = styled("img")`
    width: 34px;
    height: 34px;
    object-fit: contain;
    flex-shrink: 0;
`;

export const StyledPerformerInfo = styled("div")`
    flex: 1;
    min-width: 0;

    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const StyledPerformerName = styled("div")`
    color: #dce5f5;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.02em;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const StyledPerformerMeta = styled("div")`
    color: #697386;
    font-size: 11px;
`;

export const StyledPerformerStat = styled("div")`
    flex-shrink: 0;
    text-align: right;
`;

export const StyledPerformerStatValue = styled("div")`
    color: #f8fbff;
    font-size: 16px;
    font-weight: 900;
`;

export const StyledPerformerStatLabel = styled("div")`
    color: #697386;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
`;

export const StyledDataStatusLayout = styled("div")`
    display: grid;
    grid-template-columns: 160px 1fr;
    align-items: center;
    gap: 26px;

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
    }
`;

export const StyledHealthRing = styled("div")`
    display: grid;
    place-items: center;
    width: 136px;
    height: 136px;
    border-radius: 50%;
    border: 12px solid #4ccb5a;
    box-shadow:
        0 0 24px rgba(76, 203, 90, 0.22),
        inset 0 0 24px rgba(76, 203, 90, 0.08);

    span {
        color: #f8fbff;
        font-size: 30px;
        font-weight: 900;
    }

    small {
        margin-top: -38px;
        color: #4ccb5a;
        font-size: 13px;
        font-weight: 800;
    }
`;

export const StyledHealthList = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 14px;

    div {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        color: #a6afbf;
    }

    strong {
        color: #4ccb5a;
    }
`;
