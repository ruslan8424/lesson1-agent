import subprocess
from mcp.server import MCPServer

mcp = MCPServer("lesson1-mcp")


@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b


@mcp.tool()
def list_containers(all: bool = True) -> str:
    """List Docker containers on the local machine."""

    command = ["docker", "ps"]

    if all:
        command.append("-a")

    result = subprocess.run(
        command,
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        return result.stderr

    return result.stdout


@mcp.tool()
def container_logs(container: str, tail: int = 100) -> str:
    """Get recent logs from a Docker container."""

    result = subprocess.run(
        ["docker", "logs", "--tail", str(tail), container],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        return result.stderr

    return result.stdout

@mcp.tool()
def inspect_container(container: str) -> str:
    """Inspect detailed Docker container configuration and state."""

    result = subprocess.run(
        ["docker", "inspect", container],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        return result.stderr

    return result.stdout

@mcp.tool()
def remote_list_containers() -> str:
    """List Docker containers on the DigitalOcean server."""

    result = subprocess.run(
        [
            "ssh",
            "root@134.122.124.140",
            "docker ps -a"
        ],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        return result.stderr

    return result.stdout

@mcp.tool()
def remote_container_logs(container: str, tail: int = 100) -> str:
    """Get recent logs from a Docker container on the DigitalOcean server."""

    result = subprocess.run(
        [
            "ssh",
            "root@134.122.124.140",
            f"docker logs --tail {tail} {container}"
        ],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        return result.stderr

    return result.stdout


@mcp.tool()
def remote_inspect_container(container: str) -> str:
    """Inspect a Docker container on the DigitalOcean server."""

    result = subprocess.run(
        [
            "ssh",
            "root@134.122.124.140",
            f"docker inspect {container}"
        ],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        return result.stderr

    return result.stdout

@mcp.tool()
def remote_start_container(container: str) -> str:
    """Start a stopped Docker container on the DigitalOcean server."""

    result = subprocess.run(
        [
            "ssh",
            "root@134.122.124.140",
            f"docker start {container}"
        ],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        return result.stderr

    return result.stdout


if __name__ == "__main__":
    mcp.run()

