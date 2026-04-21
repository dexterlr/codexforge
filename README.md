# CodexForge> Local-first AI developer workspace with execution engine, memory graph, and operator pipeline.---## 🚀 What is CodexForge?CodexForge is a **local-first AI development environment** designed to go beyond chat.It combines:- 🧠 **Structured AI reasoning (Brain system)**- ⚙️ **Execution engine (plan → diff → apply → test)**- 🗂️ **Persistent memory graph (future Obsidian-style system)**- 🛠️ **Operator pipeline (safe code modification system)**This is not a chatbot.This is an **AI-powered development workspace**.---## 🧱 Core Systems### 1. CodexForge Brain- Multi-provider routing (local engine + Ollama)- Structured replies (plans, steps, execution)- Context-aware reasoning (memory + active plan)---### 2. Execution EngineHandles real work:- Planning- Diff generation- File changes (safe)- Test execution- Result tracking**Execution phases:**
idle → planning → awaiting_plan_approval → diffing → awaiting_diff_approval → applying → testing → done
---### 3. Operator PipelineSafe code modification system:- Diff generation- Dry-run support- Atomic apply- Checkpoints + restore- Multi-route execution API---### 4. Brain Graph (Memory System)Persistent structured memory stored locally:- Nodes: tasks, steps, messages, memory, runs- Edges: relationships between entitiesPowers future capabilities:- Memory recall- Context-aware reasoning- Visual graph UI---### 5. Tooling LayerLocal development tools exposed to the AI:- Read/write files- Run commands- Run tests- Search project- Snapshot filesystem---## 🖥️ UI Surfaces- `/ai` → Main workspace (chat + execution)- `/brain` → Graph inspector (memory system)- `/history` → Local-first history system- `/entry`, `/clawd` → Supporting interfaces---## 📁 Project Structure
src/
app/
api/
codexforge/      → Brain + execution APIs
operator/        → Diff/apply pipeline
brain/             → Graph inspector UI
ai/                → Main workspace UI
lib/
codexforge/
brain/           → Reasoning system
chat/            → Chat + execution logic
tools/           → File + system tools
operator/  v3/              → Next-gen planner (shadow mode)
---## ⚙️ Running Locally```bashnpm installnpm run dev
Then open:
http://localhost:3000/ai

🧠 Environment (Optional)
Create a .env.local file:
CODEXFORGE_BRAIN_OLLAMA_ENABLED=trueCODEXFORGE_BRAIN_OLLAMA_MODEL=qwen3:14bCODEXFORGE_BRAIN_OLLAMA_BASE_URL=http://127.0.0.1:11434

🧪 Current State


✅ Chat system stable


✅ Execution engine wired


✅ Operator pipeline working


✅ Brain graph persisting locally


✅ UI functional



⚠️ Important
This repository is:

CodexForge (product) running inside a test harness (Health Tracker)

Some legacy naming still exists and will be cleaned up.

🛣️ Roadmap (High-Level)


Multi-file diff execution


Persistent graph-based reasoning


Full apply pipeline (beyond preview)


UI hardening + resumability


Memory-driven planning


Obsidian-style graph interface



🧑‍💻 Philosophy


Local-first


Deterministic where possible


Safe execution (no blind writes)


Structured AI over freeform chat


Systems over prompts



📌 Status
Active development.
CodexForge is evolving into a full AI developer platform.

👤 Author
Built by Dexter
Workspace: OpenClaw AI Lab

⚡ TL;DR
CodexForge is:

ChatGPT + Copilot + DevOps + Memory Graph
running locally, with real execution.

---## Next step (do this now)```powershellgit add ../README.mdgit commit -m "CodexForge: clean professional README"git push


