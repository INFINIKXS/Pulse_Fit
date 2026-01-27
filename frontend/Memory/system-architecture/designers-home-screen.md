# Designer's Home Screen Layout

> Reference document for implementing the Home Screen based on the designer's specifications.
> **Design Resolution:** 393 × 852 px (guideline base)

---

## Layout Overview

The Home Screen uses **absolute positioning** (RelativeLayout in Android XML terms). Elements are positioned relative to the parent container edges, not relative to each other.

---

## Key Layout Elements

### Header Elements

| Element ID | Purpose | Width | Height | Position |
|------------|---------|-------|--------|----------|
| `group_2` | PulseFit Logo | 108.31dp | 53.61dp | **Centered horizontally**, marginTop: 48.07dp |
| `group_5` | Search/HeaderPill | 97dp | 45dp | Left-aligned, marginLeft: 20dp, marginTop: 58dp |

> [!IMPORTANT]
> The logo (`group_2`) is **centered on the screen**, NOT in a row with the search. The search (`group_5`) overlays/floats on the left side.

### Greeting Text

| Element ID | Purpose | Width | Height | Position |
|------------|---------|-------|--------|----------|
| `good_mornin` | Greeting text | 200dp | 23dp | marginLeft: 20dp, marginTop: 104dp |

**Styles:**

- Font: Familjen Grotesk
- Size: 18sp
- Line Height: 22sp
- Color: #FFFFFF
- Letter Spacing: 0.05

---

### Calendar Strip

| Element ID | Purpose | Width | Height | Position |
|------------|---------|-------|--------|----------|
| `frame_16` | Calendar container | 372dp | 69dp | marginLeft: 20dp, marginTop: 141dp |

---

### Today's Workout Section

| Element ID | Purpose | Width | Height | Position |
|------------|---------|-------|--------|----------|
| `today_s_wor` | Section title | 164dp | 25dp | marginLeft: 20dp, marginTop: 218dp |
| Workout Card | Background container | 353dp | 178dp | marginLeft: 20dp, marginTop: 252dp |
| `quick_abs` | Workout title | 121dp | 31dp | marginLeft: 41dp, marginTop: 264dp |
| `gg_time` | Time icon | 20dp | 20dp | marginLeft: 36dp, marginTop: 361dp |
| `mins` | Duration text | 52dp | 18dp | marginLeft: 59dp, marginTop: 363dp |
| `group_7` | Reps badge | 79dp | 28dp | marginLeft: 284dp, marginTop: 356dp |
| Continue Button | CTA pill | 318dp | 30.63dp | marginLeft: 38dp, marginTop: 389dp |
| `group_8` | Arrow icon | 25.32dp | 25.32dp | marginLeft: 315dp, marginTop: 392.04dp |

**Continue Button Styles:**

- Background: #FFFFFF (40% opacity)
- Border Radius: 15.3dp
- Font: Familjen Grotesk, 18sp
- Text Color: #000000

---

### Activities Section

| Element ID | Purpose | Width | Height | Position |
|------------|---------|-------|--------|----------|
| `activities` | Section title | 91dp | 25dp | marginLeft: 20dp, marginTop: 442dp |
| `group_9` | Activities container | 353dp | 105dp | marginLeft: 20dp, marginTop: 475dp |

---

### Workouts Section

| Element ID | Purpose | Width | Height | Position |
|------------|---------|-------|--------|----------|
| `workouts` | Section title | 94dp | 25dp | marginLeft: 20dp, marginTop: 586dp |
| `see_all` | See all link | 47dp | 19dp | marginLeft: 325dp, marginTop: 586dp |
| Workout Card | Background | 353dp | 150dp | marginLeft: 20dp, marginTop: 620dp |
| `full_body_b` | Workout title | 175dp | 31dp | marginLeft: 42dp, marginTop: 633dp |
| `gg_time` | Time icon | 20dp | 20dp | marginLeft: 42dp, marginTop: 690dp |
| `mins_3_x_20` | Duration + reps | 104dp | 18dp | marginLeft: 65dp, marginTop: 692dp |

**Tags Row (marginTop: 731dp):**

| Tag | Width | MarginLeft |
|-----|-------|------------|
| HIIT | 79dp | 42dp |
| High | 74dp | 137dp |
| No Equipment | 130dp | 228dp |

**Tag Styles:**

- Background: #D9D9D9 (40% opacity)
- Border Radius: 10dp
- Font: Familjen Grotesk, 16sp
- Text Color: #FFFFFF

---

### Bottom Navigation Bar

| Element ID | Purpose | Width | Height | Position |
|------------|---------|-------|--------|----------|
| `rectangle_2` | Nav bar bg | 353dp | 61dp | marginLeft: 20dp, marginTop: 775dp |
| `frame_15` | Nav items container | 291dp | 44dp | marginLeft: 45dp, marginTop: 784dp |

**Nav Bar Styles:**

- Background: #171717
- Border Radius: 30dp (pill shape)

---

## Text Styles Reference

| Style Name | Font Size | Line Height | Color | Letter Spacing |
|------------|-----------|-------------|-------|----------------|
| Section Title | 20sp | 25sp | #FFFFFF | 0.05 |
| Body Text | 18sp | 22sp | #FFFFFF | 0.05 |
| Workout Title | 25sp | 31sp | #FFFFFF | 0.05 |
| Small Text | 14sp | 18sp | #FFFFFF | 0.05 |
| Tag Text | 16sp | 20sp | #FFFFFF | 0.05 |
| See All | 15sp | 19sp | #00B300 | 0.05 |

---

## React Native Scaling Conversion

Use these functions from `utils/scaling.ts`:

```tsx
import { s, vs, ms } from '../utils/scaling';

// Horizontal dimensions (width, marginLeft, padding horizontal)
width: s(108.31)

// Vertical dimensions (height, marginTop, padding vertical)  
height: vs(53.61)
marginTop: vs(48.07)

// Font sizes (moderate scaling to prevent extremes)
fontSize: ms(18)
```

---

## Implementation Notes

### Logo Positioning Strategy

The logo must be **absolutely positioned** to be centered on the screen, while the search floats on the left:

```tsx
// Container with position: relative
<View style={{ position: 'relative', height: vs(103) }}>
  {/* Logo - Absolutely centered */}
  <View style={{
    position: 'absolute',
    top: vs(48.07),
    left: 0,
    right: 0,
    alignItems: 'center',
  }}>
    <View style={{ width: s(108.31), height: vs(53.61) }}>
      <PulseFit_Logo />
    </View>
  </View>
  
  {/* Search - Left aligned, overlays if needed */}
  <View style={{
    position: 'absolute',
    top: vs(58),
    left: s(20),
    width: s(97),
    height: vs(45),
  }}>
    <HeaderPill />
  </View>
</View>
```

---

*Last Updated: 2026-01-27*
