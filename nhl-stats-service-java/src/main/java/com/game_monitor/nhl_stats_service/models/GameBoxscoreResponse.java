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
    @JsonProperty("startTimeUTC")
    private Instant startTimeUtc;
    private String gameState;
    private String gameScheduleState;

    private Name venue;
    private Name venueLocation;
    @JsonProperty("easternUTCOffset")
    private String easternUtcOffset;
    @JsonProperty("venueUTCOffset")
    private String venueUtcOffset;

    private List<TvBroadcast> tvBroadcasts;

    private PeriodDescriptor periodDescriptor;
    private int regPeriods;

    private TeamBoxscore awayTeam;
    private TeamBoxscore homeTeam;

    private PlayerByGameStats playerByGameStats;

    private GameOutcome gameOutcome;

    @Data
    public static class TvBroadcast {
        private int id;
        private String market;
        private String countryCode;
        private String network;
        private int sequenceNumber;
    }

    @Data
    public static class PeriodDescriptor {
        private int number;
        private String periodType;
        private int maxRegulationPeriods;
    }

    @Data
    public static class GameOutcome {
        private String lastPeriodType;
    }

    @Data
    public static class TeamBoxscore {
        private int id;
        @JsonProperty("commonName")
        private Name teamName;
        private String abbrev;
        private Name placeName;
        @JsonProperty("logo")
        private String logoUrl;
        @JsonProperty("darkLogo")
        private String darkLogoUrl;
        private int score;
        @JsonProperty("sog")
        private int shotsOnGoal;
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
        private List<GoalieStats> goalies;
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
    public static class GoalieStats {
        private long playerId;
        private int sweaterNumber;
        private Name name;
        private String position;

        private String evenStrengthShotsAgainst;
        private String powerPlayShotsAgainst;
        private String shorthandedShotsAgainst;
        private String saveShotsAgainst;

        private Double savePctg;

        private int evenStrengthGoalsAgainst;
        private int powerPlayGoalsAgainst;
        private int shorthandedGoalsAgainst;

        private int pim;
        private int goalsAgainst;
        private String toi;

        private boolean starter;
        private String decision;

        private int shotsAgainst;
        private int saves;
    }

    @Data
    public static class Name {
        @JsonProperty("default")
        private String defaultName;
    }
}