package com.game_monitor.nhl_stats_service.mappers;

import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse;
import com.game_monitor.nhl_stats_service.models.PlayerGameLogDocument;

import org.springframework.stereotype.Component;

@Component
public class PlayerGameLogMapper {

    public PlayerGameLogDocument mapSkaterToDocument(
            GameBoxscoreResponse boxscore,
            GameBoxscoreResponse.SkaterStats skater,
            GameBoxscoreResponse.TeamBoxscore team,
            GameBoxscoreResponse.TeamBoxscore opponent) {
        return PlayerGameLogDocument.builder()
                .id(boxscore.getId() + "-" + skater.getPlayerId())

                .gameId(boxscore.getId())
                .season(boxscore.getSeason())
                .gameDate(boxscore.getGameDate())
                .gameStartTimeUtc(boxscore.getStartTimeUtc())

                .playerId(skater.getPlayerId())
                .playerDisplayName(getDefaultName(skater.getName()))
                .playerFirstName(null)
                .playerLastName(null)
                .playerFullName(null)

                .position(skater.getPosition())
                .sweaterNumber(skater.getSweaterNumber())

                .teamAbbreviation(team.getAbbrev())
                .teamName(getDefaultName(team.getTeamName()))
                .teamId(team.getId())

                .opponentTeamAbbreviation(opponent.getAbbrev())
                .opponentTeamName(getDefaultName(opponent.getTeamName()))
                .opponentTeamId(opponent.getId())

                .goals(skater.getGoals())
                .assists(skater.getAssists())
                .points(skater.getPoints())
                .powerPlayGoals(skater.getPowerPlayGoals())
                .plusMinus(skater.getPlusMinus())
                .shotsOnGoal(skater.getSog())
                .hits(skater.getHits())
                .blockedShots(skater.getBlockedShots())
                .faceoffWinPercentage(skater.getFaceoffWinningPctg())
                .penaltyMinutes(skater.getPim())
                .timeOnIce(skater.getToi())
                .shifts(skater.getShifts())
                .giveaways(skater.getGiveaways())
                .takeaways(skater.getTakeaways())

                .build();
    }

    private String getDefaultName(GameBoxscoreResponse.Name name) {
        if (name == null) {
            return null;
        }

        return name.getDefaultName();
    }
}
