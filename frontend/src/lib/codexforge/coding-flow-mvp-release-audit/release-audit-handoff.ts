import type { ReleaseAuditGoNoGo, ReleaseAuditHandoff } from "./coding-flow-release-audit-types";
export function buildReleaseAuditHandoff(goNoGo: ReleaseAuditGoNoGo): ReleaseAuditHandoff { return { title: "Coding flow MVP audit", body: `${goNoGo.reason}\nMission Control next action: run one real manual coding flow and record result.`, copyAllowed: true }; }
