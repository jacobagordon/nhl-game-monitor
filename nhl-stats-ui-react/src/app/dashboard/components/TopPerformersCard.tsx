import { DashboardCard } from "./DashboardCard";
import type { TopPerformer } from "../interfaces/TopPerformer";
import {
    StyledPerformerGroup,
    StyledPerformerGroupLabel,
    StyledPerformerInfo,
    StyledPerformerLogo,
    StyledPerformerMeta,
    StyledPerformerName,
    StyledPerformerRow,
    StyledPerformerStat,
    StyledPerformerStatLabel,
    StyledPerformerStatValue,
    StyledPerformersList,
    StyledRecentGamesEmpty,
} from "../styles/Dashboard.style";

interface TopPerformersCardProps {
    performers: TopPerformer[];
    isLoading: boolean;
    error: string | null;
}

export const TopPerformersCard = ({ performers, isLoading, error }: TopPerformersCardProps) => {
    const skaters = performers.filter(performer => performer.category === "SKATER");
    const goalies = performers.filter(performer => performer.category === "GOALIE");

    return (
        <DashboardCard title="Top Performers">
            {error && <StyledRecentGamesEmpty>{error}</StyledRecentGamesEmpty>}

            {!error && isLoading && (
                <StyledRecentGamesEmpty>Loading top performers...</StyledRecentGamesEmpty>
            )}

            {!error && !isLoading && performers.length === 0 && (
                <StyledRecentGamesEmpty>No standout performances yet</StyledRecentGamesEmpty>
            )}

            {!error && !isLoading && performers.length > 0 && (
                <StyledPerformersList>
                    {skaters.length > 0 && (
                        <StyledPerformerGroup>
                            <StyledPerformerGroupLabel>Top Skaters</StyledPerformerGroupLabel>
                            <PerformerRows performers={skaters} />
                        </StyledPerformerGroup>
                    )}

                    {goalies.length > 0 && (
                        <StyledPerformerGroup>
                            <StyledPerformerGroupLabel>Top Goalies</StyledPerformerGroupLabel>
                            <PerformerRows performers={goalies} />
                        </StyledPerformerGroup>
                    )}
                </StyledPerformersList>
            )}
        </DashboardCard>
    );
};

const PerformerRows = ({ performers }: { performers: TopPerformer[] }) => (
    <>
        {performers.map(performer => (
            <StyledPerformerRow key={`${performer.category}-${performer.playerId}-${performer.gameDate}`}>
                {performer.teamLogoUrl && (
                    <StyledPerformerLogo src={performer.teamLogoUrl} alt={performer.teamAbbreviation} />
                )}

                <StyledPerformerInfo>
                    <StyledPerformerName>{performer.playerFullName}</StyledPerformerName>

                    <StyledPerformerMeta>
                        {performer.position} · {performer.teamAbbreviation} vs{" "}
                        {performer.opponentTeamAbbreviation} · {formatGameDate(performer.gameDate)}
                    </StyledPerformerMeta>
                </StyledPerformerInfo>

                <StyledPerformerStat>
                    <StyledPerformerStatValue>{formatStatValue(performer)}</StyledPerformerStatValue>

                    <StyledPerformerStatLabel>{formatStatLabel(performer)}</StyledPerformerStatLabel>
                </StyledPerformerStat>
            </StyledPerformerRow>
        ))}
    </>
);

const formatStatValue = (performer: TopPerformer): string => {
    if (performer.category === "GOALIE") {
        return `${performer.saves ?? 0}/${performer.shotsAgainst ?? 0}`;
    }

    return `${performer.points ?? 0} PTS`;
};

const formatStatLabel = (performer: TopPerformer): string => {
    if (performer.category === "GOALIE") {
        return performer.savePercentage != null
            ? `${(performer.savePercentage * 100).toFixed(1)}% SV`
            : "SAVES";
    }

    return `${performer.goals ?? 0}G ${performer.assists ?? 0}A`;
};

const formatGameDate = (gameDate: string): string => {
    const [year, month, day] = gameDate.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });
};
