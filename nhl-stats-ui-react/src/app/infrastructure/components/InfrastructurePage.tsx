import type {
    InfrastructureComponentHealth,
    InfrastructureStatus,
} from "../interfaces/InfrastructureHealthResponse";
import { InfrastructureHealthCard } from "./InfrastructureHealthCard";
import {
    StyledInfrastructureGrid,
    StyledInfrastructureHeader,
    StyledInfrastructureHeaderTop,
    StyledInfrastructurePage,
    StyledInfrastructureRefreshButton,
    StyledInfrastructureSubtitle,
    StyledInfrastructureTitle,
} from "../styles/Infrastructure.style";
import { useEffect, useState } from "react";
import { InfrastructurePageHeader } from "./InfrastructurePageHeader";

interface InfrastructurePageProps {
    status: InfrastructureStatus;
    components: InfrastructureComponentHealth[];
    checkedAtUtc: string | null;
    isLoading: boolean;
    error: string | null;
    fetchInfrastructureHealth: () => void;
    triggerScheduleDateProcessing: (date: string) => void;
}

export const InfrastructurePage = ({
    status,
    components,
    checkedAtUtc,
    isLoading,
    error,
    fetchInfrastructureHealth,
    triggerScheduleDateProcessing,
}: InfrastructurePageProps) => {
    useEffect(() => {
        fetchInfrastructureHealth();
    }, [fetchInfrastructureHealth]);

    const [scheduleDate, setScheduleDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    );

    return (
        <StyledInfrastructurePage>
            <InfrastructurePageHeader
                status={status}
                checkedAtUtc={checkedAtUtc}
                isLoading={isLoading}
                fetchInfrastructureHealth={fetchInfrastructureHealth}
            />

            <div>
                <label htmlFor="schedule-date">Schedule Date</label>

                <input
                    id="schedule-date"
                    type="date"
                    value={scheduleDate}
                    onChange={event => setScheduleDate(event.target.value)}
                />

                <StyledInfrastructureRefreshButton
                    type="button"
                    onClick={() => triggerScheduleDateProcessing(scheduleDate)}
                >
                    Process Game Logs
                </StyledInfrastructureRefreshButton>
            </div>

            {isLoading && (
                <StyledInfrastructureSubtitle>
                    Loading infrastructure health...
                </StyledInfrastructureSubtitle>
            )}

            {error && <StyledInfrastructureSubtitle>{error}</StyledInfrastructureSubtitle>}

            {!isLoading && !error && (
                <StyledInfrastructureGrid>
                    {components.map(component => (
                        <InfrastructureHealthCard key={component.name} component={component} />
                    ))}
                </StyledInfrastructureGrid>
            )}
        </StyledInfrastructurePage>
    );
};
