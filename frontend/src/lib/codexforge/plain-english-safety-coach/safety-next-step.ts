import type { SafetyNextStep } from "./safety-coach-types";

export function buildSafetyNextStep(): SafetyNextStep {
  return { label: "Go to First Task", href: "/first-task", why: "Start with one tiny safe wording change." };
}
