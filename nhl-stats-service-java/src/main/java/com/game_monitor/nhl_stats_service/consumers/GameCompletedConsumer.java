package com.game_monitor.nhl_stats_service.consumers;

import com.game_monitor.nhl_stats_service.accessors.NhlApiAccessor;
import com.game_monitor.nhl_stats_service.events.GameCompletedEvent;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class GameCompletedConsumer {

    private final NhlApiAccessor nhlApiAccessor;

    public GameCompletedConsumer(NhlApiAccessor nhlApiAccessor) {
        this.nhlApiAccessor = nhlApiAccessor;
    }

    @RabbitListener(queues = "player-stats-update")
    public void processGameCompleted(GameCompletedEvent event) {
        System.out.println("Received completed game: " + event.getGameId());

        GameBoxscoreResponse boxscore = nhlApiAccessor.getBoxscore(event.getGameId());

        System.out.println("Received boxscore for game: " + event.getGameId());

        System.out.println("Game ID: " + boxscore.getId());
        System.out.println("Season: " + boxscore.getSeason());
        System.out.println("Game date: " + boxscore.getGameDate());
        System.out.println("Game state: " + boxscore.getGameState());

        System.out.println("Home team: " + boxscore.getHomeTeam().getAbbrev());
        System.out.println("Away team: " + boxscore.getAwayTeam().getAbbrev());

        System.out.println("Home forwards: " +
                boxscore.getPlayerByGameStats()
                        .getHomeTeam()
                        .getForwards()
                        .size());

        System.out.println("Home defense: " +
                boxscore.getPlayerByGameStats()
                        .getHomeTeam()
                        .getDefense()
                        .size());

        var firstForward = boxscore.getPlayerByGameStats()
                .getHomeTeam()
                .getForwards()
                .get(0);

        System.out.println("First home forward: " +
                firstForward.getName().getDefaultName());

        System.out.println("Goals: " + firstForward.getGoals());
        System.out.println("Assists: " + firstForward.getAssists());
        System.out.println("Points: " + firstForward.getPoints());
        System.out.println("TOI: " + firstForward.getToi());
    }
}