---
name: expo-fs-local-manager
description: Manages local files and directories in Expo/React Native apps. Handles creating, reading, writing, moving, deleting, and listing filesystem contents using the class-based API.
---

# Expo FileSystem Local Manager

This skill manages the local filesystem on Android, iOS, and Expo Go. It uses the modern **Class-based API** (`new File()`, `new Directory()`) rather than the legacy static methods.

## When to use this skill

- **Storage:** Saving user data, logs, or cached content to the device.
- **Retrieval:** Reading text or binary data from local paths.
- **Organization:** Creating directory structures, listing folder contents, or moving/copying files.
- **Cleanup:** Deleting old cache files or clearing directories.

## 1. Core Classes & Paths

Always import from `expo-file-system`. Do not use `expo-file-system/legacy` unless explicitly requested.

### Standard Paths

- `Paths.cache`: Temporary storage. OS may clear this when low on space.
- `Paths.document`: Persistent storage. User data that must remain until deleted.

### Initialization

Files and Directories do not need to exist to be instantiated.

```typescript
import { File, Directory, Paths } from 'expo-file-system';

// Define paths
const docs = new Directory(Paths.document);
const myFolder = new Directory(Paths.cache, 'custom-folder');
const myFile = new File(myFolder, 'data.txt');
```

## 2. Reading and Writing

### Text Operations

Use synchronous methods for small operations to keep code clean.

```typescript
// Writing
if (!myFolder.exists) myFolder.create(); // Ensure parent exists
myFile.create(); // Create file if needed
myFile.write('Hello World');

// Reading
const content = myFile.textSync();
```

### Binary/Stream Operations

For large files or binary data, use streams or byte arrays.

```typescript
// Reading Bytes
const bytes = myFile.bytesSync(); // Returns Uint8Array

// Stream Reading (FileHandle)
const handle = myFile.open(); // Returns FileHandle
try {
  const chunk = handle.readBytes(1024); // Read first 1KB
} finally {
  handle.close(); // ALWAYS close handles
}
```

## 3. Directory Operations

### Recursive Listing

To list contents, use `.list()` which returns an array of File and Directory instances.

```typescript
function listFilesRecursively(dir: Directory) {
  if (!dir.exists) return;
  
  const items = dir.list();
  for (const item of items) {
    if (item instanceof Directory) {
      console.log(`DIR: ${item.name}`);
      listFilesRecursively(item);
    } else {
      console.log(`FILE: ${item.name} (${item.size} bytes)`);
    }
  }
}
```

## 4. Moving and Copying

Operations update the instance's property automatically.

```typescript
const file = new File(Paths.cache, 'temp.img');
const archiveDir = new Directory(Paths.document, 'archive');

// Copy
const backup = new File(archiveDir, 'backup.img');
file.copy(backup); 

// Move
file.move(archiveDir); // file.uri is now updated to the new location
```

## Best Practices

- **Check Existence:** Always check `.exists` on a Directory before trying to write files into it.
- **Permissions:** Apps have access to their own sandbox (Paths.document, Paths.cache) by default. No extra permissions needed for these.
- **Error Handling:** Wrap IO operations in try/catch blocks.
