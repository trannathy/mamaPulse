import React, { useEffect, useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import type { RootStackParamList } from '../navigation/AppNavigator';
import {
  getProfileData,
  isBooleanFalse,
  isBooleanTrue,
  isSetBoolean,
  setOnboardingComplete,
  setProfileData,
  type ProfileData,
} from '../utils/storage';
import { supabase } from '../lib/supabase';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Complications'>;

const RACE_OPTIONS = [
  'White',
  'Black or African American',
  'Hispanic or Latino',
  'Asian',
  'Native American or Alaska Native',
  'Native Hawaiian or Pacific Islander',
  'Other',
  'Prefer not to say',
];

const CANCER_TYPE_OPTIONS = [
  'Lung cancer',
  'Oral cancer',
  'Blood cancer (leukemia or lymphoma)',
  'Brain cancer',
  'Other',
];

function YesNoCards({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.yesNoRow}>
      <TouchableOpacity
        style={[styles.yesNoCard, isBooleanTrue(value) && styles.yesNoCardSelected]}
        onPress={() => onChange(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.yesNoText}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.yesNoCard, isBooleanFalse(value) && styles.yesNoCardSelected]}
        onPress={() => onChange(false)}
        activeOpacity={0.85}
      >
        <Text style={styles.yesNoText}>No</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ComplicationsScreen() {

  // THE FOLLOWING FUNCTION FILLS IN THE PATIENT DATA INTO THE PATIENT TABLE. HOWEVER, REQUIRES A GLOBAL VARIABLE TO RUN, AND IS THIS COMMENTED OUT

  // async function makePatient(dob: string,
  //                           smokingStatus: boolean,
  //                           raceEthnicity: boolean,
  //                           diabetes: boolean,
  //                           artialFib: boolean,
  //                           renalFailure: boolean,
  //                           migraines: boolean,
  //                           corticosteroid: boolean,
  //                           lupus: boolean,
  //                           cancer: boolean,
  //                           cancerTypes: string[]) {
       
  
  //       try {
  
  //         const currentID = 0  //replace with updating global variable

  //         const { error } = await supabase.from('loginDetails').insert({
  //           id: currentID,
  //           dob: dob.toISOString().split('T')[0],   // need to change to input as a date
  //           smokingStatus: smokingStatus,
  //           raceEthnicity: raceEthnicity,
  //           diabetes: diabetes,
  //           artialFib: artialFib,
  //           renalFailure: renalFailure,
  //           migraines: migraines,
  //           corticosteroid: corticosteroid,
  //           lupus: lupus,
  //           cancer: cancer,
  //           cancerTypes: cancerTypes
  //       })
    
  //       } catch (error) {
  //         console.error(error);
  //       }
  
  
    // }

  const navigation = useNavigation<Nav>();
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [smokingStatus, setSmokingStatus] = useState<boolean | null>(null);
  const [raceEthnicity, setRaceEthnicity] = useState('');
  const [diabetes, setDiabetes] = useState<boolean | null>(null);
  const [atrialFib, setAtrialFib] = useState<boolean | null>(null);
  const [renalFailure, setRenalFailure] = useState<boolean | null>(null);
  const [migraines, setMigraines] = useState<boolean | null>(null);
  const [corticosteroid, setCorticosteroid] = useState<boolean | null>(null);
  const [lupus, setLupus] = useState<boolean | null>(null);
  const [copd, setCopd] = useState<boolean | null>(null);
  const [cancer, setCancer] = useState<boolean | null>(null);
  const [cancerTypes, setCancerTypes] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    const hydrateProfile = async () => {
      const saved = await getProfileData();
      if (cancelled || !saved) {
        return;
      }

      setDateOfBirth(saved.dateOfBirth);
      setSmokingStatus(saved.smokingStatus);
      setRaceEthnicity(saved.raceEthnicity);
      setDiabetes(saved.diabetes);
      setAtrialFib(saved.atrialFib);
      setRenalFailure(saved.renalFailure);
      setMigraines(saved.migraines);
      setCorticosteroid(saved.corticosteroid);
      setLupus(saved.lupus);
      setCopd(saved.copd);
      setCancer(saved.cancer);
      setCancerTypes(saved.cancerTypes);
    };

    hydrateProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleCancerType = (type: string) => {
    setCancerTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const isFormValid =
    dateOfBirth.trim() !== '' &&
    isSetBoolean(smokingStatus) &&
    raceEthnicity !== '' &&
    isSetBoolean(diabetes) &&
    isSetBoolean(atrialFib) &&
    isSetBoolean(renalFailure) &&
    isSetBoolean(migraines) &&
    isSetBoolean(corticosteroid) &&
    isSetBoolean(lupus) &&
    isSetBoolean(copd) &&
    isSetBoolean(cancer) &&
    (isBooleanFalse(cancer) && cancerTypes.length > 0);

  const handleSubmit = async () => {
    
    setDateOfBirth
    setSmokingStatus
    setRaceEthnicity
    setDiabetes
    setAtrialFib
    setRenalFailure
    setMigraines
    setCorticosteroid
    setLupus
    setCopd
    setCancer
    setCancerTypes

    const profileData: ProfileData = {
      dateOfBirth,
      smokingStatus,
      raceEthnicity,
      diabetes,
      atrialFib,
      renalFailure,
      migraines,
      corticosteroid,
      lupus,
      copd,
      cancer,
      cancerTypes,
    };

    await setOnboardingComplete(true);
    await setProfileData(profileData);
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Health Profile</Text>
        <Text style={styles.disclaimer}>
          *Your information is used to provide a more accurate picture of your health journey. Only
          healthcare providers and users you select will have access.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.secondaryText}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Do you smoke or have you ever smoked?</Text>
          <YesNoCards value={smokingStatus} onChange={setSmokingStatus} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Race/Ethnicity</Text>
          {RACE_OPTIONS.map((option) => {
            const isSelected = raceEthnicity === option;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                onPress={() => setRaceEthnicity(option)}
                activeOpacity={0.85}
              >
                <Text style={styles.optionText}>{option}</Text>
                {isSelected ? <Text style={styles.checkMark}>✓</Text> : null}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Have you been diagnosed with diabetes?</Text>
          <YesNoCards value={diabetes} onChange={setDiabetes} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Have you been diagnosed with atrial fibrillation?</Text>
          <YesNoCards value={atrialFib} onChange={setAtrialFib} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Have you ever experienced kidney (renal) failure?</Text>
          <YesNoCards value={renalFailure} onChange={setRenalFailure} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Do you experience migraines?</Text>
          <YesNoCards value={migraines} onChange={setMigraines} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Have you taken corticosteroids?</Text>
          <Text style={styles.helperText}>
            Such as prednisone, cortisone, or similar prescription anti-inflammatory medications.
          </Text>
          <YesNoCards value={corticosteroid} onChange={setCorticosteroid} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Have you been diagnosed with systemic lupus?</Text>
          <YesNoCards value={lupus} onChange={setLupus} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Have you been diagnosed with COPD or chronic lung disease?
          </Text>
          <YesNoCards value={copd} onChange={setCopd} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Have you ever been diagnosed with cancer?</Text>
          <YesNoCards value={cancer} onChange={setCancer} />
          {isBooleanTrue(cancer) && (
            <View style={styles.cancerTypes}>
              <Text style={styles.helperText}>Select all that apply:</Text>
              {CANCER_TYPE_OPTIONS.map((type) => {
                const isSelected = cancerTypes.includes(type);
                return (
                  <TouchableOpacity
                    key={type}
                    style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                    onPress={() => toggleCancerType(type)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.optionText}>{type}</Text>
                    {isSelected ? <Text style={styles.checkMark}>✓</Text> : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isFormValid === false}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitButton]}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>Fill Out Later</Text>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.primaryText,
    textAlign: 'center',
    marginBottom: 16,
  },
  disclaimer: {
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.secondaryText,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.primaryText,
    marginBottom: 12,
  },
  helperText: {
    fontSize: 14,
    color: colors.secondaryText,
    lineHeight: 22,
    marginBottom: 12,
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: colors.secondaryText,
    backgroundColor: colors.card,
    color: colors.primaryText,
    fontSize: 15,
  },
  yesNoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  yesNoCard: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: colors.secondaryText,
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  yesNoCardSelected: {
    borderColor: colors.button,
    backgroundColor: colors.buttonTint,
  },
  yesNoText: {
    fontSize: 16,
    color: colors.primaryText,
    fontWeight: '500',
  },
  optionRow: {
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: colors.secondaryText,
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  optionRowSelected: {
    borderColor: colors.button,
    backgroundColor: colors.buttonTint,
  },
  optionText: {
    fontSize: 15,
    color: colors.primaryText,
    flex: 1,
  },
  checkMark: {
    fontSize: 18,
    color: colors.accent,
    fontWeight: '600',
  },
  cancerTypes: {
    marginTop: 12,
  },
  submitButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: colors.button,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  submitButtonDisabled: {
    backgroundColor: colors.disabledButton,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
});
