package com.game_monitor.nhl_stats_service.repositories;

import com.game_monitor.nhl_stats_service.models.PlayerGameLogDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface PlayerGameLogRepository extends ElasticsearchRepository<PlayerGameLogDocument, String> {

}
