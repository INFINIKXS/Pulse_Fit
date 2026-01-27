---
name: expo-profile-upload-flow
description: Implements a robust, full-stack profile picture upload workflow in Expo. Covers image selection, modern binary uploads using `expo/fetch`, backend schema requirements, and user-facing error handling.
---

# Expo Profile Upload Flow

This skill guides the implementation of a reliable image upload feature (e.g., Profile Pictures). It specifically addresses common pitfalls in React Native Android networking (FormData issues) and backend mismatches.

## When to use this skill

- **Feature Requests:** "Allow users to upload an avatar," "Implement profile picture change."
- **Debugging:** Fixing "Network Error" on Android uploads or "File Too Large" errors.
- **Modernization:** Refactoring legacy `axios` or `FileSystem.uploadAsync` code to the modern `expo/fetch` standard.

## 1. Client-Side: Image Selection

Use `expo-image-picker` to select the file.
**Crucial:** Apply client-side compression (`quality: 0.8`) immediately to reduce failure rates on slow networks and avoid hitting strict backend limits.

```typescript
import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // Note: Use MediaTypeOptions to avoid deprecation warnings
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8, // COMPRESSION IS KEY: 0.8 usually keeps files under 5MB
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
};
```

## 2. The Upload Logic (Modern Standard)

**Problem:** Standard `axios` with `FormData` often fails on Android with "Network Error" due to binary handling issues.
**Solution:** Use `expo/fetch` combined with the `File` class from `expo-file-system`.

```typescript
import { fetch } from 'expo/fetch';
import { File, Paths } from 'expo-file-system';

const uploadAvatar = async (localUri: string, userId: string) => {
  try {
    // 1. Create a File reference from the local URI
    const file = new File(localUri);

    // 2. Construct FormData
    // The 'File' object is natively handled by expo/fetch
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', userId);

    // 3. Send using expo/fetch
    const response = await fetch('https://api.yourapp.com/upload-avatar', {
      method: 'POST',
      body: formData,
      // Note: Do NOT manually set Content-Type to multipart/form-data; 
      // the browser/engine sets the boundary automatically.
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw { status: response.status, code: errorData.code, message: errorData.message };
    }

    return await response.json();

  } catch (error) {
    throw error;
  }
};
```

## 3. Backend & Database Readiness Checklist

Before running the client code, the agent must verify the backend environment.

### A. Database Schema

Ensure the database can store the reference.

- **SQL Migration:**

```sql
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
```

### B. Server Configuration

Ensure the backend accepts modern smartphone photo sizes (3MB+).

- **Node/Express:**

```javascript
// user-controller.js or middleware
// Increase limit from default 1MB to 5MB
app.use(express.json({ limit: '5mb' }));
// If using multer: limits: { fileSize: 5 * 1024 * 1024 }
```

## 4. Error Handling UX

Do not let the app crash on upload failures. Intercept specific error codes to show the `MessageModal`.

**Logic Flow:**

1. **Catch Error:** Inspect `error.code` or `error.status`.
2. **400 / FILE_TOO_LARGE:** Show **Warning Modal**: *"The image file is too large. Please choose a smaller image."*
3. **500 / Schema Error:** Show **Fail Modal**: *"Server configuration error. Please try again later."*

```typescript
catch (error) {
  if (error.code === 'FILE_TOO_LARGE') {
    setShowWarningModal(true); // "Please choose a smaller image (max 5MB)"
  } else {
    setShowFailModal(true); // "Upload failed"
  }
}
```

## Troubleshooting Guide

| Symptom | Cause | Fix |
| --- | --- | --- |
| **Network Error (Android)** | Using `axios` with raw `FormData` | Switch to `expo/fetch` + `expo-file-system`. |
| **400 Bad Request** | File exceeds server limit | Check `quality` setting in Picker or increase server `fileSize` limit. |
| **500 Internal Error** | DB column missing | Run migration to add `avatar_url`. |
| **Deprecation Warnings** | `MediaType` vs `MediaTypeOptions` | Ensure installed package version matches the enum used. |
