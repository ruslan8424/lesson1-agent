---
name: docker-troubleshooting
description: Diagnose Docker container and application connectivity problems using a structured evidence-first workflow.
---

# Docker Troubleshooting

## Purpose

Use this skill when diagnosing why a Dockerized application is not working as expected.

The goal is to identify the root cause using evidence before proposing or making changes.

## Troubleshooting Procedure

1. Inspect the running containers.
2. Check container status and port mappings.
3. Check container logs.
4. Verify which port the application is listening on inside the container.
5. Compare the application port with the Docker port mapping.
6. Test the application endpoint from the host.
7. Identify the most likely root cause using the collected evidence.
8. Propose the smallest fix.
9. Do not modify files or restart containers unless the user approves.
10. After a fix, verify the application again.

## Evidence to Collect

Before diagnosing the problem, collect relevant evidence such as:

- `docker ps`
- `docker logs <container>`
- Docker port mappings
- Application configuration
- Dockerfile configuration
- HTTP response from the expected endpoint
- Relevant Git changes when configuration may have changed

Do not assume the cause from a single symptom.

## Lessons Learned

- Always compare the host port mapping with the port the application actually listens on inside the container.
- Do not treat `EXPOSE` as proof that a host port is published.
- Confirm suspected port mismatches from inside the running container when possible.
- Prefer fixing runtime configuration when the code and image configuration are already correct.