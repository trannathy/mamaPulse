import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

export default function InsightsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Personalized Insights</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Average Blood Pressure</Text>
          <Text style={styles.statValue}>-- mmHg</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Average Heart Rate</Text>
          <Text style={styles.statValue}>-- bpm</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Average Blood Sugar</Text>
          <Text style={styles.statValue}>-- mg/dL</Text>
        </View>

        <Text style={styles.riskHeading}>Risk for Cardiovascular Disease</Text>

        <View style={styles.riskCardMuted}>
          <Text style={styles.riskLabelMuted}>Low</Text>
        </View>
        <View style={styles.riskCardActive}>
          <Text style={styles.riskLabelActive}>Medium</Text>
        </View>
        <View style={styles.riskCardMuted}>
          <Text style={styles.riskLabelMuted}>High</Text>
        </View>

        <Text style={styles.riskFootnote}>
          Based on your health history and vitals.
        </Text>
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
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.primaryText,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 15,
    color: colors.primaryText,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.button,
  },
  riskHeading: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.primaryText,
    marginTop: 12,
    marginBottom: 16,
  },
  riskCardMuted: {
    backgroundColor: colors.tabBarBg,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    opacity: 0.6,
  },
  riskLabelMuted: {
    fontSize: 15,
    color: colors.secondaryText,
  },
  riskCardActive: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  riskLabelActive: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.white,
  },
  riskFootnote: {
    fontSize: 13,
    color: colors.secondaryText,
    textAlign: 'center',
    marginTop: 8,
  },
});
