using System.Net.Http;
using System.Text.Json;
using nhl_game_monitor.src.Models;

namespace nhl_game_monitor.src.Accessors
{
    public interface INHLApiAccessor
    {
        Task<Schedule> GetScheduleDateAsync(string date, CancellationToken cancellationToken = default);
    }

    public class NHLApiAccessor : INHLApiAccessor
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl = "https://api-web.nhle.com/v1";

        public NHLApiAccessor(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<Schedule> GetScheduleDateAsync(string date, CancellationToken cancellationToken = default)
        {
            var url = $"{_baseUrl}/schedule/{date}";
            using var response = await _httpClient.GetAsync(url, cancellationToken);
            {
                if (!response.IsSuccessStatusCode)
                {
                    if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                    {
                        throw new InvalidOperationException("Schedule not found for the specified date.");
                    }
                    else
                    {
                        throw new InvalidOperationException("Failed to retrieve schedule.");
                    }
                }

                using var content = await response.Content.ReadAsStreamAsync(cancellationToken);
                {
                    return await JsonSerializer.DeserializeAsync<Schedule>(content, cancellationToken: cancellationToken) ?? throw new InvalidOperationException("Failed to deserialize schedule.");
                }
            }
        }
    }
}
