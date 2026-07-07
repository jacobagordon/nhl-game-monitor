export interface RecentGame {
    id: number;
    gameDate: string;
    gameStartTimeUtc: string;
    venueName?: string | null;
    venueLocation?: string | null;
    finalPeriodType?: string | null;
    awayTeamAbbreviation: string;
    awayTeamFullName?: string | null;
    awayScore: number;
    awayShotsOnGoal: number;
    awayTeamLogoUrl?: string | null;
    homeTeamAbbreviation: string;
    homeTeamFullName?: string | null;
    homeScore: number;
    homeShotsOnGoal: number;
    homeTeamLogoUrl?: string | null;
}
