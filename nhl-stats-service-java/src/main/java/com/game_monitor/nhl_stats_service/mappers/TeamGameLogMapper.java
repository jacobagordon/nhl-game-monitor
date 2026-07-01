package com.game_monitor.nhl_stats_service.mappers;

import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse.TeamBoxscore;
import com.game_monitor.nhl_stats_service.models.TeamGameLogDocument;

import org.springframework.stereotype.Component;

@Component
public class TeamGameLogMapper {

    public TeamGameLogDocument mapTeamToDocument(
            GameBoxscoreResponse boxscore,
            TeamBoxscore team,
            TeamBoxscore opponent,
            boolean isHome) {
        String finalPeriodType = getFinalPeriodType(boxscore);

        int goalsFor = team.getScore();
        int goalsAgainst = opponent.getScore();

        int shotsFor = team.getShotsOnGoal();
        int shotsAgainst = opponent.getShotsOnGoal();

        boolean won = goalsFor > goalsAgainst;
        boolean lost = goalsFor < goalsAgainst;

        return TeamGameLogDocument.builder()
                .id(boxscore.getId() + "-" + team.getId())

                .gameId(boxscore.getId())
                .season(boxscore.getSeason())
                .gameType(boxscore.getGameType())

                .gameDate(boxscore.getGameDate())
                .gameStartTimeUtc(boxscore.getStartTimeUtc())
                .gameState(boxscore.getGameState())

                .teamId(team.getId())
                .teamAbbreviation(team.getAbbrev())
                .teamName(getDefaultName(team.getTeamName()))
                .teamPlaceName(getDefaultName(team.getPlaceName()))
                .teamLogoUrl(team.getLogoUrl())

                .opponentTeamId(opponent.getId())
                .opponentTeamAbbreviation(opponent.getAbbrev())
                .opponentTeamName(getDefaultName(opponent.getTeamName()))
                .opponentTeamPlaceName(getDefaultName(opponent.getPlaceName()))
                .opponentTeamLogoUrl(opponent.getLogoUrl())

                .home(isHome)
                .away(!isHome)

                .goalsFor(goalsFor)
                .goalsAgainst(goalsAgainst)
                .goalDifferential(goalsFor - goalsAgainst)

                .shotsFor(shotsFor)
                .shotsAgainst(shotsAgainst)
                .shotDifferential(shotsFor - shotsAgainst)

                .result(getGameResult(won, lost, finalPeriodType))
                .won(won)
                .lost(lost)

                .finalPeriodType(finalPeriodType)
                .wentToOvertime(isOvertime(finalPeriodType))
                .wentToShootout(isShootout(finalPeriodType))
                .completedInRegulation(isRegulation(finalPeriodType))

                .build();
    }

    private String getGameResult(boolean won, boolean lost, String finalPeriodType) {
        if (won) {
            return "W";
        }

        if (lost && "SO".equals(finalPeriodType)) {
            return "SOL";
        }

        if (lost && "OT".equals(finalPeriodType)) {
            return "OTL";
        }

        if (lost) {
            return "L";
        }

        return "T";
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

    private String getDefaultName(GameBoxscoreResponse.Name name) {
        if (name == null) {
            return null;
        }

        return name.getDefaultName();
    }
}
