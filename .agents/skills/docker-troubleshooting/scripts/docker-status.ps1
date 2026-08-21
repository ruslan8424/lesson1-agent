Write-Host "=== Running containers ==="
docker ps

Write-Host "`n=== All containers ==="
docker ps -a

Write-Host "`n=== Docker version ==="
docker version --format "Client: {{.Client.Version}} | Server: {{.Server.Version}}"