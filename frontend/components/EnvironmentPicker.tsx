import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ENVIRONMENTS = ['Home', 'Gym', 'Outdoor'];

export default function EnvironmentPicker({ selected, onSelect }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (env) => {
    setOpen(false);
    if (onSelect) onSelect(env);
  };

  return (
    <View style={styles.pickerWrap}>
      <TouchableOpacity
        style={styles.pickerBtn}
        activeOpacity={0.85}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text style={styles.selectedText}>{selected}</Text>
        <Image source={require('../assets/images/chevron-down-icon.png')} style={[styles.arrowIcon, styles.chevronIcon]} />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdownMenu}>
          {ENVIRONMENTS.map((env) => (
            <TouchableOpacity
              key={env}
              style={styles.dropdownItem}
              onPress={() => handleSelect(env)}
            >
              <Text style={styles.dropdownItemText}>{env}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pickerWrap: {
    minWidth: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 20,
    width: 90,
    height: 22,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#222',
    
  },
  selectedText: {
    color: '#00FF00',
    fontSize: 12,
    fontFamily: 'FamiljenGrotesk-Regular',
    fontWeight: '600',
    marginRight: 6,
    bottom: 1, // Align text vertically
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#00FF00',
    resizeMode: 'contain',
    
  },
  chevronIcon: {
    // You can override width/height here for larger size
  width: 29, 
  height: 24,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 38,
    left: 0,
    backgroundColor: '#222',
    borderRadius: 12,
    zIndex: 10,
    minWidth: 110,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'FamiljenGrotesk-Regular',
  },
});
