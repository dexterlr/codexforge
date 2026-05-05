export type CodexForgeProductMetric = {
  label: string;
  value: string;
  detail: string;
};

export type CodexForgeProductCapability = {
  title: string;
  text: string;
  tags: string[];
};

export type CodexForgeProductWorkflowStep = {
  step: string;
  title: string;
  text: string;
};

export type CodexForgeProductUseCase = {
  title: string;
  text: string;
};

export type CodexForgeProductSurface = {
  eyebrow: string;
  title: string;
  gradientTitle: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  metrics: CodexForgeProductMetric[];
  capabilities: CodexForgeProductCapability[];
  workflow: CodexForgeProductWorkflowStep[];
  useCases: CodexForgeProductUseCase[];
};

export const codexForgeProductSurface: CodexForgeProductSurface = {
  eyebrow: "Local-first AI operating system for builders",
  title: "Build, research, plan, and execute with",
  gradientTitle: "CodexForge",
  subtitle:
    "CodexForge is evolving into a world-class AI developer workspace: chat, memory, repo intelligence, safe execution, media pipelines, product planning, operator approvals, and local-first automation in one command center.",
  primaryCta: {
    label: "Start in workspace",
    href: "#workspace",
  },
  secondaryCta: {
    label: "Open operator",
    href: "/clawd",
  },
  metrics: [
    {
      label: "Runtime",
      value: "Local-first",
      detail: "Useful even when providers are offline, slow, or disabled.",
    },
    {
      label: "Control",
      value: "Approval-safe",
      detail: "Plans, diffs, snapshots, and execution stay visible.",
    },
    {
      label: "Scope",
      value: "Multi-domain",
      detail: "Web, games, films, ComfyUI, Unreal, research, and repo work.",
    },
  ],
  capabilities: [
    {
      title: "AI developer workspace",
      text:
        "Plan features, inspect repos, reason through bugs, generate structured implementation paths, and keep context alive across sessions.",
      tags: ["repo-aware", "structured", "memory"],
    },
    {
      title: "Operator-safe execution",
      text:
        "Separate planning from mutation with explicit approval boundaries for diffs, snapshots, tests, checkpoints, and apply flows.",
      tags: ["snapshots", "diffs", "approval"],
    },
    {
      title: "Research copilot",
      text:
        "Turn unknowns into evidence plans, decision logs, task briefs, and reusable knowledge instead of one-off chat output.",
      tags: ["research", "decisions", "memory"],
    },
    {
      title: "Creative production system",
      text:
        "Design pipelines for websites, promotions, game servers, film workflows, ComfyUI generation, Unreal production, and asset review.",
      tags: ["web", "media", "pipelines"],
    },
  ],
  workflow: [
    {
      step: "01",
      title: "Frame the mission",
      text:
        "CodexForge turns vague intent into a concrete goal, output contract, risks, and first useful action.",
    },
    {
      step: "02",
      title: "Ground the context",
      text:
        "Memory, active tasks, repo hints, domain routing, and structured state are combined without losing latest-message authority.",
    },
    {
      step: "03",
      title: "Plan the execution",
      text:
        "The system produces phased steps, files, commands, validation checks, and approval gates before mutation.",
    },
    {
      step: "04",
      title: "Ship with control",
      text:
        "Operator surfaces handle diffs, tests, snapshots, apply, restore, and checkpointing while the workspace stays clean.",
    },
  ],
  useCases: [
    {
      title: "Premium websites",
      text:
        "Plan and build landing pages, dashboards, product surfaces, APIs, styling systems, and deployment paths.",
    },
    {
      title: "Game servers",
      text:
        "Design themed servers, plugin stacks, content pipelines, admin tooling, launch plans, and backups.",
    },
    {
      title: "Movie pipelines",
      text:
        "Move from script to storyboard, shot plan, image generation, video generation, voice, music, edit, and render review.",
    },
    {
      title: "ComfyUI and Unreal",
      text:
        "Structure generation workflows, asset tracking, render queues, cinematic tooling, blueprints, packaging, and review loops.",
    },
  ],
};
