/**
 * Responsive scaling utility for React Native
 * Based on react-native-pixel-perfect skill pattern
 * 
 * Provides BOTH:
 * 1. Static functions for use in StyleSheet (uses initial dimensions)
 * 2. useScaling hook for dynamic scaling in components
 * 
 * Guideline base dimensions: 393x852 (standard mobile width/height)
 */
import { Dimensions, useWindowDimensions } from 'react-native';

// Standard mobile guideline (matches Design XML dimensions)
const GUIDELINE_BASE_WIDTH = 353;
const GUIDELINE_BASE_HEIGHT = 852;

// ============================================
// STATIC SCALING (for StyleSheet.create)
// Uses initial screen dimensions
// ============================================
const { width: INITIAL_WIDTH, height: INITIAL_HEIGHT } = Dimensions.get('window');

export const scale = (size: number): number => (INITIAL_WIDTH / GUIDELINE_BASE_WIDTH) * size;
export const verticalScale = (size: number): number => (INITIAL_HEIGHT / GUIDELINE_BASE_HEIGHT) * size;
export const moderateScale = (size: number, factor: number = 0.5): number =>
    size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor: number = 0.5): number =>
    size + (verticalScale(size) - size) * factor;

// Convenience aliases
export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;

// ============================================
// DYNAMIC SCALING HOOK (for inline styles)
// Updates on orientation change / screen resize
// ============================================
export const useScaling = () => {
    const { width, height } = useWindowDimensions();

    return {
        // Dynamic scaling functions
        scale: (size: number): number => (width / GUIDELINE_BASE_WIDTH) * size,
        verticalScale: (size: number): number => (height / GUIDELINE_BASE_HEIGHT) * size,
        moderateScale: (size: number, factor: number = 0.5): number =>
            size + ((width / GUIDELINE_BASE_WIDTH) * size - size) * factor,
        moderateVerticalScale: (size: number, factor: number = 0.5): number =>
            size + ((height / GUIDELINE_BASE_HEIGHT) * size - size) * factor,

        // Convenience aliases
        s: (size: number): number => (width / GUIDELINE_BASE_WIDTH) * size,
        vs: (size: number): number => (height / GUIDELINE_BASE_HEIGHT) * size,
        ms: (size: number, factor: number = 0.5): number =>
            size + ((width / GUIDELINE_BASE_WIDTH) * size - size) * factor,

        // Raw dimensions for custom calculations
        width,
        height,

        // Guideline dimensions for reference
        guidelineWidth: GUIDELINE_BASE_WIDTH,
        guidelineHeight: GUIDELINE_BASE_HEIGHT,
    };
};

// Export type for the hook return value
export type ScalingFunctions = ReturnType<typeof useScaling>;
