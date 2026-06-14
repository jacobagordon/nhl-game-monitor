using nhl_game_monitor.src.Models;
using nhl_game_monitor.src.Accessors;

namespace nhl_game_monitor.src.Services
{
    public class NHLGameService
    {
        private readonly INHLApiAccessor _apiAccessor;
        private readonly ILogger<NHLGameService> _logger;

        public NHLGameService(INHLApiAccessor apiAccessor, ILogger<NHLGameService> logger)
        {
            _apiAccessor = apiAccessor;
            _logger = logger;
        }

        public async Task CheckForCompletedGamesAsync(CancellationToken cancellationToken)
        {
            Schedule schedule = await GetTodayScheduleAsync(cancellationToken);
        }

        private async Task<Schedule> GetTodayScheduleAsync(CancellationToken cancellationToken)
        {
            string today = DateTime.UtcNow.ToString("yyyy-MM-dd");
            return await _apiAccessor.GetScheduleDateAsync(today, cancellationToken);
        }
    }
}
