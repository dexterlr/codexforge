import { structuredToText } from "@/lib/codexforge/chat/engine-render";
import type { CodexForgeResponseProfile } from "@/lib/codexforge/chat/premium-response-composer";
import type {
  CodexForgeChatMode,
  CodexForgePlanDomain,
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";

type ResponseFileIntent = {
  explicitFileRequest: boolean;
};

type StructuredSectionLike = {
  title: string;
  items?: string[];
};

type ScrubbableStructuredReply = CodexForgeStructuredReply & {
  sections?: StructuredSectionLike[];
  files?: string[];
  commands?: string[];
  status?: string[];
  context?: string[];
  understanding?: string[];
};

function preferNonGeneralDomain(
  ...domains: Array<CodexForgePlanDomain | undefined>
): CodexForgePlanDomain {
  for (const domain of domains) {
    if (domain && domain !== "general") return domain;
  }

  return domains.find((domain): domain is CodexForgePlanDomain => !!domain) ?? "general";
}

export function resolveCodexForgeResponseDomain(args: {
  fileIntent: ResponseFileIntent;
  responseDomain?: CodexForgePlanDomain;
  structuredDomain?: CodexForgePlanDomain;
  structuredPlanDomain?: CodexForgePlanDomain;
  activePlanDomain?: CodexForgePlanDomain;
  capabilityDomain: CodexForgePlanDomain;
  capabilityMatched: boolean;
}): CodexForgePlanDomain {
  if (args.fileIntent.explicitFileRequest) return "debug";

  if (args.capabilityMatched && args.capabilityDomain !== "general") {
    return args.capabilityDomain;
  }

  return preferNonGeneralDomain(
    args.structuredDomain,
    args.structuredPlanDomain,
    args.activePlanDomain,
    args.responseDomain,
    args.capabilityDomain,
    "general"
  );
}

export function resolveCodexForgeResponseProfile(args: {
  productionOnlyPlanning: boolean;
  executionMode: boolean;
  fileIntent: ResponseFileIntent;
  resolvedDomain: CodexForgePlanDomain;
  capabilityDomain: CodexForgePlanDomain;
}): CodexForgeResponseProfile {
  if (args.productionOnlyPlanning) {
    return "product-plan";
  }

  if (args.fileIntent.explicitFileRequest) {
    return "grounded-inspection";
  }

  if (args.resolvedDomain === "debug" || args.capabilityDomain === "debug") {
    return "diagnostic";
  }

  if (args.capabilityDomain !== "web" && args.capabilityDomain !== "general") {
    return "runtime-policy";
  }

  if (args.resolvedDomain !== "web" && args.resolvedDomain !== "general") {
    return "runtime-policy";
  }

  return args.executionMode ? "execution" : "product-plan";
}

function scrubProductionOnlyVisibleText(text: string): string {
  const blockedLineTerms = [
    "src\\",
    "src/",
    ".ts",
    ".tsx",
    "use-codexforge-chat",
    "engine.ts",
    "engine-render",
    "engine-analysis",
    "route.ts",
    "types.ts",
    "read-file",
    "list-files",
    "search-project",
    "safe tool",
    "grounded function",
    "grounded file",
    "grounding confidence",
    "best next edit point",
    "open src",
    "repo path",
    "codebase",
    "implementation file",
    "frontend and backend drift",
    "npm run",
  ];

  const blockedSectionTitles = new Set([
    "Outcome",
    "Why",
    "Next action",
    "Evidence",
    "Execution posture",
    "Engine trace",
    "Response quality",
  ]);

  const lines = text.split(/\r?\n/);
  const kept: string[] = [];
  let skippingBlockedSection = false;

  for (const line of lines) {
    const trimmed = line.trim();
    const normalized = trimmed.toLowerCase();

    if (blockedSectionTitles.has(trimmed)) {
      skippingBlockedSection = true;
      continue;
    }

    if (skippingBlockedSection && trimmed.length > 0 && !line.startsWith("-")) {
      skippingBlockedSection = false;
    }

    if (skippingBlockedSection) {
      continue;
    }

    if (blockedLineTerms.some((term) => normalized.includes(term.toLowerCase()))) {
      continue;
    }

    kept.push(line);
  }

  return kept.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function scrubProductionOnlyRouteStructuredReply<T extends ScrubbableStructuredReply>(
  structured: T
): T {
  const blockedTerms = [
    "src/",
    "src\\",
    ".ts",
    ".tsx",
    "route.ts",
    "engine.ts",
    "engine-render",
    "engine-analysis",
    "use-codexforge-chat",
    "types.ts",
    "npm run",
    "read-file",
    "list-files",
    "search-project",
    "safe tool",
    "repo path",
    "codebase",
    "implementation file",
    "grounded file",
    "grounding confidence",
    "best next edit point",
    "docs\\scratch",
    "codexforge-files.txt",
  ];

  const blockedSectionTitles = [
    "outcome",
    "why",
    "next action",
    "evidence",
    "files to change",
    "execution posture",
    "engine trace",
    "response quality",
    "commands",
  ];

  const isBlockedText = (value: string): boolean => {
    const normalized = value.toLowerCase();
    return blockedTerms.some((term) => normalized.includes(term.toLowerCase()));
  };

  const cleanList = (items?: string[]): string[] =>
    (items ?? []).filter((item) => !isBlockedText(item));

  return {
    ...structured,
    files: [
      "Blender scene file",
      "Geometry node group library",
      "Material and lighting preset notes",
      "ComfyUI concept workflow",
      "Preview render exports",
      "Final render output folder",
      "Asset and output naming sheet",
    ],
    commands: [
      "Validate the geometry nodes setup with a small viewport preview.",
      "Run a low-sample lighting and camera test render.",
      "Review ComfyUI concept references against the scene direction.",
    ],
    sections: (structured.sections ?? [])
      .filter((section) => {
        const title = section.title.toLowerCase();
        return !blockedSectionTitles.some((blocked) => title.includes(blocked));
      })
      .map((section) => ({
        ...section,
        items: cleanList(section.items),
      }))
      .filter((section) => (section.items ?? []).length > 0),
    status: cleanList(structured.status),
    context: cleanList(structured.context),
    understanding: cleanList(structured.understanding),
  };
}

export function validateFinalCodexForgeResponse(args: {
  text: string;
  structured?: CodexForgeStructuredReply;
  resolvedDomain: CodexForgePlanDomain;
  resolvedChatMode: CodexForgeChatMode;
  executionMode: boolean;
  productionOnlyPlanning: boolean;
}): {
  text: string;
  structured?: CodexForgeStructuredReply;
  warnings: string[];
} {
  const warnings: string[] = [];
  let text = args.text;
  let structured = args.structured;

  const structuredDomain = structured?.plan?.domain ?? structured?.domain;

  if (structured && structuredDomain && structuredDomain !== args.resolvedDomain) {
    warnings.push(
      `Final response domain mismatch repaired: structured=${structuredDomain}, meta=${args.resolvedDomain}.`
    );

    structured = {
      ...structured,
      domain: args.resolvedDomain,
      plan: structured.plan
        ? {
            ...structured.plan,
            domain: args.resolvedDomain,
          }
        : structured.plan,
    };

    text = structuredToText(structured);
  }

  if (structured && !structured.mode) {
    const structuredMode =
      args.resolvedChatMode === "remote" ? "local" : args.resolvedChatMode;

    structured = {
      ...structured,
      mode: structuredMode,
    };

    text = structuredToText(structured);
  }

  if (!args.executionMode && structured?.execution) {
    warnings.push("Final response removed stale execution payload from non-execution reply.");

    structured = {
      ...structured,
      execution: undefined,
    };

    text = structuredToText(structured);
  }

  if (args.productionOnlyPlanning && structured) {
    const scrubbed = scrubProductionOnlyRouteStructuredReply(structured);

    warnings.push("Final response enforced production-only response scrub.");

    structured = scrubbed;
    text = scrubProductionOnlyVisibleText(structuredToText(structured));
  }

  return {
    text,
    structured,
    warnings,
  };
}
