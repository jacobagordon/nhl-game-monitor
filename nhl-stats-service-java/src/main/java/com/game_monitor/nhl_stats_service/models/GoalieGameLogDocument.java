package com.game_monitor.nhl_stats_service.models;

import java.time.Instant;
import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Document(indexName = "goalie-game-logs", createIndex = false)
public class GoalieGameLogDocument {

    @Id
    private String id;

    private long gameId;
    private long season;
    private LocalDate gameDate;
    private Instant gameStartTimeUtc;

    private long playerId;
    private String playerDisplayName;
    private String playerFirstName;
    private String playerLastName;
    private String playerFullName;

    private String position;
    private int sweaterNumber;

    private String teamAbbreviation;
    private String teamName;
    private int teamId;

    private String opponentTeamAbbreviation;
    private String opponentTeamName;
    private int opponentTeamId;

    private boolean starter;
    private String decision;

    private int shotsAgainst;
    private int saves;
    private int goalsAgainst;
    private Double savePercentage;

    private String timeOnIce;
    private int penaltyMinutes;

    private String evenStrengthShotsAgainst;
    private String powerPlayShotsAgainst;
    private String shorthandedShotsAgainst;
    private String saveShotsAgainst;

    private int evenStrengthGoalsAgainst;
    private int powerPlayGoalsAgainst;
    private int shorthandedGoalsAgainst;
}
