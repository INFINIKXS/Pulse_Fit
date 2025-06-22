# PowerShell script to fetch Supabase user profile from 'profiles' table, automating login and JWT retrieval
$envPath = "..\..\backend\.env"

# Load .env and extract Supabase credentials
Get-Content $envPath | ForEach-Object {
    if ($_ -match "SUPABASE_ANON_KEY=(.+)") { $anonKey = $Matches[1].Trim().Trim('"') }
    if ($_ -match "SUPABASE_URL=(.+)") { $supabaseUrl = $Matches[1].Trim().Trim('"') }
}

Write-Host "Supabase URL: $supabaseUrl"
Write-Host "Anon Key: $anonKey"

# User credentials for login (replace with test user as needed)
$email = "ifeanyiobasi66@gmail.com"
$password = "ABCD1234"

# Login to get JWT access token and user id
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

Invoke-RestMethod `
  -Uri "$supabaseUrl/rest/v1/profiles?id=eq.$userId" `
  -Method Get `
  -Headers $headers
