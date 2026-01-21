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
  Platform
} from 'react-native';
import api from '../services/api';
import BreadcrumbMenu from '../components/BreadcrumbMenu';
import { useScaling } from '../utils/scaling';

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
  const [availability, setAvailability] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const toggleGoal = (key: string) => setSelectedGoals(prev => prev.includes(key) ? prev.filter(g => g !== key) : [...prev, key]);
  const toggleDay = (day: string) => setAvailability(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  const cycleEnv = () => setEnvironment(environments[(environments.indexOf(environment) + 1) % 3]);

  const handleComplete = async () => {
    setSaving(true);
    try {
      await api.put('/users/me', { fitness_goals: selectedGoals, environment, availability, onboarding_completed: true });
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
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: vs(30) }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER - with proper top spacing */}
        <View style={{ paddingHorizontal: PADDING, paddingTop: vs(50), paddingBottom: vs(20) }}>
          <Text style={{ color: '#FFF', fontSize: ms(25), fontWeight: '700', fontFamily: 'FamiljenGrotesk-Bold' }}>What's Your Fitness Goal?</Text>
          <Text style={{ color: '#FFF', fontSize: ms(14), fontFamily: 'FamiljenGrotesk-Regular', marginTop: s(4) }}>Choose one or more goals to help us create your perfect workout plan.</Text>
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
                    <Text style={{ color: '#FFF', fontSize: ms(18), fontFamily: 'FamiljenGrotesk-Regular', lineHeight: ms(22) }}>Build</Text>
                    <Text style={{ color: '#FFF', fontSize: ms(18), fontFamily: 'FamiljenGrotesk-Regular', lineHeight: ms(22) }}>Muscle</Text>
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
                    <Text style={{ color: '#FFF', fontSize: ms(18), fontFamily: 'FamiljenGrotesk-Regular', lineHeight: ms(22) }}>Improve</Text>
                    <Text style={{ color: '#FFF', fontSize: ms(18), fontFamily: 'FamiljenGrotesk-Regular', lineHeight: ms(22) }}>Flexibility</Text>
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
                    <Text style={{ color: '#FFF', fontSize: ms(18), fontFamily: 'FamiljenGrotesk-Regular', lineHeight: ms(22) }}>Loose</Text>
                    <Text style={{ color: '#FFF', fontSize: ms(18), fontFamily: 'FamiljenGrotesk-Regular', lineHeight: ms(22) }}>Weight</Text>
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
                fontSize: vs(80) * 0.2125,
                fontFamily: 'FamiljenGrotesk-Regular',
                lineHeight: (vs(80) * 0.2125) * 1.25,
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
              <BreadcrumbMenu />
            </View>
          </View>
        </View>

        {/* ENVIRONMENT */}
        <View style={{ flexDirection: 'row', paddingHorizontal: PADDING, alignItems: 'center', justifyContent: 'space-between', marginTop: vs(25) }}>
          <Text style={{ color: '#FFF', fontSize: ms(18), fontWeight: '700', fontFamily: 'FamiljenGrotesk-Bold' }}>Environment</Text>
          <TouchableOpacity onPress={cycleEnv} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#7AC530', fontSize: ms(13), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium' }}>{environment}</Text>
            <Text style={{ color: '#7AC530', fontSize: ms(13), marginLeft: 6 }}>∨</Text>
          </TouchableOpacity>
        </View>

        {/* AVAILABILITY */}
        <View style={{ marginTop: vs(25) }}>
          <Text style={{ color: '#FFF', fontSize: ms(18), fontWeight: '700', fontFamily: 'FamiljenGrotesk-Bold', marginLeft: PADDING, marginBottom: s(8) }}>Availability</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: PADDING }}>
            {days.map(day => (
              <TouchableOpacity
                key={day}
                style={[styles.dayBtn, { paddingHorizontal: s(16), paddingVertical: s(10), borderRadius: s(18), marginRight: s(8) }, availability.includes(day) && styles.dayBtnSelected]}
                onPress={() => toggleDay(day)}
              >
                <Text style={{ color: '#7AC530', fontSize: ms(16), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium' }}>{day}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* BUTTONS */}
        <View style={{ paddingHorizontal: PADDING, gap: s(14), flexDirection: 'row', marginTop: vs(40) }}>
          <TouchableOpacity style={[styles.doneBtn, { height: s(45), borderRadius: s(20) }]} onPress={handleComplete} disabled={saving}>
            {saving ? <ActivityIndicator color="#FFF" /> : <Text style={{ color: '#FFF', fontSize: ms(20), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium' }}>Done</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.skipBtn, { height: s(45), borderRadius: s(20) }]} onPress={handleComplete} disabled={saving}>
            <Text style={{ color: '#00B600', fontSize: ms(20), fontWeight: '500', fontFamily: 'FamiljenGrotesk-Medium' }}>Skip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
  menuBox: {
    backgroundColor: '#0C0C0C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLine: {
    height: 2,
    backgroundColor: '#00B600',
    marginVertical: 4,
  },
  dayBtn: {
    borderWidth: 2,
    borderColor: '#7AC530',
  },
  dayBtnSelected: {
    backgroundColor: 'rgba(122,197,48,0.15)',
  },
  doneBtn: {
    flex: 1,
    backgroundColor: '#00B600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtn: {
    flex: 1,
    backgroundColor: '#0C0C0C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
