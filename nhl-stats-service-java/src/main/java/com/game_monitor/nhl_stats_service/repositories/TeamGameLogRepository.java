package com.game_monitor.nhl_stats_service.repositories;

import com.game_monitor.nhl_stats_service.models.TeamGameLogDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface TeamGameLogRepository
        extends ElasticsearchRepository<TeamGameLogDocument, String> {
}
