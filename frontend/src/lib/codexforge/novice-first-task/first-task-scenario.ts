import type { FirstTaskScenario } from "./novice-first-task-types";

export function buildFirstTaskScenario(input: Partial<FirstTaskScenario> = {}): FirstTaskScenario {
  return {
    id: input.id ?? "first-safe-wording-change",
    title: input.title ?? "Your first safe task",
    subtitle: input.subtitle ?? "Make one tiny wording change while CodexForge keeps you in control.",
    primaryAction: input.primaryAction ?? "Start first task",
    safeTask: input.safeTask ?? "Improve one harmless label or empty-state sentence in one UI file.",
  };
}

export function buildDefaultFirstTaskScenario(): FirstTaskScenario {
  return buildFirstTaskScenario();
}
