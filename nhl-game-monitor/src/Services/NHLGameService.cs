using nhl_game_monitor.src.Models;
using nhl_game_monitor.src.State;
using nhl_game_monitor.src.Accessors;

namespace nhl_game_monitor.src.Services
{
    public class NHLGameService
    {
        private readonly INHLApiAccessor _apiAccessor;
        private readonly GameMonitorState _state;
        private readonly ILogger<NHLGameService> _logger;

        public NHLGameService(INHLApiAccessor apiAccessor, GameMonitorState state, ILogger<NHLGameService> logger)
        {
            _apiAccessor = apiAccessor;
            _state = state;
            _logger = logger;
        }

        public async Task CheckForCompletedGamesAsync(CancellationToken cancellationToken)
        {
            await RefreshScheduleAsync(cancellationToken);
            ActivateScheduledGames();
            await PollActiveGamesAsync(cancellationToken);
        }

        private async Task RefreshScheduleAsync(CancellationToken cancellationToken)
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            if (_state.LoadedScheduleDate == today)
            {
                return;
            }

            _logger.LogInformation("Refreshing schedule for {Date}", today);

            var schedule = await GetTodayScheduleAsync(cancellationToken);

            _state.ScheduledGames.Clear();
            _state.LoadedScheduleDate = today;

            if (schedule.GameWeek == null)
            {
                _logger.LogWarning("No game weeks found for {Date}", today);
                return;
            }

            var todayGames = schedule.GameWeek.FirstOrDefault();

            if (todayGames == null || todayGames.Games == null)
            {
                _logger.LogInformation("No games found for {Date}", today);
                return;
            }

            foreach (var game in todayGames.Games)
            {
                _state.ScheduledGames.Add(new ScheduledGame
                {
                    Id = game.Id,
                    ScheduleDate = today,
                    StartTime = game.StartTime
                });
            }

            _logger.LogInformation("Loaded {count} scheduled games", _state.ScheduledGames.Count);
        }

        private void ActivateScheduledGames()
        {
            var now = DateTimeOffset.UtcNow;

            var startedGames = _state.ScheduledGames.Where(game => game.StartTime <= now).ToList();

            foreach (var game in startedGames)
            {
                _state.ActiveGames.Add(new ActiveGame
                {
                    Id = game.Id,
                    ScheduleDate = game.ScheduleDate,
                    StartTime = game.StartTime
                });

                _state.ScheduledGames.Remove(game);

                _logger.LogInformation("Activated scheduled game {Id}", game.Id);
            }
        }

        private async Task PollActiveGamesAsync(CancellationToken cancellationToken)
        {
            var now = DateTimeOffset.UtcNow;

            var gamesToPoll = _state.ActiveGames
                .Where(g => now >= g.StartTime.AddHours(2))
                .ToList();

            if (!gamesToPoll.Any())
            {
                return;
            }

            var schedule = await _apiAccessor.GetScheduleDateAsync(
                gamesToPoll.First().ScheduleDate.ToString("yyyy-MM-dd"),
                cancellationToken);

            if (schedule.GameWeek == null || !schedule.GameWeek.Any())
            {
                _logger.LogWarning("No game weeks found for {Date} when polling active games", gamesToPoll.First().ScheduleDate.ToString("yyyy-MM-dd"));
                return;
            }

            var allGames = schedule.GameWeek
                .Where(gameWeek => gameWeek.Games != null)
                .SelectMany(gameWeek => gameWeek.Games!)
                .ToDictionary(game => game.Id);

            foreach (var activeGame in gamesToPoll)
            {
                if (!allGames.TryGetValue(activeGame.Id, out var apiGame))
                {

                    _logger.LogWarning("Active game {GameId} was not found in the schedule response.", activeGame.Id);
                    continue;
                }

                if (activeGame.LastKnownState != "OFF" &&
                    apiGame.GameState == "OFF")
                {
                    _logger.LogInformation("Game {GameId} completed", activeGame.Id);

                    // TODO: Publish RabbitMQ event

                    _state.ActiveGames.Remove(activeGame);

                    continue;
                }

                activeGame.LastKnownState = apiGame.GameState;
            }
        }

        private async Task<Schedule> GetTodayScheduleAsync(CancellationToken cancellationToken)
        {
            string today = DateTime.UtcNow.ToString("yyyy-MM-dd");
            return await _apiAccessor.GetScheduleDateAsync(today, cancellationToken);
        }
    }
}
