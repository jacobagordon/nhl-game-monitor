import { styled } from "@mui/material/styles";

export const StyledInfrastructurePage = styled("main")`
    min-height: calc(100vh - 72px);
    padding: 32px;
    background: #05070a;
    color: #f5f7fa;
`;

export const StyledInfrastructureHeader = styled("section")`
    margin-bottom: 24px;
`;

export const StyledInfrastructureTitle = styled("h1")`
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0.02em;
`;

export const StyledInfrastructureSubtitle = styled("p")`
    margin: 8px 0 0;
    color: #8f9baa;
    font-size: 14px;
`;

export const StyledInfrastructureGrid = styled("section")`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
`;

export const StyledInfrastructureCard = styled("article")<{ status: string }>`
    padding: 18px;
    border: 1px solid
        ${({ status }) => (status === "UP" ? "rgba(34, 197, 94, 0.45)" : "rgba(239, 68, 68, 0.45)")};
    border-radius: 12px;
    background: #0b0f14;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.02);
`;

export const StyledInfrastructureCardHeader = styled("div")`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
`;

export const StyledInfrastructureCardTitle = styled("h2")`
    margin: 0;
    font-size: 16px;
    font-weight: 650;
`;

export const StyledStatusBadge = styled("span")<{ status: string }>`
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: ${({ status }) => (status === "UP" ? "#86efac" : "#fca5a5")};
    background: ${({ status }) =>
      status === "UP" ? "rgba(34, 197, 94, 0.12)" : "rgba(239, 68, 68, 0.12)"};
    border: 1px solid
        ${({ status }) => (status === "UP" ? "rgba(34, 197, 94, 0.28)" : "rgba(239, 68, 68, 0.28)")};
`;

export const StyledDetailsList = styled("dl")`
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 8px 12px;
    margin: 0;
    color: #cbd5e1;
    font-size: 13px;
`;

export const StyledDetailKey = styled("dt")`
    color: #7d8a99;
`;

export const StyledDetailValue = styled("dd")`
    margin: 0;
    word-break: break-word;
`;

export const StyledEmptyDetails = styled("p")`
    margin: 0;
    color: #7d8a99;
    font-size: 13px;
`;
