# Windows MAX_PATH Limitation (Filename Too Long)

## Problem

During Android builds on Windows, you may encounter the error:
`ninja: error: Stat(...): Filename longer than 260 characters`

This occurs because the nested dependency paths in `node_modules` (specifically libraries like `react-native-safe-area-context` or `react-native-reanimated`) combined with your project's absolute path exceed the Windows API limit of 260 characters.

## Solution: Directory Junction (Symlink)

To bypass this without moving your actual project files, create a **Directory Junction**. This acts as a "portal" at a very short path that points to your full project location.

### Step 1: Create the Junction

Run this command in any terminal (uses `cmd` syntax):

```cmd
cmd /c mklink /J "C:\PF" "C:\Users\Paradox-Labs\Documents\Projects\Pulse_Fit"
```

* `C:\PF`: The new, ultra-short path.
* `"C:\Users\..."`: Your actual existing project path.

### Step 2: Build from the Short Path

Whenever you need to run a build or install the app, **navigate to the short path** instead of the long one:

```powershell
cd C:\PF\frontend
npx expo run:android
```

This effectively reduces your project's root path length from ~55 characters to just 4 characters (`C:\PF`), preventing the limit from being reached.
