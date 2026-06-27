package com.game_monitor.nhl_stats_service.services;

import org.springframework.stereotype.Service;

import com.game_monitor.nhl_stats_service.mappers.GameSummaryMapper;
import com.game_monitor.nhl_stats_service.models.GameBoxscoreResponse;
import com.game_monitor.nhl_stats_service.models.GameSummaryDocument;
import com.game_monitor.nhl_stats_service.repositories.GameSummaryRepository;

@Service
public class GameSummaryService {
    private final GameSummaryRepository gameSummaryRepository;
    private final GameSummaryMapper gameSummaryMapper;

    public GameSummaryService(
            GameSummaryRepository gameSummaryRepository,
            GameSummaryMapper gameSummaryMapper) {
        this.gameSummaryRepository = gameSummaryRepository;
        this.gameSummaryMapper = gameSummaryMapper;
    }

    public void saveGameSummary(GameBoxscoreResponse boxscore) {
        GameSummaryDocument gameSummaryDocument = gameSummaryMapper.mapToDocument(boxscore);

        gameSummaryRepository.save(gameSummaryDocument);

        System.out.println("Saved game summary for game " + boxscore.getId());
    }
}
