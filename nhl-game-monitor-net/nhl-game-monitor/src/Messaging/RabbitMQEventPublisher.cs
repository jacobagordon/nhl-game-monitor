using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using nhl_game_monitor.src.Models.Events;

namespace nhl_game_monitor.src.Messaging;

public class RabbitMQEventPublisher : IEventPublisher, IDisposable
{
    private IConnection? _connection;
    private IChannel? _channel;
    private readonly RabbitMQSettings _settings;
    private readonly ConnectionFactory _factory;

    public RabbitMQEventPublisher(IOptions<RabbitMQSettings> settings)
    {
        _settings = settings?.Value ?? throw new ArgumentNullException(nameof(settings));

        _factory = new ConnectionFactory
        {
            HostName = _settings.HostName,
            Port = _settings.Port,
            UserName = _settings.UserName,
            Password = _settings.Password,
            VirtualHost = _settings.VirtualHost
        };
    }

    public async Task PublishEventAsync<T>(T eventPayload, string routingKey, CancellationToken cancellationToken = default)
    {
        if (eventPayload is null)
        {
            throw new ArgumentNullException(nameof(eventPayload));
        }

        await EnsureConnectedAsync();

        var body = JsonSerializer.SerializeToUtf8Bytes(eventPayload);

        await _channel!.BasicPublishAsync(
            exchange: _settings.Exchange,
            routingKey: routingKey,
            body: body,
            cancellationToken: cancellationToken);
    }

    // Added to fix issue where RabbitMQ isn't deployed yet, leading to the service failing to start
    private async Task EnsureConnectedAsync()
    {
        if (_connection != null)
        {
            return;
        }

        _connection = await _factory.CreateConnectionAsync();
        _channel = await _connection.CreateChannelAsync();
    }

    public void Dispose()
    {
        _connection?.Dispose();
    }
}

public sealed class RabbitMQSettings
{
    public string HostName { get; init; } = "rabbitmq";
    public int Port { get; init; } = 5672;
    public string UserName { get; init; } = "admin";
    public string Password { get; init; } = "password";
    public string VirtualHost { get; init; } = "/";
    public string Exchange { get; init; } = "nhl.events";
}