import { DashboardCard } from "./DashboardCard";
import type { RecentGame } from "../interfaces/RecentGame";
import {
    StyledRecentGameBackdrop,
    StyledRecentGameBackdropLogo,
    StyledRecentGameContent,
    StyledRecentGameDate,
    StyledRecentGameMatchup,
    StyledRecentGameMeta,
    StyledRecentGameRow,
    StyledRecentGameScore,
    StyledRecentGameStatus,
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
                    {games.map(game => (
                        <StyledRecentGameRow key={game.id}>
                            <StyledRecentGameBackdrop>
                                {game.awayTeamLogoUrl && (
                                    <StyledRecentGameBackdropLogo
                                        $side="left"
                                        src={game.awayTeamLogoUrl}
                                        alt=""
                                    />
                                )}

                                {game.homeTeamLogoUrl && (
                                    <StyledRecentGameBackdropLogo
                                        $side="right"
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

                                    <StyledRecentGameStatus>{game.status}</StyledRecentGameStatus>
                                </StyledRecentGameMeta>

                                <StyledRecentGameMatchup>
                                    <StyledRecentGameTeam $align="right">
                                        <span>{game.awayTeamAbbreviation}</span>

                                        {game.awayTeamLogoUrl && (
                                            <StyledTeamLogo
                                                src={game.awayTeamLogoUrl}
                                                alt={game.awayTeamAbbreviation}
                                            />
                                        )}
                                    </StyledRecentGameTeam>

                                    <StyledRecentGameScore>
                                        <span>{game.awayScore}</span>
                                        <span>-</span>
                                        <span>{game.homeScore}</span>
                                    </StyledRecentGameScore>

                                    <StyledRecentGameTeam $align="left">
                                        {game.homeTeamLogoUrl && (
                                            <StyledTeamLogo
                                                src={game.homeTeamLogoUrl}
                                                alt={game.homeTeamAbbreviation}
                                            />
                                        )}

                                        <span>{game.homeTeamAbbreviation}</span>
                                    </StyledRecentGameTeam>
                                </StyledRecentGameMatchup>

                                <StyledRecentGameVenue>
                                    {formatGameTime(game.gameStartTimeUtc)}
                                    {game.venueName ? ` · ${game.venueName}` : ""}
                                </StyledRecentGameVenue>
                            </StyledRecentGameContent>
                        </StyledRecentGameRow>
                    ))}
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
