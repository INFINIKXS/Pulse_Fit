# PowerShell script to test PUT /api/users/me/goals/:id
# Usage: .\put-goal.ps1 -GoalId <goal_id> -GoalType "new_type" -TargetValue 123 -StartDate "2025-07-01" -EndDate "2025-08-01"

param(
    [Parameter(Mandatory=$true)]
    [string]$GoalId,
    [string]$GoalType,
    [double]$TargetValue,
    [string]$StartDate,
    [string]$EndDate
)

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

$body = @{}
if ($GoalType) { $body.goal_type = $GoalType }
if ($TargetValue) { $body.target_value = $TargetValue }
if ($StartDate) { $body.start_date = $StartDate }
if ($EndDate) { $body.end_date = $EndDate }

$headers = @{ Authorization = "Bearer $jwt"; 'Content-Type' = 'application/json' }

$response = Invoke-RestMethod -Uri "http://localhost:4000/api/users/me/goals/$GoalId" -Method Put -Headers $headers -Body ($body | ConvertTo-Json)
$response | ConvertTo-Json -Depth 5
