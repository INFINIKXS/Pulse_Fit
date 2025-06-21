# PowerShell script to test fetching the current user's profile using JWT access token
$envPath = "..\..\backend\.env"

# Load .env and extract Supabase credentials, removing any surrounding quotes
Get-Content $envPath | ForEach-Object {
    if ($_ -match "SUPABASE_ANON_KEY=(.+)") { $anonKey = $Matches[1].Trim().Trim('"') }
    if ($_ -match "SUPABASE_URL=(.+)") { $supabaseUrl = $Matches[1].Trim().Trim('"') }
}

Write-Host "Supabase URL: $supabaseUrl"
Write-Host "Anon Key: $anonKey"

# Paste your JWT access token from login-user.ps1 output here
$jwt = Read-Host "Paste your JWT access token from login-user.ps1 output"

$headers = @{
  "apikey"        = $anonKey
  "Authorization" = "Bearer $jwt"
  "Content-Type"  = "application/json"
}

Invoke-RestMethod `
  -Uri "$supabaseUrl/auth/v1/user" `
  -Method Get `
  -Headers $headers
