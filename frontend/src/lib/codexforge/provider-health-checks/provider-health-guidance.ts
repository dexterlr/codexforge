import type { ProviderHealthState } from "./provider-health-types";

export function buildProviderHealthGuidance(status: ProviderHealthState): string {
  const guidance: Record<ProviderHealthState, string> = {
    configured: "Good for recommendation logic, still no real provider call from this screen.",
    "missing-key": "Set the key in your shell or .env.local, then keep the browser on status text only.",
    "manual-only": "Best for subscriptions where you copy a prompt into the official website yourself.",
    "local-server-expected": "Best for private drafts after you start the local app yourself.",
    planned: "Useful as a future option, blocked for deterministic routing today.",
    unavailable: "Treat as blocked until setup is clearer.",
    unknown: "Needs review before a novice should rely on it.",
  };
  return guidance[status];
}
