package com.game_monitor.nhl_stats_service.services;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.game_monitor.nhl_stats_service.config.InfrastructureProperties;

@Service
public class InfrastructureHealthService {
    private final RestClient restClient;
    private final InfrastructureProperties infrastructureProperties;

    public InfrastructureHealthService(
            RestClient.Builder restClientBuilder,
            InfrastructureProperties infrastructureProperties
    ) {
        this.restClient = restClientBuilder.build();
        this.infrastructureProperties = infrastructureProperties;
    }

    public ExternalHealthResponse getDotnetMonitorHealth() {
        InfrastructureProperties.ExternalService dotnetMonitor =
                infrastructureProperties.getServices().getDotnetMonitor();

        try {
            DotnetMonitorHealthResponse response = restClient.get()
                    .uri(dotnetMonitor.getHealthUrl())
                    .retrieve()
                    .body(DotnetMonitorHealthResponse.class);

            if (response == null) {
                return new ExternalHealthResponse(
                        dotnetMonitor.getName(),
                        "UNKNOWN",
                        Map.of("error", "No response body returned from health endpoint")
                );
            }

            return new ExternalHealthResponse(
                    dotnetMonitor.getName(),
                    response.status(),
                    Map.of(
                            "checkedAtUtc", response.checkedAtUtc(),
                            "rabbitMq", response.rabbitMq()
                    )
            );
        } catch (Exception exception) {
            return new ExternalHealthResponse(
                    dotnetMonitor.getName(),
                    "DOWN",
                    Map.of("error", exception.getMessage())
            );
        }
    }

    public record ExternalHealthResponse(
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
