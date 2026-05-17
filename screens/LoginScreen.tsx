import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { supabase } from '../lib/supabase';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type Mode = 'welcome' | 'signup';



export default function LoginScreen()  {

  async function makeAccount(first: string, last: string, email: string, password: string) {
     

      try {
        const { data } = await supabase.from('loginDetails').select('*'); 
        
        const newID = data.length + 1;

        const { error } = await supabase.from('loginDetails').insert({
          firstName: first,
          lastName: last,
          email: email,
          password: password,
          id: newID
        })
  
      } catch (error) {
        console.error(error);
      }


  }

  const navigation = useNavigation<Nav>();
  const [mode, setMode] = useState<Mode>('welcome');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goToMainTabs = () => {
    navigation.navigate('MainTabs');
  };

  const goToSignUp = () => {
    setMode('signup');
  };

  const submitSignUp = () => {

    try {
      setFirstName;
      setLastName;
      setEmail;
      setPassword;

      let allow_through = false;
      makeAccount(firstName, lastName, email, password);
      navigation.navigate('Complications');
      
    }
    catch (error) {
      console.error(error)
    }
  };

  const isSignUpValid =
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    email.trim() !== '' &&
    password.trim() !== '';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {mode === 'welcome' ? (
          <View style={styles.center}>
            <Text style={styles.title}>MamaPulse</Text>

            <View style={styles.logoPlaceholder} />

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={goToMainTabs}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={goToSignUp}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setMode('welcome')}
              activeOpacity={0.7}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.formTitle}>Sign Up</Text>

            <View style={styles.formCard}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter your first name"
                placeholderTextColor={colors.secondaryText}
              />

              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter your last name"
                placeholderTextColor={colors.secondaryText}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={colors.secondaryText}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={colors.secondaryText}
                secureTextEntry={true}
              />

              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  styles.submitButton,
                  !isSignUpValid && styles.disabledButton,
                ]}
                onPress={submitSignUp}
                disabled={isSignUpValid === false}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  center: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: 48,
    textAlign: 'center',
  },
  logoPlaceholder: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: colors.button,
    marginBottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 310,
    gap: 16,
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
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 28,
    color: colors.primaryText,
  },
  formTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primaryText,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.primaryText,
    backgroundColor: colors.card,
    marginBottom: 18,
  },
  submitButton: {
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: colors.disabledButton,
  },
});
