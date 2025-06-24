# PowerShell script to test GET /api/activities
# Usage: .\get-activities.ps1

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

$response = Invoke-RestMethod -Uri "http://localhost:4000/api/activities" -Method Get -Headers $headers
$response | ConvertTo-Json -Depth 5
