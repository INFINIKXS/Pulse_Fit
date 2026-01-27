---
name: expo-fs-network-transfer
description: Handles downloading and uploading files in Expo apps. Uses `downloadFileAsync` for retrieval and `expo/fetch` for uploading Blobs/Files.
---

# Expo FileSystem Network Transfer

This skill handles getting files onto the device from the web and sending local files to servers.

## When to use this skill

- **Downloading:** Fetching PDFs, images, or assets from a URL to local storage.
- **Uploading:** Sending local logs, images, or data to an API endpoint.
- **Syncing:** Updating local resources from remote sources.

## 1. Downloading Files

Use the static method `File.downloadFileAsync`.

### Logic

1. Define the `url`.
2. Define the `destination` (can be a `Directory` or a specific `File`).
3. Handle the result.

```typescript
import { File, Directory, Paths } from 'expo-file-system';

async function downloadAsset(url: string) {
  const destDir = new Directory(Paths.cache, 'downloads');
  if (!destDir.exists) destDir.create();

  try {
    // If destination is a Directory, filename is inferred from headers/url
    const file = await File.downloadFileAsync(url, destDir);
    
    console.log(`Saved to: ${file.uri}`);
    return file;
  } catch (error) {
    console.error("Download failed", error);
  }
}
```

### Idempotency

To prevent errors when downloading a file that already exists, use the idempotent option.

```typescript
await File.downloadFileAsync(url, destDir, { idempotent: true });
```

## 2. Uploading Files

The `expo-file-system` integrates directly with `expo/fetch`. You can pass `File` instances directly as the body or within `FormData`.

### Direct Binary Upload

Best for raw binary uploads (e.g., PUT requests to S3).

```typescript
import { fetch } from 'expo/fetch';
import { File, Paths } from 'expo-file-system';

async function uploadRaw(file: File) {
  const response = await fetch('https://api.example.com/upload', {
    method: 'POST',
    body: file, // File instance is automatically handled
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    }
  });
  return response.json();
}
```

### Multipart Form Upload

Best for standard API endpoints requiring metadata alongside the file.

```typescript
async function uploadForm(file: File) {
  const formData = new FormData();
  
  // Append the File instance directly
  formData.append('profile_image', file); 
  formData.append('user_id', '12345');

  const response = await fetch('https://api.example.com/update-profile', {
    method: 'POST',
    body: formData,
  });
}
```

## 3. Streaming Response to File

If you need to process a standard fetch response into a file manually (e.g., if you need to inspect headers before saving):

```typescript
import { fetch } from 'expo/fetch';
import { File, Paths } from 'expo-file-system';

const response = await fetch('https://example.com/large-data.json');
const target = new File(Paths.cache, 'data.json');

// Efficiently write bytes from response
target.write(await response.bytes());
```
