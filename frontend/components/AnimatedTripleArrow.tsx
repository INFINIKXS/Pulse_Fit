import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Animated, Easing, View, StyleSheet, Image, ViewStyle, StyleProp } from 'react-native';


export const tripleArrowPulse = new Animated.Value(0);

interface AnimatedTripleArrowProps {
  source: any; // arrow icon image
  style?: StyleProp<ViewStyle>;
}

const AnimatedTripleArrow = forwardRef(function AnimatedTripleArrow({ source, style }: AnimatedTripleArrowProps, ref) {
  // Three animated values for opacity and glow
  const opacities = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];
  const glows = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

  useImperativeHandle(ref, () => ({}), []);

  useEffect(() => {
    let isMounted = true;
    const animate = () => {
      if (!isMounted) return;
      // Reset all arrows
      opacities.forEach((o) => o.setValue(0));
      glows.forEach((g) => g.setValue(0));
      // Each cycle should last 2 seconds, but a new cycle starts every 5 seconds
      // So after animation, wait 3 seconds before next cycle
      const totalCycle = 2000; // ms
      const totalInterval = 5000; // ms
      const pauseDuration = totalInterval - totalCycle; // ms
      // We'll animate the arrows in sequence, then hold, then fade out, then pause
      const arrowInDuration = 200; // ms for each arrow to appear
      const glowInDuration = 300; // ms for glow
      const betweenArrows = 100; // ms between arrows
      const holdDuration = 600; // ms hold all arrows visible
      const fadeOutDuration = 400; // ms fade out all arrows

      // Animate the shared pulse value for button/text
      Animated.sequence([
        Animated.timing(tripleArrowPulse, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
        Animated.timing(tripleArrowPulse, { toValue: 0, duration: 1100, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
      ]).start();

      Animated.sequence([
        Animated.parallel([
          Animated.timing(opacities[0], { toValue: 1, duration: arrowInDuration, useNativeDriver: false }),
          Animated.timing(glows[0], { toValue: 1, duration: glowInDuration, easing: Easing.out(Easing.quad), useNativeDriver: false })
        ]),
        Animated.delay(betweenArrows),
        Animated.parallel([
          Animated.timing(opacities[1], { toValue: 1, duration: arrowInDuration, useNativeDriver: false }),
          Animated.timing(glows[1], { toValue: 1, duration: glowInDuration, easing: Easing.out(Easing.quad), useNativeDriver: false })
        ]),
        Animated.delay(betweenArrows),
        Animated.parallel([
          Animated.timing(opacities[2], { toValue: 1, duration: arrowInDuration, useNativeDriver: false }),
          Animated.timing(glows[2], { toValue: 1, duration: glowInDuration, easing: Easing.out(Easing.quad), useNativeDriver: false })
        ]),
        Animated.delay(holdDuration),
        // Fade out all arrows together
        Animated.parallel([
          Animated.timing(opacities[0], { toValue: 0, duration: fadeOutDuration, useNativeDriver: false }),
          Animated.timing(opacities[1], { toValue: 0, duration: fadeOutDuration, useNativeDriver: false }),
          Animated.timing(opacities[2], { toValue: 0, duration: fadeOutDuration, useNativeDriver: false }),
          Animated.timing(glows[0], { toValue: 0, duration: fadeOutDuration, useNativeDriver: false }),
          Animated.timing(glows[1], { toValue: 0, duration: fadeOutDuration, useNativeDriver: false }),
          Animated.timing(glows[2], { toValue: 0, duration: fadeOutDuration, useNativeDriver: false }),
        ]),
        Animated.delay(pauseDuration),
      ]).start(() => {
        if (isMounted) animate();
      });
    };
    animate();
    return () => { isMounted = false; };
  }, []);

  // Glow interpolation for shadow
  const getGlowStyle = (glow: Animated.Value) => ({
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glow.interpolate({ inputRange: [0, 1], outputRange: [0, 0.8] }),
    shadowRadius: glow.interpolate({ inputRange: [0, 1], outputRange: [0, 12] }),
    // Android
    elevation: glow.interpolate({ inputRange: [0, 1], outputRange: [0, 8] }),
  });

  return (
    <View style={[styles.row, style]}>
      {[0, 1, 2].map((i) => (
        <Animated.View
          key={i}
          style={[
            { opacity: opacities[i], marginLeft: i === 0 ? 0 : -10 },
            getGlowStyle(glows[i]),
          ]}
        >
          <Image source={source} style={styles.arrow} resizeMode="contain" />
        </Animated.View>
      ))}
    </View>
  );
});

export default AnimatedTripleArrow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    width: 28,
    height: 18,
    tintColor: '#FFFFFF',
  },
});
