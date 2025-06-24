# PowerShell script to test PUT /api/workouts/:id
# Usage: .\put-workout.ps1

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

# Prompt for WorkoutId and new details
$WorkoutId = Read-Host "Enter the WorkoutId to update"
$name = Read-Host "Enter new workout name"
$description = Read-Host "Enter new workout description"
$duration = Read-Host "Enter new workout duration (minutes)"
$difficulty = Read-Host "Enter new workout difficulty (e.g., easy, medium, hard)"

if (-not $WorkoutId) {
    Write-Host "No WorkoutId provided. Exiting."
    exit 1
}

$body = @{ name = $name; description = $description; duration = $duration; difficulty = $difficulty } | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:4000/api/workouts/$WorkoutId" -Method Put -Headers $headers -Body $body
$response | ConvertTo-Json -Depth 5
