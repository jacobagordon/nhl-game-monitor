import { StatSummaryCard } from "../components/StatSummaryCard";
import { RecentGamesCard } from "../components/RecentGamesCard";
import type { DashboardStat } from "../interfaces/DashboardStat";
import {
    StyledDashboardGrid,
    StyledDashboardPage,
    StyledSummaryGrid,
} from "../styles/Dashboard.style";

// This is just temporary data
const summaryStats: DashboardStat[] = [
    {
        label: "Games Indexed",
        value: "38,452",
        subtitle: "2005-2024",
    },
    {
        label: "Player Logs",
        value: "18,726",
        subtitle: "Across all seasons",
    },
    {
        label: "Goalie Logs",
        value: "2,128",
        subtitle: "Across all seasons",
    },
    {
        label: "Team Logs",
        value: "1,342",
        subtitle: "Across all seasons",
    },
];

export const DashboardContainer = () => {
    return (
        <StyledDashboardPage>
            <StyledSummaryGrid>
                {summaryStats.map(stat => (
                    <StatSummaryCard key={stat.label} stat={stat} />
                ))}
            </StyledSummaryGrid>

            <StyledDashboardGrid>
                <RecentGamesCard />
            </StyledDashboardGrid>
        </StyledDashboardPage>
    );
};
