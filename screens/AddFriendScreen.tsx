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
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AddFriend'>;

type Relationship = 'friend' | 'family' | 'other';

export default function AddFriendScreen() {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState('');
  const [memberId, setMemberId] = useState('');
  const [relationship, setRelationship] = useState<Relationship>('friend');

  const isFormValid = email.trim() !== '' && memberId.trim() !== '';

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSendRequest = () => {
    if (!isFormValid) return;
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
        <Text style={styles.title}>Add a friend</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Friend&apos;s Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="email@example.com"
            placeholderTextColor={colors.secondaryText}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Unique Member ID</Text>
          <TextInput
            style={styles.input}
            value={memberId}
            onChangeText={setMemberId}
            placeholder="MP12345"
            placeholderTextColor={colors.secondaryText}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Relationship</Text>
          {(['friend', 'family', 'other'] as Relationship[]).map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.relationshipOption,
                relationship === option && styles.relationshipOptionSelected,
              ]}
              onPress={() => setRelationship(option)}
              activeOpacity={0.85}
            >
              <View
                style={[
                  styles.radioOuter,
                  relationship === option && styles.radioOuterSelected,
                ]}
              >
                {relationship === option ? <View style={styles.radioInner} /> : null}
              </View>
              <Text
                style={[
                  styles.relationshipText,
                  relationship === option && styles.relationshipTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
          onPress={handleSendRequest}
          disabled={isFormValid === false}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>Send a Request</Text>
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
  field: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primaryText,
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    fontSize: 15,
    color: colors.primaryText,
  },
  relationshipOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    marginBottom: 12,
    gap: 12,
  },
  relationshipOptionSelected: {
    borderColor: colors.button,
    backgroundColor: colors.buttonTint,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.button,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.button,
  },
  relationshipText: {
    fontSize: 16,
    color: colors.primaryText,
    textTransform: 'capitalize',
  },
  relationshipTextSelected: {
    fontWeight: '500',
  },
  submitButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: colors.button,
    alignItems: 'center',
    marginTop: 16,
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
