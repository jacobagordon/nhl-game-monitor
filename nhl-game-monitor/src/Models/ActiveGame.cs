namespace nhl_game_monitor.src.Models
{
    public class ActiveGame
    {
        public int Id { get; set; }
        public DateOnly ScheduleDate { get; set; }
        public DateTimeOffset StartTime { get; set; }
        public string? LastKnownState { get; set; }
    }
}