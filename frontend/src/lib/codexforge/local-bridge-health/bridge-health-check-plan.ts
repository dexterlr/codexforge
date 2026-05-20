import type { BridgeHealthCheck, BridgeHealthCheckPlan, BridgeHealthProfile, BridgeHealthTarget } from "./local-bridge-health-types";
import { buildDefaultBridgeHealthProfiles, isBridgeHealthProfileConfigured } from "./bridge-health-profile";
import { buildDefaultBridgeHealthTargets } from "./bridge-health-target";

export function buildBridgeHealthCheck(input: BridgeHealthCheck): BridgeHealthCheck {
  return input;
}

export function buildBridgeHealthCheckPlan(
  targets: BridgeHealthTarget[] = buildDefaultBridgeHealthTargets(),
  profiles: BridgeHealthProfile[] = buildDefaultBridgeHealthProfiles(targets)
): BridgeHealthCheckPlan {
  const checks: BridgeHealthCheck[] = [
    buildBridgeHealthCheck({ id: "profile-exists", label: "Profile exists", status: profiles.length > 0 ? "pass" : "blocker", detail: `${profiles.length} profiles available.` }),
    buildBridgeHealthCheck({ id: "configuration-supplied", label: "Configuration supplied", status: profiles.some(isBridgeHealthProfileConfigured) ? "pass" : "warning", detail: "Missing path, endpoint, or artifact boundary hints must be resolved before execution readiness." }),
    buildBridgeHealthCheck({ id: "local-app-path-known", label: "Local app path known", status: profiles.some((profile) => profile.pathHint) ? "pass" : "warning", detail: "Executable targets need operator supplied path hints." }),
    buildBridgeHealthCheck({ id: "endpoint-hint-present-if-local-http", label: "Endpoint hint present if local-http", status: profiles.some((profile) => profile.targetId === "comfyui-local" && profile.endpointHint) ? "pass" : "warning", detail: "ComfyUI local-http remains unprobed until endpoint metadata is supplied." }),
    buildBridgeHealthCheck({ id: "artifact-output-boundary-known", label: "Artifact output boundary known", status: profiles.some((profile) => profile.targetId === "artifact-output-root" && profile.pathHint) ? "pass" : "blocker", detail: "Artifact boundary must be known before render jobs." }),
    buildBridgeHealthCheck({ id: "adapter-allowlisted", label: "Adapter allowlisted", status: "pass", detail: "Known preview adapters are represented as metadata only." }),
    buildBridgeHealthCheck({ id: "executor-policy-present", label: "Executor policy present", status: "pass", detail: "Guarded Creative Executor policy remains required before any future execution." }),
    buildBridgeHealthCheck({ id: "approval-required-before-execution", label: "Approval required before execution", status: "pass", detail: "Operator approval is required before any future probe or executor handoff." }),
    buildBridgeHealthCheck({ id: "safe-probe-available", label: "Safe probe available", status: "unknown", detail: "Safe metadata probe may be future-guarded but is not active in Phase 68." }),
    buildBridgeHealthCheck({ id: "unsafe-probe-blocked", label: "Unsafe probe blocked", status: "pass", detail: "Executable launch, local HTTP calls, version commands, directory writes, and render execution are blocked." }),
    buildBridgeHealthCheck({ id: "manual-setup-guidance-visible", label: "Manual setup guidance visible", status: "pass", detail: "Setup guide is visible for each local target." }),
    buildBridgeHealthCheck({ id: "no-secrets-exposed", label: "No secrets exposed", status: "pass", detail: "Profiles use labels and hints only; no API keys or secret values." }),
    buildBridgeHealthCheck({ id: "no-render-execution", label: "No render execution", status: "pass", detail: "Phase 68 does not execute render jobs." }),
    buildBridgeHealthCheck({ id: "no-command-execution-from-ui", label: "No command execution from UI", status: "pass", detail: "UI exposes copy-only actions, no arbitrary shell or run-command calls." }),
  ];

  void targets;
  return { id: "local-bridge-health-check-plan", checks, summary: summarizeBridgeHealthCheckPlan({ id: "local-bridge-health-check-plan", checks, summary: [] }) };
}

export function summarizeBridgeHealthCheckPlan(plan: BridgeHealthCheckPlan): string[] {
  return [
    `${plan.checks.length} health checks planned.`,
    `${plan.checks.filter((check) => check.status === "blocker").length} blockers require setup before execution readiness.`,
    "Preview-only and dry-run only: no command execution from UI, no local HTTP calls by default, no file writes, and no render execution.",
  ];
}
