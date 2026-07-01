package com.game_monitor.nhl_stats_service.models;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.time.Instant;
import java.time.LocalDate;

@Data
@Builder
@Document(indexName = "team-game-logs", createIndex = false)
public class TeamGameLogDocument {

    @Id
    private String id;

    private long gameId;
    private long season;
    private int gameType;

    private LocalDate gameDate;
    private Instant gameStartTimeUtc;
    private String gameState;

    private int teamId;
    private String teamAbbreviation;
    private String teamName;
    private String teamPlaceName;
    private String teamLogoUrl;

    private int opponentTeamId;
    private String opponentTeamAbbreviation;
    private String opponentTeamName;
    private String opponentTeamPlaceName;
    private String opponentTeamLogoUrl;

    private boolean home;
    private boolean away;

    private int goalsFor;
    private int goalsAgainst;
    private int goalDifferential;

    private int shotsFor;
    private int shotsAgainst;
    private int shotDifferential;

    private String result; // W, L, OTL, SOL
    private boolean won;
    private boolean lost;

    private String finalPeriodType;
    private boolean wentToOvertime;
    private boolean wentToShootout;
    private boolean completedInRegulation;
}
