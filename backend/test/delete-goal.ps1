# PowerShell script to test DELETE /api/users/me/goals/:id
# Usage: .\delete-goal.ps1

# Hardcoded GoalId for automated testing
$GoalId = "5b41b2b4-7595-46b1-86fb-49f73f552246"

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

$response = Invoke-RestMethod -Uri "http://localhost:4000/api/users/me/goals/$GoalId" -Method Delete -Headers $headers
$response | ConvertTo-Json -Depth 5
