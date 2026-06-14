using nhl_game_monitor.src.Services;

namespace nhl_game_monitor.src.Worker;

public class Worker(ILogger<Worker> logger, NHLGameService nhlGameService) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            if (logger.IsEnabled(LogLevel.Information))
            {
                logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            }
            await nhlGameService.CheckForCompletedGamesAsync(stoppingToken);

            await Task.Delay(20000, stoppingToken);
        }
    }
}
