package com.game_monitor.nhl_stats_service.repositories;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.game_monitor.nhl_stats_service.models.GoalieGameLogDocument;

public interface GoalieGameLogRepository
        extends ElasticsearchRepository<GoalieGameLogDocument, String> {
}