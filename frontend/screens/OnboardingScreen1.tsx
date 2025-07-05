import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Assume these assets are in the correct path
import bgImage from '../assets/images/dumbbells-bg.jpg'; // Use the working background image
import userPlaceholder from '../assets/images/user-placeholder-icon.png';
import cameraIcon from '../assets/images/camera-icon.png';

import doubleArrowIcon from '../assets/images/double-arrow-right-icon.png';
import DropdownPicker from '../components/DropdownPicker';

export default function BasicInfoScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [height, setHeight] = useState<string | null>(null);
  const [weight, setWeight] = useState<string | null>(null);
  const [customHeight, setCustomHeight] = useState<string>('');
  const [customWeight, setCustomWeight] = useState<string>('');
  // Removed unused showHeightInput, setShowHeightInput, showWeightInput, setShowWeightInput
  const [heightModalVisible, setHeightModalVisible] = useState(false);
  const [weightModalVisible, setWeightModalVisible] = useState(false);

  const heightOptions = [
    '150–152 cm',
    '153–155 cm',
    '156–158 cm',
    '159–160 cm',
    'Others'
  ];
  const weightOptions = [
    '150–152 cm',
    '153–155 cm',
    '156–158 cm',
    '159–160 cm',
    'Others'
  ];

  const handleHeightSelect = (value: string) => {
    if (value === 'Others') {
      setHeightModalVisible(true);
    } else {
      setHeight(value);
      setCustomHeight('');
    }
  };
  const handleWeightSelect = (value: string) => {
    if (value === 'Others') {
      setWeightModalVisible(true);
    } else {
      setWeight(value);
      setCustomWeight('');
    }
  };
  const handleHeightModalSave = () => {
    if (customHeight.trim()) {
      setHeight(customHeight + ' cm');
      setHeightModalVisible(false);
    }
  };
  const handleWeightModalSave = () => {
    if (customWeight.trim()) {
      setWeight(customWeight + ' kg');
      setWeightModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={styles.roundedClip}>
        <Image source={bgImage} style={styles.backgroundImage} />
        <View style={styles.overlay} />
        <View style={styles.content}>

          {/* 1. Header */}
          <Text style={styles.title}>Basic Info</Text>
          <Text style={styles.subtitle}>
            Briefly tell us about yourself as you begin fitness journey.
            Your information is safe and you can always change it later.
          </Text>

          {/* 2. Profile Picture Upload */}
          <TouchableOpacity style={styles.profilePicContainer}>
            <Image source={userPlaceholder} style={styles.profilePicIcon} />
            <View style={styles.cameraIconContainer}>
              <Image source={cameraIcon} style={styles.cameraIcon} />
            </View>
          </TouchableOpacity>

          {/* 3. Form */}
          <Text style={styles.labelName}>Name</Text>
          <TextInput
            style={[styles.input, { top: 310 }]}
            placeholder=""
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.labelAge}>Age</Text>
          <TextInput
            style={[styles.input, { top: 390 }]}
            placeholder=""
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
          />

          <Text style={styles.labelGender}>Gender:</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity style={styles.radioButtonContainer} onPress={() => setGender('male')}>
              <View style={styles.radioButton}>
                {gender === 'male' && <View style={styles.radioButtonSelected} />}
              </View>
              <Text style={styles.radioLabel}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.radioButtonContainer, { marginLeft: 40 }]} onPress={() => setGender('female')}>
              <View style={styles.radioButton}>
                {gender === 'female' && <View style={styles.radioButtonSelected} />}
              </View>
              <Text style={styles.radioLabel}>Female</Text>
            </TouchableOpacity>
          </View>
          
          {/* Height and Weight pickers replaced with DropdownPicker */}
          <DropdownPicker
            label="Height"
            data={heightOptions}
            selectedValue={height}
            onSelect={handleHeightSelect}
            placeholder="Select height"
            style={{
              width: 353,
              height: 52,
              position: 'absolute',
              top: 511,
              left: 20,
              borderRadius: 20,
              opacity: 0.4,
            }}
          />
          <Modal
            visible={heightModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setHeightModalVisible(false)}
          >
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
              <View style={{backgroundColor:'#222',padding:24,borderRadius:16,width:280}}>
                <Text style={{color:'#fff',fontSize:16,marginBottom:12}}>Enter your height (cm)</Text>
                <TextInput
                  style={{backgroundColor:'#333',color:'#fff',borderRadius:8,padding:10,marginBottom:16,fontSize:16}}
                  placeholder="e.g. 170"
                  placeholderTextColor="#aaa"
                  value={customHeight}
                  onChangeText={setCustomHeight}
                  keyboardType="number-pad"
                  autoFocus
                />
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                  <Pressable onPress={()=>setHeightModalVisible(false)} style={{marginRight:16}}>
                    <Text style={{color:'#aaa',fontSize:16}}>Cancel</Text>
                  </Pressable>
                  <Pressable onPress={handleHeightModalSave}>
                    <Text style={{color:'#00FF00',fontSize:16}}>Save</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <DropdownPicker
            label="Weight"
            data={weightOptions}
            selectedValue={weight}
            onSelect={handleWeightSelect}
            placeholder="Select weight"
            style={{
              width: 353,
              height: 52,
              position: 'absolute',
              top: 604,
              left: 20,
              borderRadius: 20,
              opacity: 0.4,
            }}
          />
          <Modal
            visible={weightModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setWeightModalVisible(false)}
          >
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
              <View style={{backgroundColor:'#222',padding:24,borderRadius:16,width:280}}>
                <Text style={{color:'#fff',fontSize:16,marginBottom:12}}>Enter your weight (kg)</Text>
                <TextInput
                  style={{backgroundColor:'#333',color:'#fff',borderRadius:8,padding:10,marginBottom:16,fontSize:16}}
                  placeholder="e.g. 65"
                  placeholderTextColor="#aaa"
                  value={customWeight}
                  onChangeText={setCustomWeight}
                  keyboardType="number-pad"
                  autoFocus
                />
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                  <Pressable onPress={()=>setWeightModalVisible(false)} style={{marginRight:16}}>
                    <Text style={{color:'#aaa',fontSize:16}}>Cancel</Text>
                  </Pressable>
                  <Pressable onPress={handleWeightModalSave}>
                    <Text style={{color:'#00FF00',fontSize:16}}>Save</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          
          {/* 4. CTA Button */}
          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={styles.getStartedButtonText}>Get Started</Text>
            <Image source={doubleArrowIcon} style={styles.getStartedIcon} />
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

