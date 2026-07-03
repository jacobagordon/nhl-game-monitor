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
  padding: 24px;

  @media (max-width: 720px) {
    padding: 16px;
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
  width: 42px;
  height: 42px;
  border-radius: 14px;
  border: 1px solid rgba(22, 139, 255, 0.6);
  background: radial-gradient(circle, rgba(22, 139, 255, 0.22), transparent 60%);
  box-shadow: 0 0 24px rgba(22, 139, 255, 0.18);
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
`;

export const StyledRecentGameRow = styled("div")`
  display: grid;
  grid-template-columns: 110px 1fr 64px;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(71, 104, 138, 0.16);

  &:last-child {
    border-bottom: 0;
  }
`;

export const StyledRecentGameDate = styled("span")`
  color: #7f8898;
  font-size: 13px;
`;

export const StyledRecentGameMatchup = styled("div")`
  display: grid;
  grid-template-columns: 1fr 32px 32px 1fr;
  align-items: center;
  gap: 10px;
  color: #dce5f5;
  font-weight: 700;
`;

export const StyledRecentGameStatus = styled("span")`
  color: #168bff;
  font-size: 12px;
  font-weight: 850;
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
