---
name: Debug Expo Connectivity & Authentication
description: Comprehensive troubleshooting guide for fixing Expo connection refused, 401 errors, loopback binding, and firewall issues on Windows.
---

# Debugging Expo Connectivity & Authentication

This skill outlines a systematic approach to resolving common connectivity and authentication blockers when developing React Native (Expo) apps on Windows, interacting with a local backend.

## 1. Authentication: 401 Unauthorized Loops

**Symptom:**

- Infinite loading spinners or repeated blocking errors when trying to save data.
- API calls return `401 Unauthorized` regardless of login state.

**Root Cause:**

- Stale or invalid JWT tokens persisted on the device (e.g., from a previous auth implementation).
- App continues sending the bad token without clearing it, leading to a loop.

**Resolution:**

- **Implement Auto-Logout:** Add an Axios response interceptor to catch 401 errors globally.

```typescript
// frontend/services/api.ts
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Trigger global logout (clear SecureStore, reset state)
      logoutCallback?.();
    }
    return Promise.reject(error);
  }
);
```

## 2. Windows Firewall: "Connection Refused"

**Symptom:**

- `Uncaught Error: Java.net.ConnectException: Connection refused`
- Mobile device cannot reach backend (`http://IP:4000`) or Expo Bundler (`http://IP:8081`).

**Root Cause:**

- Windows Firewall blocks incoming TCP connections on non-standard ports (like 4000, 8081) from the local network (Private/Public profiles).

**Resolution:**

- **Open Ports via PowerShell (Run as Administrator):**

```powershell
New-NetFirewallRule -DisplayName "PulseFit Backend" -Direction Inbound -LocalPort 4000 -Protocol TCP -Action Allow -Profile Private,Public
New-NetFirewallRule -DisplayName "Expo Bundler" -Direction Inbound -LocalPort 8081 -Protocol TCP -Action Allow -Profile Private,Public
```

## 3. Expo Binding to Loopback (127.0.0.1)

**Symptom:**

- Expo QR code shows `exp://127.0.0.1:8081`.
- Mobile device fails to connect immediately (since 127.0.0.1 is itself).

**Root Cause:**

- Expo/Metro auto-detects `localhost` adapter instead of the LAN Wi-Fi adapter.
- Common on Windows with multiple network interfaces (VirtualBox, Docker, etc.).

**Resolution:**

- **Force LAN IP Hostname:** Set the environment variable `REACT_NATIVE_PACKAGER_HOSTNAME` to your computer's LAN IP before starting.

```powershell
$env:REACT_NATIVE_PACKAGER_HOSTNAME="10.236.122.122"; npx expo start --lan --clear
```

## 4. IP Address Changes

**Symptom:**

- App hangs indefinitely (timeout) on Splash Screen or API calls.
- `ipconfig` shows a different IPv4 address than what is hardcoded in `api.ts`.

**Resolution:**

- **Update API Config:** Ensure `frontend/services/api.ts` `BASE_URL` matches the current machine IP.
- **Add Timeout:** Always configure an explicit timeout in Axios to prevent infinite hanging.

```typescript
const api = axios.create({
    baseURL: 'http://10.236.122.122:4000/api',
    timeout: 10000, // 10s timeout
});
```
