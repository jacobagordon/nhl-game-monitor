import { useEffect, useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import ShieldIcon from "@mui/icons-material/Shield";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import CircularProgress from "@mui/material/CircularProgress";
import type { DashboardSummaryResponse } from "../interfaces/DashboardSummaryResponse";
import type { DashboardStat } from "../interfaces/DashboardStat";
import type { RecentGame } from "../interfaces/RecentGame";
import type { TopPerformer } from "../interfaces/TopPerformer";
import { RecentGamesCard } from "./RecentGamesCard";
import { StatSummaryCard } from "./StatSummaryCard";
import { TopPerformersCard } from "./TopPerformersCard";
import {
    StyledDashboardGrid,
    StyledDashboardHeader,
    StyledDashboardPage,
    StyledDashboardSubtitle,
    StyledDashboardTitle,
    StyledBackfillNotice,
    StyledSummaryGrid,
} from "../styles/Dashboard.style";

interface DashboardPageProps {
    summary: DashboardSummaryResponse | null;
    isLoading: boolean;
    error: string | null;
    fetchDashboardSummary: () => void;
    recentGames: RecentGame[];
    isRecentGamesLoading: boolean;
    recentGamesError: string | null;
    fetchRecentGames: () => void;
    topPerformers: TopPerformer[];
    isTopPerformersLoading: boolean;
    topPerformersError: string | null;
    fetchTopPerformers: () => void;
}

export const DashboardPage = ({
    summary,
    isLoading,
    error,
    fetchDashboardSummary,
    recentGames,
    isRecentGamesLoading,
    recentGamesError,
    fetchRecentGames,
    topPerformers,
    isTopPerformersLoading,
    topPerformersError,
    fetchTopPerformers,
}: DashboardPageProps) => {
    const [backfillState, setBackfillState] = useState<"checking" | "active" | "ready">("checking");

    useEffect(() => {
        if (backfillState !== "ready") {
            return;
        }

        fetchDashboardSummary();
        fetchRecentGames();
        fetchTopPerformers();
    }, [backfillState, fetchDashboardSummary, fetchRecentGames, fetchTopPerformers]);

    useEffect(() => {
        const controller = new AbortController();
        let timeoutId: number | undefined;
        let receivedStatus = false;

        const checkStatus = async () => {
            let shouldRetry = false;
            try {
                const response = await fetch("/monitor-api/backfill/status", {
                    cache: "no-store",
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error(`Backfill status request failed: ${response.status}`);
                }

                const status = (await response.json()) as { isBackfilling: boolean };
                receivedStatus = true;
                shouldRetry = status.isBackfilling;
                setBackfillState(status.isBackfilling ? "active" : "ready");
            } catch {
                if (controller.signal.aborted) {
                    return;
                }

                shouldRetry = true;
                if (!receivedStatus) {
                    setBackfillState("ready");
                }
            }

            if (shouldRetry && !controller.signal.aborted) {
                timeoutId = window.setTimeout(() => void checkStatus(), 3000);
            }
        };

        void checkStatus();
        return () => {
            controller.abort();
            if (timeoutId !== undefined) {
                window.clearTimeout(timeoutId);
            }
        };
    }, []);

    const stats: DashboardStat[] = [
        {
            label: "Games Indexed",
            value: backfillState === "ready" ? formatCount(summary?.totalGamesIndexed) : "...",
            subtitle: backfillState === "ready" ? "Boxscores in OpenSearch" : "Updating game data",
            icon: <SportsHockeyIcon />,
        },
        {
            label: "Team Logs",
            value:
                backfillState === "ready" ? formatCount(summary?.totalTeamGameLogsIndexed) : "...",
            subtitle: backfillState === "ready" ? "Team game logs indexed" : "Updating game data",
            icon: <GroupsIcon />,
        },
        {
            label: "Player Logs",
            value:
                backfillState === "ready"
                    ? formatCount(summary?.totalPlayerGameLogsIndexed)
                    : "...",
            subtitle: backfillState === "ready" ? "Skater game logs indexed" : "Updating game data",
            icon: <PersonIcon />,
        },
        {
            label: "Goalie Logs",
            value:
                backfillState === "ready"
                    ? formatCount(summary?.totalGoalieGameLogsIndexed)
                    : "...",
            subtitle: backfillState === "ready" ? "Goalie game logs indexed" : "Updating game data",
            icon: <ShieldIcon />,
        },
    ];

    return (
        <StyledDashboardPage>
            <StyledDashboardHeader>
                <StyledDashboardTitle>Dashboard</StyledDashboardTitle>

                <StyledDashboardSubtitle>
                    {error ?? (isLoading ? "Loading dashboard..." : "NHL data pipeline overview")}
                </StyledDashboardSubtitle>
            </StyledDashboardHeader>

            {backfillState !== "ready" && (
                <StyledBackfillNotice role="status" aria-live="polite">
                    <CircularProgress size={18} sx={{ color: "#e2ac45", flexShrink: 0 }} />
                    <div>
                        <strong>
                            {backfillState === "checking"
                                ? "Checking the latest game data"
                                : "Fetching the latest games"}
                        </strong>
                        {backfillState === "checking"
                            ? "Preparing current scores and stats..."
                            : "New games are being added. Scores and stats may be incomplete until this finishes."}
                    </div>
                </StyledBackfillNotice>
            )}

            <StyledSummaryGrid>
                {stats.map(stat => (
                    <StatSummaryCard key={stat.label} stat={stat} />
                ))}
            </StyledSummaryGrid>

            <StyledDashboardGrid>
                <RecentGamesCard
                    games={recentGames}
                    isLoading={isRecentGamesLoading || backfillState !== "ready"}
                    error={recentGamesError}
                />

                <TopPerformersCard
                    performers={topPerformers}
                    isLoading={isTopPerformersLoading || backfillState !== "ready"}
                    error={topPerformersError}
                />
            </StyledDashboardGrid>
        </StyledDashboardPage>
    );
};

const formatCount = (value: number | undefined): string => {
    if (value === undefined) {
        return "—";
    }

    return value.toLocaleString();
};
