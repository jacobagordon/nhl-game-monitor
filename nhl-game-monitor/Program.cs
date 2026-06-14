using nhl_game_monitor.src.Worker;
using nhl_game_monitor.src.Services;
using nhl_game_monitor.src.Accessors;
using System.Net.Http.Headers;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHttpClient<INHLApiAccessor, NHLApiAccessor>(client =>
{
    client.BaseAddress = new Uri("https://api-web.nhle.com/v1/");
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
});
builder.Services.AddSingleton<NHLGameService>();
builder.Services.AddHostedService<Worker>();

builder.Logging.AddConfiguration(builder.Configuration.GetSection("Logging"));
var host = builder.Build();
host.Run();
