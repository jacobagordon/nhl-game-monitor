export interface RecentGame {
  id: number;
  gameDate: string;
  awayTeamAbbreviation: string;
  awayScore: number;
  awayTeamLogoUrl?: string;
  homeTeamAbbreviation: string;
  homeScore: number;
  homeTeamLogoUrl?: string;
  status: string;
}