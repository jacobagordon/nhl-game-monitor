using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using nhl_game_monitor.src.Services;

namespace nhl_game_monitor.src.Controllers
{
    [ApiController]
    [Route("api/scheduleDate")]
    public class NHLGameSchedulerController : ControllerBase
    {
        private readonly NHLGameService _nhlGameService;
        private readonly ILogger<NHLGameSchedulerController> _logger;

        public NHLGameSchedulerController(
            NHLGameService nhlGameService,
            ILogger<NHLGameSchedulerController> logger)
        {
            _nhlGameService = nhlGameService;
            _logger = logger;
        }

        [HttpPut("{date}")]
        public async Task<IActionResult> StartGameCheckForDate(string date, CancellationToken cancellationToken)
        {
            if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var scheduleDate))
            {
                return BadRequest("Invalid date format. Use yyyy-MM-dd.");
            }

            _logger.LogInformation("Starting NHL flow for date {Date}", scheduleDate);

            try
            {
                await _nhlGameService.CheckForCompletedGamesAsync(scheduleDate, cancellationToken);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                _logger.LogError(ex, "Failed to check for completed games for date {Date}", scheduleDate);
                return StatusCode(502, $"Failed to check schedule for {scheduleDate}. Try again.");
            }

            return Accepted(new { Date = scheduleDate });
        }
    }
}
