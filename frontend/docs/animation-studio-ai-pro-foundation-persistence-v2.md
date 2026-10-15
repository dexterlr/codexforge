# AI Pro foundation: partitioned editorial backend

Status: partitioned editorial backend, not a shipped timeline or production cutover. The original editor continues to use v1. A subsequent explicit [source-bound working-copy mode](animation-studio-editorial-working-copy.md) connects the bounded v2 repository to the Studio page; it does not automatically migrate projects. No provider execution, media conversion, native rebuild or installed dependency is introduced.

## Implemented repository boundary

`StudioRepository` exposes four explicit operations:

| Method | Behavior |
| --- | --- |
| `migrateEditorialV2(input, key, actor)` | Fully validate persisted v1 history and copy its Takes, selections and compositions into a separate v2 branch. Require exact expected project/editorial revisions and a timestamp at or after the last v1 event. |
| `reviewEditorialV2Composition(projectId, compositionId)` | Read one composition and directly referenced Take/Asset metadata, with explicit limited integrity and media-availability scope. |
| `editEditorialV2Layer(input, key, actor)` | Change only opacity, enabled state and/or the validated complete transform of one unlocked layer. Require exact global and composition revisions. |
| `auditEditorialV2History(projectId, limit)` | Verify up to 64 commit/index transitions from the current head and report whether that covers all commits. |

Migration is named `COPY_V1_TO_V2`; edits are named `SET_LAYER_PROPERTIES`. The explicit working-copy HTTP boundary dispatches these development repository APIs; it supplies the actor rather than accepting one from the browser. The repository obtains validated server-owned project context through its existing snapshot reader. No actor string is itself an approval grant. Authority, generation and execution controls are unchanged.

Each edit increments the affected layer version and composition revision on the server, records actor/time/request identity, and persists immutable before/after references. It does not edit source identity, timing, locks, approvals or nested references. Undo/redo commands and UI autosave are not yet implemented.

## Exact time

V2 compositions and layers use reduced rational seconds with JSON-safe integer fields and BigInt intermediate arithmetic. V1 integer microseconds migrate exactly. All existing non-time composition checks remain active, including resource counts, transforms, source types, text constraints and safe references. Rational intervals are checked directly; they are not rounded through microseconds for validation.

The explicit compatibility export back to v1 requires exact microseconds and the existing v1 bounds; it fails rather than rounds or truncates. The new rational contract has no five-minute or one-hour duration cap. This proves representation, not long-project playback or rendering performance. The 32-layer per-composition resource bound remains. Future layer/keyframe partitions require their own versioned contract.

## Storage and publication

Metadata remains on C under the retained native project root:

`studio/projects/<project>/manifests/editorial-v2/`

- `head.json`: at most 4 KiB, the sole mutable commit pointer.
- `objects/<sha256>.json`: immutable entities, previous heads and index pages, each at most the unchanged 1 MiB native bound.
- `commits/<sha256>.json`: immutable transaction journal/intent records.

Entity and receipt indexes are path-compressed radix trees over SHA-256 keys. Each page is exact-shape, hash-bound and project/namespace-bound. A lookup reads at most 65 pages; an update stages at most 65 pages (130 combined at the conservative worst case). An idempotent index assignment stages nothing. Selected-path checking is not a full off-path tree audit.

Requests retain the 32 KiB bound; a transaction stages at most 4,096 immutable object/index pages in memory. Validation and byte-size checks finish before publication. Ordinary edits stage one changed composition, its index path, a previous head and a receipt-index path; unchanged Takes, compositions and media are not rewritten. Initial migration necessarily reads the complete bounded v1 history/content once.

Publication order is deliberate:

1. Validate the full prospective transaction and exact request receipt.
2. Write immutable journal **intent first**, then staged object/index files, under the existing native project-aggregate fence. Existing content-addressed files must match byte-for-byte.
3. Recheck the legacy anchor; publish the small head by native compare-and-swap (exclusive first publication), fenced against the project aggregate.
4. Recheck the project/legacy anchor and current head before returning success.

Only a head-reachable receipt proves commitment. Orphan intent/object files are retained, never presented as successful edits. Exact replay verifies the request/actor digest and performs no native writes. Replay returns the current valid head summary, not a claim that it recreated the original response.

The native primitive has **one** external fence: the project aggregate. V1 is checked before and after; there is no claim of atomic double-fencing. A concurrent legacy edit can leave a preserved but stale v2 branch. That branch becomes unavailable, with no automatic rebase or cutover. A later adoption protocol must address this before exposing both editors as simultaneously writable.

## Recovery and integrity scope

The v2 anchor binds exact project state, exact v1 head, v1 revision and content digest. Later project/v1 changes invalidate that anchor. Existing v1 records, media, jobs, cost and approval records remain untouched by v2 operations.

An interrupted **first** copy may be resumed only by its exact deterministic request when the missing-head store contains precisely its sole expected journal with identical bytes. A missing head after later/competing commits fails closed. Retained objects without journal evidence also fail closed; they cannot masquerade as a fresh store. No automatic retry occurs.

Ordinary reads verify the current journal, immediate predecessor head and the relevant receipt/entity index transitions, plus the selected composition and direct Take/Asset identity. They do not scan older journals, unrelated entity payloads, nested composition payloads or media. Nested resolution is `NOT_LOADED`; media is `UNCHECKED`, never guessed online. Existing v1 migration validates the original cross-composition graph; currently supported v2 edits cannot change its references.

History verification reports `COMMIT_INDEX_TRANSITIONS_NOT_ALL_ENTITY_BYTES`. `complete` refers only to that scope, never to all retained bytes. The initial audit API starts at the current head and accepts 1–64 commits; it reports a remaining head hash when partial but does not yet accept a continuation cursor. Larger-history audits and background auditing remain future work. Normal reads never claim the earlier v1 full-history guarantee.

## Validation and limits of the checkpoint

The focused contract, index and real-native persistence tests exercise actual source with network blocked and fresh C-only test roots. They cover exact conversion, malformed entities, bounded index paths, deterministic roots, migration preservation, lazy reads, one-composition edits, replay, competing processes, interruption/lost acknowledgement, stale anchors and corruption. Test evidence includes source hashes; synthetic data remains retained.

Existing v1 persistence, HTTP boundary and UI-state regressions continue separately. UI-state tests are not new browser/playback acceptance. No new page, listener, production dataset or D library is touched in this backend increment. Source-only TypeScript uses an isolated generated-types shim so another runtime's `.next` cache is neither trusted nor modified.

Project/Asset metadata remains an aggregate, v1 import limits remain, and this checkpoint does not create new v2 compositions or Takes. The index stress fixture measures index behavior only; it is not a five-minute/60-minute production performance certification. No whole-project scalability claim, live media playback claim, full build claim or completed professional NLE claim follows from these tests.

The explicit working-copy connection is described separately; it is not a global cutover. Next: add the first visible v2 viewer/layer-stack/timeline increment. Keep trim/move/split, keyframes, undo/redo, autosave and proxy playback in separately validated increments. Source assets remain immutable throughout.
