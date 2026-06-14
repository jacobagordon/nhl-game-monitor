using System.Text.Json.Serialization;

namespace nhl_game_monitor.src.Models
{
    public class Schedule
    {
        [JsonPropertyName("gameWeek")]
        public IEnumerable<GameWeek>? GameWeek { get; set; }
    }

    public class GameWeek
    {
        [JsonPropertyName("date")]
        public DateTime Date { get; set; }
        [JsonPropertyName("games")]
        public IEnumerable<Game>? Games { get; set; }
    }

    public class Game
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("gameType")]
        public int GameType { get; set; }
        [JsonPropertyName("gameState")]
        public string? GameState { get; set; }
    }
}