# How to Start PulseFit & Troubleshoot Connectivity

**Date:** 2026-02-19
**Status:** 🟢 Resolved

---

## 1. Starting the App (Physical Device via USB)

### Step 1: Start the Backend

```powershell
cd C:\Users\Paradox-Labs\Documents\Projects\Pulse_Fit\backend
npm start
```

Backend runs on port **4000** (binds to `0.0.0.0`).

### Step 2: Set Up ADB Port Forwarding (USB Cable)

`adb` is **not in PATH** on this machine. Use the full path:

```powershell
& "$env:USERPROFILE\AppData\Local\Android\Sdk\platform-tools\adb.exe" reverse tcp:4000 tcp:4000
```

This tunnels the phone's `localhost:4000` → PC's `localhost:4000` over USB. Must be re-run each time the cable is reconnected.

### Step 3: Build & Run the Frontend

**IMPORTANT:** Always use the short path `C:\PF\frontend` to avoid Windows MAX_PATH errors.

```powershell
cd C:\PF\frontend
npx expo run:android
```

Select your physical device from the list when prompted.

### Frontend API Config

**File:** `frontend/services/api.ts`

```typescript
export const BASE_URL = 'http://localhost:4000/api';
```

This works with `adb reverse`. If switching to LAN/Wi-Fi, change to your PC's current IP (e.g., `http://10.x.x.x:4000/api`).

---

## 2. Connectivity Troubleshooting

### Problem: App not communicating with backend

**Symptoms:** Network errors, timeouts, or "connection refused" on the phone.

**Common Causes & Fixes:**

| Cause | Fix |
| :--- | :--- |
| **IP changed** (if using hardcoded LAN IP) | Update `BASE_URL` in `frontend/services/api.ts` to the new IP, or switch to `localhost` + `adb reverse` |
| **`adb reverse` not set up** (USB) | Run the full-path `adb reverse` command (see Step 2 above) |
| **`adb` not in PATH** | Use `& "$env:USERPROFILE\AppData\Local\Android\Sdk\platform-tools\adb.exe"` instead of bare `adb` |
| **Backend not running** | Start it with `npm start` in the `backend` folder |
| **Supabase project paused** | See Section 3 below |

### Diagnostic Commands

```powershell
# Check if backend is reachable from PC
curl http://localhost:4000/api

# Check if Supabase is reachable
ping zpamcgmirvqzlsnulphp.supabase.co

# Check DNS resolution via Google DNS
nslookup zpamcgmirvqzlsnulphp.supabase.co 8.8.8.8

# Flush DNS cache if resolution fails
ipconfig /flushdns
```

---

## 3. Supabase Project Paused (2026-02-19 Incident)

### What Happened

* Backend started successfully (`Server running on port 4000`)
* Frontend could not log in or register
* Backend logs showed: `Error: getaddrinfo ENOTFOUND zpamcgmirvqzlsnulphp.supabase.co`
* Ping and `nslookup` via Google DNS (8.8.8.8) both returned **"Non-existent domain"**
* General internet was working fine (google.com pinged OK)

### Root Cause

Supabase **automatically pauses free-tier projects** after 7 days of inactivity. When paused, the project's subdomain (`zpamcgmirvqzlsnulphp.supabase.co`) stops resolving entirely.

### Fix

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Find the PulseFit project (`zpamcgmirvqzlsnulphp`)
3. Click **"Restore project"**
4. Wait ~2 minutes for DNS to propagate
5. Verify: `ping zpamcgmirvqzlsnulphp.supabase.co` should now resolve
6. Restart the backend: `npm start`

### Key Lesson

> If the backend shows `ENOTFOUND` for Supabase but general internet works, **check if the Supabase project is paused first** before investigating DNS or network issues.

---

## 4. IP History

| Date | BASE_URL IP | Context |
| :--- | :--- | :--- |
| Earlier | `10.236.122.122` | Used in `start_app_lan.bat` for LAN mode |
| Earlier | `10.250.111.122` | Hardcoded in `api.ts` |
| 2026-02-19 | `localhost` | Switched to `adb reverse` for USB stability |
