package com.game_monitor.nhl_stats_service.services;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.game_monitor.nhl_stats_service.models.DashboardSummaryResponse;
import com.game_monitor.nhl_stats_service.models.GameSummaryDocument;
import com.game_monitor.nhl_stats_service.models.GoalieGameLogDocument;
import com.game_monitor.nhl_stats_service.models.PlayerGameLogDocument;
import com.game_monitor.nhl_stats_service.models.RecentGameResponse;
import com.game_monitor.nhl_stats_service.models.TopPerformerResponse;
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

    public List<TopPerformerResponse> getTopPerformers() {
        List<GameSummaryDocument> recentGames = gameSummaryRepository.findTop5ByOrderByGameStartTimeUtcDesc();
        List<Long> gameIds = recentGames.stream().map(GameSummaryDocument::getGameId).toList();
        Map<Long, GameSummaryDocument> gamesById =
                recentGames.stream().collect(Collectors.toMap(GameSummaryDocument::getGameId, game -> game));

        List<TopPerformerResponse> topSkaters = playerGameLogRepository.findByGameIdIn(gameIds).stream()
                .sorted(Comparator.comparingInt(PlayerGameLogDocument::getPoints).reversed())
                .limit(7)
                .map(player -> mapSkaterToTopPerformer(player, gamesById.get(player.getGameId())))
                .toList();

        List<TopPerformerResponse> topGoalies = goalieGameLogRepository.findByGameIdIn(gameIds).stream()
                .filter(GoalieGameLogDocument::isStarter)
                .sorted(Comparator.comparing(
                        GoalieGameLogDocument::getSavePercentage, Comparator.nullsLast(Comparator.reverseOrder())))
                .limit(3)
                .map(goalie -> mapGoalieToTopPerformer(goalie, gamesById.get(goalie.getGameId())))
                .toList();

        return Stream.concat(topSkaters.stream(), topGoalies.stream()).toList();
    }

    private TopPerformerResponse mapSkaterToTopPerformer(PlayerGameLogDocument player, GameSummaryDocument game) {
        return TopPerformerResponse.builder()
                .category("SKATER")
                .playerId(player.getPlayerId())
                .playerFullName(player.getPlayerDisplayName())
                .position(player.getPosition())
                .teamAbbreviation(player.getTeamAbbreviation())
                .teamLogoUrl(resolveTeamLogo(game, player.getTeamAbbreviation()))
                .opponentTeamAbbreviation(player.getOpponentTeamAbbreviation())
                .gameDate(player.getGameDate())
                .goals(player.getGoals())
                .assists(player.getAssists())
                .points(player.getPoints())
                .build();
    }

    private TopPerformerResponse mapGoalieToTopPerformer(GoalieGameLogDocument goalie, GameSummaryDocument game) {
        return TopPerformerResponse.builder()
                .category("GOALIE")
                .playerId(goalie.getPlayerId())
                .playerFullName(goalie.getPlayerDisplayName())
                .position(goalie.getPosition())
                .teamAbbreviation(goalie.getTeamAbbreviation())
                .teamLogoUrl(resolveTeamLogo(game, goalie.getTeamAbbreviation()))
                .opponentTeamAbbreviation(goalie.getOpponentTeamAbbreviation())
                .gameDate(goalie.getGameDate())
                .saves(goalie.getSaves())
                .shotsAgainst(goalie.getShotsAgainst())
                .savePercentage(goalie.getSavePercentage())
                .build();
    }

    private String resolveTeamLogo(GameSummaryDocument game, String teamAbbreviation) {
        if (game == null || teamAbbreviation == null) {
            return null;
        }

        if (teamAbbreviation.equals(game.getHomeTeamAbbreviation())) {
            return game.getHomeTeamLogo();
        }

        if (teamAbbreviation.equals(game.getAwayTeamAbbreviation())) {
            return game.getAwayTeamLogo();
        }

        return null;
    }
}
