package com.game_monitor.nhl_stats_service.models;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Data
@Builder
@Document(indexName = "player_game_logs", createIndex = false)
public class PlayerGameLogDocument {
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

    private int goals;
    private int assists;
    private int points;
    private int powerPlayGoals;
    private int plusMinus;
    private int shotsOnGoal;
    private int hits;
    private int blockedShots;
    private double faceoffWinPercentage;
    private int penaltyMinutes;
    private String timeOnIce;
    private int shifts;
    private int giveaways;
    private int takeaways;
}