package com.game_monitor.nhl_stats_service.mappers;

import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse.TeamBoxscore;
import com.game_monitor.nhl_stats_service.models.GameSummaryDocument;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GameSummaryMapper {

    public GameSummaryDocument mapToDocument(GameBoxscoreResponse boxscore) {
        TeamBoxscore homeTeam = boxscore.getHomeTeam();
        TeamBoxscore awayTeam = boxscore.getAwayTeam();

        TeamBoxscore winningTeam = getWinningTeam(homeTeam, awayTeam);
        TeamBoxscore losingTeam = getLosingTeam(homeTeam, awayTeam);

        String finalPeriodType = getFinalPeriodType(boxscore);

        return GameSummaryDocument.builder()
                .id(String.valueOf(boxscore.getId()))

                .gameId(boxscore.getId())
                .season(boxscore.getSeason())
                .gameType(boxscore.getGameType())

                .gameDate(boxscore.getGameDate())
                .gameStartTimeUtc(boxscore.getStartTimeUtc())
                .gameState(boxscore.getGameState())
                .gameScheduleState(boxscore.getGameScheduleState())

                .venueName(getDefaultName(boxscore.getVenue()))
                .venueLocation(getDefaultName(boxscore.getVenueLocation()))

                .homeTeamId(homeTeam.getId())
                .homeTeamAbbreviation(homeTeam.getAbbrev())
                .homeTeamName(getDefaultName(homeTeam.getTeamName()))
                .homeTeamPlaceName(getDefaultName(homeTeam.getPlaceName()))
                .homeTeamLogo(homeTeam.getLogoUrl())
                .homeTeamDarkLogo(homeTeam.getDarkLogoUrl())
                .homeScore(homeTeam.getScore())
                .homeShotsOnGoal(homeTeam.getShotsOnGoal())

                .awayTeamId(awayTeam.getId())
                .awayTeamAbbreviation(awayTeam.getAbbrev())
                .awayTeamName(getDefaultName(awayTeam.getTeamName()))
                .awayTeamPlaceName(getDefaultName(awayTeam.getPlaceName()))
                .awayTeamLogo(awayTeam.getLogoUrl())
                .awayTeamDarkLogo(awayTeam.getDarkLogoUrl())
                .awayScore(awayTeam.getScore())
                .awayShotsOnGoal(awayTeam.getShotsOnGoal())

                .winningTeamId(winningTeam.getId())
                .winningTeamAbbreviation(winningTeam.getAbbrev())
                .winningTeamName(getDefaultName(winningTeam.getTeamName()))

                .losingTeamId(losingTeam.getId())
                .losingTeamAbbreviation(losingTeam.getAbbrev())
                .losingTeamName(getDefaultName(losingTeam.getTeamName()))

                .totalGoals(homeTeam.getScore() + awayTeam.getScore())
                .totalShotsOnGoal(homeTeam.getShotsOnGoal() + awayTeam.getShotsOnGoal())
                .goalDifferential(Math.abs(homeTeam.getScore() - awayTeam.getScore()))

                .finalPeriodType(finalPeriodType)
                .wentToOvertime(isOvertime(finalPeriodType))
                .wentToShootout(isShootout(finalPeriodType))
                .completedInRegulation(isRegulation(finalPeriodType))

                .broadcastNetworks(getBroadcastNetworks(boxscore))

                .build();
    }

    private TeamBoxscore getWinningTeam(TeamBoxscore homeTeam, TeamBoxscore awayTeam) {
        return homeTeam.getScore() > awayTeam.getScore()
                ? homeTeam
                : awayTeam;
    }

    private TeamBoxscore getLosingTeam(TeamBoxscore homeTeam, TeamBoxscore awayTeam) {
        return homeTeam.getScore() < awayTeam.getScore()
                ? homeTeam
                : awayTeam;
    }

    private String getFinalPeriodType(GameBoxscoreResponse boxscore) {
        if (boxscore.getGameOutcome() == null) {
            return null;
        }

        return boxscore.getGameOutcome().getLastPeriodType();
    }

    private boolean isRegulation(String finalPeriodType) {
        return "REG".equals(finalPeriodType);
    }

    private boolean isOvertime(String finalPeriodType) {
        return "OT".equals(finalPeriodType) || "SO".equals(finalPeriodType);
    }

    private boolean isShootout(String finalPeriodType) {
        return "SO".equals(finalPeriodType);
    }

    private List<String> getBroadcastNetworks(GameBoxscoreResponse boxscore) {
        if (boxscore.getTvBroadcasts() == null) {
            return List.of();
        }

        return boxscore.getTvBroadcasts()
                .stream()
                .map(GameBoxscoreResponse.TvBroadcast::getNetwork)
                .toList();
    }

    private String getDefaultName(GameBoxscoreResponse.Name name) {
        if (name == null) {
            return null;
        }

        return name.getDefaultName();
    }
}
