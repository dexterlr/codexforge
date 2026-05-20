import type { HealthProbeAllowlist, HealthProbeAllowlistItem, HealthProbeTargetId } from "./future-health-probe-types";

const DEFAULT_ALLOWLIST: HealthProbeAllowlistItem[] = [
  { targetId: "blender-version", allowedMode: "disabled", enabled: false, commandPatternPlaceholder: "future: Blender version metadata packet", requiredApproval: true, sideEffects: "version metadata only", blockedReasons: ["command probes blocked by default", "Blender execution blocked"], safetyNote: "No Blender launch; future guarded only." },
  { targetId: "blender-path-presence", allowedMode: "manual-only", enabled: false, commandPatternPlaceholder: "future: path presence metadata packet", requiredApproval: true, sideEffects: "path metadata only", blockedReasons: ["filesystem probes blocked unless future guarded"], safetyNote: "Manual path presence first." },
  { targetId: "comfyui-endpoint-config", allowedMode: "metadata-only", enabled: true, endpointPatternPlaceholder: "configured endpoint string presence only", requiredApproval: false, sideEffects: "config metadata only", blockedReasons: [], safetyNote: "No endpoint call." },
  { targetId: "comfyui-health-endpoint", allowedMode: "disabled", enabled: false, endpointPatternPlaceholder: "future: allowlisted local health endpoint packet", requiredApproval: true, sideEffects: "local health metadata only", blockedReasons: ["local HTTP probes blocked by default", "arbitrary endpoints blocked"], safetyNote: "No local HTTP call by default." },
  { targetId: "unreal-editor-path-presence", allowedMode: "manual-only", enabled: false, commandPatternPlaceholder: "future: Unreal Editor path presence metadata packet", requiredApproval: true, sideEffects: "path metadata only", blockedReasons: ["filesystem probes blocked unless future guarded", "Unreal launch blocked"], safetyNote: "Manual path presence first." },
  { targetId: "unreal-version-label", allowedMode: "manual-only", enabled: true, requiredApproval: false, sideEffects: "manual metadata only", blockedReasons: [], safetyNote: "Operator supplied label only." },
  { targetId: "ffmpeg-version", allowedMode: "disabled", enabled: false, commandPatternPlaceholder: "future: ffmpeg -version metadata packet", requiredApproval: true, sideEffects: "version metadata only", blockedReasons: ["command probes blocked by default", "ffmpeg execution blocked"], safetyNote: "No ffmpeg execution by default." },
  { targetId: "ffmpeg-path-presence", allowedMode: "manual-only", enabled: false, commandPatternPlaceholder: "future: ffmpeg path presence metadata packet", requiredApproval: true, sideEffects: "path metadata only", blockedReasons: ["filesystem probes blocked unless future guarded"], safetyNote: "Manual path presence first." },
  { targetId: "artifact-output-boundary", allowedMode: "metadata-only", enabled: true, commandPatternPlaceholder: "future: directory boundary metadata packet", requiredApproval: true, sideEffects: "boundary metadata only", blockedReasons: ["artifact writes blocked"], safetyNote: "Boundary review only; no file writes." },
  { targetId: "manual-confirmation", allowedMode: "metadata-only", enabled: true, requiredApproval: false, sideEffects: "manual note only", blockedReasons: [], safetyNote: "Manual confirmation can be supplied without execution." },
  { targetId: "custom-local-service-health", allowedMode: "disabled", enabled: false, endpointPatternPlaceholder: "future: explicit local health endpoint packet", requiredApproval: true, sideEffects: "local health metadata only", blockedReasons: ["local HTTP probes blocked by default", "arbitrary endpoints blocked"], safetyNote: "No wildcard allowlist and no arbitrary endpoint." },
];

export function buildHealthProbeAllowlistItem(input: HealthProbeAllowlistItem): HealthProbeAllowlistItem {
  return input;
}

export function buildHealthProbeAllowlist(items: HealthProbeAllowlistItem[] = DEFAULT_ALLOWLIST): HealthProbeAllowlist {
  const allowlist: HealthProbeAllowlist = {
    id: "future-guarded-health-probe-allowlist",
    items: items.map(buildHealthProbeAllowlistItem),
    wildcardAllowed: false,
    arbitraryCommandsAllowed: false,
    arbitraryEndpointsAllowed: false,
    summary: [],
  };
  return { ...allowlist, summary: summarizeHealthProbeAllowlist(allowlist) };
}

export function isHealthProbeAllowlisted(args: { targetId: HealthProbeTargetId; allowlist?: HealthProbeAllowlist; requireEnabled?: boolean }): boolean {
  const allowlist = args.allowlist ?? buildHealthProbeAllowlist();
  const item = allowlist.items.find((candidate) => candidate.targetId === args.targetId);
  if (!item) return false;
  if (args.requireEnabled && !item.enabled) return false;
  return item.allowedMode !== "disabled" && allowlist.wildcardAllowed === false;
}

export function summarizeHealthProbeAllowlist(allowlist: HealthProbeAllowlist = buildHealthProbeAllowlist(DEFAULT_ALLOWLIST)): string[] {
  return [
    `${allowlist.items.length} explicit allowlist items; no wildcard allowlist.`,
    "arbitrary commands allowed: false; arbitrary endpoints allowed: false.",
    `arbitrary commands allowed: ${allowlist.arbitraryCommandsAllowed}; arbitrary endpoints allowed: ${allowlist.arbitraryEndpointsAllowed}.`,
    `${allowlist.items.filter((item) => item.enabled).length} metadata/manual items enabled; future command and local HTTP probes remain disabled by default.`,
  ];
}
