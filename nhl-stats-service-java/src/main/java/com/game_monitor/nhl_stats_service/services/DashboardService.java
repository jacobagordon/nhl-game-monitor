package com.game_monitor.nhl_stats_service.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.game_monitor.nhl_stats_service.models.DashboardSummaryResponse;
import com.game_monitor.nhl_stats_service.models.GameSummaryDocument;
import com.game_monitor.nhl_stats_service.models.RecentGameResponse;
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

    public List<RecentGameResponse> getRecentGames() {
        return gameSummaryRepository.findTop5ByOrderByGameStartTimeUtcDesc().stream()
                .map(this::mapToRecentGameResponse)
                .toList();
    }

    private RecentGameResponse mapToRecentGameResponse(GameSummaryDocument game) {
        return RecentGameResponse.builder()
                .id(game.getGameId())
                .gameDate(game.getGameDate())
                .gameStartTimeUtc(game.getGameStartTimeUtc())
                .venueName(game.getVenueName())
                .awayTeamAbbreviation(game.getAwayTeamAbbreviation())
                .awayScore(game.getAwayScore())
                .awayTeamLogoUrl(game.getAwayTeamLogo())
                .homeTeamAbbreviation(game.getHomeTeamAbbreviation())
                .homeScore(game.getHomeScore())
                .homeTeamLogoUrl(game.getHomeTeamLogo())
                .status(buildStatusLabel(game))
                .build();
    }

    private String buildStatusLabel(GameSummaryDocument game) {
        if (game.isWentToShootout()) {
            return "FINAL/SO";
        }

        if (game.isWentToOvertime()) {
            return "FINAL/OT";
        }

        return "FINAL";
    }
}
