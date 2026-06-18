namespace nhl_game_monitor.src.Models.Events;

public class GameCompletedEvent
{
    public required int GameId { get; init; }
    public Guid? CorrelationId { get; init; }
    public string EventType { get; init; } = "GameCompleted";
}