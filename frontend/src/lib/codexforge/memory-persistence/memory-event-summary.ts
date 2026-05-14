import type {
  MemoryEventLedger,
  MemoryEventPersistencePolicy,
  MemoryEventPersistenceRequest,
  MemoryEventValidation,
  MemoryGraphReductionPreview,
} from "./memory-persistence-types";

export function summarizeMemoryEventPersistence(args: {
  policy: MemoryEventPersistencePolicy;
  request: MemoryEventPersistenceRequest;
  validation: MemoryEventValidation;
  ledger: MemoryEventLedger;
  preview: MemoryGraphReductionPreview;
}): string[] {
  return [
    ...args.policy.summary.slice(0, 2),
    ...args.validation.summary.slice(0, 2),
    ...args.ledger.summary.slice(0, 1),
    ...args.preview.summary.slice(0, 2),
    `Approved persistence workspace: ${args.policy.workspaceRoot}.`,
  ];
}
