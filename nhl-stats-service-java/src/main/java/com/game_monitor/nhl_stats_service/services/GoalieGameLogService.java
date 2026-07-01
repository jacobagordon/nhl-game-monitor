package com.game_monitor.nhl_stats_service.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.game_monitor.nhl_stats_service.mappers.GoalieGameLogMapper;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse.TeamBoxscore;
import com.game_monitor.nhl_stats_service.models.GoalieGameLogDocument;
import com.game_monitor.nhl_stats_service.repositories.GoalieGameLogRepository;

@Service
public class GoalieGameLogService {

    private final GoalieGameLogRepository goalieGameLogRepository;
    private final GoalieGameLogMapper goalieGameLogMapper;

    public GoalieGameLogService(
            GoalieGameLogRepository goalieGameLogRepository,
            GoalieGameLogMapper goalieGameLogMapper) {
        this.goalieGameLogRepository = goalieGameLogRepository;
        this.goalieGameLogMapper = goalieGameLogMapper;
    }

    public void saveGoalieGameLogs(GameBoxscoreResponse boxscore) {
        TeamBoxscore homeTeam = boxscore.getHomeTeam();
        TeamBoxscore awayTeam = boxscore.getAwayTeam();

        List<GoalieGameLogDocument> documents = new ArrayList<>();

        documents.addAll(mapTeamGoalies(
                boxscore,
                boxscore.getPlayerByGameStats().getHomeTeam().getGoalies(),
                homeTeam,
                awayTeam));

        documents.addAll(mapTeamGoalies(
                boxscore,
                boxscore.getPlayerByGameStats().getAwayTeam().getGoalies(),
                awayTeam,
                homeTeam));

        goalieGameLogRepository.saveAll(documents);

        System.out.println("Saved " + documents.size()
                + " goalie game logs for game " + boxscore.getId());
    }

    private List<GoalieGameLogDocument> mapTeamGoalies(
            GameBoxscoreResponse boxscore,
            List<GameBoxscoreResponse.GoalieStats> goalies,
            TeamBoxscore team,
            TeamBoxscore opponent) {
        if (goalies == null) {
            return List.of();
        }

        return goalies.stream()
                .map(goalie -> goalieGameLogMapper.mapGoalieToDocument(
                        boxscore,
                        goalie,
                        team,
                        opponent))
                .toList();
    }
}
