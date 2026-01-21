# layout-refactor-notes.md

## OnboardingScreen2 Layout Refactor (Pixel-Perfect Implementation)

**Date**: 2026-01-21
**Objective**: Match Figma XML design specifications exactly while maintaining responsive scaling across devices.

### 1. Centralized Scaling Utility

Location: `frontend/utils/scaling.ts`

We replaced hardcoded pixel values with a centralized responsive scaling system based on the design viewport (393 x 852).

- **`s(size)`**: Horizontal scaling (width, margin-left/right, padding-horizontal). Use for anything width-related.
- **`vs(size)`**: Vertical scaling (height, margin-top/bottom, padding-vertical). Use for anything height-related.
- **`ms(size, factor)`**: Moderate scaling for font sizes. Ensures text scales but doesn't become cartoonishly large on tablets.

### 2. Layout Structure & Masonry Grid

Location: `frontend/screens/OnboardingScreen2.tsx`

To accommodate the "Lose Weight" card (height: 291dp) spanning equally next to two smaller cards ("Build Muscle": 141dp + "Flexibility": 135dp), we used a **2-Column Flex Layout**:

```tsx
<View style={{ flexDirection: 'row' }}>
  {/* Left Column */}
  <View style={{ flex: 1, gap: vs(15) }}>
    <BuildMuscleCard height={vs(141)} />
    <FlexibilityCard height={vs(135)} />
  </View>
  
  {/* Right Column */}
  <View style={{ flex: 1 }}>
    <LoseWeightCard height={vs(291)} />
  </View>
</View>
```

### 3. Mental Wellness Card (Absolute Positioning)

This card required the most precise alignment. We mapped Figma XML coordinates to absolute positions relative to the card container.

**Card Metrics:**

- **Dimensions**: `flex: 1` width (expands to fill), `vs(80)` fixed height.
- **Padding**: None used for layout; all children are absolutely positioned.

**Element Coordinates (Mapped from XML):**

| Element | XML Source | Calculated Position (Relative to Card) |
| :--- | :--- | :--- |
| **Icon Circle** | `marginLeft: 30`, `marginTop: 484` | `left: s(11)`, `top: vs(9)` |
| **Title Text** | `marginLeft: 79`, `marginTop: 484` | `left: s(60)`, `top: vs(9)` |
| **Subtext** | `marginLeft: 80`, `marginTop: 512` | `left: s(60)`, `top: vs(34)` |
| **Checkbox** | `marginLeft: 240`, `marginTop: 520` | `right: s(20)`, `top: vs(45)` |

**Typography Handling:**
Instead of standard scaling, the text in this card uses **Proportional Scaling** based on card height to ensure perfect ratios on all devices.

- **Title Font**: `vs(80) * 0.2` (16sp equivalent)
- **Subtext Font**: `vs(80) * 0.2` (16sp equivalent)

### 4. Breadcrumb Alignment

The Breadcrumb menu (next to Mental Wellness) has a different height than the card.

- **Card Height**: 80dp
- **Breadcrumb Height**: 63dp
- **Alignment**: Top-aligned (`alignItems: 'flex-start'`) on the row to match the `marginTop` spec.

### 5. Future Maintenance

- **To adjust spacing**: Change the `gap` or `margin` values using the `s()` or `vs()` functions.
- **To resize text**: Update the multiplication factor (e.g., `* 0.2`) to maintain proportionality.
- **To add new cards**: Follow the established pattern of absolute positioning for internal elements if pixel-perfect layout is required.
