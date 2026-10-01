import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import type { RecentGame } from "../../dashboard/interfaces/RecentGame";
import {
    StyledGamesCount,
    StyledGamesDate,
    StyledGamesError,
    StyledGamesHeader,
    StyledGamesLogo,
    StyledGamesMatchup,
    StyledGamesPage,
    StyledGamesScore,
    StyledGamesStatus,
    StyledGamesTable,
    StyledGamesTableContainer,
    StyledGamesTeam,
    StyledGamesTitle,
    StyledGamesToolbar,
    StyledGamesVenue,
} from "../styles/Games.style";

type GamesSort = "date-newest" | "date-oldest" | "score-desc" | "score-asc";

export const GamesPage = () => {
    const [games, setGames] = useState<RecentGame[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loadAttempt, setLoadAttempt] = useState(0);
    const [sortBy, setSortBy] = useState<GamesSort>("date-newest");

    useEffect(() => {
        const controller = new AbortController();

        const loadGames = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/games?sortBy=${encodeURIComponent(sortBy)}`, {
                    cache: "no-store",
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Games request failed with status ${response.status}`);
                }

                setGames((await response.json()) as RecentGame[]);
            } catch (fetchError) {
                if (!controller.signal.aborted) {
                    setError(
                        fetchError instanceof Error ? fetchError.message : "Failed to load games"
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        void loadGames();
        return () => controller.abort();
    }, [loadAttempt, sortBy]);

    return (
        <StyledGamesPage>
            <StyledGamesHeader>
                <div>
                    <StyledGamesTitle>Games</StyledGamesTitle>
                    <p>All indexed games</p>
                </div>
                <StyledGamesToolbar>
                    <StyledGamesCount>
                        {isLoading ? "Loading" : `${games.length} games`}
                    </StyledGamesCount>
                    <label>
                        <span>Sort by</span>
                        <select
                            value={sortBy}
                            onChange={event => setSortBy(event.target.value as GamesSort)}
                        >
                            <option value="date-newest">Game date (newest)</option>
                            <option value="date-oldest">Game date (oldest)</option>
                            <option value="score-desc">Total score (high-low)</option>
                            <option value="score-asc">Total score (low-high)</option>
                        </select>
                    </label>
                </StyledGamesToolbar>
            </StyledGamesHeader>

            {error && (
                <StyledGamesStatus role="alert">
                    <StyledGamesError>{error}</StyledGamesError>
                    <button
                        type="button"
                        aria-label="Retry loading games"
                        title="Retry loading games"
                        onClick={() => setLoadAttempt(attempt => attempt + 1)}
                    >
                        <RefreshOutlinedIcon fontSize="small" />
                    </button>
                </StyledGamesStatus>
            )}

            {isLoading && (
                <StyledGamesStatus role="status">
                    <CircularProgress size={18} />
                    Loading games...
                </StyledGamesStatus>
            )}

            {!isLoading && !error && games.length === 0 && (
                <StyledGamesStatus role="status">No indexed games yet.</StyledGamesStatus>
            )}

            {!isLoading && !error && games.length > 0 && (
                <StyledGamesTableContainer>
                    <StyledGamesTable>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Matchup</th>
                                <th>Score</th>
                                <th>Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map(game => (
                                <tr key={game.id}>
                                    <StyledGamesDate>
                                        {formatGameDate(game.gameDate)}
                                    </StyledGamesDate>
                                    <td>
                                        <StyledGamesMatchup>
                                            <StyledGamesTeam $align="right">
                                                {game.awayTeamLogoUrl && (
                                                    <StyledGamesLogo
                                                        src={game.awayTeamLogoUrl}
                                                        alt=""
                                                    />
                                                )}
                                                <span>{game.awayTeamAbbreviation}</span>
                                            </StyledGamesTeam>
                                            <span>@</span>
                                            <StyledGamesTeam $align="left">
                                                {game.homeTeamLogoUrl && (
                                                    <StyledGamesLogo
                                                        src={game.homeTeamLogoUrl}
                                                        alt=""
                                                    />
                                                )}
                                                <span>{game.homeTeamAbbreviation}</span>
                                            </StyledGamesTeam>
                                        </StyledGamesMatchup>
                                    </td>
                                    <StyledGamesScore>
                                        {game.awayScore} - {game.homeScore}
                                        {game.finalPeriodType && game.finalPeriodType !== "REG" && (
                                            <small>{game.finalPeriodType}</small>
                                        )}
                                    </StyledGamesScore>
                                    <StyledGamesVenue>
                                        {[game.venueName, game.venueLocation]
                                            .filter(Boolean)
                                            .join(", ") || "—"}
                                    </StyledGamesVenue>
                                </tr>
                            ))}
                        </tbody>
                    </StyledGamesTable>
                </StyledGamesTableContainer>
            )}
        </StyledGamesPage>
    );
};

const formatGameDate = (gameDate: string): string => {
    const [year, month, day] = gameDate.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
