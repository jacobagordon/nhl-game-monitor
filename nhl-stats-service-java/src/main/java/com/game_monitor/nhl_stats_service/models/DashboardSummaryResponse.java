package com.game_monitor.nhl_stats_service.models;

import lombok.Data;

@Data
public class DashboardSummaryResponse {
    private long totalGamesIndexed;
    private long totalTeamGameLogsIndexed;
    private long totalPlayerGameLogsIndexed;
    private long totalGoalieGameLogsIndexed;
}
