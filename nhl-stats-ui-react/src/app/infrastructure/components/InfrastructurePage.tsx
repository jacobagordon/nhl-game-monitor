import type {
    InfrastructureComponentHealth,
    InfrastructureStatus,
} from "../interfaces/InfrastructureHealthResponse";
import { InfrastructureHealthCard } from "./InfrastructureHealthCard";
import {
    StyledInfrastructureGrid,
    StyledInfrastructureHeader,
    StyledInfrastructurePage,
    StyledInfrastructureRefreshButton,
    StyledInfrastructureSubtitle,
    StyledInfrastructureTitle,
} from "../styles/Infrastructure.style";
import { useEffect } from "react";

interface InfrastructurePageProps {
    status: InfrastructureStatus;
    components: InfrastructureComponentHealth[];
    checkedAtUtc: string | null;
    isLoading: boolean;
    error: string | null;
    fetchInfrastructureHealth: () => void;
}

export const InfrastructurePage = ({
    status,
    components,
    checkedAtUtc,
    isLoading,
    error,
    fetchInfrastructureHealth,
}: InfrastructurePageProps) => {
    useEffect(() => {
        fetchInfrastructureHealth();
    }, [fetchInfrastructureHealth]);

    return (
        <StyledInfrastructurePage>
            <StyledInfrastructureHeader>
                <StyledInfrastructureTitle>Infrastructure</StyledInfrastructureTitle>
                <StyledInfrastructureSubtitle>
                    Overall status: {status}
                    {checkedAtUtc
                        ? ` · Last checked: ${new Date(checkedAtUtc).toLocaleString()}`
                        : ""}
                </StyledInfrastructureSubtitle>

                <StyledInfrastructureRefreshButton
                    type="button"
                    onClick={fetchInfrastructureHealth}
                    disabled={isLoading}
                >
                    Refresh
                </StyledInfrastructureRefreshButton>
            </StyledInfrastructureHeader>

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
