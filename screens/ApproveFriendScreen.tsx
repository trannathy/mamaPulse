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

type Nav = NativeStackNavigationProp<RootStackParamList, 'ApproveFriend'>;

interface FriendRequest {
  id: string;
  username: string;
  email: string;
}

export default function ApproveFriendScreen() {
  const navigation = useNavigation<Nav>();
  const [requests, setRequests] = useState<FriendRequest[]>([
    { id: '1', username: 'JennyK', email: 'jenny.k@email.com' },
    { id: '2', username: 'MichelleR', email: 'michelle.r@email.com' },
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAccept = (id: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const handleReject = (id: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Current Requests</Text>

        {requests.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No pending requests</Text>
          </View>
        ) : (
          requests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <View style={styles.requestAvatar}>
                  <Text style={styles.requestAvatarText}>👤</Text>
                </View>
                <View>
                  <Text style={styles.requestName}>{request.username}</Text>
                  <Text style={styles.requestEmail}>{request.email}</Text>
                </View>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAccept(request.id)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={() => handleReject(request.id)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.rejectButtonText}>I don&apos;t know this person</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
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
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
    color: colors.primaryText,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: colors.primaryText,
    marginBottom: 32,
  },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.secondaryText,
  },
  requestCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  requestAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accentTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestAvatarText: {
    fontSize: 20,
  },
  requestName: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.primaryText,
    marginBottom: 2,
  },
  requestEmail: {
    fontSize: 13,
    color: colors.secondaryText,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: colors.button,
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
  rejectButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: colors.rejectGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center',
  },
});
