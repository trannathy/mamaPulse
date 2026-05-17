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
import { useEffect, useState } from 'react';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Community'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const API = 'http://127.0.0.1:8000'

const FRIEND_PHOTOS = [
  { name: 'Emma S', initials: 'ES', task: 'Daily Walk', emoji: '🚶‍♀️', time: '2h ago' },
  { name: 'Sarah L', initials: 'SL', task: 'Hydration', emoji: '💧', time: '5h ago' },
];

function rankColor(rank: number): string {
  if (rank === 1) return colors.gold;
  if (rank === 2) return colors.silver;
  if (rank === 3) return colors.bronze;
  return colors.secondaryText;
}

export default function CommunityScreen() {
  const navigation = useNavigation<Nav>();

  const [friends, setFriends] = useState<any[] | null>(null);
  const [leaderboard, setLeaderboard] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [friendsRes, leaderboardRes] = await Promise.all([
          fetch(`${API}/friends?id=1`),
          fetch(`${API}/leaderboard?id=1`),
        ]);

        if (!friendsRes.ok || !leaderboardRes.ok) throw new Error('Request failed');

        const [friendsJson, leaderboardJson] = await Promise.all([
          friendsRes.json(),
          leaderboardRes.json(),
        ]);

        setFriends(friendsJson);
        setLeaderboard(leaderboardJson);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const goAddFriend = () => {
    navigation.navigate('AddFriend');
  };

  const goApproveFriend = () => {
    navigation.navigate('ApproveFriend');
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <TouchableOpacity onPress={goAddFriend} style={styles.addButton} activeOpacity={0.85}>
          <Text style={styles.addButtonText}>+ Friend</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your community</Text>

        <View style={styles.friendsRow}>
          {friends.map((friend) => (
            <View key={friend.name} style={styles.friendItem}>
              <View style={styles.friendAvatar}>
                <Text style={styles.friendInitials}>{friend.initials}</Text>
              </View>
              <Text style={styles.friendName}>{friend.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Friends Photos</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.photosRow}
        >
          {FRIEND_PHOTOS.map((photo) => (
            <View key={`${photo.name}-${photo.time}`} style={styles.photoCard}>
              <View style={styles.photoPlaceholder}>
                <View style={styles.photoCameraCircle}>
                  <Text style={styles.photoCameraIcon}>📷</Text>
                </View>
                <Text style={styles.photoEmoji}>{photo.emoji}</Text>
              </View>
              <View style={styles.photoInfo}>
                <View style={styles.photoUserRow}>
                  <View style={styles.photoSmallAvatar}>
                    <Text style={styles.photoSmallInitials}>{photo.initials}</Text>
                  </View>
                  <Text style={styles.photoUserName}>{photo.name}</Text>
                </View>
                <Text style={styles.photoTask}>{photo.task}</Text>
                <Text style={styles.photoTime}>{photo.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Leaderboard</Text>
        <View style={styles.leaderboardCard}>
          {leaderboard.map((entry, index) => (
            <View
              key={entry.rank}
              style={[
                styles.leaderboardRow,
                entry.name === 'You' && styles.leaderboardRowHighlight,
                index < leaderboard.length - 1 && styles.leaderboardRowBorder,
              ]}
            >
              <View style={styles.leaderboardLeft}>
                <Text style={[styles.rankText, { color: rankColor(entry.rank) }]}>
                  {entry.rank}
                </Text>
                <Text
                  style={[
                    styles.leaderboardName,
                    entry.name === 'You' && styles.leaderboardNameBold,
                  ]}
                >
                  {entry.name}
                </Text>
              </View>
              <Text style={styles.leaderboardPoints}>
                {entry.points.toLocaleString()} pts
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Pending Requests</Text>
        <TouchableOpacity
          style={styles.pendingCard}
          onPress={goApproveFriend}
          activeOpacity={0.85}
        >
          <View style={styles.pendingIcon}>
            <Text style={styles.pendingIconText}>👤</Text>
          </View>
          <View style={styles.pendingTextWrap}>
            <Text style={styles.pendingTitle}>Outstanding Requests</Text>
            <Text style={styles.pendingSubtitle}>2 pending</Text>
          </View>
          <Text style={styles.chevron}>→</Text>
        </TouchableOpacity>
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
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerSpacer: {
    flex: 1,
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primaryText,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: colors.primaryText,
    marginBottom: 16,
  },
  friendsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 24,
  },
  friendItem: {
    alignItems: 'center',
  },
  friendAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  friendInitials: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  friendName: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.primaryText,
    marginBottom: 16,
  },
  photosRow: {
    paddingBottom: 8,
    gap: 12,
    marginBottom: 24,
  },
  photoCard: {
    width: 160,
    borderRadius: 16,
    backgroundColor: colors.card,
    overflow: 'hidden',
  },
  photoPlaceholder: {
    height: 128,
    backgroundColor: colors.buttonTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCameraCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(163, 177, 138, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCameraIcon: {
    fontSize: 24,
  },
  photoEmoji: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 22,
  },
  photoInfo: {
    padding: 12,
  },
  photoUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  photoSmallAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoSmallInitials: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.white,
  },
  photoUserName: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.primaryText,
  },
  photoTask: {
    fontSize: 12,
    color: colors.secondaryText,
    marginBottom: 2,
  },
  photoTime: {
    fontSize: 11,
    color: colors.secondaryText,
  },
  leaderboardCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  leaderboardRowHighlight: {
    backgroundColor: colors.buttonTint,
  },
  leaderboardRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leaderboardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rankText: {
    fontSize: 18,
    fontWeight: '600',
    width: 24,
  },
  leaderboardName: {
    fontSize: 16,
    color: colors.primaryText,
  },
  leaderboardNameBold: {
    fontWeight: '600',
  },
  leaderboardPoints: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.button,
  },
  pendingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
  },
  pendingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accentTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  pendingIconText: {
    fontSize: 18,
  },
  pendingTextWrap: {
    flex: 1,
  },
  pendingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primaryText,
    marginBottom: 2,
  },
  pendingSubtitle: {
    fontSize: 13,
    color: colors.secondaryText,
  },
  chevron: {
    fontSize: 18,
    color: colors.secondaryText,
  },
});
