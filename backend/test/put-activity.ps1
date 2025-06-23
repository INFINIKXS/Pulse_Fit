# PowerShell script to test PUT /api/activities/:id
# Usage: .\put-activity.ps1

# Prompt for ActivityId if not provided
$ActivityId = Read-Host "Enter the ActivityId to update"

$envPath = "..\..\backend\.env"

# Load .env and extract Supabase credentials
Get-Content $envPath | ForEach-Object {
    if ($_ -match "SUPABASE_ANON_KEY=(.+)") { $anonKey = $Matches[1].Trim().Trim('"') }
    if ($_ -match "SUPABASE_URL=(.+)") { $supabaseUrl = $Matches[1].Trim().Trim('"') }
}

# User credentials for login (replace with test user as needed)
$email = "ifeanyiobasi66@gmail.com"
$password = "ABCD1234"

# Login to get JWT access token
$loginHeaders = @{
  "apikey"        = $anonKey
  "Authorization" = "Bearer $anonKey"
  "Content-Type"  = "application/json"
}
$loginBody = @{ email = $email; password = $password } | ConvertTo-Json
$loginResponse = Invoke-RestMethod -Uri "$supabaseUrl/auth/v1/token?grant_type=password" -Method Post -Headers $loginHeaders -Body $loginBody
$jwt = $loginResponse.access_token

Write-Host "Obtained JWT: $jwt"

$headers = @{ Authorization = "Bearer $jwt"; 'Content-Type' = 'application/json' }

# Example update data
$body = @{
    type = "walk"
    duration = 45
    distance = 3.2
    calories = 200
    date = "2025-06-23"
    notes = "Evening walk update"
}

if (-not $ActivityId) {
    Write-Host "No ActivityId provided. Exiting."
    exit 1
}

$response = Invoke-RestMethod -Uri "http://localhost:4000/api/activities/$ActivityId" -Method Put -Headers $headers -Body ($body | ConvertTo-Json)
$response | ConvertTo-Json -Depth 5
