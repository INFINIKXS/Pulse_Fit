# How to Start the Pulse_Fit App

**IMPORTANT:** Always run build commands from the **Short Path** (`C:\PF\frontend`) to avoid Windows "Filename too long" errors.

## 1. Prerequisites (One-Time Setup)

Ensure the Directory Junction `C:\PF` exists. It links `C:\PF` -> `C:\Users\Paradox-Labs\Documents\Projects\Pulse_Fit`.

* **Check if it exists:** Type `dir C:\PF` in terminal.
* **If missing, create it:**

    ```cmd
    cmd /c mklink /J "C:\PF" "C:\Users\Paradox-Labs\Documents\Projects\Pulse_Fit"
    ```

---

## 2. Start on Physical Device (Android)

**Best for:** Performance, testing real gestures/camera.

1. **Prepare your Phone:**
    * Enable **Developer Options** & **USB Debugging**.
    * Connect via USB cable.
    * Unlock phone and tap **"Allow"** on the "Allow USB Debugging?" popup.
    * (Optional) If not detected, switch USB mode to "File Transfer".

2. **Run the Build:**

    ```powershell
    # 1. Go to the short path
    cd C:\PF\frontend

    # 2. Run the Android build command
    npx expo run:android
    ```

3. **Selection:**
    * If Expo asks, select your connected device from the list.
    * The app will install and open automatically.

---

## 3. Start on Android Emulator

**Best for:** Quick UI testing without a cable.

1. **Launch Emulator:**
    * Open Android Studio Device Manager and click "Play" on your AVD (e.g., Pixel 7).
    * *Alternatively, the command below will often launch it for you.*

2. **Run the Build:**

    ```powershell
    # 1. Go to the short path
    cd C:\PF\frontend

    # 2. Run the Android build command
    npx expo run:android
    ```

3. **Selection:**
    * If prompted, select the emulator (e.g., `emulator-5554`).

---

## 4. Common Issues & Fixes

### "Filename longer than 260 characters" / "ninja: error"

* **Cause:** You ran the command from the long path (`C:\Users\Paradox...`).
* **Fix:** `cd C:\PF\frontend` and try again.

### "System UI isn't responding" (Emulator)

* **Cause:** Cold boot or heavy load.
* **Fix:** Click **Wait**. It usually resolves in a few seconds.

### Device Not Found

* **Fix:** Check cable, toggle USB Debugging OFF/ON, or install Universal ADB Drivers.
