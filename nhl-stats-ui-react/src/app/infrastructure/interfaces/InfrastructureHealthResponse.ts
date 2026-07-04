export type InfrastructureStatus = "UP" | "DOWN";

export interface InfrastructureHealthResponse {
  service: string;
  status: InfrastructureStatus;
  checkedAtUtc: string;
  components: InfrastructureComponentHealth[];
}

export interface InfrastructureComponentHealth {
  name: string;
  status: InfrastructureStatus;
  details: Record<string, unknown> | null;
}
