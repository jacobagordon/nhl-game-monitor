import { DashboardCard } from "./DashboardCard";
import type { RecentGame } from "../interfaces/RecentGame";
import {
    StyledRecentGameBackdrop,
    StyledRecentGameBackdropLogo,
    StyledRecentGameContent,
    StyledRecentGameDate,
    StyledRecentGameMatchup,
    StyledRecentGameMeta,
    StyledRecentGamePeriodType,
    StyledRecentGameRow,
    StyledRecentGameScore,
    StyledRecentGameScoreValue,
    StyledRecentGameStatLabel,
    StyledRecentGameStatRow,
    StyledRecentGameStatValue,
    StyledRecentGameTeam,
    StyledRecentGameVenue,
    StyledRecentGamesEmpty,
    StyledRecentGamesList,
    StyledTeamLogo,
} from "../styles/Dashboard.style";

interface RecentGamesCardProps {
    games: RecentGame[];
    isLoading: boolean;
    error: string | null;
}

export const RecentGamesCard = ({ games, isLoading, error }: RecentGamesCardProps) => {
    return (
        <DashboardCard title="Recent Games">
            {error && <StyledRecentGamesEmpty>{error}</StyledRecentGamesEmpty>}

            {!error && isLoading && (
                <StyledRecentGamesEmpty>Loading recent games...</StyledRecentGamesEmpty>
            )}

            {!error && !isLoading && games.length === 0 && (
                <StyledRecentGamesEmpty>No recent games</StyledRecentGamesEmpty>
            )}

            {!error && !isLoading && games.length > 0 && (
                <StyledRecentGamesList>
                    {games.map(game => {
                        const homeIsWinner = game.homeScore > game.awayScore;
                        const awayIsWinner = game.awayScore > game.homeScore;

                        return (
                            <StyledRecentGameRow key={game.id}>
                                <StyledRecentGameBackdrop>
                                    {game.awayTeamLogoUrl && (
                                        <StyledRecentGameBackdropLogo
                                            $side="left"
                                            $isWinner={awayIsWinner}
                                            src={game.awayTeamLogoUrl}
                                            alt=""
                                        />
                                    )}

                                    {game.homeTeamLogoUrl && (
                                        <StyledRecentGameBackdropLogo
                                            $side="right"
                                            $isWinner={homeIsWinner}
                                            src={game.homeTeamLogoUrl}
                                            alt=""
                                        />
                                    )}
                                </StyledRecentGameBackdrop>

                                <StyledRecentGameContent>
                                    <StyledRecentGameMeta>
                                        <StyledRecentGameDate>
                                            {formatGameDate(game.gameDate)}
                                        </StyledRecentGameDate>

                                        {game.finalPeriodType && (
                                            <StyledRecentGamePeriodType>
                                                {game.finalPeriodType}
                                            </StyledRecentGamePeriodType>
                                        )}
                                    </StyledRecentGameMeta>

                                    <StyledRecentGameMatchup>
                                        <StyledRecentGameTeam $align="right" $isWinner={awayIsWinner}>
                                            <span>{game.awayTeamFullName ?? game.awayTeamAbbreviation}</span>

                                            {game.awayTeamLogoUrl && (
                                                <StyledTeamLogo
                                                    $isWinner={awayIsWinner}
                                                    src={game.awayTeamLogoUrl}
                                                    alt={game.awayTeamAbbreviation}
                                                />
                                            )}
                                        </StyledRecentGameTeam>

                                        <StyledRecentGameScore>
                                            <StyledRecentGameScoreValue $isWinner={awayIsWinner}>
                                                {game.awayScore}
                                            </StyledRecentGameScoreValue>
                                            <span>-</span>
                                            <StyledRecentGameScoreValue $isWinner={homeIsWinner}>
                                                {game.homeScore}
                                            </StyledRecentGameScoreValue>
                                        </StyledRecentGameScore>

                                        <StyledRecentGameTeam $align="left" $isWinner={homeIsWinner}>
                                            {game.homeTeamLogoUrl && (
                                                <StyledTeamLogo
                                                    $isWinner={homeIsWinner}
                                                    src={game.homeTeamLogoUrl}
                                                    alt={game.homeTeamAbbreviation}
                                                />
                                            )}

                                            <span>{game.homeTeamFullName ?? game.homeTeamAbbreviation}</span>
                                        </StyledRecentGameTeam>
                                    </StyledRecentGameMatchup>

                                    <StyledRecentGameStatRow>
                                        <StyledRecentGameStatValue $align="right">
                                            {game.awayShotsOnGoal}
                                        </StyledRecentGameStatValue>

                                        <StyledRecentGameStatLabel>SOG</StyledRecentGameStatLabel>

                                        <StyledRecentGameStatValue $align="left">
                                            {game.homeShotsOnGoal}
                                        </StyledRecentGameStatValue>
                                    </StyledRecentGameStatRow>

                                    <StyledRecentGameVenue>
                                        {formatGameTime(game.gameStartTimeUtc)}
                                        {formatVenue(game.venueName, game.venueLocation)}
                                    </StyledRecentGameVenue>
                                </StyledRecentGameContent>
                            </StyledRecentGameRow>
                        );
                    })}
                </StyledRecentGamesList>
            )}
        </DashboardCard>
    );
};

const formatGameDate = (gameDate: string): string => {
    const [year, month, day] = gameDate.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });
};

const formatGameTime = (gameStartTimeUtc: string): string =>
    new Date(gameStartTimeUtc).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
    });

const formatVenue = (venueName?: string | null, venueLocation?: string | null): string => {
    const parts = [venueName, venueLocation].filter(Boolean);

    return parts.length > 0 ? ` · ${parts.join(", ")}` : "";
};
