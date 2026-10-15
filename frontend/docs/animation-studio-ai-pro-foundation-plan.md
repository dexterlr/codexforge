# AI Pro Layered Editor — foundation plan

Status: architecture and compatibility plan, not a shipped NLE, persistence migration, execution authorization, or performance certification. The current phase stops after robust D media, immutable imported versions/Takes, basic multilayer composition, persistence/restart, safe offline behavior, zero provider requests, and locked generation. Full timeline implementation requires separate authorization.

2026-09-26 continuation: the first bounded backend increment and explicit source-bound working-copy UI are implemented in the development checkout. See [partitioned persistence v2](animation-studio-ai-pro-foundation-persistence-v2.md) and [working-copy editor](animation-studio-editorial-working-copy.md) for exact contracts, tests and limitations. Original v1 UI/HTTP remain available by default; the separate v2 mode includes a saved-instruction viewer, explicit bounded media reads and exact-time layer controls. `MOVE_LAYER_TIME` changes only an unlocked layer's canonical start. `TRIM_LAYER_TIME` accepts an `IN` or `OUT` edge plus one absolute canonical rational `trimPoint` strictly inside the saved layer interval. The subsequent bounded `SPLIT_LAYER_TIME` command accepts only an absolute composition-time point for an eligible direct-asset VIDEO; the server derives two adjacent source-continuous segments, retains the original ID on the left, assigns one stable right ID and publishes one composition commit. All three operations preserve source Asset/version, Take identity, original media and unrelated layers. Fresh exact-source build/browser acceptance remains a separate gate for newly added controls. No production migration or full timeline editing is enabled. The broader items below remain a design plan except where those implementation notes explicitly record them.

## Current bounded v1

The implemented model separates immutable source Assets from editorial Takes, ShotCompositions, ordered Layers, and review/preference. It supports basic timing, transforms, opacity, enablement and bounded multilayer preview. Take review is not asset/QC/rights approval. Source bytes are never the edit.

Current persistence stores all editorial content plus the cumulative event/receipt chain in each immutable record, then publishes a small CAS-protected head with a project-aggregate fence. Reads verify the bounded retained history. Project metadata remains an aggregate; review currently verifies all project media eagerly. These are explicit small-phase compatibility behaviors, not the future long-project repository.

Current safeguards include a 1 MiB native/aggregate record bound, a 32 KiB editor request bound, 256 editorial revisions, 32 compositions, 32 layers per composition, 128 Takes, eight imported footage versions and 64 MiB total imported footage, with a 16 MiB individual import bound. They are not claims of 50–100-shot capacity. Do not increase these bounds in place or rename the current implementation “professional five-minute acceptance.” Current per-composition time supports up to an hour; that is not a future master-project duration limit.

Five minutes is the first professional performance/acceptance envelope, never a canonical duration cap. The future architecture must permit at least 60-minute projects; current performance at that scale is unproven. No `MAX_PROJECT_DURATION = 5_MINUTES` belongs in the canonical model.

## Minimum versioned partition contract

The following describe the broader v2 design. The first implementation now provides independent editorial entities, bounded indexes, transaction journals, receipts, a CAS head and a tested explicit copy operation. Persisted v1 records remain intact and readable; production adoption and UI cutover are not automatic. The existing bounded whole-content API may remain a compatibility adapter, never the sole long-project API.

| Boundary | Durable identity and contents |
| --- | --- |
| Take record | Project/Take ID, immutable source Asset ID/version, revision, human label and editorial review; content digest |
| Composition record | Project/composition/shot identity, revision, ordered bounded layer instructions and references; content digest |
| Index page | Versioned exact schema, page identity, bounded entries mapping entity IDs to revisions/digests or child-page digests |
| Journal entry | Transaction ID, exact request/key digest, actor, time, preconditions, base/result revision, typed operations, before/after references, previous entry digest, zero provider requests and no generation authority |
| Receipt-index page | Bounded key-hash entries resolving committed exact request identity to transaction/result references |
| Head | Exact versioned format, project ID, revision, entity-index root digest, receipt-index root digest, journal-tip digest, checkpoint reference |

Use immutable content-addressed files under the scoped C-side project metadata store. Index roots must support bounded pages/shards from the outset; do not embed thousands of records in a new giant head. Native per-file and request bounds stay unchanged. An initial Composition record may own its layers; future large compositions, timeline windows and keyframe pages can be independently partitioned through explicit versioned references.

Publication transaction:

1. Validate the bounded command, references, authority, expected revisions and prospective record sizes. Resolve exact receipt replay before selecting new work.
2. Write only changed immutable entities, index pages and the journal entry, using the project fence. Unchanged Takes/compositions/media are not rewritten.
3. Publish one head by native CAS against the previous head and project-aggregate fence. Its entity, journal and receipt roots advance together.
4. Treat head-reachable receipts as committed. An orphan journal/receipt/entity file is not evidence of a successful transaction. Preserve unresolved request identity after interrupted publication or lost acknowledgement; recovery is explicit and idempotent.

Global head revision provides an initial commit boundary; commands additionally carry expected affected-entity revisions. Cross-composition operations identify every affected entity in one transaction. Partition-level concurrency may evolve later without changing source identity. Project/sequence/shot and Asset indexes must also be partitioned before claiming that editorial partitioning alone solves whole-project scalability.

## Lazy reads and integrity

Provide repository reads for the active sequence, visible timeline window, open composition, nearby clips and selected Asset metadata. The bounded v1 whole-content response remains a compatibility view; omitted partitions in a scoped request never mean deletion.

