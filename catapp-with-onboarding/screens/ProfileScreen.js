import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen({ profileName, setProfileName }) {
  const navigation = useNavigation();

  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="form"
      accessibilityLabel="My Profile form"
      accessibilityHint="Edit your profile information or restart the onboarding flow"
    >
      <Text
        style={styles.title}
        accessibilityRole="header"
        accessibilityLabel="My Profile"
      >
        My Profile
      </Text>

      <Text
        style={styles.label}
        accessibilityLabel="Profile name label"
      >
        Profile/Item Name:
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter profile name"
        value={profileName}
        onChangeText={setProfileName}
        accessibilityRole="text"
        accessibilityLabel="Profile name input"
        accessibilityHint="Double tap to edit. Type your profile name."
        returnKeyType="done"
      />

      <Pressable
        style={styles.restartButton}
        onPress={() => navigation.navigate('OnboardingOne')}
        accessibilityRole="button"
        accessibilityLabel="Restart Intro Flow"
        accessibilityHint="Double tap to go back to the first onboarding screen"
      >
        <Text style={styles.restartButtonText}>Restart Intro Flow</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3EB', 
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '800',
    color: '#2C2C2C',
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
    color: '#5A5A5A',
  },
  input: {
    borderWidth: 2,
    borderColor: '#8C4A1E', 
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    color: '#2C2C2C', 
    elevation: 2,
    marginBottom: 24,
  },
  restartButton: {
    backgroundColor: '#B3541E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
