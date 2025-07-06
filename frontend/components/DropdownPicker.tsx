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
  TextInput,
} from 'react-native';

import chevronDownIcon from '../assets/images/chevron-down-icon.png';

interface DropdownPickerProps {
  label: string;
  data: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  style?: object;
  dropdownTextStyle?: object;
  dropdownStyle?: object;
}

export default function DropdownPicker({
  label,
  data,
  selectedValue,
  onSelect,
  style = {},
  dropdownTextStyle = {},
  dropdownStyle = {},
}: DropdownPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);

  const handleSelect = (item: string) => {
    if (item === 'Others') {
      setShowCustomModal(true);
      setIsOpen(false);
    } else {
      onSelect(item);
      setIsOpen(false);
    }
  };

  const handleCustomSave = () => {
    if (customValue.trim()) {
      onSelect(customValue);
      setShowCustomModal(false);
      setCustomValue('');
    }
  };

  return (
    <View style={[styles.pickerContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerButton}>
        <Text style={selectedValue ? [styles.pickerButtonText, dropdownTextStyle] : [styles.pickerButtonText, dropdownTextStyle, {opacity: 0.5}] }>
          {selectedValue || ''}
        </Text>
        <TouchableOpacity
          style={{ position: 'relative', width: 46, height: 46, alignItems: 'center', justifyContent: 'center', marginRight: -8, marginLeft: 8 }}
          onPress={() => setIsOpen(true)}
          activeOpacity={0.7}
        >
          <View style={{ position: 'absolute', width: 32, height: 32, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.35)', zIndex: 1 }} />
          <Image source={chevronDownIcon} style={[styles.pickerIcon, { zIndex: 2 }]} />
        </TouchableOpacity>
      </View>


      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setIsOpen(false)}>
          <SafeAreaView style={styles.modalContentWrapper}>
            <View style={[styles.modalContent, dropdownStyle]}>
              <FlatList
                data={data}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalItem} onPress={() => handleSelect(item)}>
                    <Text style={[styles.modalItemText, dropdownTextStyle]}>{item}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>

      {/* Custom value modal for 'Others' */}
      <Modal
        visible={showCustomModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCustomModal(false)}
      >
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
          <View style={{backgroundColor:'#222',padding:24,borderRadius:20,width:280, alignItems:'center'}}>
            <Text style={{color:'#fff',fontSize:16,marginBottom:12}}>
              {label === 'Height' ? 'Enter your height (cm)' : label === 'Weight' ? 'Enter your weight (kg)' : 'Enter value'}
            </Text>
            <View style={{width:'100%'}}>
              <TextInput
                style={{
                  backgroundColor: '#333',
                  color: '#FFFFFF',
                  borderRadius: 20,
                  padding: 10,
                  marginBottom: 16,
                  fontSize: 15,
                  width: '100%',
                  alignSelf: 'stretch',
                  fontFamily: 'FamiljenGrotesk-Regular',
                  fontWeight: '500',
                }}
                placeholder={label === 'Height' ? 'e.g. 170' : label === 'Weight' ? 'e.g. 65' : 'Enter value'}
                placeholderTextColor="#aaa"
                value={customValue}
                onChangeText={setCustomValue}
                keyboardType={label === 'Height' || label === 'Weight' ? 'number-pad' : 'default'}
                autoFocus
              />
            </View>
            <View style={{flexDirection:'row',justifyContent:'flex-end',width:'100%'}}>
              <TouchableOpacity onPress={()=>setShowCustomModal(false)} style={{marginRight:16}}>
                <Text style={{color:'#aaa',fontSize:16}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCustomSave}>
                <Text style={{color:'#00FF00',fontSize:16}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    marginBottom: 18,
  },
  pickerButton: {
    width: 335,
    height: 53,
    borderRadius: 20,
    paddingHorizontal: 20,
    bottom:15,

    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    fontFamily: 'FamiljenGrotesk-Bold',
    fontWeight: '500',
    opacity: 1,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'FamiljenGrotesk-Regular',
    fontWeight: '500',
  },

  pickerIcon: {
    width: 27,
    height: 27,
    tintColor: 'rgb(2, 0, 0)',
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
    fontSize: 15,
    fontFamily: 'FamiljenGrotesk-Regular',
    fontWeight: '500',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
