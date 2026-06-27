package com.game_monitor.nhl_stats_service.consumers;

import com.game_monitor.nhl_stats_service.events.GameCompletedEvent;
import com.game_monitor.nhl_stats_service.services.GameCompletedProccessingService;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class GameCompletedConsumer {

        private final GameCompletedProccessingService gameCompletedProccessingService;

        public GameCompletedConsumer(GameCompletedProccessingService gameCompletedProccessingService) {
                this.gameCompletedProccessingService = gameCompletedProccessingService;
        }

        @RabbitListener(queues = "game-completed")
        public void processGameCompleted(GameCompletedEvent event) {
                gameCompletedProccessingService.process(event);
        }
}