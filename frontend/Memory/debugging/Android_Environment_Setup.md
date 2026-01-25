# Android Environment Setup Issues & Fixes

## Problem

The Android build (`npx expo run:android`) failed with two critical errors after a system restart:

1. **Incompatible Java Version**:
    * **Error**: `Dependency requires at least JVM runtime version 11. This build uses a Java 8 JVM.`
    * **Cause**: The system default `java` command pointed to an old Java 8 installation (e.g., from SPSS or other software), while modern Android Gradle plugins require Java 11 or 17.

2. **Missing Android SDK Location**:
    * **Error**: `SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable...`
    * **Cause**: The developer relied on temporary environment variables (`ANDROID_HOME`) which were lost when the system restarted (tripped off). Without a persistent configuration, the build tools could not find the SDK.

## Solution

To ensure the build environment is robust and survives restarts, we moved from ephemeral environment variables to persistent project-level configuration files.

### 1. Fix Java Version (Persistent)

Instead of changing the system `PATH` (which can break other apps), we explicitly told Gradle which Java to use in `gradle.properties`.

**File**: `frontend/android/gradle.properties`
**Change**: Added `org.gradle.java.home` pointing to the valid JBR (JetBrains Runtime) included with Android Studio.

```properties
# Validated Java 17 path (from Android Studio)
org.gradle.java.home=C:\\Program Files\\Android\\Android Studio\\jbr
```

### 2. Fix SDK Location (Persistent)

We created a `local.properties` file to explicitly define the SDK location. This file is standard for Android projects but was missing.

**File**: `frontend/android/local.properties`
**Content**:

```properties
sdk.dir=C:\\Users\\Paradox-Labs\\AppData\\Local\\Android\\Sdk
```

## Summary

By coding these paths directly into the project's properties files, the build:

1. **Cannot fail** due to system JAVA_HOME changes.
2. **Cannot fail** due to missing ANDROID_HOME environment variables after a reboot.
