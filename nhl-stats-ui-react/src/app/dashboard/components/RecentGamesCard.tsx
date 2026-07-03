import { DashboardCard } from "./DashboardCard";
import type { RecentGame } from "../interfaces/RecentGame";
import { StyledRecentGameDate, StyledRecentGameMatchup, StyledRecentGameRow, StyledRecentGamesList, StyledRecentGameStatus } from "../styles/Dashboard.style";

const recentGames: RecentGame[] = [
  {
    id: 1,
    gameDate: "May 14, 2025",
    awayTeamAbbreviation: "COL",
    awayScore: 5,
    homeTeamAbbreviation: "ARI",
    homeScore: 2,
    status: "FINAL",
  },
  {
    id: 2,
    gameDate: "May 14, 2025",
    awayTeamAbbreviation: "DAL",
    awayScore: 3,
    homeTeamAbbreviation: "NSH",
    homeScore: 1,
    status: "FINAL",
  },
  {
    id: 3,
    gameDate: "May 13, 2025",
    awayTeamAbbreviation: "TOR",
    awayScore: 4,
    homeTeamAbbreviation: "OTT",
    homeScore: 2,
    status: "FINAL",
  },
];

export const RecentGamesCard = () => {
  return (
    <DashboardCard title="Recent Games">
      <StyledRecentGamesList>
        {recentGames.map(game => (
          <StyledRecentGameRow key={game.id}>
            <StyledRecentGameDate>{game.gameDate}</StyledRecentGameDate>

            <StyledRecentGameMatchup>
              <span>{game.awayTeamAbbreviation}</span>
              <strong>{game.awayScore}</strong>
              <span>{game.homeScore}</span>
              <span>{game.homeTeamAbbreviation}</span>
            </StyledRecentGameMatchup>

            <StyledRecentGameStatus>{game.status}</StyledRecentGameStatus>
          </StyledRecentGameRow>
        ))}
      </StyledRecentGamesList>
    </DashboardCard>
  );
}