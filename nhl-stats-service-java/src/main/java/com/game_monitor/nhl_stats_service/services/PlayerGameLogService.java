package com.game_monitor.nhl_stats_service.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.game_monitor.nhl_stats_service.mappers.PlayerGameLogMapper;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse.TeamBoxscore;
import com.game_monitor.nhl_stats_service.models.PlayerGameLogDocument;
import com.game_monitor.nhl_stats_service.repositories.PlayerGameLogRepository;

@Service
public class PlayerGameLogService {

    private final PlayerGameLogRepository playerGameLogRepository;
    private final PlayerGameLogMapper playerGameLogMapper;

    public PlayerGameLogService(PlayerGameLogRepository playerGameLogRepository,
            PlayerGameLogMapper playerGameLogMapper) {
        this.playerGameLogRepository = playerGameLogRepository;
        this.playerGameLogMapper = playerGameLogMapper;
    }

    public void savePlayerGameLogs(GameBoxscoreResponse boxscore) {
        TeamBoxscore homeTeamBoxscore = boxscore.getHomeTeam();
        TeamBoxscore awayTeamBoxscore = boxscore.getAwayTeam();

        List<PlayerGameLogDocument> playerGameLogDocuments = new ArrayList<>();

        playerGameLogDocuments.addAll(mapTeamSkaters(
                boxscore,
                boxscore.getPlayerByGameStats().getHomeTeam(),
                homeTeamBoxscore,
                awayTeamBoxscore));

        playerGameLogDocuments.addAll(mapTeamSkaters(
                boxscore,
                boxscore.getPlayerByGameStats().getAwayTeam(),
                awayTeamBoxscore,
                homeTeamBoxscore));

        playerGameLogRepository.saveAll(playerGameLogDocuments);

        System.out.println("Saved " + playerGameLogDocuments.size()
                + " player game logs for game " + boxscore.getId());
    }

    private List<PlayerGameLogDocument> mapTeamSkaters(
            GameBoxscoreResponse boxscore,
            GameBoxscoreResponse.TeamPlayerStats teamPlayerStats,
            TeamBoxscore team,
            TeamBoxscore opponent) {
        List<PlayerGameLogDocument> documents = new ArrayList<>();

        documents.addAll(teamPlayerStats.getForwards()
                .stream()
                .map(skater -> playerGameLogMapper.mapSkaterToDocument(
                        boxscore,
                        skater,
                        team,
                        opponent))
                .toList());

        documents.addAll(teamPlayerStats.getDefense()
                .stream()
                .map(skater -> playerGameLogMapper.mapSkaterToDocument(
                        boxscore,
                        skater,
                        team,
                        opponent))
                .toList());

        return documents;
    }
}
