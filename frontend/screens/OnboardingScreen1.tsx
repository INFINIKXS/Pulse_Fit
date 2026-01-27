import React, { useState, useContext } from 'react';
import { Animated, View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Platform, StatusBar as RNStatusBar, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import AuthInputField from '../components/AuthInputField';
import { StatusBar } from 'expo-status-bar';
import { useScaling } from '../utils/scaling';
import api from '../services/api';
import * as ImagePicker from 'expo-image-picker';
import { File, Directory } from 'expo-file-system';
import { fetch } from 'expo/fetch';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../context/AuthContext';

// Assume these assets are in the correct path
import bgImage from '../assets/images/onboardingScreen1.jpg';
import userPlaceholder from '../assets/images/user-placeholder-icon.png';
import cameraIcon from '../assets/images/camera-icon.png';
import doubleArrowIcon from '../assets/images/double-arrow-right-icon.png';
import AnimatedTripleArrow, { tripleArrowPulse } from '../components/AnimatedTripleArrow';
import DropdownPicker from '../components/DropdownPicker';
import { MessageModal, MessageTypes } from '../components/MessageModal';

export default function BasicInfoScreen({ navigation }: any) {
  const { s, vs, ms } = useScaling();
  const { setUserInfo } = useContext(AuthContext)!;

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [height, setHeight] = useState<string | null>(null);
  const [weight, setWeight] = useState<string | null>(null);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [saving, setSaving] = useState(false);

  // Custom Error Modal State
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorHeader, setErrorHeader] = useState('Error');

  const PADDING = s(24);
  const VERTICAL_SPACING = vs(20);

  const heightOptions = [
    '150–152 cm', '153–155 cm', '156–158 cm', '159–160 cm', 'Others'
  ];
  const weightOptions = [
    '40–44 kg', '45–49 kg', '50–54 kg', '55–59 kg', '60–64 kg',
    '65–69 kg', '70–74 kg', '75–79 kg', '80–84 kg', '85–89 kg', '90+ kg', 'Others'
  ];

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      {/* Background & Overlay */}
      <View style={styles.roundedClip}>
        <Image source={bgImage} style={styles.backgroundImage} />
        <View style={styles.overlay} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            pointerEvents={isNavigating || saving ? 'none' : 'auto'}
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: PADDING,
              paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight! + vs(20) : vs(50),
              paddingBottom: vs(100)
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* 1. Header */}
            <View style={{ marginBottom: vs(30) }}>
              <Text style={[styles.title, { fontSize: ms(25), lineHeight: ms(25) }]}>Basic Info</Text>
              <Text style={[styles.basicInfoText, { fontSize: ms(11), lineHeight: ms(16), marginTop: vs(10) }]}>
                Briefly tell us about yourself as you begin fitness journey.
                Your information is safe and you can always change it later.
              </Text>

            </View>

            {/* 2. Profile Picture Upload */}
            <View style={{ alignItems: 'center', marginBottom: vs(0) }}>
              <TouchableOpacity
                style={[styles.profilePicContainer, { width: s(120), height: s(120) }]}
                onPress={handlePickImage}
              >
                {/* Clipped Background + Image */}
                <View style={{ flex: 1, width: '100%', borderRadius: s(60), overflow: 'hidden', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.85)', opacity: 1 }}>
                  <Image
                    source={avatarUri ? { uri: avatarUri } : userPlaceholder}
                    style={{ width: s(150), height: s(150) }}
                    resizeMode="cover"
                  />
                </View>

                {/* Camera Icon - Absolute */}
                <View style={[styles.cameraIconContainer, { position: 'absolute', bottom: s(5), right: s(5), width: s(30), height: s(30), borderRadius: s(15), zIndex: 10 }]}>
                  <Image source={cameraIcon} style={{ width: s(24), height: s(24), tintColor: '#000000' }} />
                </View>
              </TouchableOpacity>
            </View>

            {/* 3. Form */}
            <View style={{ gap: vs(17) }}>
              {/* Name */}
              <View>
                <Text style={[styles.label, { fontSize: ms(20), marginBottom: vs(2) }]}>Name</Text>
                <AuthInputField
                  placeholder=""
                  value={name}
                  onChangeText={setName}
                  editable={!saving && !isNavigating}
                  style={{ height: vs(52), borderRadius: s(20) }}
                />
              </View>

              {/* Age */}
              <View style={{ marginTop: vs(-10) }}>
                <Text style={[styles.label, { fontSize: ms(20), lineHeight: ms(25), marginBottom: vs(4) }]}>Age</Text>
                <AuthInputField
                  placeholder=""
                  value={age}
                  onChangeText={setAge}
                  keyboardType="number-pad"
                  editable={!saving && !isNavigating}
                  style={{ height: vs(52), borderRadius: s(20) }}
                />
              </View>

              {/* Gender */}
              <View style={{ marginTop: vs(-26) }}>
                <Text style={[styles.label, { fontSize: ms(20), lineHeight: ms(25), marginBottom: vs(8) }]}>Gender:</Text>
                <View style={{ gap: vs(10) }}>
                  <TouchableOpacity style={styles.radioButtonContainer} onPress={() => setGender(prev => prev === 'male' ? null : 'male')}>
                    <View style={[styles.radioButton, { width: s(18), height: s(18), borderRadius: s(9) }]}>
                      {gender === 'male' && <View style={[styles.radioButtonSelected, { width: s(12), height: s(12), borderRadius: s(6) }]} />}
                    </View>
                    <Text style={[styles.radioLabel, { fontSize: ms(14), marginLeft: s(10) }]}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.radioButtonContainer} onPress={() => setGender(prev => prev === 'female' ? null : 'female')}>
                    <View style={[styles.radioButton, { width: s(18), height: s(18), borderRadius: s(9) }]}>
                      {gender === 'female' && <View style={[styles.radioButtonSelected, { width: s(12), height: s(12), borderRadius: s(6) }]} />}
                    </View>
                    <Text style={[styles.radioLabel, { fontSize: ms(14), marginLeft: s(10) }]}>Female</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Height */}
              <View style={{ height: vs(52), zIndex: 2000 }}>
                <DropdownPicker
                  label="Height"
                  data={heightOptions}
                  selectedValue={height}
                  onSelect={setHeight}
                />
              </View>

              {/* Weight */}
              <View style={{ height: vs(52), zIndex: 1000, marginTop: vs(30) }}>
                <DropdownPicker
                  label="Weight"
                  data={weightOptions}
                  selectedValue={weight}
                  onSelect={setWeight}
                />
              </View>
            </View>
          </ScrollView>

          {/* 4. CTA Button (Fixed at bottom) */}
          <View style={{ position: 'absolute', bottom: vs(30), left: 0, right: 0, alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={async () => {
                const isFormValid = name.trim() !== '' && age.trim() !== '' && gender !== null && height !== null && weight !== null;
                if (isFormValid) {
                  setSaving(true);
                  setIsNavigating(true);
                  try {
                    let response;
                    // STRATEGY: Use JSON for text-only updates (more reliable), FormData only for images.
                    if (!avatarUri) {
                      const payload = {
                        full_name: name.trim(),
                        age: age,
                        gender: gender!,
                        height: height!,
                        weight: weight!,
                        // no avatar field
                      };
                      console.log('Sending JSON payload:', payload);
                      response = await api.put('/users/me', payload); // Axios autosets application/json
                    } else {
                      // Use expo-file-system and expo/fetch for robust native upload
                      console.log('Starting native upload for:', avatarUri);
                      const token = await SecureStore.getItemAsync('userToken');

                      // Create File instance from URI
                      const filename = avatarUri.split('/').pop() || 'profile.jpg';
                      // Handle potential query params or encoding in URI if necessary, but ImagePicker usually clean.
                      const dirUri = avatarUri.substring(0, avatarUri.lastIndexOf('/'));
                      const dir = new Directory(dirUri);
                      const file = new File(dir, filename);

                      const formData = new FormData();
                      // @ts-ignore: expo/fetch supports passing File instance directly
                      formData.append('avatar', file);
                      formData.append('full_name', name.trim());
                      formData.append('age', age);
                      formData.append('gender', gender!);
                      formData.append('height', height!);
                      formData.append('weight', weight!);

                      const fetchRes = await fetch('http://10.250.111.122:4000/api/users/me', {
                        method: 'PUT',
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                      });

                      if (fetchRes.ok) {
                        const responseData = await fetchRes.json();
                        response = { status: fetchRes.status, data: responseData };
                      } else {
                        console.error('Native upload failed:', fetchRes.status, fetchRes.statusText);
                        const errorBody = await fetchRes.text();
                        console.error('Error body:', errorBody);
                        throw new Error(`Upload failed: ${fetchRes.status}`);
                      }
                    }

                    console.log('Save success:', response.status);

                    // Sync global state with the updated user data from backend
                    if (response.data && response.data.data) {
                      const updatedUser = response.data.data;
                      console.log('Updating global user info context with:', updatedUser);
                      setUserInfo(updatedUser);
                      // Also persist to SecureStore so it survives reload
                      await SecureStore.setItemAsync('userInfo', JSON.stringify(updatedUser));
                    }

                    // Navigate to next onboarding screen
                    navigation && navigation.navigate('OnboardingScreen2');
                  } catch (error: any) {
                    console.error('Failed to save basic info:', error);
                    Alert.alert('Error', 'Failed to save your information. Please try again.');
                    setIsNavigating(false);
                  } finally {
                    setSaving(false);
                  }
                } else {
                  setWarningModalVisible(true);
                }
              }}
              disabled={isNavigating || saving}
            >
              <Animated.View
                style={[
                  styles.getStartedButton,
                  {
                    width: s(330),
                    height: vs(52),
                    borderRadius: s(20),
                    paddingHorizontal: s(30),
                    transform: [
                      {
                        scale: tripleArrowPulse.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.045],
                        }),
                      },
                    ],
                    backgroundColor: tripleArrowPulse.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['#008800', '#00b800'],
                    }),
                    shadowOpacity: tripleArrowPulse.interpolate({ inputRange: [0, 1], outputRange: [0.12, 0.38] }),
                    shadowRadius: tripleArrowPulse.interpolate({ inputRange: [0, 1], outputRange: [6, 18] }),
                    elevation: tripleArrowPulse.interpolate({ inputRange: [0, 1], outputRange: [2, 10] }),
                  },
                ]}
              >
                <Animated.Text
                  style={[
                    styles.getStartedButtonText,
                    {
                      fontSize: ms(18),
                      color: tripleArrowPulse.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['rgba(255,255,255,0.8)', '#FFFFFF'],
                      }),
                      transform: [
                        {
                          scale: tripleArrowPulse.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.035],
                          }),
                        },
                      ],
                      textShadowRadius: tripleArrowPulse.interpolate({ inputRange: [0, 1], outputRange: [0, 8] }),
                    },
                  ]}
                >
                  {saving ? 'Saving...' : 'Get Started'}
                </Animated.Text>
                {!saving && <AnimatedTripleArrow source={doubleArrowIcon} style={{ width: s(40), height: vs(20) }} />}
              </Animated.View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>

      <MessageModal
        visible={warningModalVisible}
        messageType={MessageTypes.WARNING}
        headerText="Almost there!"
        messageText={"Please fill in all the required fields to continue:\n\n• Name\n• Age\n• Gender\n• Height\n• Weight\n\nYour information helps us personalize your fitness journey."}
        buttonText="Got it"
        onDismiss={() => setWarningModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'FamiljenGrotesk-Bold',
    fontWeight: '500',
    letterSpacing: 0,
  },
  basicInfoText: {
    fontFamily: 'FamiljenGrotesk-Regular',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  profilePicContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Bold',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  radioButtonSelected: {
    backgroundColor: '#00FF00',
  },
  radioLabel: {
    color: '#FFFFFF',
    fontFamily: 'FamiljenGrotesk-Bold',
    fontWeight: '500',
  },
  getStartedButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 0 },
  },
  getStartedButtonText: {
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Bold',
    textShadowColor: '#00FF99',
    textShadowOffset: { width: 0, height: 0 },
  },
});
