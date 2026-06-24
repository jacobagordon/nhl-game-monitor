package com.game_monitor.nhl_stats_service.events;

import java.util.UUID;
import lombok.Data;

@Data
public class GameCompletedEvent{
        private int gameId;
        private UUID correlationId;
        private String eventType;
}
