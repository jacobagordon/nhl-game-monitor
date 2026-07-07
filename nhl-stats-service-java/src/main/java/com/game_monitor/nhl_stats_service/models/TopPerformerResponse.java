package com.game_monitor.nhl_stats_service.models;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TopPerformerResponse {
    private String category;

    private long playerId;
    private String playerFullName;
    private String position;

    private String teamAbbreviation;
    private String teamLogoUrl;
    private String opponentTeamAbbreviation;

    private LocalDate gameDate;

    private Integer goals;
    private Integer assists;
    private Integer points;

    private Integer saves;
    private Integer shotsAgainst;
    private Double savePercentage;
}
