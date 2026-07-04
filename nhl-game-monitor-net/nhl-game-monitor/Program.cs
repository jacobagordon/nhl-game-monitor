using nhl_game_monitor.src.Worker;
using nhl_game_monitor.src.Services;
using nhl_game_monitor.src.Accessors;
using nhl_game_monitor.src.State;
using nhl_game_monitor.src.Messaging;
using System.Net.Http.Headers;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient<INHLApiAccessor, NHLApiAccessor>(client =>
{
    client.BaseAddress = new Uri("https://api-web.nhle.com/v1/");
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    client.Timeout = TimeSpan.FromSeconds(10);
});

builder.Services.Configure<RabbitMQSettings>(
    builder.Configuration.GetSection("RabbitMQ"));

builder.Services.AddSingleton<IEventPublisher, RabbitMQEventPublisher>();
builder.Services.AddSingleton<GameMonitorState>();
builder.Services.AddSingleton<NHLGameService>();
builder.Services.AddSingleton<RabbitMQHealthService>();
builder.Services.AddHostedService<Worker>();
builder.Services.AddControllers();
builder.Services.AddHealthChecks();

builder.Logging.AddConfiguration(builder.Configuration.GetSection("Logging"));

var app = builder.Build();
app.MapGet("/health", async (RabbitMQHealthService rabbitMqHealthService) =>
{
    var rabbitMqHealth = await rabbitMqHealthService.CheckHealthAsync();

    var overallStatus = rabbitMqHealth.Status == "Healthy"
        ? "Healthy"
        : "Degraded";

    return Results.Ok(new
    {
        service = "nhl-game-monitor",
        status = overallStatus,
        checkedAtUtc = DateTime.UtcNow,
        rabbitMq = rabbitMqHealth
    });
});
app.MapControllers();
app.Run();
