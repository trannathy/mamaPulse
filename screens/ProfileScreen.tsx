import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { clearAuthStorage } from '../utils/storage';
import type { MainTabParamList, RootStackParamList } from '../navigation/AppNavigator';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Profile'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const MEMBER_ID = 'MP12345S';

export default function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const [copied, setCopied] = useState(false);

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handleCopyMemberId = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignOut = async () => {
    await clearAuthStorage();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      }),
    );
  };

  const handleEditGeneralInfo = () => {
    navigation.navigate('Complications');
  };

  const handleEditMedicalHistory = () => {
    navigation.navigate('Complications');
  };

  const handleDownloadReport = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>S</Text>
          </View>
          <TouchableOpacity style={styles.cameraButton} activeOpacity={0.85}>
            <Text style={styles.cameraIcon}>📷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.memberCard}>
          <Text style={styles.memberCardTitle}>Your Unique Member ID</Text>
          <View style={styles.memberIdRow}>
            <Text style={styles.memberId}>{MEMBER_ID}</Text>
            <TouchableOpacity
              style={[styles.copyButton, copied && styles.copyButtonActive]}
              onPress={handleCopyMemberId}
              activeOpacity={0.85}
            >
              <Text style={styles.copyIcon}>⧉</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.memberHint}>
            {copied ? 'Copied to clipboard!' : 'Share this ID with friends to connect'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={handleEditGeneralInfo}
          activeOpacity={0.85}
        >
          <Text style={styles.menuIcon}>👤</Text>
          <Text style={styles.menuLabel}>Edit General Info</Text>
          <Text style={styles.menuChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={handleEditMedicalHistory}
          activeOpacity={0.85}
        >
          <Text style={styles.menuIcon}>➕</Text>
          <Text style={styles.menuLabel}>Edit Medical History</Text>
          <Text style={styles.menuChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reportCard}
          onPress={handleDownloadReport}
          activeOpacity={0.85}
        >
          <Text style={styles.reportIcon}>📄</Text>
          <Text style={styles.reportLabel}>
            Download a report to share with your medical provider
          </Text>
          <Text style={styles.menuChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} activeOpacity={0.85}>
          <Text style={styles.signOutText}>Sign out</Text>
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
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  avatarWrap: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: 48,
    fontWeight: '500',
    color: colors.white,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '25%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 18,
  },
  memberCard: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  memberCardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primaryText,
    marginBottom: 12,
  },
  memberIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberId: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.button,
    letterSpacing: 1,
  },
  copyButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.buttonTint,
  },
  copyButtonActive: {
    backgroundColor: 'rgba(163, 177, 138, 0.2)',
  },
  copyIcon: {
    fontSize: 18,
    color: colors.button,
  },
  memberHint: {
    fontSize: 13,
    color: colors.secondaryText,
    marginTop: 12,
  },
  menuCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 16,
  },
  menuIcon: {
    fontSize: 22,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: colors.primaryText,
  },
  menuChevron: {
    fontSize: 20,
    color: colors.secondaryText,
  },
  reportCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.button,
  },
  reportIcon: {
    fontSize: 22,
  },
  reportLabel: {
    flex: 1,
    fontSize: 15,
    color: colors.primaryText,
  },
  signOutButton: {
    paddingVertical: 12,
  },
  signOutText: {
    fontSize: 15,
    color: colors.accent,
    fontWeight: '500',
  },
});
