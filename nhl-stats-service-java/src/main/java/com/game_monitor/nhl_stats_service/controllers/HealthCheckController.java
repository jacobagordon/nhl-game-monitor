package com.game_monitor.nhl_stats_service.controllers;

import org.springframework.boot.health.actuate.endpoint.CompositeHealthDescriptor;
import org.springframework.boot.health.actuate.endpoint.HealthDescriptor;
import org.springframework.boot.health.actuate.endpoint.HealthEndpoint;
import org.springframework.boot.health.actuate.endpoint.IndicatedHealthDescriptor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.game_monitor.nhl_stats_service.services.InfrastructureHealthService;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class HealthCheckController {
    private final HealthEndpoint healthEndpoint;
    private final InfrastructureHealthService infrastructureHealthService;

    public HealthCheckController(HealthEndpoint healthEndpoint, InfrastructureHealthService infrastructureHealthService) {
        this.healthEndpoint = healthEndpoint;
        this.infrastructureHealthService = infrastructureHealthService;
    }

    @GetMapping("/api/health")
    public InfrastructureHealthResponse getInfrastructureHealth() {
        HealthDescriptor health = healthEndpoint.health();

        List<InfrastructureComponentHealth> components = new ArrayList<>();

        components.add(
                new InfrastructureComponentHealth(
                        "nhl-stats-service-api",
                        health.getStatus().getCode(),
                        null
                )
        );

        InfrastructureHealthService.ExternalHealthResponse dotnetHealth = infrastructureHealthService.getDotnetMonitorHealth();

        components.add(
            new InfrastructureComponentHealth(
                dotnetHealth.name(),
                dotnetHealth.status(),
                dotnetHealth.details()
            )
        );

        if (health instanceof CompositeHealthDescriptor compositeHealth) {
            Map<String, HealthDescriptor> actuatorComponents = compositeHealth.getComponents();

            if (actuatorComponents != null) {
                actuatorComponents.forEach((name, componentHealth) -> {
                    if (shouldIncludeComponent(name)) {
                        components.add(
                                new InfrastructureComponentHealth(
                                        formatComponentName(name),
                                        componentHealth.getStatus().getCode(),
                                        getDetails(componentHealth)
                                )
                        );
                    }
                });
            }
        }

        return new InfrastructureHealthResponse(
                "nhl-stats-service-api",
                health.getStatus().getCode(),
                Instant.now(),
                components
        );
    }

    private Map<String, Object> getDetails(HealthDescriptor healthDescriptor) {
        if (healthDescriptor instanceof IndicatedHealthDescriptor indicatedHealth) {
            return indicatedHealth.getDetails();
        }

        return null;
    }

    private boolean shouldIncludeComponent(String name) {
        return switch (name) {
            case "elasticsearch", "rabbit", "diskSpace" -> true;
            default -> false;
        };
    }

    private String formatComponentName(String name) {
        return switch (name) {
            case "elasticsearch" -> "OpenSearch";
            case "rabbit" -> "RabbitMQ";
            case "diskSpace" -> "Disk Space";
            case "ping" -> "Spring Ping";
            default -> name;
        };
    }

    public record InfrastructureHealthResponse(
            String service,
            String status,
            Instant checkedAtUtc,
            List<InfrastructureComponentHealth> components
    ) {
    }

    public record InfrastructureComponentHealth(
            String name,
            String status,
            Map<String, Object> details
    ) {
    }
}
