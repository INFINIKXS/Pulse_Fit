# Expo Development Build Troubleshooting Log & Post-Mortem

**Date:** 2026-01-23
**Status:** 🟢 **Build In Progress** (Past the NDK Blocker)
**Original Issue:** Reanimated NullPointerException crash on Android
**Current Phase:** Gradle Build & Compilation

---

## 1. The Core Problem
**What happened:**
The build process was stuck indefinitely at `10% CONFIGURING` while trying to download the Android NDK (Native Development Kit).
**Why it happened:**
The network environment (likely due to strict SSL/Certificate inspection or a firewall) allows web browser traffic but blocks or throttles command-line tools (like `curl` or Gradle's internal downloader). The CLI could not complete the "handshake" to download the large NDK file (approx. 600MB+).

---

## 2. Analysis of Mistakes & Wrong Approaches

### Mistake 1: Relying on CLI for Large Downloads
*   **The Approach:** We attempted to let `npx expo run:android` handle the downloading of the NDK automatically.
*   **Why it failed:** The terminal provides no feedback (just a blinking cursor) and has fragile network error handling. When the connection dropped or was blocked by the firewall, the terminal just hung forever.
*   **Lesson:** In restricted network environments, large dependencies (like NDK) should be handled via the GUI, not the terminal.

### Mistake 2: The Directory Confusion
*   **The Approach:** Running commands from `C:\...\Projects\Pulse_Fit`.
*   **The Error:** `ConfigError: package.json does not exist`.
*   **Why it happened:** The project was structured with a nested `frontend` folder.
*   **The Fix:** We had to explicitly `cd frontend` to ensure Gradle could find the project files.

---

## 3. The Solution: Android Studio SDK Manager

Since the CLI failed to download the NDK, we used the **Android Studio GUI** to bypass the specific network block on that file.

### Step 1: Solving the NDK Block (The Critical Fix)
Instead of letting the terminal struggle to download `27.1.12297006`, we used the SDK Manager.
*   **Tool:** Android Studio > SDK Manager > SDK Tools.
*   **Action:** Checked "Show Package Details".
*   **Selection:** Scrolled to **NDK (Side by side)** and selected the *exact* version the log requested: **27.1.12297006**.
*   **Result:** Android Studio's downloader is more robust/secure than the CLI. It successfully downloaded and installed the NDK to the correct path automatically.

### Step 2: CMake & Build Tools (Automatic Resolution)
*   **Action:** We chose **NOT** to manually install CMake or downgrade Build Tools in Android Studio.
*   **Result:** The Gradle build script successfully detected the NDK (from Step 1) and proceeded to resolve CMake and Build Tools automatically without hanging.
*   **Conclusion:** The only file large enough to cause the network timeout/block was the NDK. Once that was manually installed, the CLI was able to handle the smaller dependencies (CMake) on its own.

---

## 4. Current Environment State (Fixed)

| Component | Status | Method Used |
| :--- | :--- | :--- |
| **Gradle Wrapper** | ✅ Installed | **Manual Zip** (downloaded via Browser, pasted to `.gradle` folder). |
| **NDK (27.1...)** | ✅ Installed | **Android Studio SDK Manager** (GUI). |
| **CMake** | 🔄 Auto-Resolving | Handled by Gradle during build. |
| **Build Tools** | 🔄 Auto-Resolving | Handled by Gradle during build. |
| **Java (JBR)** | ✅ Configured | **PowerShell Env Variable** (Pointed `JAVA_HOME` to Android Studio). |

---

## 5. Next Steps

The build command is currently running. If it completes successfully, the app will launch on your Emulator/Device.

**Current Command Running:**
```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"; $env:ANDROID_HOME = "$env:USERPROFILE\AppData\Local\Android\Sdk"; $env:PATH = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:PATH"; npx expo run:android
```