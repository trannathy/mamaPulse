import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { useEffect, useState } from 'react';

const API = 'http://127.0.0.1:8000'

export default function InsightsScreen() {
  const [bpData, setBP] = useState("--")
  const [hrData, setHR] = useState("--")
  const [bsData, setBS] = useState("--")
  const [risk, setRisk] = useState("Medium")

  useEffect(() => {
    fetch(`${API}/calculate?id=1`)
      .then(response => response.json())
      .then(data => {
        console.log('response', data);
        setBP(`${data.sBP} / ${data.dBP}`);
        setHR(data.heartRate);
        setBS(data.bloodSugar);
        setRisk(data.prediction);
      })
      .catch(error => {
        console.log('error', error)
        setBP("--");
        setHR("--");
        setBS("--");
        setRisk("Medium");
      });
  }, []);

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
          <Text style={styles.statValue}>{bpData} mmHg</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Average Heart Rate</Text>
          <Text style={styles.statValue}>{hrData} bpm</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Average Blood Sugar</Text>
          <Text style={styles.statValue}>{bsData} mg/dL</Text>
        </View>

        <Text style={styles.riskHeading}>Risk for Cardiovascular Disease</Text>

        <View style={risk == "Low" ? styles.riskCardActive : styles.riskCardMuted}>
          <Text style={risk == "Low" ? styles.riskLabelActive : styles.riskLabelMuted}>Low</Text>
        </View>
        <View style={risk == "Medium" ? styles.riskCardActive : styles.riskCardMuted}>
          <Text style={risk == "Medium" ? styles.riskLabelActive : styles.riskLabelMuted}>Medium</Text>
        </View>
        <View style={risk == "High" ? styles.riskCardActive : styles.riskCardMuted}>
          <Text style={risk == "High" ? styles.riskLabelActive : styles.riskLabelMuted}>High</Text>
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
