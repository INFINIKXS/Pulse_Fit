import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import DropdownPicker from '../components/DropdownPicker';
import EnvironmentPicker from '../components/EnvironmentPicker';
import BreadcrumbMenu from '../components/BreadcrumbMenu';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/navigation-types';

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

// const environments = ['Home', 'Gym', 'Outdoor'];
const days = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];




export default function OnboardingScreen2() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [environment, setEnvironment] = useState('Home');
  const [availability, setAvailability] = useState([]);
  // Track if the EnvironmentPicker is open
  const [envPickerOpen, setEnvPickerOpen] = useState(false);

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
      {/* Overlay to block all interaction except EnvironmentPicker when open */}
      {envPickerOpen && (
        <TouchableOpacity
          activeOpacity={1}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.01)', // nearly transparent
            zIndex: 9999,
          }}
          onPress={() => setEnvPickerOpen(false)}
        />
      )}

      <Text style={styles.title}>What’s Your Fitness Goal?</Text>
      <Text style={styles.subtitle}>
        Choose one or more goals to help us create your perfect workout plan.
      </Text>
      {/* Top row: Build Muscle (left), Loose Weight (right) */}
      <View style={styles.goalsRow} pointerEvents={envPickerOpen ? 'none' : 'auto'}>
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
      <View style={styles.goalsRow} pointerEvents={envPickerOpen ? 'none' : 'auto'}>
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
        {/* Spacer removed: goalCardSpacer style does not exist */}
      </View>
      {/* Third row: Improve Mental Wellness (left, wide), breadcrumb menu (right) */}
      <View style={styles.goalsRowMental} pointerEvents={envPickerOpen ? 'none' : 'auto'}>
        {/* Improve Mental Wellness Card - pixel-perfect layout, decoupled styles */}
        <TouchableOpacity
          style={[
            styles.goalCard,
            styles.goalCardMental,
            selectedGoals.includes('mental') && styles.goalCardSelected,
            styles.goalMentalCardRow
          ]}
          onPress={() => toggleGoal('mental')}
          activeOpacity={0.85}
        >
          {/* Icon */}
          <View style={styles.goalMentalIconWrap}>
            <Image source={fitnessGoals[3].icon} style={styles.goalMentalIcon} />
          </View>
          {/* Texts */}
          <View style={styles.goalMentalTextWrap}>
            <Text style={styles.goalMentalTitle}>Improve Mental Wellness</Text>
            <Text style={styles.goalMentalDesc}>Use movement to reduce stress</Text>
          </View>
          {/* Checkbox */}
          <View
            style={[styles.checkbox, styles.mentalCheckbox, selectedGoals.includes('mental') && styles.checkboxChecked]}
          >
            {selectedGoals.includes('mental') && <View style={styles.checkboxInner} />}
          </View>
        </TouchableOpacity>
      </View>
      {/* Environment label, Home dropdown, and BreadcrumbMenu */}
      <View style={styles.envRow} pointerEvents={envPickerOpen ? 'auto' : 'auto'}>
        <Text style={styles.envLabel}>Environment</Text>
        <View style={styles.envPickerWrap}>
          <EnvironmentPicker
            selected={environment}
            onSelect={setEnvironment}
            open={envPickerOpen}
            setOpen={setEnvPickerOpen}
          />
        </View>
        <View style={styles.breadcrumbWrap} pointerEvents={envPickerOpen ? 'none' : 'auto'}>
          {/* Remove breadcrumbMenuOuter wrapper if not defined in styles */}
          <BreadcrumbMenu />
        </View>
      </View>
      <Text style={styles.availLabel}>Availability</Text>
      <View style={styles.daysRowFixed} pointerEvents={envPickerOpen ? 'none' : 'auto'}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysRow}
        >
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
        </ScrollView>
      </View>
      <View style={styles.actionRow} pointerEvents={envPickerOpen ? 'none' : 'auto'}>
        <TouchableOpacity style={styles.doneBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.doneBtnText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipBtn} activeOpacity={0.8}>
          <Text style={styles.skipBtnText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 1. Screen container
  container: {
    flex: 1,
    backgroundColor: '#060606', // updated to match request
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
    marginTop:1,
  },
  goalCard: {
    backgroundColor: 'rgb(15,15,17)',
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
    width: 163,
    minHeight: 290,
    marginRight:2,
  },
  goalCardYoga: {
    width: 157,
    minHeight: 141,
    bottom: 160,
  },
  goalCardMental: {
    minHeight: 80,
    width: 255,
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
    marginLeft: 8,
    marginTop:10,
    
  },
  goalIcon: {
    width: 28,
    height: 28,
    // Use a green tint that matches the screenshot (rgb selector for easy adjustment)
    tintColor: '#00B300', // ← adjust this value with your mouse in your editor's color picker
  },
  goalIconSelected: {
    tintColor: '#00B300', // ← adjust this value as needed
  },

  // 5. Card text wrappers and text
  goalTitleWrap: {
    marginTop:10,
    marginLeft: 8,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  goalTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Bold',
    marginBottom: 2,
    textAlign: 'left',
    lineHeight: 20,
  },
  goalDesc: {
    color: '#B0B0B0',
    fontSize: 12,
    fontFamily: 'FamiljenGrotesk-Regular',
    marginBottom: 8,
    marginTop: 0,
    maxWidth: 155  ,
    marginLeft: 19,
 
  },
  goalDescYoga: {
    color: '#B0B0B0',
    fontSize: 12,
    marginBottom: 18,
    fontFamily: 'FamiljenGrotesk-Regular',
   
    
  },
  // 6. Special mental card row/icon/text (decoupled and unified for mental card)
  goalMentalCardRow: {
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 3,
    marginBottom: 0,
  },
  goalMentalIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#111',
    marginBottom: 5, // match other icons
    marginLeft: 8,
    marginTop: 10,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  goalMentalIcon: {
    width: 28,
    height: 28,
    tintColor: '#00B300', // ← adjust this value as needed
    // alignItems removed, not needed for Image
  },
  goalMentalTextWrap: {
    flex: 1,
    flexDirection: 'column',  
    alignItems: 'flex-start',
    marginRight: 0,
    marginLeft: 0,
    
  },
  goalMentalTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Bold',
    marginBottom: 2,
    textAlign: 'left',
    lineHeight: 20,
    marginTop: 10,
    marginLeft: -8,
    
    
  },
  goalMentalDesc: {
    color:'#B0B0B0',
    fontSize: 12,
    fontFamily: 'FamiljenGrotesk-Regular',
    marginBottom: 8,
    marginTop: 0,
    flexWrap: 'wrap',
    maxWidth: 105  ,
    marginLeft: -8,
    
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
    marginLeft: 2,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    bottom: 12,
    
  },

  // 8. Menu icon (if used)
  menuIcon: {
    width: 22,
    height: 22,
    position: 'absolute',
    right: 12,
    top: 12,
    tintColor: 'rgb(15,15,17)',
  },

    // 9. Environment row and dropdown
  envRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10,
    gap: 35, // Creates space between items, replacing the need for wrappers
    
  },
  
  breadcrumbWrap: {
    flex: 1,
    alignItems: 'flex-end',
    bottom: 250,
    right: 15,
  },

  envLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Bold',
    marginRight: 10,
    position: 'absolute',
    bottom: 200,
  },

  envDropdownText: {
    color: '#8BC34B', // Green as in image
    fontSize: 17,
    fontFamily: 'FamiljenGrotesk-Bold',
    fontWeight: '700',
    marginRight: 6,
  },


  // 10. Availability label and days row
  availLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'FamiljenGrotesk-Bold',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: -10,
    bottom: 170,
  
  },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // Removed top offset to avoid clipping
  },
  daysRowFixed: {
    position: 'absolute',
    left: 10,
    right: 0,
    bottom: 130,
    zIndex: 100,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    marginLeft: 10,
    marginBottom: 0, 
    maxHeight: 40,
  },
  dayBtn: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgb(140, 160, 100)', 
    backgroundColor: 'transparent',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 7,
    marginBottom: 8,
    marginTop: 8,
    height: 40,
  },
  dayBtnSelected: {
    backgroundColor: '#111', // Match background in image
    borderColor: 'rgb(140, 160, 100)',
  },
  dayBtnText: {
    color: 'rgb(140, 160, 100)',
    fontSize: 13,
    fontFamily: 'FamiljenGrotesk-Regular',
    minWidth: 10,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: -8,
    marginRight: -8,
    fontWeight: '600',
  },
  dayBtnTextSelected: {
    color: '#fff', // White text when selected
    fontWeight: '500',
  },

  // 11. Action buttons row
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 24,
    bottom:70,
  },
  doneBtn: {
    flex: 1,
    backgroundColor: '#00B300', 
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginRight: 10,
    width: 200,
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 17,
    fontFamily: 'FamiljenGrotesk-Bold',
  },
  skipBtn: {
    flex: 1,
    backgroundColor: 'rgb(15,15,17)', // Dark background as in image
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginLeft: 10,
  },
  skipBtnText: {
    color: 'rgb(2, 97, 15)', // Muted green as in image
    fontWeight: '500',
    fontSize: 17,
    fontFamily: 'FamiljenGrotesk-Bold',
  },
  envPickerWrap: {
    position: 'absolute',
    bottom: 200, 
    right:8,
  },
});