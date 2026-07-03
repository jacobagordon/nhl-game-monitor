import type { ReactNode } from "react";
import { StyledDashboardCard, StyledDashboardCardAction, StyledDashboardCardBody, StyledDashboardCardHeader } from "../styles/Dashboard.style";

interface DashboardCardProps {
  title: string;
  actionLabel?: string;
  children: ReactNode;
}

export const DashboardCard = ({
  title,
  actionLabel,
  children,
}: DashboardCardProps) => {
  return (
    <StyledDashboardCard>
      <StyledDashboardCardHeader>
        <h2>{title}</h2>

        {actionLabel && (
          <StyledDashboardCardAction>
            {actionLabel}
          </StyledDashboardCardAction>
        )}
      </StyledDashboardCardHeader>

      <StyledDashboardCardBody>{children}</StyledDashboardCardBody>
    </StyledDashboardCard>
  );
}