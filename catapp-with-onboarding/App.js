// Imports
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from "react-native"

// Screens
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SourdoughScreen from './screens/SourdoughScreen';
import RecipesScreen from './screens/RecipesScreen';
import TodoScreen from './screens/TodoScreen';
import HistoryScreen from './screens/HistoryScreen';
import LogEntryDetailScreen from './screens/LogEntryDetailScreen';

// Importing the Onboarding Screens
import OnboardingOne from './screens/onboarding/OnboardingOne';
import OnboardingTwo from './screens/onboarding/OnboardingTwo';
import OnboardingThree from './screens/onboarding/OnboardingThree';

// Tab navigator
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const RecipesStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();

function RecipesStackScreen() {
  return (
    <RecipesStack.Navigator screenOptions={{ headerShown: false }}>
      <RecipesStack.Screen name="RecipesMain" component={RecipesScreen} />
      <RecipesStack.Screen name="Todo" component={TodoScreen} />
    </RecipesStack.Navigator>
  );
}

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
          title: 'Baking History',
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
        options={{ title: 'Log Details', headerShown: true }}
      />
    </HomeStack.Navigator>
  );
}

function MainTabs({ profileName, setProfileName, username, setUsername, experienceLevel, setExperienceLevel, friends, setFriends, logEntries, addLogEntry }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3C2F2F', // Darker brown from design
        tabBarInactiveTintColor: '#8B7E74', // Lighter tan/grey from design
        tabBarStyle: {
          backgroundColor: '#F1ECE0',
          borderTopWidth: 1,
          borderTopColor: '#8B7E74',
          height: 85,
          paddingTop: 10,
        },
        tabBarLabelStyle: { 
          fontSize: 16,
          fontWeight: '700',
          marginTop: 10,
        },
        tabBarIconStyle: { display: 'none' }, // Completely hide icon space
      }}
    >

      {/* HOME TAB */}
      <Tab.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarAccessibilityLabel: 'Home tab',
        }}
      >
        {() => (
          <HomeStackScreen
            profileName={profileName}
            logEntries={logEntries}
          />
        )}

      </Tab.Screen>

      {/* SOURDOUGH TAB */}
      <Tab.Screen
        name="Sourdough"
        options={{
          title: 'Sourdough',
          tabBarAccessibilityLabel: 'Sourdough tracking tab',
        }}
      >
        {() => (
          <SourdoughScreen
            addLogEntry={addLogEntry}
            profileName={profileName}
          />
        )}
      </Tab.Screen>

      {/* RECIPES TAB */}
      <Tab.Screen
        name="Recipes"
        component={RecipesStackScreen}
        options={{
          title: 'Recipes',
          tabBarAccessibilityLabel: 'Sourdough recipes tab',
        }}
      />

      {/* PROFILE TAB */}
      <Tab.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarAccessibilityLabel: 'Profile tab',
        }}
      >
        {() => (
          <ProfileScreen
            profileName={profileName}
            setProfileName={setProfileName}
            username={username}
            setUsername={setUsername}
            experienceLevel={experienceLevel}
            setExperienceLevel={setExperienceLevel}
            friends={friends}
            setFriends={setFriends}
          />
        )}
      </Tab.Screen>

    </Tab.Navigator>
  );
}

export default function App() {
  const [profileName, setProfileName] = useState("");
  const [username, setUsername] = useState("");
  const [experienceLevel, setExperienceLevel] = useState(null);
  const [friends, setFriends] = useState([
    { id: '1', username: 'AliceBaker', status: 'not_added' },
    { id: '2', username: 'SourdoughSam', status: 'not_added' },
    { id: '3', username: 'CrustyChris', status: 'not_added' },
    { id: '4', username: 'DoughJoe', status: 'not_added' },
  ]);
  const [logEntries, setLogEntries] = useState([{
      personName: "Fodring",
      amount: 100,
      notes: "Surdejen ser meget aktiv ud i dag!",
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
            username={username}
            setUsername={setUsername}
            experienceLevel={experienceLevel}
            setExperienceLevel={setExperienceLevel}
            friends={friends}
            setFriends={setFriends}
            logEntries={logEntries}
            addLogEntry={addLogEntry}
          />
        )}
      </OnboardingStack.Screen>
    </OnboardingStack.Navigator>
  </NavigationContainer>
  );
}
