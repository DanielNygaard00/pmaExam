import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TodoScreen({ route }) {
  const navigation = useNavigation();
  const { isRecipe } = route.params || { isRecipe: false };

  const [steps, setSteps] = useState([
    { text: "Blend until a coherent consistent. Let it rest for 30 min.", completed: false },
    { text: "Add the peaking sourdough, salt and start careful coilfold", completed: false },
    { text: "Do 3 x coil fold in 1 hour spacing", completed: false },
    { text: "Shape the dough and let it rest in the fridge over night", completed: false },
    { text: "Preheat the oven at 220 celcius 1 hour before baking", completed: false },
    { text: "Bake the dough for 30 min at 220 celcius, and 5 min at 200 celcius", completed: false }
  ]);

  const [newStepText, setNewStepText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const toggleStep = (index) => {
    setSteps(prevSteps => prevSteps.map((step, i) => 
      i === index ? { ...step, completed: !step.completed } : step
    ));
  };

  const handleAddStep = () => {
    if (newStepText.trim()) {
      setSteps([...steps, { text: newStepText, completed: false }]);
      setNewStepText('');
      setIsAdding(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header" numberOfLines={1}>
          To do list
        </Text>
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
          <TouchableOpacity 
            key={index} 
            style={[styles.stepCard, step.completed && styles.completedCard]}
            onPress={() => toggleStep(index)}
            activeOpacity={0.7}
          >
            <Text style={[styles.stepText, step.completed && styles.completedText]}>
              {step.text}
            </Text>
          </TouchableOpacity>
        ))}
        
        {!isRecipe && (
          <>
            {isAdding ? (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={newStepText}
                  onChangeText={setNewStepText}
                  placeholder="Enter new step..."
                  autoFocus
                  onBlur={() => !newStepText && setIsAdding(false)}
                  onSubmitEditing={handleAddStep}
                />
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.addCard}
                onPress={() => setIsAdding(true)}
                accessibilityRole="button"
                accessibilityLabel="Add new step"
              >
                <Text style={styles.addText}>Add</Text>
                <View style={styles.plusCircle}>
                   <Text style={styles.plusIcon}>+</Text>
                </View>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1ECE0',
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
    color: '#483732',
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  backArrow: {
    fontSize: 20,
    color: '#483732',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  completedCard: {
    opacity: 0.6,
  },
  stepText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#483732',
    lineHeight: 20,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#8B7E74',
  },
  addCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  addText: {
    fontSize: 16,
    color: '#8B7E74',
    fontWeight: '600',
  },
  plusCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#8B7E74',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 16,
    color: '#8B7E74',
    lineHeight: 18,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#483732',
  },
  input: {
    fontSize: 15,
    color: '#483732',
    padding: 0,
  },
});
