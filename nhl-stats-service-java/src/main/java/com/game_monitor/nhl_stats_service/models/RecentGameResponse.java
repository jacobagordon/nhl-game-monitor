package com.game_monitor.nhl_stats_service.models;

import java.time.Instant;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecentGameResponse {
    private long id;
    private LocalDate gameDate;
    private Instant gameStartTimeUtc;
    private String venueName;

    private String awayTeamAbbreviation;
    private int awayScore;
    private String awayTeamLogoUrl;

    private String homeTeamAbbreviation;
    private int homeScore;
    private String homeTeamLogoUrl;

    private String status;
}
