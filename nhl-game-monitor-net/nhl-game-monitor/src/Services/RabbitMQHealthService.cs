using Microsoft.Extensions.Options;
using nhl_game_monitor.src.Messaging;
using RabbitMQ.Client;

public class RabbitMQHealthService
{
    private readonly RabbitMQSettings _rabbitMqSettings;

    public RabbitMQHealthService(IOptions<RabbitMQSettings> rabbitMqOptions)
    {
        _rabbitMqSettings = rabbitMqOptions.Value;
    }

    public async Task<RabbitMQHealthResult> CheckHealthAsync()
    {
        try
        {
            var factory = new ConnectionFactory
            {
                HostName = _rabbitMqSettings.HostName,
                Port = _rabbitMqSettings.Port,
                UserName = _rabbitMqSettings.UserName,
                Password = _rabbitMqSettings.Password
            };

            using var connection = await factory.CreateConnectionAsync();
            using var channel = await connection.CreateChannelAsync();

            return new RabbitMQHealthResult
            {
                Status = "UP",
                Host = _rabbitMqSettings.HostName,
                Port = _rabbitMqSettings.Port,
                Error = null
            };
        }
        catch (Exception ex)
        {
            return new RabbitMQHealthResult
            {
                Status = "DOWN",
                Host = _rabbitMqSettings.HostName,
                Port = _rabbitMqSettings.Port,
                Error = ex.Message
            };
        }
    }
}

public class RabbitMQHealthResult
{
    public string Status { get; set; } = string.Empty;
    public string Host { get; set; } = string.Empty;
    public int Port { get; set; }
    public string? Error { get; set; }
}