package com.game_monitor.nhl_stats_service.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
public class GameBoxscoreResponse {

    private long id;
    private long season;
    private int gameType;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate gameDate;
    private Instant startTimeUtc;
    private String gameState;

    private TeamBoxscore awayTeam;
    private TeamBoxscore homeTeam;

    private PlayerByGameStats playerByGameStats;

    @Data
    public static class TeamBoxscore {
        private int id;
        private Name teamName;
        private String abbrev;
        private Name placeName;
    }

    @Data
    public static class PlayerByGameStats {
        private TeamPlayerStats awayTeam;
        private TeamPlayerStats homeTeam;
    }

    @Data
    public static class TeamPlayerStats {
        private List<SkaterStats> forwards;
        private List<SkaterStats> defense;
    }

    @Data
    public static class SkaterStats {
        private long playerId;
        private int sweaterNumber;
        private Name name;
        private String position;

        private int goals;
        private int assists;
        private int points;
        private int plusMinus;
        private int pim;
        private int hits;
        private int powerPlayGoals;
        private int sog;
        private double faceoffWinningPctg;
        private String toi;
        private int blockedShots;
        private int shifts;
        private int giveaways;
        private int takeaways;
    }

    @Data
    public static class Name {
        @JsonProperty("default")
        private String defaultName;
    } 
}