# Source-bound working-copy editor

Location: `/animation-studio`, alongside the original Composition & takes workspace. The default remains the original layered editor. This is a bounded v2 property inspector with a saved-instruction viewer and explicit exact-time layer controls, not a completed NLE or renderer. No production migration or application restart happens merely by adding this source.

## Explicit entry and scope

Choose **Use source-bound working copy** only when the original editor has finished initialization and is clean, idle and free of unresolved saves. Project/shot drafts, footage imports and their recovery states also block entry. The selected mode and composition are retained in this browser session before switching.

The working-copy mode blocks original project/import/editor actions in the current tab. That is a UI transition gate, **not a global lock across tabs or processes**. The original and copy are distinct instruction branches; the copy is not an independent backup. An edit to the original project or original layered instructions elsewhere invalidates the copy's source anchor. No copy-back, automatic rebase, silent resynchronization or substitute request is provided.

Opening or refreshing the mode makes only a read request. A server-proven `NOT_CREATED` state permits showing an explicit checkbox and **Create working copy** action; it never triggers creation automatically. The source must already have a persisted v1 editorial revision. Missing heads, partial copy storage, corrupt records and stale anchors are `UNAVAILABLE`, not permission to recreate a copy. Server publication rechecks all original migration boundaries independently of the earlier inspection.

After creation, select and load one composition, then choose a saved layer. Edit opacity, enabled state and the complete transform; separately move an unlocked layer's timeline start; trim one saved edge inward; or split one eligible VIDEO layer at an exact composition time. Each save updates that composition's immutable instructions and index path. Move preserves duration and source offset. Trim changes only the exact start/duration/source-offset tuple derived below. Split replaces one instruction with two adjacent instructions that retain the same immutable source Asset/version and Take. Original media, unrelated layers, composition duration, original editorial records and alternative Takes remain unchanged.

**Move layer to start time** accepts a reduced fraction of seconds using whole numerator/denominator fields (for example 1 / 3). Zero must be 0 / 1. Negative, incomplete, unsafe, noncanonical, unchanged and out-of-composition positions are rejected; timing never round-trips through microseconds. This is a non-ripple move: other layers and composition duration are not changed.

**Trim layer** is shrink-only. `TRIM_LAYER_TIME` accepts exactly one edge, `IN` or `OUT`, and an absolute composition-time `trimPoint` as a canonical reduced rational. The point must be strictly inside the saved half-open layer interval, never at or outside either edge. `IN` moves start to the point and shortens duration while preserving the prior timeline end; VIDEO and NESTED_COMPOSITION layers advance source offset by the same exact delta, while IMAGE remains at source offset `0 / 1`. `OUT` preserves start/source offset and shortens duration to end at the point. The server derives these coupled fields rather than accepting caller-supplied duration or source offset. The retained source interval is a subset of the previously saved interval, so no unverified source-duration extension is implied. There is no outward trim, ripple, roll, slip or slide.

**Split layer at exact time** accepts only an unlocked direct-asset VIDEO already constrained by this schema to forward unit-rate playback with no keyframes. Given saved start `s`, duration `d`, source offset `o`, and an absolute composition-time point `c`, the server requires `s < c < s + d`. It derives left `[s,c)` with duration `c-s` and offset `o`, plus right `[c,s+d)` with duration `(s+d)-c` and offset `o+(c-s)`. The original ID stays on the left; one stable server-derived ID identifies the right. Both keep the saved name, static properties, source Asset/version, Take and provenance, and remain adjacent at the original stacking position. The client cannot supply either result, an ID, ordering or source metadata. IMAGE, nested, locked, full-capacity and any future complex/reference-bearing layer shape fail closed rather than being flattened or approximated.

Property, move, trim and split drafts are mutually exclusive. Save or explicitly discard one before starting another. Timing drafts retain incomplete text through refresh, while their original saved head and exact pending request stay protected. Historical property/move/trim drafts and requests remain readable without automatic migration or submission. The preview remains closed while any edit is dirty or unresolved. A successful move, trim or split clears the loaded view and requires explicitly reloading the saved composition before previewing it. A stale split remains retained and returns conflict on an explicit exact retry; a reachable successful receipt instead replays its prior result without another segment or audit commit.

## Recovery and visible errors

Local property drafts retain their original head/composition revisions and exact displayed values in separate v2 session recovery storage. Blank or incomplete numeric input is not silently converted to zero. The exact serialized request and retry key are retained **before** a POST. Storage failures stop dispatch.

Reloading restores mode, composition selection, local draft and unresolved request without submitting anything. A changed saved head does not rebase a retained draft. Stop waiting aborts the wait; it does not undo a server commit. Unconfirmed outcomes keep the same request for **Retry exact working-copy request**. Response identities, generation-lock fields and bounds must pass validation before acknowledging success. No automatic retry, model call or summary generation occurs.

Returning to the original editor requires no unsaved copy draft, unresolved request, active request or recovery-storage error. An unavailable copy with an uncertain save may remain deliberately blocked: preserve the exact request and history rather than deleting them to escape. A read-only inspection is not proof that a previous request did or did not commit. Rebase/recovery tooling beyond exact receipt replay is not implemented in this increment.

