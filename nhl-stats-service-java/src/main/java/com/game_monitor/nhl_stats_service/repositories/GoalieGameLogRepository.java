package com.game_monitor.nhl_stats_service.repositories;

import com.game_monitor.nhl_stats_service.models.GoalieGameLogDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface GoalieGameLogRepository
        extends ElasticsearchRepository<GoalieGameLogDocument, String> {
}
