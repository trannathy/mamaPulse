import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../constants/colors';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'LogVitals'>;
type CardType = 'bloodPressure' | 'heartRate' | 'bloodSugar' | null;
type TimeOfDay = 'morning' | 'noon' | 'evening';

export default function LogVitalsScreen() {
  const navigation = useNavigation<Nav>();
  const [expandedCard, setExpandedCard] = useState<CardType>(null);
  const [bpTimeOfDay, setBpTimeOfDay] = useState<TimeOfDay>('morning');
  const [hrTimeOfDay, setHrTimeOfDay] = useState<TimeOfDay>('morning');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [bpm, setBpm] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');

  const toggleCard = (card: CardType) => {
    setExpandedCard((current) => (current === card ? null : card));
  };

  const handleSave = () => {
    setExpandedCard(null);
    navigation.goBack();
  };

  const renderTimeToggle = (
    selected: TimeOfDay,
    onSelect: (time: TimeOfDay) => void,
  ) => (
    <View style={styles.toggleRow}>
      {(['morning', 'noon', 'evening'] as TimeOfDay[]).map((time) => {
        const isSelected = selected === time;
        return (
          <TouchableOpacity
            key={time}
            style={[styles.toggleButton, isSelected && styles.toggleButtonActive]}
            onPress={() => onSelect(time)}
            activeOpacity={0.85}
          >
            <Text style={[styles.toggleText, isSelected && styles.toggleTextActive]}>
              {time}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderCardHeader = (card: Exclude<CardType, null>, title: string) => {
    const isExpanded = expandedCard === card;
    return (
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => toggleCard(card)}
        activeOpacity={0.85}
      >
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={[styles.chevron, isExpanded && styles.chevronExpanded]}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Log Your Activity</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {renderCardHeader('bloodPressure', 'Blood Pressure')}
          {expandedCard === 'bloodPressure' && (
            <View style={styles.cardBody}>
              <Text style={styles.label}>Time of Day</Text>
              {renderTimeToggle(bpTimeOfDay, setBpTimeOfDay)}
              <View style={styles.inputRow}>
                <View style={styles.inputHalf}>
                  <Text style={styles.label}>Systolic</Text>
                  <TextInput
                    style={styles.input}
                    value={systolic}
                    onChangeText={setSystolic}
                    placeholder="120"
                    placeholderTextColor={colors.secondaryText}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.inputHalf}>
                  <Text style={styles.label}>Diastolic</Text>
                  <TextInput
                    style={styles.input}
                    value={diastolic}
                    onChangeText={setDiastolic}
                    placeholder="80"
                    placeholderTextColor={colors.secondaryText}
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={styles.card}>
          {renderCardHeader('heartRate', 'Resting Heart Rate')}
          {expandedCard === 'heartRate' && (
            <View style={styles.cardBody}>
              <Text style={styles.label}>Time of Day</Text>
              {renderTimeToggle(hrTimeOfDay, setHrTimeOfDay)}
              <Text style={styles.label}>Beats per minute</Text>
              <TextInput
                style={styles.input}
                value={bpm}
                onChangeText={setBpm}
                placeholder="72"
                placeholderTextColor={colors.secondaryText}
                keyboardType="number-pad"
              />
            </View>
          )}
        </View>

        <View style={styles.card}>
          {renderCardHeader('bloodSugar', 'Blood Sugar')}
          {expandedCard === 'bloodSugar' && (
            <View style={styles.cardBody}>
              <Text style={styles.label}>mg/dL</Text>
              <TextInput
                style={styles.input}
                value={bloodSugar}
                onChangeText={setBloodSugar}
                placeholder="100"
                placeholderTextColor={colors.secondaryText}
                keyboardType="number-pad"
              />
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F1E8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 28,
    color: '#344E41',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#344E41',
  },
  headerSpacer: {
    width: 44,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 120,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    minHeight: 68,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#344E41',
  },
  chevron: {
    fontSize: 30,
    color: colors.secondaryText,
    transform: [{ rotate: '0deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  cardBody: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#344E41',
    marginBottom: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F5F1E8',
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#A3B18A',
  },
  toggleText: {
    fontSize: 14,
    color: colors.secondaryText,
    textTransform: 'capitalize',
  },
  toggleTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#344E41',
    backgroundColor: colors.card,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 34,
    backgroundColor: '#F5F1E8',
  },
  saveButton: {
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: '#A3B18A',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
