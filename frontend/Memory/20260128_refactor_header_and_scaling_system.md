# Experience: Refactoring Header Layout and Scaling System

**Date**: 2026-01-28
**Tags**: #ReactNative #Layout #Scaling #Refactor #Android

## 🔴 Problem

The Home Screen header layout was misaligned with the design specs. Specifically:

1. The logo and search button positions were swapped compared to the desired visual layout.
2. The PulseFit logo text was wrapping onto two lines.
3. Design coordinates (e.g., `left: 264px`) were not matching visual output when scaled using `s()`.
4. The `PulseFit_Logo` component had internal offsets causing layout unpredictability.

## 🔄 Attempts

- Tried purely Flexbox row layout, but it didn't match the pixel-perfect absolute coordinates requested.
- Tried applying design coordinates directly, but they were visually off (e.g., logo was too far right).
- Identified that `HeaderPill` had internal padding causing a "double padding" visual effect.
- Identified that `GUIDELINE_BASE_WIDTH` in `scaling.ts` was set to 393 (iPhone) instead of 353 (Android Design XML), causing scaling math errors.
- Identified that `PulseFit_Logo` had hardcoded internal `left` and `top` property offsets, making it impossible to align using standard flex or parent-absolute coordinates.

## ✅ Solution

1. **Fixed Scaling:** Updated `guidelineBaseWidth` in `scaling.ts` to **353** to match the design file's canvas width.
2. **Refactored Logo:** Removed internal absolute offsets from `PulseFit_Logo.tsx` and `PulseFit_Logo_Centered.tsx`, converting them to standard Flexbox components.
3. **Adjusted Layouts:** Updated `HomeScreen.tsx`, `LoginScreen.tsx`, and `SignupScreen.tsx` to position the logo using the correct design specs (`left: 264` for Home) or corrected relative positions, now that the internal offsets are gone.
4. **Logo Wrapping:** Removed the fixed width constraint on the Logo container in `HomeScreen` to allow the text to lay out horizontally before scaling.

## � Iteration 2: Visual Refinements & Pixel Perfection

**Date**: 2026-01-28 (Cont.)

### Additional Improvements

1. **Strict Scaling**: Switched `PulseFit_Logo` text scaling from `ms()` (moderate) to `s()` (width-based) to ensure the text scales linearly with the icon, preserving the exact design ratio on all devices.
2. **Visual Tweaks**:
    - **Elongated Icon**: Increased Logo Icon height to `s(89)` and set `resizeMode: 'stretch'` to match specific user preference.
    - **Colors**: Updated "FIT" text color to `#03971bff`.
3. **Coordinate Updates (Absolute Positioning)**:
    - **Login & Signup Screens**: Applied precise `Left: 101`, `Top: 98` coordinates.
    - **Splash Screen**: Applied `Left: 90`, `Top: 374`.
    - **Home Screen**: Applied `Left: 20`, `Top: 58` for Header Pill, and `Left: 199`, `Top: 54` for Logo.
4. **Scaling Infrastructure**:
    - Refactored `SignupScreen` to use a `createStyles` closure pattern, allowing scaling hooks (`s`, `vs`, `ms`) to be used safely within style definitions.

## �💡 Key Takeaway

Always verify the `GUIDELINE_BASE_WIDTH` in your scaling utility matches your design file's canvas width, and avoid hardcoded internal offsets in reusable UI components (like Logos) to ensure predictable positioning.
