# Image Picker & Profile Upload Implementation Journey

This document records the technical journey, challenges, and solutions encountered while implementing the profile picture upload functionality for Pulse Fit.

## 1. Initial Goal

The objective was to allow users to select a profile picture from their device gallery during onboarding (`OnboardingScreen1`) and in the `ProfileScreen`, and upload it to the backend (Supabase storage via a custom Express API).

## 2. Challenges Encountered

### A. Network & FormData Issues

**Problem:** Initial attempts using standard `axios` with `FormData` resulted in persistent `Network Error` on Android. React Native's `FormData` implementation can be flaky specifically with binary file uploads on some Android versions.
**Problem:** Switching to `FileSystem.uploadAsync` (legacy) was proposed but also faced deprecation and reliability issues in the latest Expo versions.

### B. "File Too Large" Errors (400 Bad Request)

**Problem:** The backend rejected uploads with a `400 Bad Request`.
**Diagnosis:** Detailed logging revealed the error body: `{"code":"FILE_TOO_LARGE"}`. The backend had a strict **1MB** limit, while modern smartphone photos are often 3MB-10MB.

### C. Database Schema Mismatch (500 Internal Server Error)

**Problem:** After fixing the file size, uploads failed with a `500 Internal Server Error`.
**Diagnosis:** The backend logs showed: `Could not find the 'avatar_url' column of 'profiles'`. The Supabase `profiles` table schema had not been updated to store the image path.

### D. Expo SDK Deprecations

**Problem:** Usage of `ImagePicker.MediaTypeOptions` triggered deprecation warnings in the console.
**Observation:** While `ImagePicker.MediaType` is the new standard, the installed version still required `MediaTypeOptions`, leading to a temporary confusion where we had to revert the fix.

## 3. The Solutions

### Strategy: Modern Expo Ecosystem

We moved away from legacy methods and adopted the modern **Expo FileSystem (Class-based API)** and **Expo Fetch**.

#### 1. New "Skills" Created

We created and installed two global skills to standardise our file handling:

* `expo-fs-local-manager`: For managing local files using `new File()` and `new Directory()`.
* `expo-fs-network-transfer`: For robust uploads using `expo/fetch`, which handles `File` objects natively in `FormData`.

#### 2. Code Refactoring

We refactored `OnboardingScreen1.tsx` and `AuthContext.tsx` to:

* Get the image URI from `ImagePicker`.
* Create a `File` instance from that URI.
* Append this `File` object to `FormData`.
* Send it via `fetch` (imported from `expo/fetch`) which is more reliable than axios for this specific task on Android.

#### 3. Backend Configuration

* **File Size:** We increased the allowed file size in `user-controller.js` from **1MB** to **5MB**.
* **Compression:** We lowered the client-side image compression quality from `0.8` to `0.5` to ensure faster uploads and smaller files.

#### 4. Database Schema Fix

We executed a SQL migration to add the missing column:

```sql
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
```

#### 5. User Experience (UX)

* **Custom Error Modal:** We integrated the `MessageModal` component into `OnboardingScreen1`.
* **Logic:** If an upload fails due to size (or other 400 errors), instead of a generic crash or silent fail, the user sees a styled modal: *"The image file is too large. Please choose a smaller image (max 5MB)."*

## 4. Final Status

* **Image Picking:** Works via `expo-image-picker`.
* **Uploading:** Works reliably via `expo/fetch`.
* **Storage:** Images are saved to Supabase Storage.
* **Database:** Profile records are updated with the `avatar_url`.
* **Feedback:** Users get clear visual feedback on success or failure.
