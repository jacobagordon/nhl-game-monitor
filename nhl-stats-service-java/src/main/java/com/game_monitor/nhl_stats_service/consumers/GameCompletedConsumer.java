package com.game_monitor.nhl_stats_service.consumers;

import com.game_monitor.nhl_stats_service.accessors.NhlApiAccessor;
import com.game_monitor.nhl_stats_service.events.GameCompletedEvent;
import com.game_monitor.nhl_stats_service.mappers.PlayerGameLogMapper;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse.TeamBoxscore;
import com.game_monitor.nhl_stats_service.models.PlayerGameLogDocument;
import com.game_monitor.nhl_stats_service.repositories.PlayerGameLogRepository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class GameCompletedConsumer {

    private final NhlApiAccessor nhlApiAccessor;
    private final PlayerGameLogRepository playerGameLogRepository;
    private final PlayerGameLogMapper playerGameLogMapper;

    public GameCompletedConsumer(NhlApiAccessor nhlApiAccessor, PlayerGameLogRepository playerGameLogRepository,
            PlayerGameLogMapper playerGameLogMapper) {
        this.nhlApiAccessor = nhlApiAccessor;
        this.playerGameLogRepository = playerGameLogRepository;
        this.playerGameLogMapper = playerGameLogMapper;
    }

    @RabbitListener(queues = "player-stats-update")
    public void processGameCompleted(GameCompletedEvent event) {
        System.out.println("Received completed game: " + event.getGameId());

        GameBoxscoreResponse boxscore = nhlApiAccessor.getBoxscore(event.getGameId());

        TeamBoxscore homeTeamBoxscore = boxscore.getHomeTeam();
        TeamBoxscore awayTeamBoxscore = boxscore.getAwayTeam();

        List<PlayerGameLogDocument> playerGameLogDocuments = new ArrayList<>();

        // Map home team forwards
        playerGameLogDocuments.addAll(
                boxscore.getPlayerByGameStats()
                        .getHomeTeam()
                        .getForwards()
                        .stream()
                        .map(skater -> playerGameLogMapper.mapSkaterToDocument(
                                boxscore,
                                skater,
                                homeTeamBoxscore,
                                awayTeamBoxscore))
                        .toList());

        // Map home team defense
        playerGameLogDocuments.addAll(
                boxscore.getPlayerByGameStats()
                        .getHomeTeam()
                        .getDefense()
                        .stream()
                        .map(skater -> playerGameLogMapper.mapSkaterToDocument(
                                boxscore,
                                skater,
                                homeTeamBoxscore,
                                awayTeamBoxscore))
                        .toList());

        // Map away team forwards
        playerGameLogDocuments.addAll(
                boxscore.getPlayerByGameStats()
                        .getAwayTeam()
                        .getForwards()
                        .stream()
                        .map(skater -> playerGameLogMapper.mapSkaterToDocument(
                                boxscore,
                                skater,
                                awayTeamBoxscore,
                                homeTeamBoxscore))
                        .toList());

        // Map away team defense
        playerGameLogDocuments.addAll(
                boxscore.getPlayerByGameStats()
                        .getAwayTeam()
                        .getDefense()
                        .stream()
                        .map(skater -> playerGameLogMapper.mapSkaterToDocument(
                                boxscore,
                                skater,
                                awayTeamBoxscore,
                                homeTeamBoxscore))
                        .toList());

        playerGameLogRepository.saveAll(playerGameLogDocuments);

        System.out.println("Saved " + playerGameLogDocuments.size()
                + " player game logs for game " + boxscore.getId());
    }
}