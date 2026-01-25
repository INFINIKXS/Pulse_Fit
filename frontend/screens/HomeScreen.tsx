import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground, StatusBar as RNStatusBar, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useScaling } from '../utils/scaling';
import { BlurView } from 'expo-blur'; // If needed, but not using for now

// Assets
import HeaderPill from '../components/HeaderPill'; // Import Component
import pulseFitLogo from '../assets/images/pulsefit-logo.png'; // Using existing logo
import calendarStrip from '../assets/images/home_calendar_strip.png'; // Frame 16
import quickAbsBg from '../assets/images/home_quick_abs_bg.png'; // Rectangle 24
import iconTime from '../assets/images/icon_time.png'; // gg_time
import activitiesRow from '../assets/images/home_activities_row.png'; // Group 9
import fullBodyBg from '../assets/images/home_full_body_bg.png'; // Rectangle 29

export default function HomeScreen() {
  const { s, vs, ms } = useScaling();

  const PADDING = s(20);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingHorizontal: PADDING, paddingBottom: vs(100) }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Row */}
        <View style={[styles.headerRow, { marginTop: Platform.OS === 'android' ? RNStatusBar.currentHeight! + vs(10) : vs(50), marginBottom: vs(20) }]}>
          {/* Left: Interactive Header Pill */}
          <HeaderPill />

          {/* Right: Logo */}
          <Image
            source={pulseFitLogo}
            style={{ width: s(100), height: vs(30) }}
            resizeMode="contain"
          />
        </View>

        {/* Greeting */}
        <Text style={[styles.greetingText, { fontSize: ms(18), lineHeight: ms(22), marginBottom: vs(15) }]}>
          Good Morning, <Text style={styles.boldText}>Sammy!</Text>
        </Text>

        {/* Calendar Strip */}
        <View style={{ width: '100%', alignItems: 'center', marginBottom: vs(20) }}>
          <Image
            source={calendarStrip}
            style={{ width: '100%', height: vs(75), borderRadius: s(15) }}
            resizeMode="contain"
          />
        </View>

        {/* Today's Workout Section */}
        <View style={{ marginBottom: vs(20) }}>
          <Text style={[styles.sectionTitle, { fontSize: ms(20), marginBottom: vs(15) }]}>Today’s Workout</Text>

          {/* Quick Abs Card */}
          <ImageBackground
            source={quickAbsBg}
            style={{ width: '100%', height: vs(180), justifyContent: 'flex-end' }}
            imageStyle={{ borderRadius: s(30) }}
          >
            <View style={[styles.cardContent, { padding: s(20) }]}>
              <Text style={[styles.cardTitle, { fontSize: ms(25), marginBottom: vs(50) }]}>Quick Abs</Text>

              {/* Time & Reps */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: vs(10) }}>
                <View style={[styles.pill, { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: s(10), paddingVertical: vs(5) }]}>
                  <Image source={iconTime} style={{ width: s(15), height: s(15), marginRight: s(5), tintColor: '#FFF' }} resizeMode="contain" />
                  <Text style={[styles.pillText, { fontSize: ms(14) }]}>15 mins</Text>
                </View>
                {/* Fake 4x15 badge if not in image, assuming it's part of the design overlay or needs to be added across. 
                            The XML didn't explicitly separate it, but image shows "4 x 15" on the right.
                            I'll add a view for it.
                        */}
                <View style={[styles.pill, { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: s(10), paddingVertical: vs(5), marginLeft: 'auto' }]}>
                  <Text style={[styles.pillText, { fontSize: ms(14) }]}>4 x 15</Text>
                </View>
              </View>

              {/* Continue Button */}
              <View style={[styles.continueButton, { height: vs(50), borderRadius: s(25), paddingHorizontal: s(20) }]}>
                <Text style={[styles.continueText, { fontSize: ms(16) }]}>Continue this workout</Text>
                {/* Assuming arrow is part of an icon or text, using > for now */}
                <View style={{ width: s(30), height: s(30), borderRadius: s(15), backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#000', fontSize: ms(16), fontWeight: 'bold' }}>→</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Activities Section */}
        <View style={{ marginBottom: vs(20) }}>
          <Text style={[styles.sectionTitle, { fontSize: ms(20), marginBottom: vs(15) }]}>Activities</Text>
          <Image
            source={activitiesRow}
            style={{ width: '100%', height: vs(105) }}
            resizeMode="contain"
          />
        </View>

        {/* Workouts Section */}
        <View style={{ marginBottom: vs(20) }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: vs(15) }}>
            <Text style={[styles.sectionTitle, { fontSize: ms(20) }]}>Workouts</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { fontSize: ms(15) }]}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Full Body Burn Card */}
          <ImageBackground
            source={fullBodyBg}
            style={{ width: '100%', height: vs(160), justifyContent: 'flex-end' }}
            imageStyle={{ borderRadius: s(30) }}
          >
            <View style={{ padding: s(20) }}>
              <Text style={[styles.cardTitle, { fontSize: ms(25), marginBottom: vs(5) }]}>Full Body Burn</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: vs(15) }}>
                <Image source={iconTime} style={{ width: s(15), height: s(15), marginRight: s(5), tintColor: '#FFF' }} resizeMode="contain" />
                <Text style={[styles.pillText, { fontSize: ms(14) }]}>30 mins | 3 x 20</Text>
              </View>

              <View style={{ flexDirection: 'row', gap: s(10) }}>
                <View style={[styles.tag, { paddingHorizontal: s(15), paddingVertical: vs(5), borderRadius: s(10) }]}>
                  <Text style={[styles.tagText, { fontSize: ms(14) }]}>HIIT</Text>
                </View>
                <View style={[styles.tag, { paddingHorizontal: s(15), paddingVertical: vs(5), borderRadius: s(10) }]}>
                  <Text style={[styles.tagText, { fontSize: ms(14) }]}>High</Text>
                </View>
                <View style={[styles.tag, { paddingHorizontal: s(15), paddingVertical: vs(5), borderRadius: s(10) }]}>
                  <Text style={[styles.tagText, { fontSize: ms(14) }]}>No Equipment</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

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
