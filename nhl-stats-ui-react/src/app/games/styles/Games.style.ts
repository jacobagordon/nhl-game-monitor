import { styled } from "@mui/material/styles";

export const StyledGamesPage = styled("main")`
    min-height: calc(100vh - 72px);
    padding: 32px;

    @media (max-width: 720px) {
        padding: 16px;
    }
`;

export const StyledGamesHeader = styled("header")`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;

    h1 {
        margin: 0;
        color: #f8fbff;
        font-size: 28px;
        font-weight: 700;
    }

    p {
        margin: 8px 0 0;
        color: #8f9baa;
        font-size: 14px;
    }

    @media (max-width: 520px) {
        align-items: flex-start;
        flex-direction: column;
    }
`;

export const StyledGamesTitle = styled("h1")``;

export const StyledGamesCount = styled("span")`
    color: #91a1b4;
    font-size: 13px;
    font-variant-numeric: tabular-nums;
`;

export const StyledGamesToolbar = styled("div")`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;

    label {
        display: flex;
        align-items: center;
        gap: 9px;
        color: #91a1b4;
        font-size: 12px;
    }

    select {
        min-height: 36px;
        max-width: 100%;
        padding: 0 30px 0 10px;
        border: 1px solid rgba(113, 139, 165, 0.35);
        border-radius: 4px;
        background: #101820;
        color: #e3eaf2;
        font: inherit;
        cursor: pointer;
    }

    option {
        background: #101820;
        color: #e3eaf2;
    }

    @media (max-width: 520px) {
        width: 100%;
        align-items: flex-start;
        flex-direction: column;
        gap: 10px;

        label {
            width: 100%;
            align-items: flex-start;
            flex-direction: column;
        }

        select {
            width: 100%;
        }
    }
`;

export const StyledGamesTableContainer = styled("div")`
    overflow-x: auto;
    border-top: 1px solid rgba(113, 139, 165, 0.3);
`;

export const StyledGamesTable = styled("table")`
    width: 100%;
    border-collapse: collapse;
    color: #dce5f5;
    font-size: 14px;

    th {
        padding: 12px 14px;
        color: #8999aa;
        font-size: 11px;
        font-weight: 700;
        text-align: left;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(113, 139, 165, 0.22);
    }

    td {
        padding: 12px 14px;
        border-bottom: 1px solid rgba(113, 139, 165, 0.14);
        vertical-align: middle;
    }

    tbody tr:hover {
        background: rgba(255, 255, 255, 0.025);
    }

    @media (max-width: 720px) {
        min-width: 540px;
    }
`;

export const StyledGamesDate = styled("td")`
    width: 130px;
    color: #9eacba;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
`;

export const StyledGamesMatchup = styled("div")`
    display: grid;
    grid-template-columns: minmax(88px, 1fr) 18px minmax(88px, 1fr);
    align-items: center;
    gap: 10px;
    color: #76889a;
`;

export const StyledGamesTeam = styled("div")<{ $align: "left" | "right" }>`
    display: flex;
    align-items: center;
    justify-content: ${({ $align }) => ($align === "right" ? "flex-end" : "flex-start")};
    gap: 8px;
    color: #e3eaf2;
    font-weight: 700;
`;

export const StyledGamesLogo = styled("img")`
    width: 26px;
    height: 26px;
    flex: 0 0 auto;
    object-fit: contain;
`;

export const StyledGamesScore = styled("td")`
    width: 110px;
    color: #f4f7fa;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;

    small {
        margin-left: 8px;
        color: #8999aa;
        font-size: 10px;
        text-transform: uppercase;
    }
`;

export const StyledGamesVenue = styled("td")`
    color: #8999aa;
    font-size: 12px;
`;

export const StyledGamesStatus = styled("div")`
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    color: #9eacba;
    font-size: 14px;

    button {
        display: grid;
        place-items: center;
        width: 34px;
        height: 34px;
        border: 1px solid rgba(113, 139, 165, 0.3);
        border-radius: 4px;
        background: transparent;
        color: #dce5f5;
        cursor: pointer;
    }

    button:hover {
        background: rgba(255, 255, 255, 0.06);
    }
`;

export const StyledGamesError = styled("span")`
    color: #ff9d9d;
`;
