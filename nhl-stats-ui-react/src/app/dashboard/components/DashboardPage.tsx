import { useEffect } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import ShieldIcon from "@mui/icons-material/Shield";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
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
    useEffect(() => {
        fetchDashboardSummary();
        fetchRecentGames();
        fetchTopPerformers();
    }, [fetchDashboardSummary, fetchRecentGames, fetchTopPerformers]);

    const stats: DashboardStat[] = [
        {
            label: "Games Indexed",
            value: formatCount(summary?.totalGamesIndexed),
            subtitle: "Boxscores in OpenSearch",
            icon: <SportsHockeyIcon />,
        },
        {
            label: "Team Logs",
            value: formatCount(summary?.totalTeamGameLogsIndexed),
            subtitle: "Team game logs indexed",
            icon: <GroupsIcon />,
        },
        {
            label: "Player Logs",
            value: formatCount(summary?.totalPlayerGameLogsIndexed),
            subtitle: "Skater game logs indexed",
            icon: <PersonIcon />,
        },
        {
            label: "Goalie Logs",
            value: formatCount(summary?.totalGoalieGameLogsIndexed),
            subtitle: "Goalie game logs indexed",
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

            <StyledSummaryGrid>
                {stats.map(stat => (
                    <StatSummaryCard key={stat.label} stat={stat} />
                ))}
            </StyledSummaryGrid>

            <StyledDashboardGrid>
                <RecentGamesCard
                    games={recentGames}
                    isLoading={isRecentGamesLoading}
                    error={recentGamesError}
                />

                <TopPerformersCard
                    performers={topPerformers}
                    isLoading={isTopPerformersLoading}
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
