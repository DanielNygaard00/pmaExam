import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingFour() {
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
        source={require('../../assets/onboarding3.png')} 
        style={styles.image} 
        accessibilityLabel="Mastering recipes illustration"
      />

      <Text 
        style={styles.title}
        accessibilityRole="header"
      >
        Master Your Recipes
      </Text>
      <Text style={styles.description}>
        Follow expert recipes and log your baking progress to become a master baker.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.replace('MainTabs')}
        accessibilityRole="button"
        accessibilityLabel="Start using the app"
        accessibilityHint="Double tap to finish onboarding and start using the app"
      >
        <Text style={styles.buttonText}>Start using the app</Text>
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
    color: '#8C4A1E',
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
