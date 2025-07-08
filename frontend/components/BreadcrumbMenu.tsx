import React from 'react';
import { View, StyleSheet } from 'react-native';

// If you don't have a single icon, you can build it with Views:
export default function BreadcrumbMenu() {
  return (
    <View style={styles.menuWrap}>
      <View style={styles.dotRow}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <View style={styles.lineRow}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 8,
    width: 54,
    height: 38,
    justifyContent: 'center',
  },
  dotRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 22,
    marginRight: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00FF00',
    marginVertical: 1,
  },
  lineRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 22,
  },
  line: {
    width: 18,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#00FF00',
    marginVertical: 2,
  },
});
