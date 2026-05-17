import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  onboardingComplete: 'onboardingComplete',
  profileData: 'profileData',
} as const;

export type ProfileData = {
  dateOfBirth: string;
  smokingStatus: boolean | null;
  raceEthnicity: string;
  diabetes: boolean | null;
  atrialFib: boolean | null;
  renalFailure: boolean | null;
  migraines: boolean | null;
  corticosteroid: boolean | null;
  lupus: boolean | null;
  copd: boolean | null;
  cancer: boolean | null;
  cancerTypes: string[];
};

/** Coerce AsyncStorage / JSON values to a real boolean or null. */
export function parseStoredBoolean(value: string | null): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  try {
    const parsed: unknown = JSON.parse(value);
    if (typeof parsed === 'boolean') {
      return parsed;
    }
  } catch {
    // Legacy plain-string values ("true" / "false")
  }
  return value === 'true';
}

/** Normalize unknown JSON fields to boolean | null. */
export function coerceBoolean(value: unknown): boolean | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    if (value === 'true') return true;
    if (value === 'false') return false;
  }
  return null;
}

export function coerceProfileData(raw: unknown): ProfileData | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  const data = raw as Record<string, unknown>;
  const cancerTypes = Array.isArray(data.cancerTypes)
    ? data.cancerTypes.filter((t): t is string => typeof t === 'string')
    : [];

  return {
    dateOfBirth: typeof data.dateOfBirth === 'string' ? data.dateOfBirth : '',
    smokingStatus: coerceBoolean(data.smokingStatus),
    raceEthnicity: typeof data.raceEthnicity === 'string' ? data.raceEthnicity : '',
    diabetes: coerceBoolean(data.diabetes),
    atrialFib: coerceBoolean(data.atrialFib),
    renalFailure: coerceBoolean(data.renalFailure),
    migraines: coerceBoolean(data.migraines),
    corticosteroid: coerceBoolean(data.corticosteroid),
    lupus: coerceBoolean(data.lupus),
    copd: coerceBoolean(data.copd),
    cancer: coerceBoolean(data.cancer),
    cancerTypes,
  };
}

export async function getOnboardingComplete(): Promise<boolean> {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.onboardingComplete);
  return parseStoredBoolean(value);
}

export async function setOnboardingComplete(complete: boolean): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.onboardingComplete, JSON.stringify(complete));
}

export async function getProfileData(): Promise<ProfileData | null> {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.profileData);
  if (!value) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(value);
    return coerceProfileData(parsed);
  } catch {
    return null;
  }
}

export async function setProfileData(data: ProfileData): Promise<void> {
  const normalized: ProfileData = {
    dateOfBirth: data.dateOfBirth,
    smokingStatus: coerceBoolean(data.smokingStatus),
    raceEthnicity: data.raceEthnicity,
    diabetes: coerceBoolean(data.diabetes),
    atrialFib: coerceBoolean(data.atrialFib),
    renalFailure: coerceBoolean(data.renalFailure),
    migraines: coerceBoolean(data.migraines),
    corticosteroid: coerceBoolean(data.corticosteroid),
    lupus: coerceBoolean(data.lupus),
    copd: coerceBoolean(data.copd),
    cancer: coerceBoolean(data.cancer),
    cancerTypes: data.cancerTypes,
  };
  await AsyncStorage.setItem(STORAGE_KEYS.profileData, JSON.stringify(normalized));
}

export async function clearAuthStorage(): Promise<void> {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.onboardingComplete,
    STORAGE_KEYS.profileData,
  ]);
}

/** Use when comparing yes/no state that may have been loaded from storage. */
export function isBooleanTrue(value: unknown): boolean {
  return value === true;
}

export function isBooleanFalse(value: unknown): boolean {
  return value === false;
}

export function isSetBoolean(value: boolean | null): value is boolean {
  return typeof value === 'boolean';
}
