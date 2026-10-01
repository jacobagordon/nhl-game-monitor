package com.game_monitor.nhl_stats_service.repositories;

import com.game_monitor.nhl_stats_service.models.GameSummaryDocument;
import java.util.List;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface GameSummaryRepository
        extends ElasticsearchRepository<GameSummaryDocument, String> {

    List<GameSummaryDocument> findTop5ByOrderByGameStartTimeUtcDesc();

    List<GameSummaryDocument> findAllByOrderByGameDateDescGameStartTimeUtcDesc();

    List<GameSummaryDocument> findAllByOrderByGameDateAscGameStartTimeUtcAsc();

    List<GameSummaryDocument> findAllByOrderByTotalGoalsDescGameDateDescGameStartTimeUtcDesc();

    List<GameSummaryDocument> findAllByOrderByTotalGoalsAscGameDateDescGameStartTimeUtcDesc();
}
