import type { MvpPathDefinition } from "./mvp-working-path-types";
import { buildMvpPathStep } from "./mvp-path-step";

export function buildMvpPathDefinition(): MvpPathDefinition {
  return { title: "Locked coding MVP path", canonical: true, steps: [
    buildMvpPathStep({ order: 1, route: "/start", label: "Start", primaryAction: "Choose coding MVP path", advanced: false }),
    buildMvpPathStep({ order: 2, route: "/code-flow/live-run", label: "Live run", primaryAction: "Start guided run", advanced: false }),
    buildMvpPathStep({ order: 3, route: "/files", label: "Files", primaryAction: "Pick safe file", advanced: false }),
    buildMvpPathStep({ order: 4, route: "/guarded-apply-mvp", label: "Guarded apply", primaryAction: "Review apply request", advanced: false }),
    buildMvpPathStep({ order: 5, route: "/apply-evidence", label: "Apply evidence", primaryAction: "Capture apply evidence", advanced: false }),
    buildMvpPathStep({ order: 6, route: "/validation-results", label: "Validation", primaryAction: "Capture validation result", advanced: false }),
    buildMvpPathStep({ order: 7, route: "/workflow-results", label: "Workflow result", primaryAction: "Review workflow result", advanced: false }),
    buildMvpPathStep({ order: 8, route: "/run-history", label: "Run history", primaryAction: "Review run history", advanced: false }),
    buildMvpPathStep({ order: 9, route: "/closed-loop", label: "Closed loop if failed", primaryAction: "Route failed validation", advanced: false }),
    buildMvpPathStep({ order: 10, route: "/code-flow/release-audit", label: "Release audit", primaryAction: "Review release audit", advanced: false }),
  ] };
}
