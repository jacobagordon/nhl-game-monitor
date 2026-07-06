package com.game_monitor.nhl_stats_service.services;

import org.springframework.stereotype.Service;

import com.game_monitor.nhl_stats_service.models.DashboardSummaryResponse;
import com.game_monitor.nhl_stats_service.repositories.GameSummaryRepository;
import com.game_monitor.nhl_stats_service.repositories.GoalieGameLogRepository;
import com.game_monitor.nhl_stats_service.repositories.PlayerGameLogRepository;
import com.game_monitor.nhl_stats_service.repositories.TeamGameLogRepository;

@Service
public class DashboardService {
    private final GameSummaryRepository gameSummaryRepository;
    private final TeamGameLogRepository teamGameLogRepository;
    private final PlayerGameLogRepository playerGameLogRepository;
    private final GoalieGameLogRepository goalieGameLogRepository;

    public DashboardService(
            GameSummaryRepository gameSummaryRepository,
            TeamGameLogRepository teamGameLogRepository,
            PlayerGameLogRepository playerGameLogRepository,
            GoalieGameLogRepository goalieGameLogRepository) {
        this.gameSummaryRepository = gameSummaryRepository;
        this.teamGameLogRepository = teamGameLogRepository;
        this.playerGameLogRepository = playerGameLogRepository;
        this.goalieGameLogRepository = goalieGameLogRepository;
    }

    public DashboardSummaryResponse getDashboardSummary() {
        DashboardSummaryResponse response = new DashboardSummaryResponse();

        response.setTotalGamesIndexed(gameSummaryRepository.count());
        response.setTotalTeamGameLogsIndexed(teamGameLogRepository.count());
        response.setTotalPlayerGameLogsIndexed(playerGameLogRepository.count());
        response.setTotalGoalieGameLogsIndexed(goalieGameLogRepository.count());

        return response;
    }
}
