package com.game_monitor.nhl_stats_service.services;

import com.game_monitor.nhl_stats_service.mappers.TeamGameLogMapper;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse.TeamBoxscore;
import com.game_monitor.nhl_stats_service.models.TeamGameLogDocument;
import com.game_monitor.nhl_stats_service.repositories.TeamGameLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamGameLogService {

    private final TeamGameLogRepository teamGameLogRepository;
    private final TeamGameLogMapper teamGameLogMapper;

    public TeamGameLogService(
            TeamGameLogRepository teamGameLogRepository,
            TeamGameLogMapper teamGameLogMapper) {
        this.teamGameLogRepository = teamGameLogRepository;
        this.teamGameLogMapper = teamGameLogMapper;
    }

    public void saveTeamGameLogs(GameBoxscoreResponse boxscore) {
        TeamBoxscore homeTeam = boxscore.getHomeTeam();
        TeamBoxscore awayTeam = boxscore.getAwayTeam();

        List<TeamGameLogDocument> documents = List.of(
                teamGameLogMapper.mapTeamToDocument(
                        boxscore,
                        homeTeam,
                        awayTeam,
                        true),
                teamGameLogMapper.mapTeamToDocument(
                        boxscore,
                        awayTeam,
                        homeTeam,
                        false));

        teamGameLogRepository.saveAll(documents);

        System.out.println("Saved " + documents.size()
                + " team game logs for game " + boxscore.getId());
    }
}
