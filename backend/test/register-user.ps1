# PowerShell script to test Supabase user registration via backend API and keep .env parsing
$envPath = "..\..\backend\.env"

# Load .env and extract Supabase credentials, removing any surrounding quotes
Get-Content $envPath | ForEach-Object {
    if ($_ -match "SUPABASE_ANON_KEY=(.+)") { $anonKey = $Matches[1].Trim().Trim('"') }
    if ($_ -match "SUPABASE_URL=(.+)") { $supabaseUrl = $Matches[1].Trim().Trim('"') }
}

Write-Host "Supabase URL: $supabaseUrl"
Write-Host "Anon Key: $anonKey"

$backendUrl = "http://localhost:4000/api/auth/register"  # Change port if needed

$headers = @{
  "Content-Type"  = "application/json"
}

$body = @{
  email     = "ifeanyiobasi65@gmail.com"
  password  = "ABCD1234"
  full_name = "Ifeanyi Obasi"
  age       = 28
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri $backendUrl `
  -Method Post `
  -Headers $headers `
  -Body $body
