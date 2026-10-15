import "server-only";
import type { StudioId } from "./domain";
import type { HiggsfieldPreparedRequest } from "./higgsfield-contract.server";
import { readEstimateIntent } from "./higgsfield-estimate-intent";
import { StudioStoreError, type StudioRepository } from "./store.server";

// These transient capabilities can only be minted by a winning durable acquisition.
// Restart discards capabilities, never the persistent claim or consumed attempt.
const permits = new WeakMap<object, { digest: string; current(): void }>();
export function acquireLiveEstimateDispatch(repository: StudioRepository, projectId: StudioId<"project">, jobId: StudioId<"job">, key: string, actor: string, now: () => string) {
  const acquisition = repository.acquireEstimateExecution(projectId, jobId, key, actor, now(), "LIVE_ESTIMATE");
  let authority: object | undefined;
  if (acquisition.acquired && acquisition.token) {
    const token = acquisition.token;
    authority = Object.freeze({});
    permits.set(authority, { digest: readEstimateIntent(acquisition.job).request.requestDigest,
      current: () => repository.assertAcquiredEstimateCurrent(projectId, jobId, token, now()) });
  }
  return { acquisition, authority };
}
export function consumeLiveEstimateDispatch(authority: object | undefined, request: HiggsfieldPreparedRequest): void {
  const permit = authority && permits.get(authority);
  if (!permit || permit.digest !== request.requestDigest) throw new StudioStoreError("ESTIMATE_EXECUTION_NOT_AUTHORIZED", "Exact acquired estimate authority required.");
  permits.delete(authority!);
  permit.current();
}
