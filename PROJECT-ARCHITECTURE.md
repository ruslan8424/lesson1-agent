# lesson1-agent — Project Architecture

```text
lesson1-agent/
├── .agents/
│   └── skills/
│       └── docker-troubleshooting/
│           ├── SKILL.md
│           │   └── Reusable Docker troubleshooting workflow for the AI agent.
│           └── scripts/
│               └── docker-status.ps1
│                   └── Collects Docker status: running/all containers and Docker version.
│
├── mcp-server/
│   ├── server.py
│   │   └── MCP server exposing local and remote Docker tools to Codex.
│   └── .venv/
│       └── Local Python virtual environment for MCP dependencies. Not committed to Git.
│
├── AGENTS.md
│   └── Project-wide rules for Codex: approvals, minimal changes, verification, safety.
│
├── Dockerfile
│   └── Instructions for building the lesson1-agent Docker image.
│
├── index.js
│   └── Main Express application and HTTP endpoints.
│
├── package.json
│   └── Node.js project metadata, dependencies, and npm scripts.
│
├── package-lock.json
│   └── Locks exact Node.js dependency versions for reproducible installs.
│
├── .dockerignore
│   └── Files/folders Docker should exclude from the image build context.
│
├── .gitignore
│   └── Files/folders Git should not track, such as node_modules and .venv.
│
├── .git/
│   └── Local Git repository metadata, commits, branches, and history.
│
└── node_modules/
    └── Installed Node.js dependencies. Generated locally and ignored by Git.
```

## Architecture at a glance

```text
Codex
  │
  ├── reads AGENTS.md          → behavior / safety rules
  │
  ├── uses SKILL.md            → Docker troubleshooting workflow
  │       └── docker-status.ps1 → reusable diagnostic script
  │
  └── calls MCP tools
          │
          └── mcp-server/server.py
                  │
                  ├── Local Docker
                  └── SSH → DigitalOcean → Remote Docker

Application path:
index.js → Dockerfile → Docker container → DigitalOcean → public port 3000
```

## Main MCP tools currently created

```text
add()
  → Simple MCP test tool.

list_containers()
  → Lists Docker containers on the Windows machine.

container_logs()
  → Reads logs from a local Docker container.

inspect_container()
  → Inspects a local Docker container.

remote_list_containers()
  → Lists Docker containers on DigitalOcean through SSH.

remote_container_logs()
  → Reads remote container logs through SSH.

remote_inspect_container()
  → Inspects a remote container through SSH.

remote_start_container()
  → Starts a stopped remote Docker container after approval.
```

## Git / deployment flow

```text
VS Code / Windows
      ↓
Local Git repository
      ↓ git push
GitHub
      ↓ git clone / git pull
DigitalOcean Ubuntu server
      ↓
Docker build
      ↓
lesson1-agent container
      ↓
http://SERVER_IP:3000
```
