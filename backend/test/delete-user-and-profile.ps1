# PowerShell script to test deleting the current user and their profile via backend API
$backendUrl = "http://localhost:4000/api/users/me" # Adjust port if needed

# User credentials for login (replace with test user as needed)
$email = "ifeanyiobasi66@gmail.com"
$password = "ABCD1234"

# Load .env and extract Supabase credentials
$envPath = "..\..\backend\.env"
Get-Content $envPath | ForEach-Object {
    if ($_ -match "SUPABASE_ANON_KEY=(.+)") { $anonKey = $Matches[1].Trim().Trim('"') }
}

# Login to get JWT access token
$loginHeaders = @{
  "apikey"        = $anonKey
  "Authorization" = "Bearer $anonKey"
  "Content-Type"  = "application/json"
}
$loginBody = @{ email = $email; password = $password } | ConvertTo-Json
$loginResponse = Invoke-RestMethod -Uri "https://sdtigigcyzenxdgfxhed.supabase.co/auth/v1/token?grant_type=password" -Method Post -Headers $loginHeaders -Body $loginBody
$jwt = $loginResponse.access_token

Write-Host "Obtained JWT: $jwt"

$headers = @{
  "Authorization" = "Bearer $jwt"
  "Content-Type"  = "application/json"
}

Invoke-RestMethod `
  -Uri $backendUrl `
  -Method Delete `
  -Headers $headers
