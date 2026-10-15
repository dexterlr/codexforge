# Persistent Professional Editor history

This bounded slice adds persistent Undo and Redo only for the canonical
`SET_LAYER_PROPERTIES`, `MOVE_LAYER_TIME`, `TRIM_LAYER_TIME`, and
`SPLIT_LAYER_TIME` commands in one source-bound working copy. Copy creation,
media, Takes, approvals, providers, generation, and external jobs are outside
the history boundary.

## Smallest compatible model

History reuses the existing immutable objects, journal, receipt index, entity
index, project fence, and atomic head replacement. There is no parallel history
store.

New heads use `studio-editorial-head-v3` and persist one
`studio-editorial-history-cursor-v1`:

- `undoTip` identifies the last active ordinary edit journal;
- `redoRoot` identifies an immutable linked redo node;
- `boundary` records whether the trustworthy history began with the explicit
  copy or after an older working copy that had no operator-history cursor.

An ordinary edit journal is its own immutable undo entry. Its prior active edit
is derived from the immutable previous head that the journal already binds.
Undo pops that journal and pushes its hash onto the redo stack. Redo pops the
redo stack and makes the same ordinary journal active again. Navigation journals
are never placed on the undo stack, so Undo cannot toggle the preceding Undo.

Making a new ordinary edit after Undo clears only the active redo pointer. The
abandoned branch remains immutable and reachable through prior heads and the
append-only audit chain.

## Publication semantics

`UNDO_EDITORIAL_EDIT` and `REDO_EDITORIAL_EDIT` are new canonical commits. They
reuse the exact historical composition entity hash selected by the server; the
client cannot submit a snapshot, object hash, or path. This preserves exact
rational timing, layer ordering and identities, split segment identities,
properties, immutable Asset/Take references, and provenance without numerical
reconstruction.

The working-copy head revision, receipt root, journal tip, timestamp, and head
digest advance on every successful navigation. Composition revision values in
restored immutable snapshots remain historical. Consequently an obsolete media
preview head never becomes current again even when composition content is
identical to an earlier snapshot.

Every action is bound to the current head revision and digest, the server-derived
composition, its current historical revision, an idempotency key, and the
project/legacy anchor. Exact successful receipt replay performs no write. Stale
requests, competing callers, cursor boundaries, integrity failures, and
publication races fail without rebasing or automatic resubmission.

## Compatibility and operator boundary

`studio-editorial-head-v2` remains readable. A GET, page load, or startup never
backfills it. Such a head exposes a `LEGACY_BOUNDARY` with disabled navigation;
the first later supported edit starts trustworthy history at that boundary.

Selected-composition reads return server-derived action labels, descriptions,
target composition identity, and availability. The operator UI uses those
values verbatim. Any unsaved property, move, trim, or split draft disables both
actions with an associated save-or-discard explanation. A committed navigation
uses the existing durable exact-request recovery path and clears the loaded view,
requiring the accepted explicit reload before further editing or preview.

Generation remains locked and provider requests remain zero throughout this
workflow.
