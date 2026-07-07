package com.game_monitor.nhl_stats_service.models;

import java.time.Instant;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@Builder
@Document(indexName = "goalie-game-logs", createIndex = false)
public class GoalieGameLogDocument {

    @Id
    private String id;

    private long gameId;
    private long season;

    @Field(type = FieldType.Date, format = DateFormat.date_optional_time)
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
