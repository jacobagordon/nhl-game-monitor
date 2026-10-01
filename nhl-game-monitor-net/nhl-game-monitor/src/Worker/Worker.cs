using System.Globalization;
using nhl_game_monitor.src.Services;
using nhl_game_monitor.src.State;

namespace nhl_game_monitor.src.Worker;

public class Worker(
    ILogger<Worker> logger,
    NHLGameService nhlGameService,
    IConfiguration configuration,
    BackfillStatus backfillStatus) : BackgroundService
{
    private readonly DateOnly _backfillStartDate = DateOnly.ParseExact(
        configuration["Backfill:StartDate"] ?? "2026-09-28",
        "yyyy-MM-dd",
        CultureInfo.InvariantCulture);
    private readonly int _replayDays = int.TryParse(configuration["Backfill:ReplayDays"], out var replayDays)
        ? Math.Max(1, replayDays)
        : 3;
    private readonly string _checkpointPath = Path.GetFullPath(
        configuration["Backfill:CheckpointPath"] ?? Path.Combine(AppContext.BaseDirectory, "data", "last-processed-date.txt"));
    private DateOnly? _lastProcessedDate;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await BackfillMissedDatesAsync(stoppingToken);
                break;
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                logger.LogError(ex, "Startup backfill failed; it will retry from the last completed date");
                await Task.Delay(20000, stoppingToken);
            }
        }

        /*
            while (!stoppingToken.IsCancellationRequested)
            {
                if (logger.IsEnabled(LogLevel.Information))
                {
                    logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
                }

                try
                {
                    var currentDate = DateOnly.FromDateTime(DateTime.UtcNow);
                    await nhlGameService.CheckForCompletedGamesAsync(currentDate, stoppingToken);
                    await SaveCheckpointAsync(currentDate, stoppingToken);
                }
                catch (Exception ex) when (ex is not OperationCanceledException)
                {
                    logger.LogError(ex, "Worker failed to check for completed games");
                }

                await Task.Delay(20000, stoppingToken);
            }
            */
    }

    private async Task BackfillMissedDatesAsync(CancellationToken cancellationToken)
    {
        backfillStatus.Start();
        var firstDate = _backfillStartDate;

        if (File.Exists(_checkpointPath))
        {
            var checkpointText = await File.ReadAllTextAsync(_checkpointPath, cancellationToken);
            if (!DateOnly.TryParseExact(
                    checkpointText.Trim(),
                    "yyyy-MM-dd",
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out var lastProcessedDate))
            {
                throw new InvalidDataException($"Invalid backfill checkpoint at '{_checkpointPath}'.");
            }

            _lastProcessedDate = lastProcessedDate;
            var replayStartDate = lastProcessedDate.AddDays(1 - _replayDays);
            firstDate = replayStartDate > _backfillStartDate ? replayStartDate : _backfillStartDate;
        }

        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        for (var date = firstDate; date <= today; date = date.AddDays(1))
        {
            cancellationToken.ThrowIfCancellationRequested();
            logger.LogInformation("Backfilling completed games for {Date}", date);
            await nhlGameService.CheckForCompletedGamesAsync(date, cancellationToken);
            await SaveCheckpointAsync(date, cancellationToken);
        }

        backfillStatus.Complete();
    }

    private async Task SaveCheckpointAsync(DateOnly date, CancellationToken cancellationToken)
    {
        if (_lastProcessedDate.HasValue && date <= _lastProcessedDate.Value)
        {
            return;
        }

        var directory = Path.GetDirectoryName(_checkpointPath);
        if (!string.IsNullOrEmpty(directory))
        {
            Directory.CreateDirectory(directory);
        }

        var temporaryPath = _checkpointPath + ".tmp";
        await File.WriteAllTextAsync(
            temporaryPath,
            date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
            cancellationToken);
        File.Move(temporaryPath, _checkpointPath, overwrite: true);
        _lastProcessedDate = date;
        logger.LogInformation("Saved backfill checkpoint through {Date}", date);
    }
}
