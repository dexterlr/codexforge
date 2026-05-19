import type {
  CreativeAdapterCatalogItem,
  CreativeBridgeHealthCheck,
  CreativeBridgeHealthReport,
  CreativeBridgeHealthStatus,
  CreativeBridgeProfile,
} from "./creative-local-bridge-types";
import { buildCreativeAdapterCatalog } from "./creative-adapter-catalog";
import { buildDefaultCreativeBridgeProfiles } from "./creative-bridge-profile";

export function buildCreativeBridgeHealthCheck(
  id: string,
  label: string,
  status: CreativeBridgeHealthStatus,
  detail: string
): CreativeBridgeHealthCheck {
  return { id, label, status, detail };
}

export function buildCreativeBridgeHealthReport(
  profiles: CreativeBridgeProfile[] = buildDefaultCreativeBridgeProfiles(),
  adapters: CreativeAdapterCatalogItem[] = buildCreativeAdapterCatalog()
): CreativeBridgeHealthReport {
  const checks = [
    buildCreativeBridgeHealthCheck("bridge-profile-exists", "Bridge profile exists", profiles.length > 0 ? "ready" : "blocked", `${profiles.length} profiles available.`),
    buildCreativeBridgeHealthCheck("adapter-catalog-exists", "Adapter catalog exists", adapters.length > 0 ? "ready" : "blocked", `${adapters.length} adapters available.`),
    buildCreativeBridgeHealthCheck("execution-disabled-unless-approved", "Execution disabled unless approved", "ready", "Execution remains blocked in Phase 61 even with approval packet preview."),
    buildCreativeBridgeHealthCheck("local-app-availability-unknown", "Local app availability unknown unless supplied", "unknown", "The UI does not inspect local installations."),
    buildCreativeBridgeHealthCheck("output-artifact-path-not-writable-from-ui", "Output artifact path not writable from UI", "ready", "Artifact paths are placeholders only."),
    buildCreativeBridgeHealthCheck("queue-preview-available", "Queue preview available", "ready", "Queue state can be previewed without dispatching jobs."),
    buildCreativeBridgeHealthCheck("approval-gate-required", "Approval gate required", "ready", "Future executor handoff requires explicit operator approval."),
    buildCreativeBridgeHealthCheck("cancellation-strategy-visible", "Cancellation strategy visible", "warning", "Cancellation is described but no executor is active."),
    buildCreativeBridgeHealthCheck("validation-strategy-visible", "Validation strategy visible", "ready", "Manual validation guidance is visible."),
    buildCreativeBridgeHealthCheck("no-external-provider-calls", "No external provider calls", "ready", "Deterministic bridge logic does not call providers."),
    buildCreativeBridgeHealthCheck("no-secrets-exposed", "No secrets exposed", "ready", "Profiles store secret strategy labels only."),
  ];
  const status: CreativeBridgeHealthStatus = checks.some((check) => check.status === "blocked")
    ? "blocked"
    : checks.some((check) => check.status === "warning")
      ? "warning"
      : "ready";

  return { checks, status, summary: summarizeCreativeBridgeHealthReport({ checks, status, summary: [] }) };
}

export function summarizeCreativeBridgeHealthReport(report: CreativeBridgeHealthReport): string[] {
  return [
    `${report.checks.length} health checks evaluated.`,
    `Overall bridge health: ${report.status}.`,
    "No render execution, no command execution, no file writes, and no external provider calls.",
  ];
}
