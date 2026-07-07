export interface RecentGame {
    id: number;
    gameDate: string;
    gameStartTimeUtc: string;
    venueName?: string | null;
    awayTeamAbbreviation: string;
    awayScore: number;
    awayTeamLogoUrl?: string | null;
    homeTeamAbbreviation: string;
    homeScore: number;
    homeTeamLogoUrl?: string | null;
    status: string;
}
