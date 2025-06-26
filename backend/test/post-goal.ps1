# PowerShell script to test registering a fitness goal for the current user, automating login and JWT retrieval
# Usage:
#   .\post-goal.ps1 -GoalType "weight_loss" -TargetValue 10 -StartDate "2025-06-23" -EndDate "2025-07-23"
#
# Arguments:
#   -GoalType     (string, required): Type of goal (e.g., weight_loss, steps, etc.)
#   -TargetValue  (double, required): Target value for the goal
#   -StartDate    (string, optional): Start date (yyyy-mm-dd)
#   -EndDate      (string, optional): End date (yyyy-mm-dd)
#
# Example:
#   .\post-goal.ps1 -GoalType "steps" -TargetValue 10000 -StartDate "2025-06-23" -EndDate "2025-07-23"

param(
    [Parameter(Mandatory=$false)]
    [string]$Goal = "Weight Loss",
    [Parameter(Mandatory=$false)]
    [string]$GoalType = "8_packs",
    [Parameter(Mandatory=$false)]
    [double]$TargetValue = 10,
    [string]$StartDate = "2025-06-23",
    [string]$EndDate ="2025-07-23"
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

$body = @{ goal_type = $GoalType; target_value = $TargetValue }
if ($StartDate) { $body.start_date = $StartDate }
if ($EndDate) { $body.end_date = $EndDate }
if ($Goal) { $body.goal = $Goal }

$headers = @{ Authorization = "Bearer $jwt"; 'Content-Type' = 'application/json' }

$response = Invoke-RestMethod -Uri "http://localhost:4000/api/users/me/goals" -Method Post -Headers $headers -Body ($body | ConvertTo-Json)
$response | ConvertTo-Json -Depth 5
