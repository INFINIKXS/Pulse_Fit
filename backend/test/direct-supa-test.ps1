# PowerShell script to test direct Supabase REST API insert with a freshly obtained JWT

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
$userId = $loginResponse.user.id

Write-Host "Obtained JWT: $jwt"
Write-Host "User ID: $userId"

$headers = @{
  "apikey"        = $anonKey
  "Authorization" = "Bearer $jwt"
  "Content-Type"  = "application/json"
}

$body = @{
  user_id     = $userId
  name        = "Jumping"
  description = "Hoping around"
  duration    = 11
  difficulty  = "easy"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/workouts" -Method Post -Headers $headers -Body $body
$response | ConvertTo-Json -Depth 5
