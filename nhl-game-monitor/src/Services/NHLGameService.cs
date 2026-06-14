using nhl_game_monitor.src.Models;
using nhl_game_monitor.src.Accessors;

namespace nhl_game_monitor.src.Services
{
    public class NHLGameService
    {
        private readonly NHLApiAccessor _apiAccessor;
        private readonly ILogger<NHLGameService> _logger;

        public NHLGameService(NHLApiAccessor apiAccessor, ILogger<NHLGameService> logger)
        {
            _apiAccessor = apiAccessor;
            _logger = logger;
        }

        public async Task PollNhlGames()
        {
            string today = DateTime.Today.ToString("yyyy-MM-dd");
            Schedule schedule = await _apiAccessor.GetScheduleDateAsync(today);

            if (_logger.IsEnabled(LogLevel.Information) && schedule?.GameWeek != null)
            {
                var game = schedule.GameWeek.FirstOrDefault()?.Games?.FirstOrDefault();
                if (game != null)
                {
                    _logger.LogInformation("Todays games: {@Game}", game.Id);
                }
                else
                {
                    _logger.LogInformation("Todays games: no games found for {date}", today);
                }
            }
        }
    }
}