Normal partitioned reads verify the current head, index pages and fetched content digests/reference bindings. Unread media is `UNCHECKED`, not `ONLINE` or `OFFLINE`. Successful byte verification yields `ONLINE`; unavailable or integrity-failing requested bytes yield explicit `OFFLINE`. Reconnecting storage requires fresh verification. Preserve strict existing execution/mutation checks; lazy review must not become execution authority.

The current v1 reader detects corruption anywhere in its bounded history by reading all retained records. A future lazy reader cannot honestly promise that same full-byte scan on every open. Introduce an explicit bounded history-verification repository operation and recorded audit result; history views verify fetched entries/records, and checkpoints/index proofs delimit the work. Never silently skip verification while claiming the old guarantee. Heavy audits, media analysis and derived representations belong to resumable background jobs, not synchronous viewer requests.

## Exact time compatibility

`editorial-time.ts` is a pure shared arithmetic foundation; no existing persisted records or preview code are changed. Canonical time is a reduced nonnegative rational number of seconds with JSON-safe integer numerator/positive denominator; calculations use BigInt intermediates and reject irreducible overflow. Constructors normalize; validators reject alternate encodings, negative values, negative zero, getters and unsafe integers.

Frame-rate identities are explicit: `24000/1001`, `24/1`, `25/1`, `30000/1001`, `30/1`, `50/1`, `60000/1001`, `60/1`. Labels such as “29.97” select those identities, not rounded floating-point numbers. Time at frame N is exactly `N × rate.denominator / rate.numerator`. Comparisons and arithmetic never accumulate rounded frame durations.

V1 integer microseconds convert exactly to `us/1000000`. Conversion back defaults to exact and fails if fractional; presentation adapters must explicitly select `FLOOR`, `CEIL` or `NEAREST_EVEN`. Presentation rounding never overwrites canonical time. The future timeline and generic keyframe schema use rational time through a versioned adapter, rather than repeatedly converting through browser seconds or v1 microseconds. Timecode/drop-frame display, negative pre-roll and source-rate mapping require separate explicit contracts; they are not implemented here.

## Commands, undo and crash recovery

Start with named transactions matching actual capabilities: `CREATE_TAKE`, `REVIEW_TAKE`, `SELECT_TAKE`, `CREATE_COMPOSITION`, `ADD_LAYER`, `SET_LAYER_TIMING`, `SET_LAYER_TRANSFORM`, `SET_LAYER_OPACITY`, `REORDER_LAYER`, `SET_LAYER_ENABLED`. Persist typed bounded payloads, exact before/after entity references, actor and transaction grouping. Server-normalized revisions/timestamps are audited. Never use arbitrary executable expressions or unrestricted property paths.

Future undo/redo is an explicit inverse/forward transaction with current-revision preconditions, not deletion of audit history or replacement of original media. Autosave checkpoints reference committed state and journal boundaries; preserve the previous valid head/checkpoints. An immutable original Take survives preference changes. The bounded move/trim/split commands and future ripple/roll/slip/slide, linking, nesting and AI edit plans use this same canonical transaction boundary. `TRIM_LAYER_TIME` is shrink-only: `IN` preserves the saved timeline end and advances temporal source offset by the same exact delta, while `OUT` preserves start and source offset. Still images retain zero source offset. `SPLIT_LAYER_TIME` is currently direct-asset VIDEO only and derives both half-open segments server-side without duplicating source media or Takes. Outward extension, boundary cuts, zero-length intervals and unsupported complex layer semantics are rejected. Do not infer the remaining operations from these bounded commands.

## Original, proxy and render identity

The canonical Asset ID/version/content hash identifies the original. Takes and layers refer to that identity; a representation record references it plus a separately hashed derivative and recipe/version. Typed representation kinds are ORIGINAL, PROXY, PREVIEW, THUMBNAIL, WAVEFORM and RENDER_CACHE. Editing may resolve a verified proxy; export resolves the original. Proxy/cache generation never overwrites originals and is not triggered merely by adding this design.

Derived renders are new output Assets with composition/version, render settings and source-reference provenance. Cache keys include relevant source/version, composition/layer/property digests, time range and renderer version, permitting affected-range invalidation. D remains the bound reusable media/representation layer, not a giant project document. The current fixed scoped D library is not moved or renamed to match the conceptual example path; no existing C media is automatically migrated.

After Effects, Premiere, Audition and other NLE/DAW tools are adapters or exchange/render targets, never the canonical project format. Imports must describe supported translations and preserve unsupported material without pretending it is editable. AI uses the same explicit commands as humans; substantial edits follow proposed plan → operation diff → preview → human acceptance → commit. Generation and provider authority remain separately gated.

## Separately authorized next phase and measurements

1. Adopt/test the partitioned repository and exact-time versioned contract, including migration/recovery and lazy metadata/media availability.
2. Build the desktop viewer, layer stack, inspector and initial multitrack timeline; mobile remains review, notes, Take choice and bounded simple edits.
3. Complete isolated acceptance of the bounded move/trim/split controls, then add generic typed keyframes, transaction undo/redo and autosave as separate increments; retain explicit operation authority.
4. Add proxy-aware playback and background derived-media jobs; implement deterministic rendering separately from browser preview.
5. Certify the representative five-minute/25 fps project with multiple sequences, 50–100 shots, multiple layers, graphics, audio and keyframes. A 60-minute scalability claim requires its own later measurements.

Record project/sequence/composition open time, p50/p95 edit and autosave latency, peak memory, bytes/entities read and written per action, timeline/layer/keyframe counts, media-index bytes and proxy/render-cache sizes. Use cold and warm opens, low-space/offline/reconnect and interrupted-save cases. Pure arithmetic tests across 60-minute frame positions prove arithmetic behavior only—not decoding, synchronization, render accuracy or long-project UI performance.
