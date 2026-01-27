# Responsive Scaling System

> Documentation of the pixel-perfect responsive scaling approach used in PulseFit, based on analysis of `OnboardingScreen2.tsx` and `utils/scaling.ts`.

---

## Overview

The responsive scaling system ensures that UI elements maintain their visual proportions across different device screen sizes. It uses a **guideline-based scaling approach** where design values are authored for a reference resolution and then dynamically scaled to match the actual device dimensions.

---

## Core Concepts

### Guideline Base Dimensions

All design values are authored against a standard mobile reference resolution:

| Property | Value |
|----------|-------|
| **Width** | 393 px |
| **Height** | 852 px |

These dimensions represent a typical modern mobile device (similar to iPhone 14 / Pixel 7 in portrait mode).

---

## Scaling Functions

The system provides **three primary scaling functions**, each suited for different use cases:

### 1. Horizontal Scale `s(size)` / `scale(size)`

**Formula:**

```
scaledValue = (screenWidth / 393) * size
```

**Use Cases:**

- Horizontal padding and margins (`paddingHorizontal`, `marginLeft`, etc.)
- Element widths
- Horizontal gaps between elements
- Icon sizes (when aspect ratio is 1:1)
- Border radius

**Example from OnboardingScreen2:**

```tsx
const PADDING = s(20);        // Horizontal padding
const GAP = s(18);            // Gap between cards
const ICON_SIZE = s(30);      // Square icon dimensions
const CHECKBOX = s(25);       // Checkbox size
```

---

### 2. Vertical Scale `vs(size)` / `verticalScale(size)`

**Formula:**

```
scaledValue = (screenHeight / 852) * size
```

**Use Cases:**

- Vertical padding and margins (`paddingTop`, `marginTop`, etc.)
- Element heights
- Vertical spacing between sections
- Line heights (sometimes)

**Example from OnboardingScreen2:**

```tsx
paddingTop: vs(50),           // Top header spacing
paddingBottom: vs(30),        // ScrollView bottom padding
height: vs(141),              // Card heights
marginTop: vs(13),            // Section spacing
```

---

### 3. Moderate Scale `ms(size, factor?)` / `moderateScale(size, factor?)`

**Formula:**

```
scaledValue = size + (scale(size) - size) * factor
```

Where `factor` defaults to `0.5` (50% scaling influence).

**Use Cases:**

- **Font sizes** - Prevents text from becoming too large or too small on extreme screen sizes
- Text that needs to scale, but not as aggressively as layout dimensions

**Example from OnboardingScreen2:**

```tsx
fontSize: ms(22),             // Header title
fontSize: ms(12),             // Subtitle text
fontSize: ms(17),             // Card title text
fontSize: ms(16),             // Description text
```

---

## Implementation Patterns

### Static vs Dynamic Scaling

The system provides **two usage patterns**:

#### Static Scaling (for `StyleSheet.create`)

```tsx
import { s, vs, ms } from '../utils/scaling';

const styles = StyleSheet.create({
  container: {
    padding: s(20),
    marginTop: vs(50),
  },
  title: {
    fontSize: ms(24),
  }
});
```

- Uses initial screen dimensions captured at module load
- Best for styles that don't need to respond to orientation changes

#### Dynamic Scaling Hook (for inline styles)

```tsx
import { useScaling } from '../utils/scaling';

function MyComponent() {
  const { s, vs, ms } = useScaling();

  return (
    <View style={{ padding: s(20), marginTop: vs(50) }}>
      <Text style={{ fontSize: ms(24) }}>Hello</Text>
    </View>
  );
}
```

- Uses `useWindowDimensions()` to respond to screen size changes
- Best for components that need to adapt to orientation changes

---

## OnboardingScreen2 Scaling Architecture

### Design Constants Pattern

At the top of the component, common scaled values are computed once:

