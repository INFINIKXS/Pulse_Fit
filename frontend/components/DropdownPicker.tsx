import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';

import chevronDownIcon from '../assets/images/chevron-down-icon.png';

interface DropdownPickerProps {
  label: string;
  data: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
  style?: object;
}

export default function DropdownPicker({
  label,
  data,
  selectedValue,
  onSelect,
  placeholder = 'Select...',
  style = {},
}: DropdownPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: string) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <View style={[styles.pickerContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={() => setIsOpen(true)}>
        <Text style={selectedValue ? styles.pickerButtonText : styles.placeholderText}>
          {selectedValue || placeholder}
        </Text>
        <Image source={chevronDownIcon} style={styles.pickerIcon} />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setIsOpen(false)}>
          <SafeAreaView style={styles.modalContentWrapper}>
            <View style={styles.modalContent}>
              <FlatList
                data={data}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalItem} onPress={() => handleSelect(item)}>
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Regular',
    marginBottom: 8,
  },
  pickerButton: {
    width: '100%',
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  placeholderText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  pickerIcon: {
    width: 20,
    height: 20,
    tintColor: 'rgba(255, 255, 255, 0.7)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentWrapper: {
    width: '85%',
    maxHeight: '60%',
  },
  modalContent: {
    backgroundColor: '#2C2C2E',
    borderRadius: 14,
    overflow: 'hidden',
  },
  modalItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  modalItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
