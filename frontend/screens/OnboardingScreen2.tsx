// ...existing code...
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import DropdownPicker from '../components/DropdownPicker';
import BreadcrumbMenu from '../components/BreadcrumbMenu';

// Icon imports (update paths as needed)
import mentalHealthIcon from '../assets/images/ri_mental-health-fill.png';
import bodyWeightIcon from '../assets/images/hugeicons_body-weight.png';
import muscleIcon from '../assets/images/hugeicons_body-part-muscle.png';
import yogaIcon from '../assets/images/grommet-icons_yoga.png';

const fitnessGoals = [
  {
    key: 'muscle',
    label: 'Build Muscle',
    desc: 'Increase strength and muscle mass.',
    icon: muscleIcon,
  },
  {
    key: 'weight',
    label: 'Loose Weight',
    desc: 'Burn fat and improve cardiovascular health with our cardio programs and other workout programs tailored for this goal.',
    icon: bodyWeightIcon,
  },
  {
    key: 'yoga',
    label: 'Improve Flexibility',
    desc: 'Enhance mobility and prevent injuries',
    icon: yogaIcon,
  },
  {
    key: 'mental',
    label: 'Improve Mental Wellness',
    desc: 'Use movement to reduce stress',
    icon: mentalHealthIcon,
  },
];

const environments = ['Home', 'Gym', 'Outdoor'];
const days = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];