// Styles defined to match the visual target, using absolute positioning
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  roundedClip: {
    flex: 1,
    borderRadius: 40,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)', // Slightly darker overlay
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'FamiljenGrotesk-Regular',
    position: 'absolute',
    top: 70,
    left: 24,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: 'FamiljenGrotesk-Regular',
    position: 'absolute',
    top: 110,
    left: 24,
    width: '90%',
  },
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 180,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  profilePicIcon: {
    width: 50,
    height: 50,
    tintColor: '#FFFFFF',
  },
  cameraIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  cameraIcon: {
    width: 18,
    height: 18,
    tintColor: '#000000',
  },
  labelName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Regular',
    position: 'absolute',
    top: 285,
    left: 24,
  },
  labelAge: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Regular',
    position: 'absolute',
    top: 365,
    left: 24,
  },
  labelGender: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Regular',
    position: 'absolute',
    top: 470,
    left: 24,
  },
  labelHeight: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Regular',
    position: 'absolute',
    top: 560,
    left: 24,
  },
  labelWeight: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Regular',
    position: 'absolute',
    top: 640,
    left: 24,
  },
  input: {
    width: '100%',
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 20,
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    position: 'absolute',
    alignSelf: 'center',
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  genderRow: {
    flexDirection: 'row',
    position: 'absolute',
    top: 500,
    left: 24,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00FF00', // Accent color
  },
  radioLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  pickerInput: {
    width: '100%',
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  pickerIcon: {
    width: 20,
    height: 20,
    tintColor: 'rgba(255, 255, 255, 0.7)',
    position: 'absolute',
    right: 20,
  },
  getStartedButton: {
    width: '100%',
    height: 58,
    backgroundColor: '#00FF00',
    borderRadius: 999, // Pill shape
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  getStartedButtonText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 18,
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  getStartedIcon: {
    width: 30,
    height: 30,
    tintColor: '#000000',
  },
});
