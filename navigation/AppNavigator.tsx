import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../constants/colors';
import LoginScreen from '../screens/LoginScreen';
import ComplicationsScreen from '../screens/ComplicationsScreen';
import DashboardScreen from '../screens/DashboardScreen';
import InsightsScreen from '../screens/InsightsScreen';
import CommunityScreen from '../screens/CommunityScreen';
import WeeklyMissionsScreen from '../screens/WeeklyMissionsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddFriendScreen from '../screens/AddFriendScreen';
import ApproveFriendScreen from '../screens/ApproveFriendScreen';
import LogVitalsScreen from '../screens/LogVitalsScreen';

export type RootStackParamList = {
  Login: undefined;
  Complications: undefined;
  MainTabs: undefined;
  Insights: undefined;
  LogVitals: undefined;
  WeeklyMissions: undefined;
  AddFriend: undefined;
  ApproveFriend: undefined;
};

export type MainTabParamList = {
  Community: undefined;
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.button,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: 'Community',
          tabBarActiveTintColor: colors.tabActiveCommunity,
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIconWrap}>
              <View style={[styles.tabIconPeople, { borderColor: color }]}>
                <View style={[styles.tabIconPerson, { backgroundColor: color }]} />
                <View style={[styles.tabIconPerson, styles.tabIconPersonRight, { backgroundColor: color }]} />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIconWrap}>
              <View style={[styles.tabIcon, { borderColor: color }]}>
                <View style={[styles.tabIconRoof, { backgroundColor: color }]} />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarActiveTintColor: colors.tabActiveCommunity,
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIconWrap}>
              <View style={styles.tabIconProfile}>
                <View style={[styles.tabIconProfileHead, { backgroundColor: color }]} />
                <View style={[styles.tabIconProfileBody, { borderColor: color }]} />
              </View>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Complications" component={ComplicationsScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Insights" component={InsightsScreen} />
        <Stack.Screen name="LogVitals" component={LogVitalsScreen} />
        <Stack.Screen name="WeeklyMissions" component={WeeklyMissionsScreen} />
        <Stack.Screen name="AddFriend" component={AddFriendScreen} />
        <Stack.Screen name="ApproveFriend" component={ApproveFriendScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBarBg,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 80,
    paddingBottom: 12,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabIconWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 20,
    height: 16,
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    alignItems: 'center',
  },
  tabIconRoof: {
    position: 'absolute',
    top: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    backgroundColor: 'transparent',
  },
  tabIconPeople: {
    width: 22,
    height: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  tabIconPerson: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 1,
  },
  tabIconPersonRight: {
    marginTop: 4,
  },
  tabIconProfile: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconProfileHead: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginBottom: 2,
  },
  tabIconProfileBody: {
    width: 18,
    height: 9,
    borderWidth: 2,
    borderRadius: 9,
  },
});
