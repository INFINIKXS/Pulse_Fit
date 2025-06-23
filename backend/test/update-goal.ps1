# PowerShell script to test PUT /api/users/me/goals/:id
# Usage: .\put-goal.ps1 -GoalType "new_type" -TargetValue 123 -StartDate "2025-07-01" -EndDate "2025-08-01"

param(
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

# Prompt user to enter the GoalId
$GoalId = Read-Host "Enter the Goal ID to update"

# Prompt user to select which field to update
$fields = @(
    @{ Name = "Goal Type"; Key = "goal_type" },
    @{ Name = "Target Value"; Key = "target_value" },
    @{ Name = "Start Date"; Key = "start_date" },
    @{ Name = "End Date"; Key = "end_date" }
)

Write-Host "Select the field you want to update:"
for ($i = 0; $i -lt $fields.Count; $i++) {
    Write-Host "$($i+1). $($fields[$i].Name)"
}
$fieldIndex = Read-Host "Enter the number of the field to update (1-$($fields.Count))"
$fieldIndex = [int]$fieldIndex - 1
if ($fieldIndex -lt 0 -or $fieldIndex -ge $fields.Count) {
    Write-Host "Invalid selection. Exiting."; exit 1
}
$fieldKey = $fields[$fieldIndex].Key
$fieldName = $fields[$fieldIndex].Name

$newValue = Read-Host "Enter the new value for $fieldName"

$body = @{}
$body[$fieldKey] = $newValue

$headers = @{ Authorization = "Bearer $jwt"; 'Content-Type' = 'application/json' }

$response = Invoke-RestMethod -Uri "http://localhost:4000/api/users/me/goals/$GoalId" -Method Put -Headers $headers -Body ($body | ConvertTo-Json)
$response | ConvertTo-Json -Depth 5
