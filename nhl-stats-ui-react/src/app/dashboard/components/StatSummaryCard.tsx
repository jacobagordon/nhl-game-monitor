import type { DashboardStat } from "../interfaces/DashboardStat";
import {
    StyledStatSummaryCard,
    StyledStatSummaryIcon,
    StyledStatSummaryLabel,
    StyledStatSummarySubtitle,
    StyledStatSummaryValue,
} from "../styles/Dashboard.style";

interface StatSummaryCardProps {
    stat: DashboardStat;
}

export const StatSummaryCard = ({ stat }: StatSummaryCardProps) => {
    return (
        <StyledStatSummaryCard>
            <StyledStatSummaryIcon />

            <div>
                <StyledStatSummaryValue>{stat.value}</StyledStatSummaryValue>
                <StyledStatSummaryLabel>{stat.label}</StyledStatSummaryLabel>
                <StyledStatSummarySubtitle>{stat.subtitle}</StyledStatSummarySubtitle>
            </div>
        </StyledStatSummaryCard>
    );
};
