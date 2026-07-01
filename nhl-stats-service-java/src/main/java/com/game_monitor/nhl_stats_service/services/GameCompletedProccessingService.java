package com.game_monitor.nhl_stats_service.services;

import org.springframework.stereotype.Service;

import com.game_monitor.nhl_stats_service.accessors.NhlApiAccessor;
import com.game_monitor.nhl_stats_service.events.GameCompletedEvent;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse;

@Service
public class GameCompletedProccessingService {

    private final NhlApiAccessor nhlApiAccessor;
    private final GameSummaryService gameSummaryService;
    private final PlayerGameLogService playerGameLogService;
    private final GoalieGameLogService goalieGameLogService;
    private final TeamGameLogService teamGameLogService;

    public GameCompletedProccessingService(NhlApiAccessor nhlApiAccessor, GameSummaryService gameSummaryService,
            PlayerGameLogService playerGameLogService, GoalieGameLogService goalieGameLogService,
            TeamGameLogService teamGameLogService) {
        this.nhlApiAccessor = nhlApiAccessor;
        this.gameSummaryService = gameSummaryService;
        this.playerGameLogService = playerGameLogService;
        this.goalieGameLogService = goalieGameLogService;
        this.teamGameLogService = teamGameLogService;
    }

    public void process(GameCompletedEvent event) {
        System.out.println("Received completed game: " + event.getGameId());

        GameBoxscoreResponse boxscore = nhlApiAccessor.getBoxscore(event.getGameId());

        gameSummaryService.saveGameSummary(boxscore);
        playerGameLogService.savePlayerGameLogs(boxscore);
        goalieGameLogService.saveGoalieGameLogs(boxscore);
        teamGameLogService.saveTeamGameLogs(boxscore);

        System.out.println("Processed game: " + boxscore.getId());
    }
}
