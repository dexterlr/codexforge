import type { LiveRunValidationStep } from "./coding-flow-live-run-types";
export function buildLiveRunValidation(): LiveRunValidationStep { return { route: "/validation-results", noAutoRun: true, commands: ["npm run build", "targeted smoke", "git diff --check"] }; }
