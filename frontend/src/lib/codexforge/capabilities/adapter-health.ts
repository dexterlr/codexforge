import {
  listCodexForgeToolAdapters,
  type CodexForgeToolAdapterCapability,
} from "@/lib/codexforge/tools/tool-adapter-registry";
import type { CodexForgeAdapterHealth } from "./capability-types";

export function buildAdapterHealthReport(): CodexForgeAdapterHealth[] {
  return listCodexForgeToolAdapters().map((adapter) => ({
    toolName: adapter.toolName,
    label: adapter.label,
    capability: adapter.capability,
    executionMode: adapter.executionMode,
    requiresApproval: adapter.requiresApproval,
    blockedByDefault: adapter.blocksByDefault,
    sideEffect: adapter.sideEffect,
    readinessSummary: adapter.blocksByDefault
      ? "Blocked by default; visible for policy and roadmap only."
      : adapter.executionMode === "read-only"
        ? "Ready for read-only inspection."
        : adapter.executionMode === "local-safe-simulated"
          ? "Local-safe simulated adapter; approval-gated preview path."
          : "Registered adapter placeholder; approval-gated before execution.",
  }));
}

export function summarizeAdapterHealth(adapters = buildAdapterHealthReport()): string {
  const blocked = adapters.filter((adapter) => adapter.blockedByDefault).length;
  const approval = adapters.filter((adapter) => adapter.requiresApproval).length;
  return `${adapters.length} adapter(s), ${approval} approval-gated, ${blocked} blocked by default.`;
}

export function groupAdaptersByCapability(
  adapters = buildAdapterHealthReport()
): Record<CodexForgeToolAdapterCapability, CodexForgeAdapterHealth[]> {
  return adapters.reduce<Record<CodexForgeToolAdapterCapability, CodexForgeAdapterHealth[]>>(
    (groups, adapter) => {
      groups[adapter.capability].push(adapter);
      return groups;
    },
    {
      "project-inspection": [],
      "file-system": [],
      "web-research": [],
      blender: [],
      unreal: [],
      comfyui: [],
      "pc-bridge": [],
      camera: [],
      "trading-research": [],
      "trading-execution": [],
      "deck-export": [],
      rendering: [],
      diff: [],
      command: [],
    }
  );
}
