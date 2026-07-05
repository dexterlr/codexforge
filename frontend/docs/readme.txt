# CodexForge Documentation

## Current State
Current checkpoint: Highest detected phase: 3241. Latest completed batch: 3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade. CodexForge Primary Navigation, README, and Workspace Layout Upgrade is a god-tier product shell consolidation that moves CodexForge from a phase checklist toward an operator cockpit for controlled AI/video/workflow/trading development.

CodexForge is an operator cockpit for controlled AI/video/workflow/trading development. Current status after previous batch: First Live Text Provider Call Backend Bridge is the latest completed provider bridge if present. Live provider execution remains tightly controlled. Provider keys must never be exposed to frontend. The first live text provider call is limited to one harmless approved prompt: "Return OK and the approved dry-run id." README explains current live readiness status. README explains provider key never exposed to frontend. README explains first live text provider bridge.

Primary product areas: primary navigation product areas are Home / Operator Cockpit, Generate, Projects, Assets, Providers, Workflows, Trading, Audit / Runs, Settings / Safety, and Developer / Checkpoints. Phase/checkpoint routes are preserved but should not dominate the primary product menu; phase checkpoint routes remain preserved and phase checkpoint routes do not dominate primary navigation.

Workspace layout principle: user action first, safety state second, evidence audit third, technical implementation details last. Generation-style pages keep the generation chat box appears first on generation pages, approval state appears above technical metadata, and output preview appears above technical checkpoint details.

Product-shell safety: do not add live provider calls, model calls, prompt sending, streaming, provider SDK imports, frontend provider key reads, credential exposure/storage, browser storage for secrets, fetch/network calls, services/APIs from frontend, workers, render/export/publish execution, or route href loosenings.

Next likely batch: next likely batch: 3242-3273 - First Live Image Provider Call Backend Bridge.

This folder contains all documentation for the CodexForge system.

---

## Sections

### Architecture

System design, subsystems, and data flow.

* `architecture/overview.md`
* `architecture/subsystems.md`
* `architecture/data-flow.md`

---

### Product

What CodexForge is and why it exists.

* `product/mission.md`
* `product/principles.md`

---

### Operator

Operator pipeline design and evolution.

* `operator/v2.md`
* `operator/v3-scope.md`
* `operator/v3-boundary.md`

---

### Development

How to run and work on the project.

* `development/setup.md`
* `development/workflow.md`

---

### Reference

Technical reference material.

* `reference/api.md`
* `reference/file-structure.md`

---

### Scratch

Temporary, generated, or experimental files.

* Not part of the system design
* Safe to delete or regenerate

---

## Core Idea

CodexForge is a structured system where:

* Chat â†’ Plan â†’ Execution â†’ Operator â†’ Files â†’ Memory Graph

Everything is observable, reversible, and user-controlled.
