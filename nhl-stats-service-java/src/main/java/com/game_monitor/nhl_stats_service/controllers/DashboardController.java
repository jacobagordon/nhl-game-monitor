package com.game_monitor.nhl_stats_service.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.game_monitor.nhl_stats_service.models.DashboardSummaryResponse;
import com.game_monitor.nhl_stats_service.models.RecentGameResponse;
import com.game_monitor.nhl_stats_service.models.TopPerformerResponse;
import com.game_monitor.nhl_stats_service.services.DashboardService;

@RestController
public class DashboardController {
    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/api/dashboard/summary")
    public DashboardSummaryResponse getDashboardSummary() {
        return dashboardService.getDashboardSummary();
    }

    @GetMapping("/api/dashboard/recent-games")
    public List<RecentGameResponse> getRecentGames() {
        return dashboardService.getRecentGames();
    }

    @GetMapping("/api/games")
    public List<RecentGameResponse> getGames(
            @RequestParam(defaultValue = "date-newest") String sortBy) {
        return dashboardService.getGames(sortBy);
    }

    @GetMapping("/api/dashboard/top-performers")
    public List<TopPerformerResponse> getTopPerformers() {
        return dashboardService.getTopPerformers();
    }
}
