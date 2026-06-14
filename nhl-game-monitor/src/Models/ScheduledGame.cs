namespace nhl_game_monitor.src.Models
{
    public class ScheduledGame
    {
        public int Id { get; set; }
        public DateOnly ScheduleDate { get; set; }
        public DateTimeOffset StartTime { get; set; }
    }
}