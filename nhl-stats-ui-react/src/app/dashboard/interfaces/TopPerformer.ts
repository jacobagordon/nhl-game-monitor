export type TopPerformerCategory = "SKATER" | "GOALIE";

export interface TopPerformer {
    category: TopPerformerCategory;

    playerId: number;
    playerFullName: string;
    position: string;

    teamAbbreviation: string;
    teamLogoUrl?: string | null;
    opponentTeamAbbreviation: string;

    gameDate: string;

    goals?: number | null;
    assists?: number | null;
    points?: number | null;

    saves?: number | null;
    shotsAgainst?: number | null;
    savePercentage?: number | null;
}
