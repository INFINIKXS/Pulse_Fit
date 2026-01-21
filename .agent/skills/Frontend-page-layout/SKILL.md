Markdown
---

name: react-native-pixel-perfect
description: Generates responsive, atomic React Native components using mathematical scaling strategies. Use this when implementing complex UI designs (like masonry grids) that need to look consistent across fragmented device sizes
---

# React Native Pixel Perfect UI

This skill guides the implementation of responsive, production-grade React Native screens. It prioritizes **Atomic Design** for structure and **Mathematical Scaling** for visual consistency across different device aspect ratios (e.g., Pixel 5 vs. Galaxy Ultra).

## When to use this skill

- Converting high-fidelity Figma/Sketch designs into React Native code.
- Implementing complex grid layouts (e.g., Masonry) where CSS Grid is unavailable.
- Addressing fragmentation issues where hardcoded pixels look incorrect on different screens.
- Structuring new component folders using Atomic Design principles.

## 1. The Scaling Strategy (Mathematical Foundation)

Do not use hardcoded pixel values (e.g., `height: 200`). Instead, use a scaling utility that calculates values relative to a guideline base width (standard mobile width ~375px).

### Scaling Utility Reference

The agent should create or utilize `src/utils/scaling.js` with this logic:

```javascript
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// Standard mobile guideline (e.g., iPhone 11 Pro / Pixel 4)
const GUIDELINE_BASE_WIDTH = 375;
const GUIDELINE_BASE_HEIGHT = 812;

// Use for horizontal spacing (padding, width, marginHorizontal)
export const scale = (size) => (width / GUIDELINE_BASE_WIDTH) * size;

// Use for vertical spacing (height, marginTop, marginBottom)
export const verticalScale = (size) => (height / GUIDELINE_BASE_HEIGHT) * size;

// Use for font-size (prevents text becoming comically large on tablets)
export const moderateScale = (size, factor = 0.5) => 
  size + (scale(size) - size) * factor;
Usage Rules:

Layouts: Use scale() for widths and verticalScale() for heights.

Typography: Always use moderateScale() for fontSize.

Icons: Use scale() to maintain aspect ratio squareness.

2. Layout Architecture: "The Two-Column Flex"
React Native's Yoga engine does not support CSS Grid. To achieve staggered or "Masonry" layouts (where items have different heights), you must simulate the grid using Flexbox lanes.

The Visual Logic
Divide the screen into two vertical View columns rather than one wrapping container.

Lane 1 (Left 50%): Stack shorter items vertically.

Lane 2 (Right 50%): Stack taller items, or force a single item to match the combined height of Lane 1.

JavaScript
<View style={styles.gridContainer}>
  {/* Left Lane */}
  <View style={styles.column}>
     <MoleculeItemA />
     <MoleculeItemB />
  </View>
  
  {/* Right Lane */}
  <View style={styles.column}>
     <MoleculeItemC style={{ height: verticalScale(290) }} />
  </View>
</View>

// Styles
gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
column: { width: '48%', flexDirection: 'column' }
3. Atomic File Structure
Organize components hierarchically to ensure scalability.

src/components/atoms/: Smallest units.

Examples: Typography.js (Custom Text), Icon.js (SVG Wrapper), Checkbox.js.

src/components/molecules/: Combinations of atoms.

Examples: GoalCard.js (Icon + Text + Checkbox), DayChip.js.

src/components/organisms/: Complex sections involving layout logic.

Examples: GoalGrid.js (The 2-column masonry logic), AvailabilitySelector.js.

src/screens/: Connects state to Organisms.

Examples: FitnessGoalScreen.js.

4. Best Practices Checklist
When generating code, the agent must verify:

Hit Slop: For small touch targets (like text-only buttons), add hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} to the TouchableOpacity.

SVG over PNG: Use react-native-svg for icons to prevent pixelation on high-density Android screens.

Safe Areas: Wrap the top-level screen View in SafeAreaView (react-native-safe-area-context) to handle notches and status bars.

Platform Independence: Avoid platform-specific code (Platform.OS) unless strictly necessary; rely on the scaling utility to handle fragmentation.
