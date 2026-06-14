using nhl_game_monitor.src.Models;

namespace nhl_game_monitor.src.State
{
    public class GameMonitorState
    {
        public DateOnly? LoadedScheduleDate { get; set; }
        public List<ScheduledGame> ScheduledGames { get; } = [];
        public List<ActiveGame> ActiveGames { get; } = [];
    }
}