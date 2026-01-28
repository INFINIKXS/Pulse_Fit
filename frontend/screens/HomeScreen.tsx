import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground, StatusBar as RNStatusBar, Platform, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useScaling } from '../utils/scaling';

// Debug component to log screen dimensions
function DebugScreenSize() {
  const { width, height } = useWindowDimensions();
  console.log(`📱 Screen: ${width} × ${height}`);
  return null;
}


// Assets
import HeaderPill from '../components/HeaderPill';
import PulseFit_Logo from '../components/PulseFit_Logo';
import pulseFitLogo from '../assets/images/pulsefit-logo.png';
// import calendarStrip from '../assets/images/home_calendar_strip.png'; // Removed in favor of component
import { CalendarStrip } from '../components/CalendarStrip';
import quickAbsBg from '../assets/images/home_quick_abs_bg.png';
import iconTime from '../assets/images/icon_time.png';
import activitiesRow from '../assets/images/home_activities_row.png';
import fullBodyBg from '../assets/images/home_full_body_bg.png';

export default function HomeScreen() {
  const { s, vs, ms } = useScaling();
  const insets = useSafeAreaInsets();
  const PADDING = s(20);

  const [searchQuery, setSearchQuery] = useState('');

  // Data
  const todaysWorkout = {
    id: 'today-1',
    title: 'Quick Abs',
    duration: '15 mins',
    reps: '4 x 15',
    image: quickAbsBg
  };

  const workouts = [
    {
      id: 'w-1',
      title: 'Full Body Burn',
      duration: '30 mins',
      reps: '3 x 20',
      tags: ['HIIT', 'High', 'No Equipment'],
      image: fullBodyBg
    }
  ];

  // Filtering
  const isSearching = searchQuery.length > 0;

  const filteredToday = todaysWorkout.title.toLowerCase().includes(searchQuery.toLowerCase()) ? todaysWorkout : null;
  const filteredWorkouts = workouts.filter(w => w.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const showTodaySection = !isSearching || filteredToday;
  const showWorkoutsSection = !isSearching || filteredWorkouts.length > 0;
  const showActivities = !isSearching; // Hide activities row when searching maybe? User intent is probably specific workout.

  return (
    <View style={styles.container}>
      <DebugScreenSize />
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingHorizontal: PADDING, paddingBottom: vs(100) }
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Container - Absolute Positioning per Developer Specs */}
        <View style={{
          height: vs(100), // Sufficient height for absolute elements
          width: '100%',
          marginBottom: vs(10),
          // We don't add marginTop here, we handle it in absolute top coordinates
        }}>

          {/* Search/Profile Pill (Left) */}
          {/* Specs: Left: 20, Top: 58 */}
          <View style={{
            position: 'absolute',
            left: s(5),
            top: Math.max(vs(58), insets.top + vs(10)), // Ensure it's below status bar
            zIndex: 10,
          }}>
            <HeaderPill onSearchChange={setSearchQuery} />
          </View>

          {/* PulseFit Logo (Right) */}
          {/* Specs: Left: 264, Top: 48.07, Width: 108.31, Height: 53.61 */}
          <View style={{
            position: 'absolute',
            left: s(199), // Reduced from 264 to fix "too far right"
            top: Math.max(vs(54.07), insets.top),
            width: s(108.31),
            height: vs(53.61),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <PulseFit_Logo scale={0.56} />
          </View>

        </View>

        {/* Greeting - Only show if not searching? Or always? Let's keep it. */}
        <Text style={[styles.greetingText, { fontSize: ms(18), left: s(5), lineHeight: ms(22), marginBottom: vs(15) }]}>
          Good Morning, <Text style={styles.boldText}>Sammy!</Text>
        </Text>

        {/* Calendar Strip - potentially hide during search */}
        {!isSearching && (
          <View style={{
            position: 'absolute',
            left: s(20),
            top: vs(141),
            width: s(372),
            height: vs(69),
            zIndex: 5,
          }}>
            <CalendarStrip />
          </View>
        )}

        {/* Spacer for Absolute Calendar Strip */}
        {!isSearching && <View style={{ height: vs(80), width: '100%' }} />}

        {/* Today's Workout Section */}
        {showTodaySection && filteredToday && (
          <View style={{ marginBottom: vs(20) }}>
            <Text style={[styles.sectionTitle, { fontSize: ms(20), marginBottom: vs(15) }]}>Today’s Workout</Text>

            <ImageBackground
              source={filteredToday.image}
              style={{ width: '100%', height: vs(180), justifyContent: 'flex-end' }}
              imageStyle={{ borderRadius: s(30) }}
            >
              <View style={[styles.cardContent, { padding: s(20) }]}>
                <Text style={[styles.cardTitle, { fontSize: ms(25), marginBottom: vs(50) }]}>{filteredToday.title}</Text>

                {/* Time & Reps */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: vs(10) }}>
                  <View style={[styles.pill, { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: s(10), paddingVertical: vs(5) }]}>
                    <Image source={iconTime} style={{ width: s(15), height: s(15), marginRight: s(5), tintColor: '#FFF' }} resizeMode="contain" />
                    <Text style={[styles.pillText, { fontSize: ms(14) }]}>{filteredToday.duration}</Text>
                  </View>
                  <View style={[styles.pill, { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: s(10), paddingVertical: vs(5), marginLeft: 'auto' }]}>
                    <Text style={[styles.pillText, { fontSize: ms(14) }]}>{filteredToday.reps}</Text>
                  </View>
                </View>

                {/* Continue Button */}
                <View style={[styles.continueButton, { height: vs(50), borderRadius: s(25), paddingHorizontal: s(20) }]}>
                  <Text style={[styles.continueText, { fontSize: ms(16) }]}>Continue this workout</Text>
                  <View style={{ width: s(30), height: s(30), borderRadius: s(15), backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#000', fontSize: ms(16), fontWeight: 'bold' }}>→</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        )}

        {/* Activities Section */}
        {showActivities && (
          <View style={{ marginBottom: vs(20) }}>
            <Text style={[styles.sectionTitle, { fontSize: ms(20), marginBottom: vs(15) }]}>Activities</Text>
            <Image
              source={activitiesRow}
              style={{ width: '100%', height: vs(105) }}
              resizeMode="contain"
            />
          </View>
        )}

        {/* Workouts Section */}
        {showWorkoutsSection && (
          <View style={{ marginBottom: vs(20) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: vs(15) }}>
              <Text style={[styles.sectionTitle, { fontSize: ms(20) }]}>Workouts</Text>
              <TouchableOpacity>
                <Text style={[styles.seeAllText, { fontSize: ms(15) }]}>See all</Text>
              </TouchableOpacity>
            </View>

            {filteredWorkouts.map((workout) => (
              <ImageBackground
                key={workout.id}
                source={workout.image}
                style={{ width: '100%', height: vs(160), justifyContent: 'flex-end', marginBottom: vs(20) }}
                imageStyle={{ borderRadius: s(30) }}
              >
                <View style={{ padding: s(20) }}>
                  <Text style={[styles.cardTitle, { fontSize: ms(25), marginBottom: vs(5) }]}>{workout.title}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: vs(15) }}>
                    <Image source={iconTime} style={{ width: s(15), height: s(15), marginRight: s(5), tintColor: '#FFF' }} resizeMode="contain" />
                    <Text style={[styles.pillText, { fontSize: ms(14) }]}>{workout.duration} | {workout.reps}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', gap: s(10) }}>
                    {workout.tags.map((tag, i) => (
                      <View key={i} style={[styles.tag, { paddingHorizontal: s(15), paddingVertical: vs(5), borderRadius: s(10) }]}>
                        <Text style={[styles.tagText, { fontSize: ms(14) }]}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </ImageBackground>
            ))}
          </View>
        )}

        {isSearching && !filteredToday && filteredWorkouts.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: vs(50) }}>
            <Text style={{ color: '#888', fontFamily: 'FamiljenGrotesk-Regular', fontSize: ms(16) }}>No workouts found for "{searchQuery}"</Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    color: '#FFF',
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  boldText: {
    fontFamily: 'FamiljenGrotesk-Bold',
  },
  sectionTitle: {
    color: '#FFF',
    fontFamily: 'FamiljenGrotesk-Bold',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardTitle: {
    color: '#FFF',
    fontFamily: 'FamiljenGrotesk-Bold',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  pillText: {
    color: '#FFF',
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  continueButton: {
    backgroundColor: 'rgba(255,255,255,0.7)', // Translucent white pill
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  continueText: {
    color: '#000',
    fontFamily: 'FamiljenGrotesk-Medium',
  },
  seeAllText: {
    color: '#00B300',
    fontFamily: 'FamiljenGrotesk-Regular',
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  tagText: {
    color: '#FFF',
    fontFamily: 'FamiljenGrotesk-Regular',
  }
});
