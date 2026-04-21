import type {
  CodexForgeStructuredReply,
  CodexForgeStructuredTool,
} from "@/lib/codexforge/types";

export type CodexForgeFallbackReply = {
  text: string;
  structured: CodexForgeStructuredReply;
};

function getFallbackTools(): CodexForgeStructuredTool[] {
  return [
    {
      name: "read-file",
      availability: "stub",
      description: "Read a file from the active project when tool execution is enabled.",
    },
    {
      name: "list-files",
      availability: "stub",
      description: "List project files when repository-aware tooling is enabled.",
    },
    {
      name: "run-command",
      availability: "stub",
      description: "Run a safe command inside the project when command execution is enabled.",
    },
    {
      name: "generate-diff",
      availability: "stub",
      description: "Generate a proposed code diff when edit tooling is enabled.",
    },
  ];
}

export function makeLocalFallbackReply(userText: string): CodexForgeFallbackReply {
  const lower = userText.toLowerCase();
  const fallbackTools = getFallbackTools();

  if (lower.includes("error") || lower.includes("bug") || lower.includes("broken") || lower.includes("fix")) {
    return {
      text: [
        "CodexForge fallback: debugging mode",
        "",
        "Use this order:",
        "1. Capture the exact error text.",
        "2. Name the file or route involved.",
        "3. Say what changed most recently.",
        "4. Reproduce the problem in the smallest possible way.",
        "5. Fix one cause at a time and re-test.",
        "",
        "Reply with:",
        "- exact error",
        "- file path",
        "- command you ran",
        "- expected result",
        "- actual result",
        "",
        "Mode: LOCAL FALLBACK (UI-side emergency fallback)",
      ].join("\n"),
      structured: {
        mode: "local-fallback",
        title: "CodexForge fallback: debugging mode",
        summary: "Backend was unavailable, so CodexForge returned a safe local debugging guide.",
        goal: "Turn the current bug into a reproducible, calm debugging workflow.",
        nextSteps: [
          "Copy the exact error message.",
          "Name the file or route involved.",
          "Say what changed most recently.",
          "Reproduce the problem in the smallest possible way.",
          "Fix one cause at a time and re-test.",
        ],
        risks: [
          "Fixing multiple things at once can hide the real cause.",
          "Working without the exact error text usually wastes time.",
        ],
        tools: fallbackTools,
        status: ["Using UI-side emergency fallback.", "Backend route was unavailable or returned an error."],
      },
    };
  }

  if (
    lower.includes("research") ||
    lower.includes("compare") ||
    lower.includes("investigate") ||
    lower.includes("find out")
  ) {
    return {
      text: [
        "CodexForge fallback: research mode",
        "",
        "Research structure:",
        "1. Define the exact question.",
        "2. List knowns and unknowns.",
        "3. Gather evidence.",
        "4. Compare options.",
        "5. Produce a conclusion with confidence and risks.",
        "",
        "Reply with the topic and the decision you are trying to make.",
        "",
        "Mode: LOCAL FALLBACK (UI-side emergency fallback)",
      ].join("\n"),
      structured: {
        mode: "local-fallback",
        title: "CodexForge fallback: research mode",
        summary: "Backend was unavailable, so CodexForge returned a safe local research framework.",
        goal: "Turn a broad topic into a structured research brief.",
        nextSteps: [
          "Define the exact question.",
          "List knowns and unknowns.",
          "Gather evidence.",
          "Compare options.",
          "Write a conclusion with confidence and risks.",
        ],
        tools: fallbackTools,
        status: ["Using UI-side emergency fallback.", "Backend route was unavailable or returned an error."],
      },
    };
  }

  if (
    lower.includes("build") ||
    lower.includes("feature") ||
    lower.includes("website") ||
    lower.includes("app") ||
    lower.includes("create")
  ) {
    return {
      text: [
        "CodexForge fallback: build mode",
        "",
        "Build shape:",
        "1. Define the user outcome.",
        "2. Pick the smallest useful version.",
        "3. List pages, APIs, and data.",
        "4. Choose the first file to edit.",
        "5. Build, test, and only then expand.",
        "",
        "Tell me what you want to build and I will turn it into a real plan.",
        "",
        "Mode: LOCAL FALLBACK (UI-side emergency fallback)",
      ].join("\n"),
      structured: {
        mode: "local-fallback",
        title: "CodexForge fallback: build mode",
        summary: "Backend was unavailable, so CodexForge returned a safe local build framework.",
        goal: "Turn an idea into the smallest safe implementation plan.",
        nextSteps: [
          "Define the user outcome.",
          "Choose the smallest useful version.",
          "List pages, APIs, and data.",
          "Choose the first file to edit.",
          "Build, test, then expand.",
        ],
        tools: fallbackTools,
        status: ["Using UI-side emergency fallback.", "Backend route was unavailable or returned an error."],
      },
    };
  }

  return {
    text: [
      "CodexForge fallback: general mode",
      "",
      "I can help with:",
      "- planning features",
      "- debugging errors",
      "- designing backend contracts",
      "- researching decisions",
      "- breaking work into safe coding steps",
      "",
      "Ask me for a plan, debug path, design, or research brief.",
      "",
      "Mode: LOCAL FALLBACK (UI-side emergency fallback)",
    ].join("\n"),
    structured: {
      mode: "local-fallback",
      title: "CodexForge fallback: general mode",
      summary: "Backend was unavailable, so CodexForge returned a safe local general assistant reply.",
      goal: "Keep the workspace usable even without the backend route.",
      nextSteps: [
        "Ask for a plan.",
        "Ask for a debug path.",
        "Ask for a design.",
        "Ask for a research brief.",
      ],
      tools: fallbackTools,
      status: ["Using UI-side emergency fallback.", "Backend route was unavailable or returned an error."],
    },
  };
}