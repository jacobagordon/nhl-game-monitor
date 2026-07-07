package com.game_monitor.nhl_stats_service.models;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@Builder
@Document(indexName = "game-summaries", createIndex = false)
public class GameSummaryDocument {

    @Id
    private String id;

    private long gameId;
    private long season;
    private int gameType;

    @Field(type = FieldType.Date, format = DateFormat.date_optional_time)
    private LocalDate gameDate;
    private Instant gameStartTimeUtc;
    private String gameState;
    private String gameScheduleState;

    private String venueName;
    private String venueLocation;
    private String venueUtcOffset;
    private String easternUtcOffset;

    private int homeTeamId;
    private String homeTeamAbbreviation;
    private String homeTeamName;
    private String homeTeamPlaceName;
    private String homeTeamLogo;
    private String homeTeamDarkLogo;
    private int homeScore;
    private int homeShotsOnGoal;

    private int awayTeamId;
    private String awayTeamAbbreviation;
    private String awayTeamName;
    private String awayTeamPlaceName;
    private String awayTeamLogo;
    private String awayTeamDarkLogo;
    private int awayScore;
    private int awayShotsOnGoal;

    private int winningTeamId;
    private String winningTeamAbbreviation;
    private String winningTeamName;

    private int losingTeamId;
    private String losingTeamAbbreviation;
    private String losingTeamName;

    private int totalGoals;
    private int totalShotsOnGoal;
    private int goalDifferential;

    private int finalPeriodNumber;
    private String finalPeriodType;
    private int regulationPeriods;

    private boolean wentToOvertime;
    private boolean wentToShootout;
    private boolean completedInRegulation;

    private List<String> broadcastNetworks;
}
