# PowerShell script to test Supabase user login via direct API
$envPath = "..\..\backend\.env"

# Load .env and extract Supabase credentials, removing any surrounding quotes
Get-Content $envPath | ForEach-Object {
    if ($_ -match "SUPABASE_ANON_KEY=(.+)") { $anonKey = $Matches[1].Trim().Trim('"') }
    if ($_ -match "SUPABASE_URL=(.+)") { $supabaseUrl = $Matches[1].Trim().Trim('"') }
}

Write-Host "Supabase URL: $supabaseUrl"
Write-Host "Anon Key: $anonKey"

$headers = @{
  "apikey"        = $anonKey
  "Authorization" = "Bearer $anonKey"
  "Content-Type"  = "application/json"
}

$body = @{
  email    = "ifeanyiobasi65@gmail.com"
  password = "ABCD1234"
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "$supabaseUrl/auth/v1/token?grant_type=password" `
  -Method Post `
  -Headers $headers `
  -Body $body
