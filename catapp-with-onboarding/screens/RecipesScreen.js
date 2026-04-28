import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RECIPES = [
  { 
    id: '1', 
    name: 'Sourdough Pizza', 
    level: 'Advanced baker',
    image: require('../assets/pizza.png')
  },
  { 
    id: '2', 
    name: 'Sourdough Buns', 
    level: 'Beginner baker',
    image: require('../assets/buns.jpg')
  },
  { 
    id: '3', 
    name: 'Ham and Cheese Sandwich', 
    level: 'Intermediate baker',
    image: require('../assets/sandwich.jpg')
  },
];

export default function RecipesScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title} accessibilityRole="header">Recipes</Text>
        
        {RECIPES.map((recipe) => (
          <TouchableOpacity 
            key={recipe.id} 
            style={styles.card}
            onPress={() => navigation.navigate('Todo', { recipeName: recipe.name })}
            accessibilityRole="button"
            accessibilityLabel={`${recipe.name} recipe, ${recipe.level}`}
            accessibilityHint="Double tap to see the to-do list for this recipe"
          >
            <View style={styles.imageContainer}>
              <Image 
                source={recipe.image} 
                style={styles.recipeImage} 
                accessibilityLabel={`Photo of ${recipe.name}`}
              />
              <View style={[
                styles.levelBadge, 
                { 
                  backgroundColor: recipe.level === 'Advanced baker' ? '#D5C48B' : 
                                   recipe.level === 'Beginner baker' ? '#D1C4B5' : '#E59A8D' 
                }
              ]}>
                <Text style={styles.levelText}>{recipe.level}</Text>
              </View>
            </View>
            <View style={styles.cardBottom}>
               <Text style={styles.recipeName}>{recipe.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5B9AC',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#2C2C2C',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  levelBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4A4A4A',
  },
  cardBottom: {
    padding: 24,
    backgroundColor: '#E5E0DA',
  },
  recipeName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2C2C2C',
  },
});