export default function OnboardingScreen2({ navigation }) {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [environment, setEnvironment] = useState('Home');
  const [availability, setAvailability] = useState([]);

  const toggleGoal = (key) => {
    setSelectedGoals((prev) =>
      prev.includes(key) ? prev.filter((g) => g !== key) : [...prev, key]
    );
  };

  const toggleDay = (day) => {
    setAvailability((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.title}>What’s Your Fitness Goal?</Text>
        <Text style={styles.subtitle}>
          Choose one or more goals to help us create your perfect workout plan.
        </Text>
        {/* Top row: Build Muscle (left), Loose Weight (right) */}
        <View style={styles.goalsRow}>
          {/* Build Muscle Card - match image layout */}
          <TouchableOpacity
            style={[styles.goalCard, styles.goalCardMuscle, selectedGoals.includes('muscle') && styles.goalCardSelected]}
            onPress={() => toggleGoal('muscle')}
            activeOpacity={0.85}
          >
            <View style={styles.goalCardHeaderRow}>
              <View style={styles.goalIconWrap}>
                <Image source={fitnessGoals[0].icon} style={[styles.goalIcon, selectedGoals.includes('muscle') && styles.goalIconSelected]} />
              </View>
              <View style={styles.goalTitleWrap}>
                <Text style={styles.goalTitle}>Build{"\n"}Muscle</Text>
              </View>
            </View>
            <Text style={styles.goalDesc}>Increase strength and muscle mass.</Text>
            <View
              style={[styles.checkbox, selectedGoals.includes('muscle') && styles.checkboxChecked]}
            >
              {selectedGoals.includes('muscle') && <View style={styles.checkboxInner} />}
            </View>
          </TouchableOpacity>
          {/* Loose Weight Card - match image layout */}
          <TouchableOpacity
            style={[styles.goalCard, styles.goalCardWeight, selectedGoals.includes('weight') && styles.goalCardSelected]}
            onPress={() => toggleGoal('weight')}
            activeOpacity={0.85}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 2 }}>
              <View style={styles.goalIconWrap}>
                <Image source={fitnessGoals[1].icon} style={[styles.goalIcon, selectedGoals.includes('weight') && styles.goalIconSelected]} />
              </View>
              <View style={styles.goalTitleWrap}>
                <Text style={styles.goalTitle}>Loose{"\n"}Weight</Text>
              </View>
            </View>
            <Text style={styles.goalDesc}>Burn fat and improve cardiovascular health with our cardio programs and other workout programs tailored for this goal.</Text>
            <View
              style={[styles.checkbox, selectedGoals.includes('weight') && styles.checkboxChecked]}
            >
              {selectedGoals.includes('weight') && <View style={styles.checkboxInner} />}
            </View>
          </TouchableOpacity>
        </View>
        {/* Second row: Improve Flexibility (left), empty (right) */}
        <View style={styles.goalsRow}>
          {/* Improve Flexibility Card - match image layout */}
          <TouchableOpacity
            style={[styles.goalCard, styles.goalCardYoga, selectedGoals.includes('yoga') && styles.goalCardSelected]}
            onPress={() => toggleGoal('yoga')}
            activeOpacity={0.85}
          >
            <View style={styles.goalCardHeaderRow}>
              <View style={styles.goalIconWrap}>
                <Image source={fitnessGoals[2].icon} style={[styles.goalIcon, selectedGoals.includes('yoga') && styles.goalIconSelected]} />
              </View>
              <View style={styles.goalTitleWrap}>
                <Text style={styles.goalTitle}>Improve{"\n"}Flexibility</Text>
              </View>
            </View>
            <Text style={[styles.goalDesc, styles.goalDescYoga]}>Enhance mobility and prevent injuries</Text>
            <View
              style={[styles.checkbox, selectedGoals.includes('yoga') && styles.checkboxChecked]}
            >
              {selectedGoals.includes('yoga') && <View style={styles.checkboxInner} />}
            </View>
          </TouchableOpacity>
          <View style={styles.goalCardSpacer} />
        </View>
        {/* Third row: Improve Mental Wellness (left, wide), breadcrumb menu (right) */}
        <View style={styles.goalsRowMental}>
          {/* Improve Mental Wellness Card - pixel-perfect layout */}
          <TouchableOpacity
            style={[styles.goalCard, styles.goalCardMental, selectedGoals.includes('mental') && styles.goalCardSelected, styles.goalMentalCardRow]}
            onPress={() => toggleGoal('mental')}
            activeOpacity={0.85}
          >
            {/* Icon */}
            <View style={[styles.goalIconWrap, styles.goalMentalIconWrap]}>
              <Image source={fitnessGoals[3].icon} style={[styles.goalIcon, styles.goalMentalIcon]} />
            </View>
            {/* Texts */}
            <View style={styles.goalMentalTextWrap}>
              <Text style={styles.goalTitle}>Improve Mental Wellness</Text>
              <Text style={styles.goalDesc}>Use movement to{"\n"}reduce stress</Text>
            </View>
            {/* Checkbox */}
            <View
              style={[styles.checkbox, styles.mentalCheckbox, selectedGoals.includes('mental') && styles.checkboxChecked]}
            >
              {selectedGoals.includes('mental') && <View style={styles.checkboxInner} />}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.envRow}>
          <Text style={styles.envLabel}>Environment</Text>
          <DropdownPicker
            label=""
            data={environments}
            selectedValue={environment}
            onSelect={setEnvironment}
            style={styles.envDropdown}
            dropdownTextStyle={styles.envDropdownText}
            dropdownStyle={styles.envDropdownModal}
          />
        </View>
        <Text style={styles.availLabel}>Availability</Text>
        <View style={styles.daysRow}>
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[styles.dayBtn, availability.includes(day) && styles.dayBtnSelected]}
              onPress={() => toggleDay(day)}
              activeOpacity={0.7}
            >
              <Text style={[styles.dayBtnText, availability.includes(day) && styles.dayBtnTextSelected]}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.doneBtn} activeOpacity={0.8} onPress={() => navigation.replace('Main')}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipBtn} activeOpacity={0.8} onPress={() => navigation.replace('Main')}>
            <Text style={styles.skipBtnText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // 1. Screen container
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 32,
    paddingHorizontal: 0,
  },

  // 2. Title and subtitle
  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 500,
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 0,
    fontFamily: 'FamiljenGrotesk-Bold',

  },
  subtitle: {
    color: 'rgba(255, 255, 255, 1.8)',
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 18,
    fontFamily: 'FamiljenGrotesk-Regular',
  },

  // 3. Fitness goal cards grid and rows
  // 3b. Selected card highlight
  goalCardSelected: {
    borderColor: '#00FF00',
    borderWidth: 2,
    backgroundColor: '#101d10',
  },
  goalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginBottom: 6,
  },
  goalsRowMental: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 0,
    marginTop: 1,
  },
  goalCard: {
    backgroundColor: '#181818',
    borderRadius: 30,
    marginBottom: 14,
    position: 'relative',
    alignSelf: 'flex-start',
    // No fixed width or minHeight, each card can be sized individually
  },
  goalCardMuscle: {
    width: 157,
    minHeight: 141,
  },
  goalCardWeight: {
    width: 168,
    minHeight: 290,
  },
  goalCardYoga: {
    width: 157,
    minHeight: 141,
    bottom: 160,
  },
  goalCardMental: {
    paddingRight: 52,
    marginBottom: 0,
    height: 80,
    width: 272,
    bottom: 170,
  },
  // 4. Card header row and icon
  goalCardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  goalIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginLeft: 15,
    marginTop: 10
  },
  goalIcon: {
    width: 28,
    height: 28,
    tintColor: '#00FF00',
  },
  goalIconSelected: {
    tintColor: '#00FF00',
  },

  // 5. Card text wrappers and text
  goalTitleWrap: {
    marginLeft: 8,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  goalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Bold',
    marginBottom: 2,
    textAlign: 'left',
    lineHeight: 20,
  },
  goalDesc: {
    color: '#B0B0B0',
    fontSize: 14,
    fontFamily: 'FamiljenGrotesk-Regular',
    marginBottom: 8,
    marginTop: 0,
  },
  goalDescYoga: {
    color: '#B0B0B0',
    marginBottom: 18,
  },
  goalMentalTextWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  // 6. Special mental card row/icon
  goalMentalCardRow: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 0,
    paddingHorizontal: 6,
    marginBottom: 0,
  },
  goalMentalIconWrap: {
    marginBottom: 0,
    marginRight: 8,
  },
  goalMentalIcon: {
    tintColor: '#00FF00',
  },

  // 7. Card checkboxes
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#B0B0B0',
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    bottom: 12,
  },
  checkboxChecked: {
    borderColor: '#00FF00',
    backgroundColor: '#101d10',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: '#00FF00',
  },
  mentalCheckbox: {
    position: 'relative',
    right: undefined,
    bottom: undefined,
    marginLeft: 12,
    marginBottom: 0,
    alignSelf: 'center',
  },

  // 8. Menu icon (if used)
  menuIcon: {
    width: 22,
    height: 22,
    position: 'absolute',
    right: 12,
    top: 12,
    tintColor: '#00FF00',
  },

  // 9. Environment row and dropdown
  envRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10,
  },
  envLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'FamiljenGrotesk-Bold',
    marginRight: 10,
  },
  envDropdown: {
    width: 110,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#191919',
    marginLeft: 0,
    marginTop: 0,
  },
  envDropdownText: {
    color: '#00FF00',
    fontSize: 14,
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  envDropdownModal: {
    backgroundColor: '#222',
    borderRadius: 12,
  },

  // 10. Availability label and days row
  availLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'FamiljenGrotesk-Bold',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 8,
  },
  daysRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginBottom: 24,
  },
  dayBtn: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  dayBtnSelected: {
    backgroundColor: '#101d10',
  },
  dayBtnText: {
    color: '#00FF00',
    fontSize: 14,
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  dayBtnTextSelected: {
    color: '#fff',
  },

  // 11. Action buttons row
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 24,
  },
  doneBtn: {
    flex: 1,
    backgroundColor: '#00FF00',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginRight: 10,
  },
  doneBtnText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'FamiljenGrotesk-Bold',
  },
  skipBtn: {
    flex: 1,
    backgroundColor: '#191919',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginLeft: 10,
  },
  skipBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'FamiljenGrotesk-Bold',
  },
});
