// OnboardingScreen2.tsx - Pixel-perfect layout using dynamic scaling hook
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
  Platform,
  Modal
} from 'react-native';
import api from '../services/api';
import { MaterialIcons } from '@expo/vector-icons';
import BreadcrumbMenu from '../components/BreadcrumbMenu';
import { useScaling } from '../utils/scaling';
import { MessageModal, MessageTypes } from '../components/MessageModal';

// Icon imports
import mentalHealthIcon from '../assets/images/ri_mental-health-fill.png';
import bodyWeightIcon from '../assets/images/hugeicons_body-weight.png';
import muscleIcon from '../assets/images/hugeicons_body-part-muscle.png';
import yogaIcon from '../assets/images/grommet-icons_yoga.png';

const environments = ['Home', 'Gym', 'Outdoor'];
const days = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];

export default function OnboardingScreen2({ navigation }: { navigation: any }) {
  // Dynamic scaling hook - updates on screen resize/orientation change
  const { s, vs, ms } = useScaling();

  // Design constants using dynamic scaling
  const PADDING = s(20);
  const GAP = s(18);
  const CARD_PADDING = s(16);
  const ICON_SIZE = s(30);
  const ICON_CIRCLE = s(50);
  const CHECKBOX = s(25);
  const RADIUS = s(30);

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [environment, setEnvironment] = useState('Home');
  const [showDropdown, setShowDropdown] = useState(false);
  const [availability, setAvailability] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [showSubSettings, setShowSubSettings] = useState(false);
  const [selectedMentalOptions, setSelectedMentalOptions] = useState<string[]>([]);
  const [warningModalVisible, setWarningModalVisible] = useState(false);

  const toggleGoal = (key: string) => {
    setSelectedGoals(prev => {
      const isSelected = prev.includes(key);
      if (key === 'mental') {
        if (isSelected) {
          setSelectedMentalOptions([]); // Clear sub-settings if deselecting mental
        } else {
          setShowSubSettings(true); // Open modal if selecting mental
        }
      }
      return isSelected ? prev.filter(g => g !== key) : [...prev, key];
    });
  };
  const toggleDay = (day: string) => setAvailability(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  const cycleEnv = () => setEnvironment(environments[(environments.indexOf(environment) + 1) % 3]);

  const handleComplete = async () => {
    setSaving(true);
    try {
      await api.put('/users/me', {
        fitness_goals: selectedGoals,
        environment,
        availability,
        onboarding_completed: true,
        mental_wellness_goals: selectedMentalOptions
      });
      navigation.replace('Main');
    } catch (e) {
      Alert.alert('Error', 'Failed to save preferences.');
    } finally {
      setSaving(false);
    }
  };

  const isSelected = (key: string) => selectedGoals.includes(key);

  // Card component with flex-based sizing
  const GoalCard = ({ id, title1, title2, desc, icon, cardFlex }: any) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          flex: cardFlex || 1,
          borderRadius: RADIUS,
          padding: CARD_PADDING
        },
        isSelected(id) && styles.cardSelected
      ]}
      onPress={() => toggleGoal(id)}
      activeOpacity={0.85}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconCircle, { width: ICON_CIRCLE, height: ICON_CIRCLE }]}>
          <Image source={icon} style={[styles.icon, { width: ICON_SIZE, height: ICON_SIZE }]} />
        </View>
        <View style={{ marginLeft: s(9) }}>
          <Text style={{ color: '#FFF', fontSize: ms(20), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium' }}>{title1}</Text>
          <Text style={{ color: '#FFF', fontSize: ms(20), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium' }}>{title2}</Text>
        </View>
      </View>
      <Text style={{ color: '#FFF', fontSize: ms(16), opacity: 0.5, fontFamily: 'FamiljenGrotesk-Regular', lineHeight: ms(20), marginTop: s(6) }}>{desc}</Text>
      <View style={[styles.checkbox, { width: CHECKBOX, height: CHECKBOX }, isSelected(id) && styles.checkboxChecked]}>
        {isSelected(id) && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        pointerEvents={saving ? 'none' : 'auto'}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: vs(30) }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER - with proper top spacing */}
        <View style={{ paddingHorizontal: PADDING, paddingTop: vs(50), paddingBottom: vs(20) }}>
          <Text style={{ color: '#FFF', fontSize: ms(22), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Bold' }}>What's Your Fitness Goal?</Text>
          <Text style={{ color: '#FFF', fontSize: ms(12), fontFamily: 'FamiljenGrotesk-Regular', marginTop: s(4) }}>Choose one or more goals to help us create your perfect workout plan.</Text>
        </View>

        {/* GOALS GRID - Two column masonry layout */}
        <View style={{ paddingHorizontal: PADDING }}>
          <View style={{ flexDirection: 'row', gap: GAP }}>
            {/* Left Column (Lane 1) - Build Muscle + Improve Flexibility */}
            <View style={{ flex: 1, gap: vs(15) }}>
              {/* Build Muscle */}
              <TouchableOpacity
                style={[styles.card, { height: vs(141), borderRadius: RADIUS, paddingLeft: s(14), paddingTop: vs(10), paddingRight: s(14), paddingBottom: vs(14) }, isSelected('muscle') && styles.cardSelected]}
                onPress={() => toggleGoal('muscle')}
                activeOpacity={0.85}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.iconCircle, { width: ICON_CIRCLE, height: ICON_CIRCLE }]}>
                    <Image source={muscleIcon} style={[styles.icon, { width: ICON_SIZE, height: ICON_SIZE }]} />
                  </View>
                  <View style={{ marginLeft: s(9) }}>
                    <Text style={{ color: '#FFF', fontSize: ms(17), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium', lineHeight: ms(22) }}>Build</Text>
                    <Text style={{ color: '#FFF', fontSize: ms(17), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium', lineHeight: ms(22) }}>Muscle</Text>
                  </View>
                </View>
                <Text style={{ color: '#FFF', fontSize: vs(12), opacity: 0.5, fontFamily: 'FamiljenGrotesk-Regular', lineHeight: vs(16), marginTop: s(4), textAlign: 'left' }}>Increase strength and{'\n'}muscle mass.</Text>
                <View style={[styles.checkbox, { width: CHECKBOX, height: CHECKBOX }, isSelected('muscle') && styles.checkboxChecked]}>
                  {isSelected('muscle') && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>

              {/* Improve Flexibility */}
              <TouchableOpacity
                style={[styles.card, { height: vs(135), borderRadius: RADIUS, paddingLeft: s(14), paddingTop: vs(10), paddingRight: s(14), paddingBottom: vs(14) }, isSelected('yoga') && styles.cardSelected]}
                onPress={() => toggleGoal('yoga')}
                activeOpacity={0.85}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.iconCircle, { width: ICON_CIRCLE, height: ICON_CIRCLE }]}>
                    <Image source={yogaIcon} style={[styles.icon, { width: ICON_SIZE, height: ICON_SIZE }]} />
                  </View>
                  <View style={{ marginLeft: s(9) }}>
                    <Text style={{ color: '#FFF', fontSize: ms(17), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium', lineHeight: ms(22) }}>Improve</Text>
                    <Text style={{ color: '#FFF', fontSize: ms(17), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium', lineHeight: ms(22) }}>Flexibility</Text>
                  </View>
                </View>
                <Text style={{ color: '#FFF', fontSize: vs(12), opacity: 0.5, fontFamily: 'FamiljenGrotesk-Regular', lineHeight: vs(16), marginTop: s(4), textAlign: 'left' }}>Enhance mobility and{'\n'}prevent injuries</Text>
                <View style={[styles.checkbox, { width: CHECKBOX, height: CHECKBOX }, isSelected('yoga') && styles.checkboxChecked]}>
                  {isSelected('yoga') && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>
            </View>

            {/* Right Column (Lane 2) - Lose Weight (tall card) */}
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.card, { height: vs(141) + vs(15) + vs(135), borderRadius: RADIUS, paddingLeft: s(14), paddingTop: vs(10), paddingRight: s(14), paddingBottom: vs(14) }, isSelected('weight') && styles.cardSelected]}
                onPress={() => toggleGoal('weight')}
                activeOpacity={0.85}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.iconCircle, { width: ICON_CIRCLE, height: ICON_CIRCLE }]}>
                    <Image source={bodyWeightIcon} style={[styles.icon, { width: ICON_SIZE, height: ICON_SIZE }]} />
                  </View>
                  <View style={{ marginLeft: s(9) }}>
                    <Text style={{ color: '#FFF', fontSize: ms(17), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium', lineHeight: ms(22) }}>Loose</Text>
                    <Text style={{ color: '#FFF', fontSize: ms(17), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium', lineHeight: ms(22) }}>Weight</Text>
                  </View>
                </View>
                <Text style={{ color: '#FFF', fontSize: vs(12), opacity: 0.5, fontFamily: 'FamiljenGrotesk-Regular', lineHeight: vs(16), marginTop: s(4), textAlign: 'left' }}>Burn fat and improve cardiovascular health with our cardio programs and other workout programs tailored for this goal.</Text>
                <View style={[styles.checkbox, { width: CHECKBOX, height: CHECKBOX }, isSelected('weight') && styles.checkboxChecked]}>
                  {isSelected('weight') && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mental Wellness Row - Card expanded to fill available space */}
          <View style={{ flexDirection: 'row', gap: s(15), marginTop: vs(15), alignItems: 'flex-start' }}>
            <TouchableOpacity
              style={[
                styles.card,
                {
                  flex: 1,
                  height: vs(80),
                  borderRadius: s(30),
                  position: 'relative',
                },
                isSelected('mental') && styles.cardSelected
              ]}
              onPress={() => toggleGoal('mental')}
              activeOpacity={0.85}
            >
              {/* Icon circle - 45x45dp at left:11, top:9 from card */}
              <View style={[
                styles.iconCircle,
                {
                  width: s(45),
                  height: s(45),
                  position: 'absolute',
                  left: s(11),
                  top: vs(9),
                }
              ]}>
                <Image source={mentalHealthIcon} style={[styles.icon, { width: s(28), height: s(28) }]} />
              </View>

              {/* Title - proportional: 0.225 of 80dp height */}
              <Text style={{
                color: '#FFF',
                fontSize: vs(80) * 0.2, // 16sp
                fontWeight: '500',
                fontFamily: 'FamiljenGrotesk-Medium',
                lineHeight: (vs(80) * 0.2) * 1.25,
                position: 'absolute',
                left: s(60),
                top: vs(9),
              }}>Improve Mental Wellness</Text>

              {/* Subtext - proportional: 0.15 of 80dp height (matches 12sp) */}
              <Text style={{
                color: '#FFF',
                fontSize: vs(80) * 0.15,
                opacity: 0.5,
                fontFamily: 'FamiljenGrotesk-Regular',
                lineHeight: (vs(80) * 0.15) * 1.25,
                position: 'absolute',
                left: s(60),
                top: vs(34),
                width: s(148),
              }}>Use movement to{'\n'}reduce stress</Text>

              {/* Checkbox - 25x25dp at left:221 (right:26), top:45 (bottom:10) from card */}
              <View style={[
                styles.checkbox,
                {
                  width: s(25),
                  height: s(25),
                  borderRadius: s(5),
                  position: 'absolute',
                  right: s(20),
                  top: vs(45),
                },
                isSelected('mental') && styles.checkboxChecked
              ]}>
                {isSelected('mental') && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>

            {/* Breadcrumb - 68x63dp */}
            <View style={{
              width: s(68),
              height: vs(63), // XML says 63dp height
              backgroundColor: '#1A1A1A',
              borderRadius: s(25),
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <BreadcrumbMenu onPress={() => setShowSubSettings(prev => !prev)} />
            </View>
          </View>
        </View>

        {/* ENVIRONMENT */}
        <View style={{ flexDirection: 'row', paddingHorizontal: PADDING, alignItems: 'center', justifyContent: 'space-between', marginTop: vs(13) }}>
          <Text style={{ color: '#FFF', fontSize: ms(18), fontFamily: 'FamiljenGrotesk-Regular', lineHeight: ms(22) }}>Environment</Text>
          <View style={{ zIndex: 10 }}>
            <TouchableOpacity
              onPress={() => setShowDropdown(!showDropdown)}
              style={{
                width: s(90),
                height: vs(22),
                backgroundColor: '#1A1A1A', // Match goal cards
                borderRadius: vs(11), // Fully rounded ends
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: s(6)
              }}
            >
              <Text style={{ color: '#8BC34B', fontSize: ms(13), fontFamily: 'FamiljenGrotesk-Regular', lineHeight: ms(16) }}>{environment}</Text>
              <MaterialIcons name={showDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={s(16)} color="#8BC34B" />
            </TouchableOpacity>

            {/* Dropdown Menu */}
            {showDropdown && (
              <View style={{
                position: 'absolute',
                top: vs(25),
                right: 0,
                width: s(90),
                backgroundColor: '#1A1A1A',
                borderRadius: s(10),
                paddingVertical: s(4),
                borderWidth: 1,
                borderColor: '#333',
                zIndex: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
                {environments.map((env) => (
                  <TouchableOpacity
                    key={env}
                    onPress={() => { setEnvironment(env); setShowDropdown(false); }}
                    style={{
                      paddingVertical: s(6),
                      paddingHorizontal: s(10),
                      alignItems: 'center',
                      backgroundColor: environment === env ? '#333' : 'transparent'
                    }}
                  >
                    <Text style={{
                      color: environment === env ? '#8BC34B' : '#FFF',
                      fontSize: ms(12),
                      fontFamily: 'FamiljenGrotesk-Regular'
                    }}>{env}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* AVAILABILITY */}
        <View style={{ marginTop: vs(90) }}>
          <Text style={{ color: '#FFF', fontSize: ms(18), fontFamily: 'FamiljenGrotesk-Regular', marginLeft: PADDING, marginBottom: vs(10) }}>Availability</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: PADDING }}>
            {days.map((day, index) => {
              // XML Widths: Sun=81, Mon=85, Tue=87, Wed=110
              const widths: { [key: string]: number } = {
                'Sundays': 81,
                'Mondays': 85,
                'Tuesdays': 87,
                'Wednesdays': 110,
                'Thursdays': 94,
                'Fridays': 71,
                'Saturdays': 91
              };

              const selected = availability.includes(day);

              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayBtn,
                    {
                      width: s(widths[day]),
                      height: vs(40),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: vs(20),
                      marginRight: s(5),
                      backgroundColor: selected ? '#A2D149' : 'transparent', // Warmer green
                      borderColor: '#A2D149'
                    }
                  ]}
                  onPress={() => toggleDay(day)}
                >
                  <Text style={{
                    color: selected ? '#000000' : '#A2D149', // Black text on selection
                    fontSize: ms(14),
                    fontFamily: 'FamiljenGrotesk-Regular',
                    lineHeight: ms(20)
                  }}>{day}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* BUTTONS */}
        <View style={{ paddingHorizontal: PADDING, gap: s(14), flexDirection: 'row', marginTop: vs(32) }}>
          {(() => {
            const isFormValid = selectedGoals.length > 0 && availability.length > 0;
            return (
              <TouchableOpacity
                style={[
                  styles.doneBtn,
                  {
                    width: s(170),
                    height: s(45),
                    borderRadius: s(20),
                    backgroundColor: isFormValid ? '#00B300' : 'rgba(0, 179, 0, 0.3)'
                  }
                ]}
                onPress={() => {
                  if (isFormValid) {
                    handleComplete();
                  } else {
                    setWarningModalVisible(true);
                  }
                }}
                disabled={saving} // Only disable if actively saving, not for validation
              >
                {saving ? <ActivityIndicator color="#FFF" /> : <Text style={{ color: isFormValid ? '#FFF' : 'rgba(255,255,255,0.5)', fontSize: ms(20), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium' }}>Done</Text>}
              </TouchableOpacity>
            );
          })()}
          <TouchableOpacity style={[styles.skipBtn, { width: s(170), height: s(45), borderRadius: s(20) }]} onPress={handleComplete} disabled={saving}>
            <Text style={{ color: '#00B600', fontSize: ms(20), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium' }}>Skip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Mental Wellness Settings Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSubSettings}
        onRequestClose={() => {
          if (selectedMentalOptions.length === 0) {
            setSelectedGoals(prev => prev.filter(g => g !== 'mental'));
          }
          setShowSubSettings(false);
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', backgroundColor: '#1A1A1A', borderRadius: 20, padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#FFF', fontSize: ms(20), fontFamily: 'FamiljenGrotesk-Bold', marginBottom: 20 }}>Mental Wellness</Text>

            <Text style={{ color: '#AAA', fontSize: ms(14), fontFamily: 'FamiljenGrotesk-Regular', marginBottom: 20, textAlign: 'center' }}>
              Select one or more options to customize your wellness focus:
            </Text>

            {['Reduce Stress', 'Improve Sleep', 'Better Focus', 'Anxiety Relief'].map((option) => {
              const isSelected = selectedMentalOptions.includes(option);
              return (
                <TouchableOpacity
                  key={option}
                  style={{
                    width: '100%',
                    padding: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: '#333',
                    backgroundColor: isSelected ? 'rgba(139, 195, 75, 0.15)' : 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={() => {
                    setSelectedMentalOptions(prev => {
                      const newSelection = prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option];

                      // If we are ADDING an option (newSelection is larger than prev or just not empty), ensure 'mental' goal is selected
                      if (newSelection.length > 0 && !selectedGoals.includes('mental')) {
                        setSelectedGoals(goals => [...goals, 'mental']);
                      }

                      return newSelection;
                    });
                  }}
                >
                  <Text style={{ color: isSelected ? '#8BC34B' : '#FFF', fontSize: ms(16), fontFamily: 'FamiljenGrotesk-Medium', textAlign: 'center' }}>
                    {option} {isSelected && '✓'}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={{ marginTop: 20, backgroundColor: '#8BC34B', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }}
              onPress={() => {
                if (selectedMentalOptions.length === 0) {
                  setSelectedGoals(prev => prev.filter(g => g !== 'mental'));
                }
                setShowSubSettings(false);
              }}
            >
              <Text style={{ color: '#FFF', fontFamily: 'FamiljenGrotesk-Bold' }}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal >

      <MessageModal
        visible={warningModalVisible}
        messageType={MessageTypes.WARNING}
        headerText="Almost there!"
        messageText={"Please select at least one goal and one day of availability to proceed, or choose Skip.\n\nDon't worry, you can always change these preferences later in your profile settings."}
        buttonText="Okay"
        onDismiss={() => setWarningModalVisible(false)}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060606',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },
  section: {},
  // Dedicated goals area - contains all 4 goal cards + breadcrumb
  goalsArea: {
    flexDirection: 'column',  // Stack top row and bottom row vertically
  },
  card: {
    backgroundColor: '#1A1A1A',  // Lighter gray for better visibility
    position: 'relative',
  },
  cardSelected: {
    borderColor: '#7AC530',
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    backgroundColor: '#000',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    tintColor: '#00B600',
  },
  checkbox: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 14,
    bottom: 14,
  },
  checkboxInline: {
    position: 'relative',
    right: undefined,
    bottom: undefined,
  },
  checkboxChecked: {
    borderColor: '#FFF',
    backgroundColor: '#00B600',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mentalCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Add to imports at top:
  // import editableLine from '../assets/images/Editable-line.png';
  dayBtn: {
    borderWidth: 2,
    borderColor: '#7AC530',
  },
  doneBtn: {
    flex: 1,
    backgroundColor: '#00B300', // XML Frame 13 fill
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtn: {
    flex: 1,
    backgroundColor: '#1A1A1A', // Match goal cards background
    alignItems: 'center',
    justifyContent: 'center',
  },
});
