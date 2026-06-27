package com.game_monitor.nhl_stats_service.repositories;

import com.game_monitor.nhl_stats_service.models.GameSummaryDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface GameSummaryRepository extends ElasticsearchRepository<GameSummaryDocument, String> {

}
