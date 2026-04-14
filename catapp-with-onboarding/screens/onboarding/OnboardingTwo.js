import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingTwo() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.replace('MainTabs')}
        accessibilityRole="button"
        accessibilityLabel="Skip onboarding"
        accessibilityHint="Double tap to go straight to the main app"
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Image 
        source={require('./../../assets/entry.png')} 
        style={styles.image} 
        accessibilityLabel="App activity log example"
      />

      <Text 
        style={styles.title}
        accessibilityRole="header"
      >
        Begin by logging your activity 📝 
      </Text>
      <Text style={styles.description}>
        Use the Log tab to record new entries and save them to your history.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('OnboardingThree')}
        accessibilityRole="button"
        accessibilityLabel="Next screen"
        accessibilityHint="Double tap to go to the next onboarding page"
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F7F3EB',
  },
  skipButton: {
    position: 'absolute',
    top: 56,
    right: 24,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8C4A1E',
  },
 image: {
    width: 180,
    height: 250,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#8C4A1E',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
    color: '#2C2C2C',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#5A5A5A',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#B3541E',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
