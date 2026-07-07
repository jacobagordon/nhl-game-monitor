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
    private String venueLocation;
    private String finalPeriodType;

    private String awayTeamAbbreviation;
    private String awayTeamFullName;
    private int awayScore;
    private int awayShotsOnGoal;
    private String awayTeamLogoUrl;

    private String homeTeamAbbreviation;
    private String homeTeamFullName;
    private int homeScore;
    private int homeShotsOnGoal;
    private String homeTeamLogoUrl;
}
