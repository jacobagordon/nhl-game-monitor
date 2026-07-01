package com.game_monitor.nhl_stats_service.mappers;

import org.springframework.stereotype.Component;

import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse.TeamBoxscore;
import com.game_monitor.nhl_stats_service.models.GoalieGameLogDocument;

@Component
public class GoalieGameLogMapper {

    public GoalieGameLogDocument mapGoalieToDocument(
            GameBoxscoreResponse boxscore,
            GameBoxscoreResponse.GoalieStats goalie,
            TeamBoxscore team,
            TeamBoxscore opponent) {
        return GoalieGameLogDocument.builder()
                .id(boxscore.getId() + "-" + goalie.getPlayerId())

                .gameId(boxscore.getId())
                .season(boxscore.getSeason())
                .gameDate(boxscore.getGameDate())
                .gameStartTimeUtc(boxscore.getStartTimeUtc())

                .playerId(goalie.getPlayerId())
                .playerDisplayName(getDefaultName(goalie.getName()))
                .playerFirstName(null)
                .playerLastName(null)
                .playerFullName(null)

                .position(goalie.getPosition())
                .sweaterNumber(goalie.getSweaterNumber())

                .teamAbbreviation(team.getAbbrev())
                .teamName(getDefaultName(team.getTeamName()))
                .teamId(team.getId())

                .opponentTeamAbbreviation(opponent.getAbbrev())
                .opponentTeamName(getDefaultName(opponent.getTeamName()))
                .opponentTeamId(opponent.getId())

                .starter(goalie.isStarter())
                .decision(goalie.getDecision())

                .shotsAgainst(goalie.getShotsAgainst())
                .saves(goalie.getSaves())
                .goalsAgainst(goalie.getGoalsAgainst())
                .savePercentage(goalie.getSavePctg())

                .timeOnIce(goalie.getToi())
                .penaltyMinutes(goalie.getPim())

                .evenStrengthShotsAgainst(goalie.getEvenStrengthShotsAgainst())
                .powerPlayShotsAgainst(goalie.getPowerPlayShotsAgainst())
                .shorthandedShotsAgainst(goalie.getShorthandedShotsAgainst())
                .saveShotsAgainst(goalie.getSaveShotsAgainst())

                .evenStrengthGoalsAgainst(goalie.getEvenStrengthGoalsAgainst())
                .powerPlayGoalsAgainst(goalie.getPowerPlayGoalsAgainst())
                .shorthandedGoalsAgainst(goalie.getShorthandedGoalsAgainst())

                .build();
    }

    private String getDefaultName(GameBoxscoreResponse.Name name) {
        if (name == null) {
            return null;
        }

        return name.getDefaultName();
    }
}