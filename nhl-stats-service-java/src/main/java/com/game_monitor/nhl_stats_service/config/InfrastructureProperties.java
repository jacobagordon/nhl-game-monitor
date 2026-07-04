package com.game_monitor.nhl_stats_service.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "infrastructure")
public class InfrastructureProperties {
    private Services services = new Services();

    public Services getServices() {
        return services;
    }

    public void setServices(Services services) {
        this.services = services;
    }

    public static class Services {
        private ExternalService dotnetMonitor = new ExternalService();

        public ExternalService getDotnetMonitor() {
            return dotnetMonitor;
        }

        public void setDotnetMonitor(ExternalService dotnetMonitor) {
            this.dotnetMonitor = dotnetMonitor;
        }
    }

    public static class ExternalService {
        private String name;
        private String healthUrl;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getHealthUrl() {
            return healthUrl;
        }

        public void setHealthUrl(String healthUrl) {
            this.healthUrl = healthUrl;
        }
    }
}
