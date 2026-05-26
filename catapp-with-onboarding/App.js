// Imports
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SourdoughScreen from './screens/SourdoughScreen';
import RecipesScreen from './screens/RecipesScreen';
import TodoScreen from './screens/TodoScreen';

// Importing the Onboarding Screens
import OnboardingOne from './screens/onboarding/OnboardingOne';
import OnboardingTwo from './screens/onboarding/OnboardingTwo';
import OnboardingThree from './screens/onboarding/OnboardingThree';
import OnboardingFour from './screens/onboarding/OnboardingFour';

// Tab navigator
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const RecipesStack = createNativeStackNavigator();
const SourdoughStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();

function RecipesStackScreen() {
  return (
    <RecipesStack.Navigator screenOptions={{ headerShown: false }}>
      <RecipesStack.Screen name="RecipesMain" component={RecipesScreen} />
      <RecipesStack.Screen name="Todo" component={TodoScreen} />
    </RecipesStack.Navigator>
  );
}

function SourdoughStackScreen({ profileName }) {
  return (
    <SourdoughStack.Navigator screenOptions={{ headerShown: false }}>
      <SourdoughStack.Screen name="SourdoughMain">
        {() => <SourdoughScreen profileName={profileName} />}
      </SourdoughStack.Screen>
      <SourdoughStack.Screen name="Todo" component={TodoScreen} />
    </SourdoughStack.Navigator>
  );
}

function HomeStackScreen({ profileName }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMain"
        options={{ title: 'Home', headerShown: false }}
      >
        {() => <HomeScreen profileName={profileName} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

function MainTabs({ profileName, setProfileName, username, setUsername, experienceLevel, setExperienceLevel, friends, setFriends }) {
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
          <SourdoughStackScreen
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
    { id: '1', username: 'AliceBaker', status: 'not_added', level: 'Beginner' },
    { id: '2', username: 'SourdoughSam', status: 'not_added', level: 'Intermediate' },
    { id: '3', username: 'CrustyChris', status: 'not_added', level: 'Advanced' },
    { id: '4', username: 'DoughJoe', status: 'not_added', level: 'Beginner' },
  ]);

  return (
    <NavigationContainer>
    <OnboardingStack.Navigator
      initialRouteName="OnboardingOne"
      screenOptions={{ headerShown: false }}
    >
      <OnboardingStack.Screen name="OnboardingOne" component={OnboardingOne} />
      <OnboardingStack.Screen name="OnboardingTwo" component={OnboardingTwo} />
      <OnboardingStack.Screen name="OnboardingThree" component={OnboardingThree} />
      <OnboardingStack.Screen name="OnboardingFour" component={OnboardingFour} />

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
          />
        )}
      </OnboardingStack.Screen>
    </OnboardingStack.Navigator>
  </NavigationContainer>
  );
}
