package com.game_monitor.nhl_stats_service;

import com.game_monitor.nhl_stats_service.config.InfrastructureProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(InfrastructureProperties.class)
public class NhlStatsServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(NhlStatsServiceApplication.class, args);
    }
}
