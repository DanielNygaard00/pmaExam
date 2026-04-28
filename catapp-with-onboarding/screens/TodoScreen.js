import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TodoScreen({ route }) {
  const navigation = useNavigation();
  const { recipeName } = route.params || { recipeName: 'Your' };

  const steps = [
    "Add flour",
    "Add water",
    "Blend until a coherent consistent. Let it rest for 30 min",
    "Add the peaking sourdough, salt and start careful coilfold",
    "Do 3 x coil fold in 1 hour spacing",
    "Shape the dough and let it rest in the fridge over night",
    "Preheat the oven at 220 celcius 1 hour before baking",
    "Bake the dough for 30 min at 220 celcius, and 5 min at 200 celcius"
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">{recipeName} - To do</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {steps.map((step, index) => (
          <View 
            key={index} 
            style={styles.stepContainer}
            accessibilityLabel={`Step ${index + 1}: ${step}`}
          >
            <Text style={styles.stepText}>{step}</Text>
            <View style={styles.separator} />
          </View>
        ))}
        <TouchableOpacity 
          style={styles.addStepButton}
          accessibilityRole="button"
          accessibilityLabel="Add new step"
        >
           <Text style={styles.addPlus}>+</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5B9AC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2C2C2C',
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: '#2C2C2C',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  stepContainer: {
    marginBottom: 20,
  },
  stepText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    lineHeight: 22,
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#8B7E74',
    width: '100%',
  },
  addStepButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  addPlus: {
    fontSize: 32,
    color: '#3C2F2F',
    fontWeight: '300',
  },
});
