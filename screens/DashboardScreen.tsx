import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import type { RootStackParamList, MainTabParamList } from '../navigation/AppNavigator';
import { supabase } from '../lib/supabase';
// import __CURRENT_ACCOUNT__ from './LoginScreen'
// import __FIRST_NAME__ from './LoginScreen'


type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function DashboardScreen() {
  const navigation = useNavigation<Nav>();

  const goWeeklyMissions = () => {
    navigation.navigate('WeeklyMissions');
  };

  const goInsights = () => {
    navigation.navigate('Insights');
  };

 
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Welcome</Text>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Ready to track your day?</Text>
          <Text style={styles.heroBody}>
            Keep your heart healthy by logging your daily activities and wellness check-ins.
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('LogVitals')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Log your activity!</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.insightsCard}
          onPress={goInsights}
          activeOpacity={0.85}
        >
          <View style={styles.insightsIcon}>
            <Text style={styles.insightsIconText}>↗</Text>
          </View>
          <View style={styles.insightsTextWrap}>
            <Text style={styles.insightsTitle}>My Personalized Insights</Text>
            <Text style={styles.insightsSubtitle}>
              View your cardiovascular risk overview
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.missionsHeader}
          onPress={goWeeklyMissions}
          activeOpacity={0.85}
        >
          <View style={styles.missionsIcon}>
            <Text style={styles.missionsIconText}>⚡</Text>
          </View>
          <View style={styles.insightsTextWrap}>
            <Text style={styles.missionsTitle}>Weekly Missions</Text>
            <Text style={styles.missionsSubtitle}>Track your health goals</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <View style={styles.missionGrid}>
          <TouchableOpacity style={styles.missionTile} onPress={goWeeklyMissions} activeOpacity={0.85}>
            <View style={styles.missionTileIcon}>
              <Text style={styles.missionEmoji}>🚶‍♀️</Text>
            </View>
            <Text style={styles.missionTileLabel}>Daily Walk</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.missionTile} onPress={goWeeklyMissions} activeOpacity={0.85}>
            <View style={styles.missionTileIcon}>
              <Text style={styles.missionEmoji}>💧</Text>
            </View>
            <Text style={styles.missionTileLabel}>Hydration</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.missionTile} onPress={goWeeklyMissions} activeOpacity={0.85}>
            <View style={styles.missionTileIcon}>
              <Text style={styles.missionEmoji}>🧘‍♀️</Text>
            </View>
            <Text style={styles.missionTileLabel}>Meditation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '500',
    color: colors.primaryText,
    textAlign: 'center',
    marginBottom: 24,
    width: '100%',
    maxWidth: 400,
  },
  heroCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.primaryText,
    textAlign: 'center',
    marginBottom: 12,
  },
  heroBody: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.secondaryText,
    textAlign: 'center',
    marginBottom: 20,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: colors.button,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
  insightsCard: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.button,
  },
  insightsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accentTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  insightsIconText: {
    fontSize: 20,
    color: colors.accent,
    fontWeight: '600',
  },
  insightsTextWrap: {
    flex: 1,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primaryText,
    marginBottom: 4,
  },
  insightsSubtitle: {
    fontSize: 13,
    color: colors.secondaryText,
  },
  chevron: {
    fontSize: 24,
    color: colors.secondaryText,
    marginLeft: 8,
  },
  missionsHeader: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.button,
  },
  missionsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.buttonTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  missionsIconText: {
    fontSize: 18,
  },
  missionsTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.primaryText,
    marginBottom: 2,
  },
  missionsSubtitle: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  missionGrid: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  missionTile: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  missionTileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.buttonTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  missionEmoji: {
    fontSize: 22,
  },
  missionTileLabel: {
    fontSize: 11,
    textAlign: 'center',
    color: colors.secondaryText,
    lineHeight: 14,
  },
});
