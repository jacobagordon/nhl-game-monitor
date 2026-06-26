package com.game_monitor.nhl_stats_service.accessors;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse;

@Component
public class NhlApiAccessor {

    private final RestClient restClient;

    public NhlApiAccessor(RestClient.Builder builder) {
        this.restClient = builder
                .baseUrl("https://api-web.nhle.com/v1")
                .build();
    }

    public GameBoxscoreResponse getBoxscore(long gameId) {
        return restClient.get()
                .uri("/gamecenter/{gameId}/boxscore", gameId)
                .retrieve()
                .body(GameBoxscoreResponse.class);
    }
}