## Scoped HTTP boundary

`/api/codexforge/animation-studio/editorial-v2` reuses the exact direct-loopback authority contract, client marker and same-origin mutation checks. Existing v1 paths are unchanged. The server uses the existing enabled local Studio repository opener and cannot take a caller-supplied workspace, actor, provider or filesystem path.

| Request | Scope |
| --- | --- |
| GET `projectId` | Read-only source catalogue and copy status; fully verifies bounded v1 metadata/history, never source media. |
| GET `projectId`, `compositionId` | Selected v2 composition and direct references only; media remains UNCHECKED and nested payloads NOT_LOADED. |
| GET `projectId`, `auditLimit` | Explicit 1–64 commit/index transition audit, not all entity bytes. |
| GET `/editorial-v2/media` with `projectId`, `compositionId`, `headDigest`, `assetId`, `version` | Explicit bounded bytes for one direct source of the exact selected head; original anchor and head checked before and after reading. |
| POST `COPY_V1_TO_V2` | Explicit exact-revision copy using the existing migration contract. |
| POST `SET_LAYER_PROPERTIES` | Exact-revision property command using the existing v2 repository contract. |
| POST `MOVE_LAYER_TIME` | Exact-revision start-only command; canonical rational `start`, unchanged duration/source offset, same journal/receipt/CAS/source fences. |
| POST `TRIM_LAYER_TIME` | Exact-revision shrink-only command; `edge` is `IN` or `OUT`, `trimPoint` is an absolute canonical rational strictly inside the saved interval, and coupled timing fields are server-derived under the same journal/receipt/CAS/source fences. |
| POST `SPLIT_LAYER_TIME` | Exact-revision command carrying only an absolute canonical rational `splitPoint`; the server derives both segments, stable right identity, ordering and revision under the same journal/receipt/CAS/source fences. |

Unknown/duplicate fields, invalid identities, oversized input, BOM/invalid UTF-8/duplicate JSON keys, timeouts and interrupted bodies fail closed. Bodies retain the 32 KiB/five-second boundary. Response errors are bounded and do not disclose native paths or credentials. Closing storage cannot overwrite an earlier failure; a close failure after a successful operation reports an unconfirmed outcome, not a fabricated rejection before publication.

The original project remains the one native atomic external fence; the source's legacy head is checked before and after. This mode does not claim atomic double-fencing. Copy CAS protects competing copy edits. Original changes can preserve a stale, unavailable copy and its journal; they cannot silently update the copy's anchor.

## Saved-instruction viewer

Loading composition metadata never loads media. The top-first layer stack selects the existing inspector; exact start, duration and source-offset fractions remain canonical. Read-only start/end navigation controls move an exact rational playhead; separate explicit forms move, trim or split an eligible layer. Visual bar percentages and browser seek seconds are presentation adapters only, never persisted timing. Layer start is inclusive and end exclusive, so at a split point the left is inactive and the right is active; disabled and solo states determine visible layers. Keyframes, nested preview and broader linked-layer semantics remain separate work.

**Load working-copy preview** explicitly requests registered PNG/JPEG or locally imported MP4 sources. The server binds bytes to the exact project, composition, working-copy head and direct asset version; the client checks those identities, declared length, supported content type and SHA-256 before creating a local blob URL. Duplicate references share one fetch. Limits remain 16 MiB per source and 64 MiB total, with bounded waiting and no automatic retry, conversion or fallback. A nested composition blocks the entire first preview instead of silently omitting its content.

The preview shows saved instructions only. Unsaved properties, unresolved saves and source checks close it; save and explicitly reload the composition before viewing changed instructions. Stop loading interrupts the local wait. Close, blocked-state transitions, a selected-head change and unmount revoke owned blob URLs and abort active loading. Missing, corrupt or unsupported sources remain visible placeholders. Hash verification is not proof of successful decoding: browser decoding failures are shown separately.

Video is silent and manually sought, not autoplay, synchronized playback, frame-accurate output or rendering. No provider requests or source-media changes are authorized by previewing.

## Acceptance and remaining work

Use the new native, HTTP and UI-state suites plus existing v1 regressions. Native tests use fresh C-only namespaces and retained source hashes; HTTP tests invoke actual Request/NextRequest handlers without listeners; hook tests exercise the actual component handlers but are not browser evidence. Browser checks must use an isolated exact-source runtime and synthetic project, never the user-owned running application or production data. Record browser observations separately from synthetic tests.

The viewer has focused transport/time/lifecycle tests and recorded isolated desktop image/video decoding and restart acceptance. Exact-time move, trim and split have separate pure-contract/native/HTTP/UI-handler regressions; newly added controls still require a fresh isolated build and real-browser acceptance. The original-editor preview remains unchanged in original mode. Subsequent work includes keyframes, undo/redo, autosave, nested compositions, synchronized playback and broader media acceptance. Exact arithmetic near a 60-minute position is not editor performance certification.
