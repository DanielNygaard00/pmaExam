// Imports
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from "react-native"

// Screens
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LogScreen from './screens/LogScreen';
import HistoryScreen from './screens/HistoryScreen';
import LogEntryDetailScreen from './screens/LogEntryDetailScreen';

// Importing the Onboarding Screens
import OnboardingOne from './screens/onboarding/OnboardingOne';
import OnboardingTwo from './screens/onboarding/OnboardingTwo';
import OnboardingThree from './screens/onboarding/OnboardingThree';

// Tab navigator
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();

function HomeStackScreen({ profileName, logEntries }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMain"
        options={{ title: 'Home', headerShown: false }}
      >
        {() => <HomeScreen profileName={profileName} />}
      </HomeStack.Screen>

      <HomeStack.Screen
        name="History"
        options={{
          title: 'Activity History',
          headerShown: true,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
        
      >
                {() => <HistoryScreen logEntries={logEntries} />}
      </HomeStack.Screen>

      <HomeStack.Screen
        name="LogEntryDetail"
        component={LogEntryDetailScreen}
        options={{ title: 'Entry Detail', headerShown: true }}
      />
    </HomeStack.Navigator>
  );
}

function MainTabs({ profileName, setProfileName, logEntries, addLogEntry }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#B3541E',
        tabBarInactiveTintColor: '#5A5A5A',
        tabBarStyle: {
              backgroundColor: '#F7F3EB',
            },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >

      {/* HOME TAB */}
      <Tab.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarAccessibilityLabel: 'Home tab',
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>🏠</Text>,
        }}
      >
        {() => (
          <HomeStackScreen
            profileName={profileName}
            logEntries={logEntries}
          />
        )}

      </Tab.Screen>

      {/* LOG TAB */}
      <Tab.Screen
        name="Log"
        options={{
          title: 'Activity Log',
          tabBarAccessibilityLabel: 'Activity log tab',
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>➕</Text>
        }}
      >
        {() => (
          <LogScreen
            addLogEntry={addLogEntry}
            profileName={profileName}
          />
        )}
      </Tab.Screen>

      {/* PROFILE TAB */}
      <Tab.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarAccessibilityLabel: 'Profile tab',
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>👤</Text>
        }}
      >
        {() => (
          <ProfileScreen
            profileName={profileName}
            setProfileName={setProfileName}
          />
        )}
      </Tab.Screen>

    </Tab.Navigator>
  );
}

export default function App() {
  const [profileName, setProfileName] = useState("");
  const [logEntries, setLogEntries] = useState([{
      personName: "User",
      amount: 0,
      notes: "Initial entry",
    }]);

  const addLogEntry = (entry) => {
    setLogEntries((prevEntries) => [entry, ...prevEntries]);
  };

  return (
    <NavigationContainer>
    <OnboardingStack.Navigator
      initialRouteName="OnboardingOne"
      screenOptions={{ headerShown: false }}
    >
      <OnboardingStack.Screen name="OnboardingOne" component={OnboardingOne} />
      <OnboardingStack.Screen name="OnboardingTwo" component={OnboardingTwo} />
      <OnboardingStack.Screen name="OnboardingThree" component={OnboardingThree} />

      <OnboardingStack.Screen name="MainTabs">
        {() => (
          <MainTabs
            profileName={profileName}
            setProfileName={setProfileName}
            logEntries={logEntries}
            addLogEntry={addLogEntry}
          />
        )}
      </OnboardingStack.Screen>
    </OnboardingStack.Navigator>
  </NavigationContainer>
  );
}
