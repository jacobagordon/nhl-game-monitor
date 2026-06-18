using nhl_game_monitor.src.Models.Events;

namespace nhl_game_monitor.src.Messaging;

public interface IEventPublisher
{
    Task PublishEventAsync<T>(T eventPayloadt, string routingKey, CancellationToken cancellationToken = default);
}