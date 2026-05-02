# CodexForge

> Local-first AI developer workspace with structured reasoning, execution flow, memory graph, and safe code operations.

---

## Overview

CodexForge is an AI-powered developer workspace built to move beyond simple chat.

It combines structured planning, execution-aware workflows, persistent local memory, and a safe operator-style code pipeline into one system. The goal is to create a serious working environment for building, debugging, researching, and evolving real software with AI.

CodexForge is not positioned as a generic chatbot.

It is a local-first AI development system.

---

## What makes it different

- **Local-first by design**
  Core state, task flow, history, and memory remain useful even when backend services fail.

- **Structured responses instead of loose chat**
  Plans, steps, risks, commands, context, and execution state are treated as first-class outputs.

- **Execution-aware architecture**
  The system is designed around real workflow phases such as planning, approval, diffing, applying, and testing.

- **Persistent graph memory**
  Messages, tasks, steps, memory items, runs, diffs, and snapshots can be represented in a growing graph model.

- **Safe operator mindset**
  Code modification is treated as a controlled pipeline, not a blind write.

---

## Core systems

### 1. CodexForge Brain

The Brain layer is the structured reasoning system behind CodexForge.

It currently supports:

- Multi-provider routing
- Local engine fallback
- Ollama integration
- Structured replies for plans, execution, and context
- Memory-aware reasoning using active plan and stored workspace memory

### 2. Execution Engine

The execution engine turns requests into a workflow-oriented response model instead of plain text answers.

Current responsibilities include:

- Planning
- Diff generation
- Execution phase tracking
- Test/result reporting
- Task-step execution support
- Engine state summaries for the UI

### 3. Operator Pipeline

The operator pipeline is the safe modification layer for repository work.

Current capabilities include:

- Diff generation
- Dry-run support
- Atomic apply flow
- Checkpoint and restore routes
- Snapshot support
- Multi-route operator API structure

### 4. Brain Graph / Memory System

The graph system is the foundation for long-term reasoning and workspace memory.

Current graph concepts include:

- Workspace
- Project
- Repo
- Conversation
- Message
- Task
- Plan
- Step
- Memory
- Run
- Diff
- Snapshot
- Tag
- Note
- Decision
- Research
- Artifact
- Person

This system is intended to power:

- Persistent local memory
- Better reasoning context
- Relationship tracing
- Future visual graph workflows
- Future Obsidian-style navigation

### 5. Tooling Layer

CodexForge exposes a local tool layer that the broader system can use for structured repo operations.

Current tool surfaces include:

- File read
- File write
- Diff generation
- Diff apply
- Command execution
- Test execution
- Project search
- File listing
- Snapshot creation

---

## Current UI surfaces

### `/ai`
Primary CodexForge workspace.

This is the main interface for:
- chat
- structured responses
- active task management
- memory interaction
- execution flow
- engine status

### `/brain`
Local graph memory inspector.

This currently lets you inspect:
- graph nodes
- graph edges
- node metadata
- stored graph JSON
- graph structure as a foundation for future visual memory tooling

### `/history`
Local-first history interface for saved activity and review.

### `/entry` and `/clawd`
Supporting interfaces connected to the broader workspace/test harness environment.

---

## Execution model

CodexForge is built around explicit execution phases rather than vague assistant behavior.

Current phase model:

```text
idle → planning → awaiting_plan_approval → diffing → awaiting_diff_approval → applying → testing → done

Error and fallback states are also supported.

This is important because it lets the UI, the engine, and future automation layers all reason about the same workflow state.

Project structure
src/
  app/
    api/
      codexforge/
        chat/               # Brain-backed chat route
        run/                # Execution engine route
        tools/              # Tool execution routes
      operator/
        apply/
        checkpoint/
        diff/
        plan/
        read/
        run/
        snapshot/
        test/
    ai/                     # Main CodexForge workspace
    brain/                  # Brain graph inspector
    clawd/                  # Supporting interface
    entry/                  # Supporting entry surface
    history/                # Local-first history UI

  lib/
    codexforge/
      brain/                # Brain provider system, routing, graph, sync
      chat/                 # Client hook, renderers, engine, components
      tools/                # Tool contracts and implementations
    operator/
      v3/                   # Next-generation planner/shadow-mode work
Running locally

Install dependencies:

npm install

Start the development server:

npm run dev

Open:

http://localhost:3000/ai

You can also explore:

http://localhost:3000/brain
http://localhost:3000/history
Optional Ollama configuration

Create a .env.local file if you want to enable Ollama-backed brain routing:

CODEXFORGE_BRAIN_OLLAMA_ENABLED=true
CODEXFORGE_BRAIN_OLLAMA_MODEL=qwen3:14b
CODEXFORGE_BRAIN_OLLAMA_BASE_URL=http://127.0.0.1:11434

If Ollama is unavailable, CodexForge is designed to continue through local structured fallback behavior.

Current status

Working now:

Stable chat workflow
Structured reply pipeline
Local-first memory handling
Active task model
Execution state model
Operator route structure
Brain graph persistence
Brain graph inspector page
CodexForge API route split
Local engine brain path
Ollama brain path
Tooling layer foundation

Still evolving:

Full multi-file execution loop
Stronger apply pipeline
Better graph-driven reasoning
More complete automation story
Public-facing docs and examples
More polished repo workflows
Important context

This repository is currently:

CodexForge as the real product, developed inside a Health Tracker test harness/repo lineage

Some legacy naming and historical structure still exist and are being cleaned up as CodexForge becomes the primary system identity.

Roadmap

High-level next directions:

Multi-file diff execution
Stronger planning and file clustering
Full graph-aware reasoning
Better execution resumability
Memory-driven workflow planning
Safer apply/test loops
More explicit tool orchestration
Obsidian-style graph UI
More polished public documentation
Philosophy

CodexForge is being built around a few core ideas:

Local-first over fragile cloud dependence
Structured systems over vague prompting
Safe execution over blind file mutation
Deterministic behavior where possible
Real workflow state over fake assistant confidence
Tooling and architecture over prompt tricks
Who this is for

CodexForge is being shaped for people who want AI to operate more like a serious development system and less like a chat toy.

That includes workflows around:

application development
debugging
research
operator-style repo changes
game server work
movie/video pipeline planning
Unreal workflows
ComfyUI workflows
automation systems
Repository status

Active development.

CodexForge is currently a foundation-stage system moving toward a fuller AI developer platform.

Author

Built by Dexter
Workspace: OpenClaw AI Lab

TL;DR

CodexForge is:

structured AI reasoning + execution flow + safe code operations + persistent memory graph
running in a local-first developer workspace


After saving it, run:

```powershell
git add ../README.md
git commit -m "Rewrite README for public-facing CodexForge repo"
git push
