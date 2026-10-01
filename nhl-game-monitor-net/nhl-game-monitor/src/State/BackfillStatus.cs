namespace nhl_game_monitor.src.State;

public sealed class BackfillStatus
{
    private bool _isBackfilling = true;

    public bool IsBackfilling => Volatile.Read(ref _isBackfilling);

    public void Start() => Volatile.Write(ref _isBackfilling, true);

    public void Complete() => Volatile.Write(ref _isBackfilling, false);
}
