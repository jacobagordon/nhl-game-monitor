using System.Text.Json.Serialization;

namespace nhl_game_monitor.src.Models.Events;

public class GameCompletedEvent
{
    [JsonPropertyName("gameId")]
    public required int GameId { get; init; }
    [JsonPropertyName("correlationId")]
    public Guid? CorrelationId { get; init; }
    [JsonPropertyName("eventType")]
    public string EventType { get; init; } = "GameCompleted";
}