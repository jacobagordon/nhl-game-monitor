package com.game_monitor.nhl_stats_service.services;

import org.springframework.stereotype.Service;

import com.game_monitor.nhl_stats_service.accessors.NhlApiAccessor;
import com.game_monitor.nhl_stats_service.events.GameCompletedEvent;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse;

@Service
public class GameCompletedProccessingService {

    private final NhlApiAccessor nhlApiAccessor;
    private final PlayerGameLogService playerGameLogService;

    public GameCompletedProccessingService(NhlApiAccessor nhlApiAccessor, PlayerGameLogService playerGameLogService) {
        this.nhlApiAccessor = nhlApiAccessor;
        this.playerGameLogService = playerGameLogService;
    }

    public void process(GameCompletedEvent event) {
        System.out.println("Received completed game: " + event.getGameId());

        GameBoxscoreResponse boxscore = nhlApiAccessor.getBoxscore(event.getGameId());

        playerGameLogService.savePlayerGameLogs(boxscore);

        System.out.println("Processed game: " + boxscore.getId());
    }
}
