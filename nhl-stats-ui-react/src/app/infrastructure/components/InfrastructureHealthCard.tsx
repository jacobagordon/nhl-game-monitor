import type { InfrastructureComponentHealth } from "../interfaces/InfrastructureHealthResponse";
import {
    StyledDetailKey,
    StyledDetailsList,
    StyledDetailValue,
    StyledEmptyDetails,
    StyledInfrastructureCard,
    StyledInfrastructureCardHeader,
    StyledInfrastructureCardTitle,
    StyledStatusBadge,
} from "../styles/Infrastructure.style";

interface InfrastructureHealthCardProps {
    component: InfrastructureComponentHealth;
}

export const InfrastructureHealthCard = ({ component }: InfrastructureHealthCardProps) => {
    const details = getDisplayDetails(component.details);

    return (
        <StyledInfrastructureCard status={component.status}>
            <StyledInfrastructureCardHeader>
                <StyledInfrastructureCardTitle>{component.name}</StyledInfrastructureCardTitle>
                <StyledStatusBadge status={component.status}>{component.status}</StyledStatusBadge>
            </StyledInfrastructureCardHeader>

            {details.length > 0 ? (
                <StyledDetailsList>
                    {details.map(([key, value]) => (
                        <div key={key}>
                            <StyledDetailKey>{key}</StyledDetailKey>
                            <StyledDetailValue>{value}</StyledDetailValue>
                        </div>
                    ))}
                </StyledDetailsList>
            ) : (
                <StyledEmptyDetails>No additional details</StyledEmptyDetails>
            )}
        </StyledInfrastructureCard>
    );
};

const getDisplayDetails = (details: Record<string, unknown> | null): [string, string][] => {
    if (!details) {
        return [];
    }

    return Object.entries(details)
        .filter(([, value]) => value !== null && value !== undefined)
        .map(([key, value]) => [formatKey(key), formatValue(value)]);
};

const formatKey = (key: string) =>
    key
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/^./, firstLetter => firstLetter.toUpperCase());

const formatValue = (value: unknown): string => {
    if (typeof value === "string") {
        return value;
    }

    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }

    return JSON.stringify(value);
};
