package com.game_monitor.nhl_stats_service.consumers;

import com.game_monitor.nhl_stats_service.events.GameCompletedEvent;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class GameCompletedConsumer {

    @RabbitListener(queues = "player-stats-update")
    public void consume(GameCompletedEvent event) {
        System.out.println("Received completed game: " + event.getGameId());
    }
}