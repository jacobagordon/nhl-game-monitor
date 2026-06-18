using nhl_game_monitor.src.Worker;
using nhl_game_monitor.src.Services;
using nhl_game_monitor.src.Accessors;
using nhl_game_monitor.src.State;
using nhl_game_monitor.src.Messaging;
using System.Net.Http.Headers;

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
builder.Services.AddHostedService<Worker>();
builder.Services.AddControllers();

builder.Logging.AddConfiguration(builder.Configuration.GetSection("Logging"));

var app = builder.Build();
app.MapControllers();
app.Run();
