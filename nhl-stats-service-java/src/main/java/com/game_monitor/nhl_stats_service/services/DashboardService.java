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
                .venueLocation(game.getVenueLocation())
                .finalPeriodType(game.getFinalPeriodType())
                .awayTeamAbbreviation(game.getAwayTeamAbbreviation())
                .awayTeamFullName(buildFullTeamName(game.getAwayTeamPlaceName(), game.getAwayTeamName()))
                .awayScore(game.getAwayScore())
                .awayShotsOnGoal(game.getAwayShotsOnGoal())
                .awayTeamLogoUrl(game.getAwayTeamLogo())
                .homeTeamAbbreviation(game.getHomeTeamAbbreviation())
                .homeTeamFullName(buildFullTeamName(game.getHomeTeamPlaceName(), game.getHomeTeamName()))
                .homeScore(game.getHomeScore())
                .homeShotsOnGoal(game.getHomeShotsOnGoal())
                .homeTeamLogoUrl(game.getHomeTeamLogo())
                .build();
    }

    private String buildFullTeamName(String placeName, String teamName) {
        if (placeName == null || placeName.isBlank()) {
            return teamName;
        }

        return placeName + " " + teamName;
    }
}