```tsx
const { s, vs, ms } = useScaling();

// Design constants using dynamic scaling
const PADDING = s(20);
const GAP = s(18);
const CARD_PADDING = s(16);
const ICON_SIZE = s(30);
const ICON_CIRCLE = s(50);
const CHECKBOX = s(25);
const RADIUS = s(30);
```

This approach:

1. Centralizes magic numbers
2. Makes the scaling strategy explicit
3. Allows easy adjustment of proportions

---

### Layout Composition Example

The goal cards use a **masonry layout** with flex-based sizing:

```tsx
<View style={{ flexDirection: 'row', gap: GAP }}>
  {/* Left Column */}
  <View style={{ flex: 1, gap: vs(15) }}>
    {/* Build Muscle card - height: vs(141) */}
    {/* Improve Flexibility card - height: vs(135) */}
  </View>

  {/* Right Column - Tall card spans both rows */}
  <View style={{ flex: 1 }}>
    {/* Lose Weight card - height: vs(141) + vs(15) + vs(135) */}
  </View>
</View>
```

Key techniques:

- `flex: 1` ensures columns share available width equally
- Vertical heights use `vs()` for proper spacing across devices
- The tall card's height is computed as the sum of both left cards + the gap

---

### Proportional Font Sizing

For dynamic text sizing relative to container height:

```tsx
// Title font size is 20% of card height
fontSize: vs(80) * 0.2,

// Subtext is 15% of card height
fontSize: vs(80) * 0.15,

// Line height is 125% of font size
lineHeight: (vs(80) * 0.2) * 1.25,
```

This pattern ensures text scales proportionally with its container.

---

## Best Practices Summary

| Element Type | Recommended Function |
|--------------|---------------------|
| Horizontal dimensions | `s()` |
| Vertical dimensions | `vs()` |
| Font sizes | `ms()` |
| Border radius | `s()` |
| Icon sizes (square) | `s()` |
| Padding/margins (horizontal) | `s()` |
| Padding/margins (vertical) | `vs()` |
| Gaps (flexbox) | `s()` for row, `vs()` for column |

---

## Actual Device Dimensions

The development device's actual screen dimensions (measured 2026-01-27):

| Property | Value |
|----------|-------|
| **Device** | TECNO KI8 |
| **Width** | 360 px |
| **Height** | 770 px |

### Scaling Ratios

For converting from guideline base (393 × 852) to this device:

| Function | Formula | Ratio |
|----------|---------|-------|
| `s()` horizontal | 360 / 393 | **0.916** |
| `vs()` vertical | 770 / 852 | **0.904** |

> [!TIP]
> When designing for this device, elements will appear ~8-9% smaller than the guideline base. Test on larger devices to ensure proper scaling up.

---

## Status Bar & Safe Area Handling

For top-positioned elements (Headers, Logos, Search Bars), simple scaling is **insufficient** because physical status bars vary wildly in height (notches, dynamic islands).

**The Rule:**
Always compare the *scaled design value* against the device's *physical safe area inset* and take the larger of the two.

```ts
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ... inside component
const insets = useSafeAreaInsets();

// Formula: Max( Scaled Design Value, Physical Status Bar Height )
top: Math.max( vs(48), insets.top )
```

| Scenario | Design Spec | Scaled (vs) | Status Bar | Result | Why? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Large Device** | 48px | 52px | 44px | **52px** | Design spacing is safer (larger). |
| **Small Device** | 48px | 43px | 50px | **50px** | Status bar is larger; content yields to hardware. |

This guarantees that header elements:

1. Maintain design fidelity on standard devices.
2. Never overlap the status bar on devices with large notches.

---

## File References

- **Scaling Utility:** [`frontend/utils/scaling.ts`](file:///c:/Users/Paradox-Labs/Documents/Projects/Pulse_Fit/frontend/utils/scaling.ts)
- **Example Screen:** [`frontend/screens/OnboardingScreen2.tsx`](file:///c:/Users/Paradox-Labs/Documents/Projects/Pulse_Fit/frontend/screens/OnboardingScreen2.tsx)

---

*Last Updated: 2026-01-27*
