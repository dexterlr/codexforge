# Visual layer timeline and exact drag-to-move

This slice extends the existing source-bound Professional Editor working copy. It does not add another composition model, edit protocol, persistence location, or history stack.

## Canonical boundary

- The timeline renders the currently loaded `CompositionV2` and preserves its canonical layer order. Rows are shown top-first by reversing only the display traversal; saved ordering is never rewritten.
- Layer selection uses `layerId`. Names and display positions are never edit authority, so adjacent split segments with the same name remain distinct.
- Zoom, horizontal scroll, selection, and playhead are browser view state. They do not submit requests, publish commits, or clear Redo.
- A completed drag is stored as the existing recoverable `timelineStart` move draft. Only the explicit **Save move** action submits the existing `MOVE_LAYER_TIME` command.
- The accepted revision, idempotency receipt, immutable journal, atomic head publication, Undo, Redo, replay, stale-conflict, preview-head, and source/Take preservation rules remain authoritative.

## Exact gesture mapping

At pointer-down the timeline captures the stable layer ID, original canonical start and duration, working-copy head digest and revision, composition revision, supported saved frame rate, zoom, pixel scale, viewport width, and scroll position. Every proposal is recomputed from that snapshot.

Pointer distance is display arithmetic only. It is quantized to one signed integer frame displacement with symmetric nearest-even ties. The displacement is converted by the canonical rational frame period and added to, or subtracted from, the original exact start. Existing off-grid timing is not snapped. For example, at 25 fps, `1/3 + 1/25 = 28/75` seconds.

A zero-frame release creates no draft. A negative start, overflowing exact value, or interval extending beyond the composition is rejected without clamping. Duration and source offset are unchanged. Pointer cancellation, capture loss, Escape, scroll, zoom, or viewport changes cancel an active gesture without publishing or retaining a proposal.

The saved shot model currently identifies only unambiguous integer rates 24, 25, 30, 50, and 60 exactly. Shot values such as numeric 23.976/29.97/59.94 cannot prove the corresponding broadcast rational identity, and precompositions have no saved rate. In those cases drag-to-move is disabled and the existing labelled exact numerator/denominator controls remain available. No rate is guessed.

## Preview and accessibility limits

The timeline never loads media. Moving the playhead seeks only an already explicitly loaded source-bound preview through the existing approximate, muted browser adapter. It does not autoplay, enable audio, or claim frame-accurate decoding. A move draft closes preview bytes under the existing dirty-state contract.

Each layer remains selectable through a named list control even when its visual bar is very short. Exact numeric movement and click/tap Save/Discard remain available without dragging. Drag availability and cancellation are announced in text, selected state is programmatic as well as visual, disabled edit controls retain associated explanations, and successful saves or discards transfer focus to the explicit composition reload control after the old view unloads.

The time canvas scrolls only inside its labelled region. Ruler ticks are generated for the visible window with a fixed maximum of 24 nodes; there is no element per frame or full-duration bitmap. Five-minute timelines are the initial product target. The bounded coordinate and ruler design also accepts a sixty-minute exact time domain, but does not claim full-duration media playback, rendering, or production-performance certification.
