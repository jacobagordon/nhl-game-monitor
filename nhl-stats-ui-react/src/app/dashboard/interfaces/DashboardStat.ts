import type { ReactNode } from "react";

export interface DashboardStat {
    label: string;
    value: string;
    subtitle: string;
    icon: ReactNode;
}
