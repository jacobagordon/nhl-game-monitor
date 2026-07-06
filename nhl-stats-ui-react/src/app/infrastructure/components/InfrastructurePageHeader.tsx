import type { InfrastructureStatus } from "../interfaces/InfrastructureHealthResponse";
import {
    StyledInfrastructureHeader,
    StyledInfrastructureHeaderTop,
    StyledInfrastructureRefreshButton,
    StyledInfrastructureSubtitle,
    StyledInfrastructureTitle,
} from "../styles/Infrastructure.style";

interface InfrastructurePageHeaderProps {
    status: InfrastructureStatus;
    checkedAtUtc: string | null;
    isLoading: boolean;
    fetchInfrastructureHealth: () => void;
}

export const InfrastructurePageHeader = ({
    status,
    checkedAtUtc,
    isLoading,
    fetchInfrastructureHealth,
}: InfrastructurePageHeaderProps) => {
    return (
        <StyledInfrastructureHeader>
            <StyledInfrastructureHeaderTop>
                <StyledInfrastructureTitle>Infrastructure</StyledInfrastructureTitle>

                <StyledInfrastructureRefreshButton
                    type="button"
                    onClick={fetchInfrastructureHealth}
                    disabled={isLoading}
                >
                    {isLoading ? "Refreshing..." : "Refresh"}
                </StyledInfrastructureRefreshButton>
            </StyledInfrastructureHeaderTop>

            <StyledInfrastructureSubtitle>
                Overall status: {status}
                {checkedAtUtc ? ` · Last checked: ${new Date(checkedAtUtc).toLocaleString()}` : ""}
            </StyledInfrastructureSubtitle>
        </StyledInfrastructureHeader>
    );
};
