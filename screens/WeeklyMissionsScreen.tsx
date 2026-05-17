import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'WeeklyMissions'>;

interface Mission {
  id: number;
  emoji: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function WeeklyMissionsScreen() {
  const navigation = useNavigation<Nav>();
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      emoji: '🚶‍♀️',
      title: 'Daily Walk',
      description: 'Upload a picture to complete!',
      completed: false,
    },
    {
      id: 2,
      emoji: '💧',
      title: 'Hydration',
      description: 'Upload a picture to complete!',
      completed: false,
    },
    {
      id: 3,
      emoji: '🧘‍♀️',
      title: 'Meditation',
      description: 'Upload a picture to complete!',
      completed: false,
    },
  ]);

  const completedCount = missions.filter((m) => m.completed).length;
  const totalMissionsCompleted = 47;
  const totalPoints = 2180;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleUploadPhoto = (missionId: number) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, completed: true } : m)),
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weekly Missions</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.badgeWrap}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {completedCount}/{missions.length} Missions Complete This Week
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalMissionsCompleted}</Text>
            <Text style={styles.statLabel}>Total Missions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, styles.statNumberAccent]}>
              {totalPoints.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
        </View>

        {missions.map((mission) => (
          <View key={mission.id} style={styles.missionCard}>
            <View style={styles.missionRow}>
              <View style={styles.missionEmojiBox}>
                <Text style={styles.missionEmoji}>{mission.emoji}</Text>
              </View>
              <View style={styles.missionContent}>
                <Text style={styles.missionTitle}>{mission.title}</Text>
                <Text style={styles.missionDescription}>{mission.description}</Text>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={() => handleUploadPhoto(mission.id)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.uploadButtonText}>📷 Upload Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <Text style={styles.recentTitle}>Recently Completed</Text>
        <View style={styles.recentGrid}>
          {[1, 2, 3].map((index) => (
            <View key={index} style={styles.recentPlaceholder}>
              <Text style={styles.recentPlaceholderIcon}>📷</Text>
            </View>
          ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: colors.primaryText,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.primaryText,
  },
  headerSpacer: {
    width: 40,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  badgeWrap: {
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: colors.buttonTint,
  },
  badgeText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.button,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.button,
    marginBottom: 4,
  },
  statNumberAccent: {
    color: colors.accent,
  },
  statLabel: {
    fontSize: 12,
    color: colors.secondaryText,
    textAlign: 'center',
  },
  missionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  missionRow: {
    flexDirection: 'row',
    gap: 16,
  },
  missionEmojiBox: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: colors.buttonTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missionEmoji: {
    fontSize: 40,
  },
  missionContent: {
    flex: 1,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primaryText,
    marginBottom: 4,
  },
  missionDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.secondaryText,
    marginBottom: 12,
  },
  uploadButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.button,
  },
  uploadButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.white,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primaryText,
    marginTop: 16,
    marginBottom: 12,
  },
  recentGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  recentPlaceholder: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.secondaryText,
    backgroundColor: colors.accentTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentPlaceholderIcon: {
    fontSize: 24,
    color: colors.secondaryText,
  },
});
