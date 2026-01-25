# Reanimated NullPointerException Investigation

## Error Summary

**Error Type:** `java.lang.NullPointerException`  
**Location:** `com.swmansion.reanimated.NativeProxy.initHybrid(Native Method)`  
**Impact:** App crashes immediately on Android when loading via Expo Go

### Stack Trace

```
Exception in HostObject::get for prop 'ReanimatedModule':
java.lang.NullPointerException
  at com.swmansion.reanimated.NativeProxy.initHybrid(Native Method)
  at com.swmansion.reanimated.NativeProxyCommon.initHybrid
  at com.swmansion.reanimated.ReanimatedModule.getModule
```

## Root Cause Investigation

### Phase 1: Initial Fixes Attempted (All Failed)

1. ✅ Verified Babel config includes `react-native-reanimated/plugin`
2. ✅ Reinstalled `react-native-reanimated@3.16.7` with `--legacy-peer-deps`
3. ✅ Cleared Metro bundler cache with `-c` flag
4. ❌ **Crash persists after all standard fixes**

### Phase 2: Evidence Gathering

#### Codebase Analysis

- **Only one component** uses Reanimated: [`HeaderPill.tsx`](file:///c:/Users/Paradox-Labs/Documents/Projects/Pulse_Fit/frontend/components/HeaderPill.tsx)
- Imported in: [`HomeScreen.tsx`](file:///c:/Users/Paradox-Labs/Documents/Projects/Pulse_Fit/frontend/screens/HomeScreen.tsx)
- Uses: `useSharedValue`, `useAnimatedStyle`, `withTiming`, `Animated.View`
- Other animations ([`SplashScreen.tsx`](file:///c:/Users/Paradox-Labs/Documents/Projects/Pulse_Fit/frontend/screens/SplashScreen.tsx)) use React Native's built-in `Animated` API

#### Configuration Analysis

- **Expo SDK:** 54.0.31
- **Reanimated Version:** 3.16.7 (installed in node_modules)
- **Babel Config:** Correct (`babel.config.cjs` includes plugin as last entry)
- **Platform:** Expo Go on Android

### Phase 3: Root Cause Identification

> [!IMPORTANT]
> **Root Cause: Expo Go Native Binary Incompatibility**

**The Problem:**
Expo Go is a **pre-compiled native application** that includes a fixed set of native modules. When your JavaScript bundle expects `react-native-reanimated@3.16.7`, but Expo Go's embedded binary contains a different version, the native module initialization fails with a `NullPointerException`.

**Why This Happens:**

1. Your `package.json` specifies Reanimated 3.16.7
2. Metro bundler creates a JS bundle expecting that version
3. Expo Go's native binary may have Reanimated 3.16.x (different patch) or 3.15.x
4. Native version mismatch → `HostObject::get` fails → NPE

**Why Standard Fixes Don't Work:**

- **Babel config:** Only affects JS transpilation, not native modules
- **Reinstalling package:** Changes JS files, not Expo Go's native binary
- **Cache clearing:** Clears JS bundle cache, not native modules

## Solutions

### Option 1: Create Development Build (Recommended ✅)

Build a **custom Expo app** with your exact native dependencies.

#### Steps

```powershell
# 1. Stop current server (Ctrl+C in terminal)

# 2. Prebuild native projects (Android/iOS)
npx expo prebuild

# 3. Build and run on Android device/emulator
npx expo run:android
```

#### Requirements

- Android Studio with SDK installed OR
- Physical Android device connected via USB (USB debugging enabled)

#### Pros

- ✅ Guaranteed compatibility with all native modules
- ✅ Full control over native dependencies
- ✅ Required for production builds anyway

#### Cons

- ⏱️ Initial build takes 5-10 minutes
- 📦 Creates `android/` and `ios/` folders (~200MB)

---

### Option 2: Replace Reanimated with Native Animated (Quick Test)

Temporarily remove Reanimated to verify hypothesis.

#### Steps

1. Backup `HeaderPill.tsx`
2. Rewrite component using React Native's `Animated` API instead of Reanimated
3. Test if app loads successfully

#### Pros

- ⚡ Fast verification (5 minutes)
- 🔍 Confirms root cause

#### Cons

- 🔄 Temporary workaround, not a permanent solution
- 📉 Slightly reduced animation performance

---

### Option 3: Update Expo Go App

Ensure Expo Go version matches SDK requirements.

#### Steps

1. Open Expo Go on Android device
2. Check app version (Settings → About)
3. Update from Google Play Store if outdated
4. Re-scan QR code

#### Pros

- ⚡ Simplest attempt

#### Cons

- ❓ May not resolve issue if Expo Go still has version mismatch
- 🚫 Limited control over bundled native modules

---

### Option 4: Downgrade Reanimated (Not Recommended)

Match the version bundled in Expo Go.

#### Why Not Recommended

- 🔍 Unknown which exact version Expo Go includes
- 🎯 Trial and error approach
- ⏱️ Time-consuming without guaranteed success

---

## Recommended Action Plan

1. **Try Option 3 first** (update Expo Go) - takes 2 minutes
2. **If still crashes, proceed with Option 1** (development build) - permanent solution
3. **Option 2 is available** for quick validation if needed

## Additional Resources

- [Expo Development Builds Documentation](https://docs.expo.dev/develop/development-builds/introduction/)
- [React Native Reanimated Compatibility](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation)
- [Expo SDK 54 Release Notes](https://expo.dev/changelog/2024/11-12-sdk-54)

## Files Investigated

- [babel.config.cjs](file:///c:/Users/Paradox-Labs/Documents/Projects/Pulse_Fit/frontend/babel.config.cjs) - ✅ Correct configuration
- [package.json](file:///c:/Users/Paradox-Labs/Documents/Projects/Pulse_Fit/frontend/package.json) - Reanimated 3.16.7 listed
- [HeaderPill.tsx](file:///c:/Users/Paradox-Labs/Documents/Projects/Pulse_Fit/frontend/components/HeaderPill.tsx) - Only file using Reanimated
- [HomeScreen.tsx](file:///c:/Users/Paradox-Labs/Documents/Projects/Pulse_Fit/frontend/screens/HomeScreen.tsx) - Imports HeaderPill
- [SplashScreen.tsx](file:///c:/Users/Paradox-Labs/Documents/Projects/Pulse_Fit/frontend/screens/SplashScreen.tsx) - Uses native Animated (no Reanimated)

---

**Investigation Date:** 2026-01-23  
**Status:** Root cause identified, solutions proposed
