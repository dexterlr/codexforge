export type CodexForgeSuggestion = {
  id: string;
  label: string;
  prompt: string;
};

export const CODEXFORGE_CHAT_SUGGESTIONS: CodexForgeSuggestion[] = [
  {
    id: "plan-feature",
    label: "Plan a feature",
    prompt:
      "Help me plan a new feature. Give me a goal, files to change, risks, and the first three implementation steps.",
  },
  {
    id: "debug-error",
    label: "Debug an error",
    prompt:
      "I have an error. Ask me for the exact error text, likely file, and what changed recently, then propose a careful debugging plan.",
  },
  {
    id: "build-website",
    label: "Build a website",
    prompt:
      "I want to build a website. Break it into the simplest safe phases: pages, data, styling, APIs, and deployment.",
  },
  {
    id: "research-task",
    label: "Research task",
    prompt:
      "Help me research a topic. Give me a structured research plan, key unknowns, questions to answer, and an output format.",
  },
  {
    id: "coding-next-step",
    label: "Next coding step",
    prompt:
      "Look at my project as a beginner-friendly coding assistant and tell me the next smallest safe step to take.",
  },
  {
    id: "agent-design",
    label: "Design CodexForge",
    prompt:
      "Help design CodexForge as an AI developer assistant and researcher. Define its core jobs, memory, tools, safety rules, and backend contract.",
  },
];