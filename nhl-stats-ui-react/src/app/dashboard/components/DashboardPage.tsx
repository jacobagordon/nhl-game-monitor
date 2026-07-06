import { useEffect } from "react";
import type { DashboardSummaryResponse } from "../interfaces/DashboardSummaryResponse";

interface DashboardPageProps {
    summary: DashboardSummaryResponse | null;
    isLoading: boolean;
    error: string | null;
    fetchDashboardSummary: () => void;
}

export const DashboardPage = ({
    summary,
    isLoading,
    error,
    fetchDashboardSummary,
}: DashboardPageProps) => {
    useEffect(() => {
        fetchDashboardSummary();
    }, [fetchDashboardSummary]);

    if (isLoading) {
        return <main>Loading dashboard...</main>;
    }

    if (error) {
        return <main>{error}</main>;
    }

    return (
        <main>
            <h1>Dashboard</h1>

            <section>
                <article>
                    <h2>Games Indexed</h2>
                    <p>{summary?.totalGamesIndexed ?? 0}</p>
                </article>

                <article>
                    <h2>Team Logs</h2>
                    <p>{summary?.totalTeamGameLogsIndexed ?? 0}</p>
                </article>

                <article>
                    <h2>Player Logs</h2>
                    <p>{summary?.totalPlayerGameLogsIndexed ?? 0}</p>
                </article>

                <article>
                    <h2>Goalie Logs</h2>
                    <p>{summary?.totalGoalieGameLogsIndexed ?? 0}</p>
                </article>
            </section>
        </main>
    );
};
