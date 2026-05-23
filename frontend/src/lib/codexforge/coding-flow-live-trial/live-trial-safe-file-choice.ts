import type { LiveTrialSafeFileChoice } from "./coding-flow-live-trial-types";

export function buildLiveTrialSafeFileChoice(input: LiveTrialSafeFileChoice): LiveTrialSafeFileChoice {
  return { ...input, validationToRun: [...input.validationToRun] };
}

export function buildDefaultLiveTrialSafeFileChoices(): LiveTrialSafeFileChoice[] {
  const validate = ["npm run build", "targeted smoke based on changed surface", "git diff --check"];
  return [
    buildLiveTrialSafeFileChoice({ choiceId: "ui-copy-component", category: "UI copy component", posture: "safe", whatToPick: "Static panel, label, or helper copy.", whatToAvoid: "Handlers, policy checks, persistence calls, and command wiring.", why: "Copy-only UI changes are reviewable and do not alter execution.", validationToRun: validate }),
    buildLiveTrialSafeFileChoice({ choiceId: "empty-state-component", category: "empty state component", posture: "safe", whatToPick: "Friendly empty-state guidance.", whatToAvoid: "Auto-start actions or write buttons.", why: "The user sees better guidance without mutating files.", validationToRun: validate }),
    buildLiveTrialSafeFileChoice({ choiceId: "readme-docs-wording", category: "README/docs wording", posture: "safe", whatToPick: "Operator instructions or plain-language docs.", whatToAvoid: "Secrets, generated docs, and command policy.", why: "Docs changes are easy to inspect and revert.", validationToRun: ["git diff --check", "git status --short"] }),
    buildLiveTrialSafeFileChoice({ choiceId: "non-critical-helper-copy", category: "non-critical helper copy", posture: "safe", whatToPick: "Text around manual handoff helpers.", whatToAvoid: "Core validation runner logic.", why: "It improves clarity without changing core behavior.", validationToRun: validate }),
    buildLiveTrialSafeFileChoice({ choiceId: "smoke-text-marker", category: "smoke text marker only if stable", posture: "safe", whatToPick: "Marker text that intentionally follows reviewed UI copy.", whatToAvoid: "Safety marker deletion or route support removal.", why: "Smoke stays aligned with intentional UI text.", validationToRun: ["targeted smoke based on changed surface", "npm run smoke:codexforge:server"] }),
    buildLiveTrialSafeFileChoice({ choiceId: "demo-sample-data", category: "demo/sample data only", posture: "safe", whatToPick: "Static demo labels or examples.", whatToAvoid: "Runtime persistence data.", why: "Demo data supports a harmless preview.", validationToRun: validate }),
    buildLiveTrialSafeFileChoice({ choiceId: "risky-package-json", category: "package.json", posture: "risky", whatToPick: "Avoid for first trial.", whatToAvoid: "Scripts, dependencies, engines, package metadata.", why: "Build/runtime behavior can change broadly.", validationToRun: ["Do not choose for first live trial"] }),
    buildLiveTrialSafeFileChoice({ choiceId: "risky-tool-policy", category: "tool policy", posture: "risky", whatToPick: "Avoid for first trial.", whatToAvoid: "apply-diff/run-command/write-file, broker policy, approval gates.", why: "Tool policy protects execution and mutation boundaries.", validationToRun: ["Escalate to Real Apply Guard Review"] }),
    buildLiveTrialSafeFileChoice({ choiceId: "risky-lockfiles", category: "lockfiles", posture: "risky", whatToPick: "Avoid for first trial.", whatToAvoid: "package lock files and dependency manifests.", why: "Dependency churn is not a safe first operator trial.", validationToRun: ["Do not choose for first live trial"] }),
    buildLiveTrialSafeFileChoice({ choiceId: "risky-runtime", category: "brain graph/runtime persistence", posture: "risky", whatToPick: "Avoid for first trial.", whatToAvoid: "Brain graph, append events, persistence, validation runner core, smoke-all runner, route shell core, auth/secrets, environment config.", why: "These can affect safety, state, or every route.", validationToRun: ["Escalate before changing"] }),
  ];
}

export function summarizeLiveTrialSafeFileChoice(choice: LiveTrialSafeFileChoice): string {
  return `${choice.category}: ${choice.posture}. ${choice.why}`;
}
