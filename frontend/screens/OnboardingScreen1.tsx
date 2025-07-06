import React, { useState } from 'react';
import { Animated } from 'react-native';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AuthInputField from '../components/AuthInputField';
import { StatusBar } from 'expo-status-bar';

// Assume these assets are in the correct path
import bgImage from '../assets/images/onboardingScreen1.jpg';
import userPlaceholder from '../assets/images/user-placeholder-icon.png';
import cameraIcon from '../assets/images/camera-icon.png';

import doubleArrowIcon from '../assets/images/double-arrow-right-icon.png';
import AnimatedTripleArrow, { tripleArrowPulse } from '../components/AnimatedTripleArrow';
import DropdownPicker from '../components/DropdownPicker';

export default function BasicInfoScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [height, setHeight] = useState<string | null>(null);
  const [weight, setWeight] = useState<string | null>(null);
  // Removed customHeight and customWeight, now handled in DropdownPicker
  // Removed unused showHeightInput, setShowHeightInput, showWeightInput, setShowWeightInput
  // Removed modal state, now handled in DropdownPicker

  const heightOptions = [
    '150–152 cm',
    '153–155 cm',
    '156–158 cm',
    '159–160 cm',
    'Others'
  ];
  const weightOptions = [
    '40–44 kg',
    '45–49 kg',
    '50–54 kg',
    '55–59 kg',
    '60–64 kg',
    '65–69 kg',
    '70–74 kg',
    '75–79 kg',
    '80–84 kg',
    '85–89 kg',
    '90+ kg',
    'Others'
  ];

  // Removed modal and handler logic, now handled in DropdownPicker

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={styles.roundedClip}>
        <Image source={bgImage} style={styles.backgroundImage} />
        <View style={styles.overlay} />
        <View style={styles.content}>

          {/* 1. Header */}
          <Text style={styles.title}>Basic Info</Text>
          <Text style={styles.basicInfoText}>
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
          <AuthInputField
            style={[ {top: 265 }]}
            placeholder=""
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.labelAge}>Age</Text>
          <AuthInputField
            style={[{top: 295 }]}
            placeholder=""
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
          />

          <Text style={styles.labelGender}>Gender:</Text>
          <View style={styles.genderRow}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <TouchableOpacity style={styles.radioButtonContainer} onPress={() => setGender('male')}>
                <View style={styles.radioButton}>
                  {gender === 'male' && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.radioLabel}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButtonContainer, { marginTop: 10 }]} onPress={() => setGender('female')}>
                <View style={styles.radioButton}>
                  {gender === 'female' && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.radioLabel}>Female</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Height and Weight pickers replaced with DropdownPicker */}
          <View style={{ position: 'absolute', width: 353, height: 52, top: 520, left: 20, borderRadius: 20}}>
            <DropdownPicker
              label="Height"
              data={heightOptions}
              selectedValue={height}
              onSelect={setHeight}
            />
          </View>
          <View style={{ position: 'absolute', width: 353, height: 52, top:604, left: 20, borderRadius: 20 }}>
            <DropdownPicker
              label="Weight"
              data={weightOptions}
              selectedValue={weight}
              onSelect={setWeight}
            />
          </View>
          
          {/* 4. CTA Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {/* TODO: handle get started action */}}
            style={{ position: 'absolute', left: 4, bottom: 5 }}
          >
            <Animated.View
              style={[
                styles.getStartedButton,
                {
                  transform: [
                    {
                      scale: tripleArrowPulse.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.045], // reduced zoom
                      }),
                    },
                  ],
                  backgroundColor: tripleArrowPulse.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#008800', '#00b800'],
                  }),
                  shadowColor: '#00FF00',
                  shadowOpacity: tripleArrowPulse.interpolate({ inputRange: [0, 1], outputRange: [0.12, 0.38] }),
                  shadowRadius: tripleArrowPulse.interpolate({ inputRange: [0, 1], outputRange: [6, 18] }),
                  shadowOffset: { width: 0, height: 0 },
                  elevation: tripleArrowPulse.interpolate({ inputRange: [0, 1], outputRange: [2, 10] }),
                },
              ]}
            >
              <Animated.Text
                style={[
                  styles.getStartedButtonText,
                  {
                    color: tripleArrowPulse.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['rgba(255,255,255,0.8)', '#FFFFFF'],
                    }),
                    transform: [
                      {
                        scale: tripleArrowPulse.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.035], // reduced text zoom
                        }),
                      },
                    ],
                    textShadowColor: '#00FF99',
                    textShadowRadius: tripleArrowPulse.interpolate({ inputRange: [0, 1], outputRange: [0, 8] }),
                    textShadowOffset: { width: 0, height: 0 },
                  },
                ]}
              >
                Get Started
              </Animated.Text>
              <AnimatedTripleArrow source={doubleArrowIcon} style={styles.getStartedIcon} />
            </Animated.View>
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
    fontFamily: 'FamiljenGrotesk-Bold',
    fontWeight: '400',
    fontSize: 25,
    lineHeight: 25,
    letterSpacing: 0,
    position: 'absolute',
    top: 45,
    left: 24,
  },
  basicInfoText: {
    fontFamily: 'FamiljenGrotesk-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0,
    color: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    top: 75,
    left: 24,
    width: '100%',
  },
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 135,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  profilePicIcon: {
    width: 120,
    height: 120,
    
  },
  cameraIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  cameraIcon: {
    width: 22,
    height: 22,
    tintColor: '#000000',
  },
  labelName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'FamiljenGrotesk-Regular',
    position: 'absolute',
    top: 237,
    left: 24,
  },
  labelAge: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'FamiljenGrotesk-Regular',
    position: 'absolute',
    top: 335,
    left: 24,
  },
  labelGender: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'FamiljenGrotesk-Regular',
    position: 'absolute',
    top: 425,
    left: 24,
    
  },
  genderRow: {
    flexDirection: 'column',
    position: 'absolute',
    top: 460,
    left: 24,
    zIndex: 10,
    backgroundColor: 'transparent',
    
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00FF00', // Accent color
    position: 'absolute',
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    zIndex: 2,
  },
  radioLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'FamiljenGrotesk-Regular',
    fontWeight: '600',
  },
  
  getStartedButton: {
    position: 'absolute',
    width: 330,
    height: 52,
    left: 20,
    bottom: 50,
    backgroundColor: '#008800', // dark green, matches signup button
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  getStartedButtonText: {
    color: 'rgba(255,255,255,0.8)', // dimmer white
    fontWeight: '500',
    fontSize: 18,
    fontFamily: 'FamiljenGrotesk-Bold',
  },
  getStartedIcon: {
    width: 40,
    height: 20,
    tintColor: ' #FFFFFF' ,
  },
});
