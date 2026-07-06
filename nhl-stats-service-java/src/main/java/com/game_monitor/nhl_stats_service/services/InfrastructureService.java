package com.game_monitor.nhl_stats_service.services;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.game_monitor.nhl_stats_service.config.InfrastructureProperties;

@Service
public class InfrastructureService {
    private final RestClient restClient;
    private final InfrastructureProperties infrastructureProperties;

    public InfrastructureService(
            RestClient.Builder restClientBuilder,
            InfrastructureProperties infrastructureProperties
    ) {
        this.restClient = restClientBuilder.build();
        this.infrastructureProperties = infrastructureProperties;
    }

    public ExternalResponse getDotnetMonitorHealth() {
        InfrastructureProperties.ExternalService dotnetMonitor =
                infrastructureProperties.getServices().getDotnetMonitor();

        try {
            DotnetMonitorHealthResponse response = restClient.get()
                    .uri(dotnetMonitor.getHealthUrl())
                    .retrieve()
                    .body(DotnetMonitorHealthResponse.class);

            if (response == null) {
                return new ExternalResponse(
                        dotnetMonitor.getName(),
                        "UNKNOWN",
                        Map.of("error", "No response body returned from health endpoint")
                );
            }

            return new ExternalResponse(
                    dotnetMonitor.getName(),
                    response.status(),
                    Map.of(
                            "checkedAtUtc", response.checkedAtUtc(),
                            "rabbitMq", response.rabbitMq()
                    )
            );
        } catch (Exception exception) {
            return new ExternalResponse(
                    dotnetMonitor.getName(),
                    "DOWN",
                    Map.of("error", exception.getMessage())
            );
        }
    }

    public ExternalResponse scheduleDateProcessing(String date) {
        InfrastructureProperties.ExternalService dotnetMonitor = infrastructureProperties.getServices().getDotnetMonitor();

        try {
                Map<String, Object> response = restClient.put()
                        .uri(dotnetMonitor.getScheduleDateUrl() + "/{date}", date)
                        .retrieve()
                        .body(Map.class);

                return new ExternalResponse(
                        dotnetMonitor.getName(),
                        "SUCCESS",
                        response
                );
        } catch (Exception exception) {
                return new ExternalResponse(
                        dotnetMonitor.getName(),
                        "FAILED",
                        Map.of("error", exception.getMessage())
                );
        }
    }

    public record ExternalResponse(
            String name,
            String status,
            Map<String, Object> details
    ) {
    }

    public record DotnetMonitorHealthResponse(
            String service,
            String status,
            String checkedAtUtc,
            RabbitMqHealth rabbitMq
    ) {
    }

    public record RabbitMqHealth(
            String status,
            String host,
            int port,
            String error
    ) {
    }
}
