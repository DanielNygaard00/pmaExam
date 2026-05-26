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
        source={require('../../assets/onboarding1.png')} 
        style={styles.image} 
        accessibilityLabel="Onboarding illustration 1"
      />

      <Text 
        style={styles.title}
        accessibilityRole="header"
      >
        Your Professional Sourdough App
      </Text>
      <Text style={styles.description}>
        Designed to help you master every step of the baking process.
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
    backgroundColor: '#F1ECE0',
  },
  skipButton: {
    position: 'absolute',
    top: 56,
    right: 24,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#B77654',
  },
 image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: 'contain',
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
    backgroundColor: '#3C2F2F',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 40,
    position: 'absolute',
    bottom: 30,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
