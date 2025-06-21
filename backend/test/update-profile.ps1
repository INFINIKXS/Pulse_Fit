# PowerShell script to update Supabase user profile in 'profiles' table
$envPath = "..\..\backend\.env"

# Load .env and extract Supabase credentials
Get-Content $envPath | ForEach-Object {
    if ($_ -match "SUPABASE_ANON_KEY=(.+)") { $anonKey = $Matches[1].Trim().Trim('"') }
    if ($_ -match "SUPABASE_URL=(.+)") { $supabaseUrl = $Matches[1].Trim().Trim('"') }
}

Write-Host "Supabase URL: $supabaseUrl"
Write-Host "Anon Key: $anonKey"

# Paste your JWT access token from login-user.ps1 output here
$jwt = Read-Host "Paste your JWT access token from login-user.ps1 output"

# Your user id (from profile or login output)
$userId = Read-Host "Paste your user id (uuid) from login-user.ps1 output"

$headers = @{
  "apikey"        = $anonKey
  "Authorization" = "Bearer $jwt"
  "Content-Type"  = "application/json"
}

$body = @{
  id = $userId
  full_name = "Ifeanyi Obasi"
  age = 30
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "$supabaseUrl/rest/v1/profiles?id=eq.$userId" `
  -Method Patch `
  -Headers $headers `
  -Body $body
