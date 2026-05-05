import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

export default function HomeScreen({ profileName }) {
  const [bakes, setBakes] = useState([
    {
      id: '1',
      user: 'Best_baker123',
      level: 'Advanced',
      sourdoughName: 'Bread Pitt',
      flour: '200g whole wheat, 300g all purpose',
      image: require('../assets/bread.jpg'),
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
      description: 'En smuk skorpe med en åben krumme. Fermenteret i 24 timer.'
    },
    {
      id: '2',
      user: 'Tippi_pippi',
      level: 'Begynder',
      sourdoughName: 'Lana Dough Ray',
      flour: '80g durum hvede, 160g tipo 00',
      image: require('../assets/bagel1.jpg'),
      avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
      description: 'Perfekte seje bagels. Gode til morgenmad!'
    }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [selectedBake, setSelectedBake] = useState(null);
  const [editingBakeId, setEditingBakeId] = useState(null);
  const [newBakeName, setNewBakeName] = useState('');
  const [newBakeNotes, setNewBakeNotes] = useState('');

  const handleAddNewBakePress = () => {
    setEditingBakeId(null);
    setNewBakeName('');
    setNewBakeNotes('');
    setModalVisible(true);
  };

  const handleSaveNewBake = () => {
    if (newBakeName.trim() === '') {
      Alert.alert("Error", "Please enter a sourdough name");
      return;
    }

    if (editingBakeId) {
      // Update existing
      setBakes(bakes.map(b => b.id === editingBakeId ? {
        ...b,
        sourdoughName: newBakeName,
        description: newBakeNotes
      } : b));
      Alert.alert("Success", "Bake updated!");
    } else {
      // Add new
      const newBake = {
        id: Date.now().toString(),
        user: profileName || 'USER NAME',
        level: 'Beginner',
        sourdoughName: newBakeName,
        flour: 'Default Flour Mix',
        image: require('../assets/bread.jpg'),
        avatar: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
        description: newBakeNotes
      };
      setBakes([newBake, ...bakes]);
      Alert.alert("Success", "Bake added!");
    }

    setModalVisible(false);
    setEditingBakeId(null);
    setNewBakeName('');
    setNewBakeNotes('');
  };

  const handleBakePress = (bake) => {
    setSelectedBake(bake);
    setSummaryVisible(true);
  };

  const renderBakeCard = (bake) => (
    <TouchableOpacity 
      key={bake.id} 
      style={styles.card}
      onPress={() => handleBakePress(bake)}
      accessibilityRole="button"
      accessibilityLabel={`Bake by ${bake.user}: ${bake.sourdoughName}`}
      accessibilityHint="Double tap to see details of this bake"
    >
      <View style={styles.userInfo}>
        <View style={styles.userTag}>
           <Image 
             source={{ uri: bake.avatar }} 
             style={styles.avatar} 
             accessibilityLabel={`${bake.user}'s avatar`}
           />
           <Text style={styles.userName}>{bake.user}</Text>
        </View>
        <View style={[styles.levelTag, { backgroundColor: bake.level === 'Advanced' ? '#D5C48B' : '#C5B5A5' }]}>
          <Text style={styles.levelText}>{bake.level}</Text>
        </View>
      </View>
      
      <Image 
        source={bake.image} 
        style={styles.bakeImage} 
        accessibilityLabel={`Photo of ${bake.sourdoughName}`}
      />
      
      <View style={styles.cardContent}>
        <Text style={styles.bakeName}>[{bake.sourdoughName}]</Text>
        <Text style={styles.flourInfo}>Flour: {bake.flour}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title} accessibilityRole="header" numberOfLines={1}>Welcome, {profileName || '[name]'}</Text>
        
        {bakes.map(renderBakeCard)}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={handleAddNewBakePress}
        accessibilityRole="button"
        accessibilityLabel="Add new bake"
        accessibilityHint="Opens a modal to log a new sourdough bake"
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

      {/* Bake Summary Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={summaryVisible}
        onRequestClose={() => setSummaryVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <TouchableOpacity 
              style={styles.closeModal} 
              onPress={() => setSummaryVisible(false)}
              accessibilityRole="button"
              accessibilityLabel="Close summary"
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            {selectedBake && (
              <View>
                <Text style={styles.title} accessibilityRole="header">{selectedBake.sourdoughName}</Text>
                <Image 
                  source={selectedBake.image} 
                  style={styles.summaryImage} 
                  accessibilityLabel={`Detailed photo of ${selectedBake.sourdoughName}`}
                />
                
                <Text style={styles.modalLabel}>Baker details:</Text>
                <Text style={styles.flourInfo}>{selectedBake.user} - {selectedBake.level}</Text>

                <Text style={styles.modalLabel}>Ingredients:</Text>
                <Text style={styles.flourInfo}>{selectedBake.flour}</Text>

                <Text style={styles.modalLabel}>Summary:</Text>
                <Text style={styles.flourInfo}>{selectedBake.description}</Text>

                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={() => setSummaryVisible(false)}
                    accessibilityRole="button"
                    accessibilityLabel="Close modal"
                  >
                    <Text style={styles.saveButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Bake Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalView}>
              <TouchableOpacity 
                style={styles.closeModal} 
                onPress={() => setModalVisible(false)}
                accessibilityRole="button"
                accessibilityLabel="Close modal"
              >
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>

              <Text style={styles.modalLabel}>Add picture:</Text>
              <View 
                style={styles.uploadPlaceholder}
                accessibilityRole="button"
                accessibilityLabel="Upload bake picture"
              >
                <Text style={{ fontSize: 40, color: '#A0A0A0' }}>📤</Text>
              </View>

              <Text style={styles.modalLabel}>Sourdough name:</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="What sourdough did you use to bake?"
                value={newBakeName}
                onChangeText={setNewBakeName}
                accessibilityLabel="Sourdough name input"
                accessibilityHint="Enter the name of the sourdough used"
              />

              <Text style={styles.modalLabel}>Say something about your baking:</Text>
              <TextInput
                style={[styles.modalInput, styles.multilineInput]}
                placeholder="What is on your mind?"
                value={newBakeNotes}
                onChangeText={setNewBakeNotes}
                multiline
                accessibilityLabel="Baking notes input"
                accessibilityHint="Enter any notes or thoughts about this bake"
              />

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveNewBake}
                accessibilityRole="button"
                accessibilityLabel="Save bake"
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1ECE0',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2C2C2C',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  userTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingRight: 12,
    paddingLeft: 4,
    paddingVertical: 4,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  userName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4A4A4A',
  },
  levelTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#605030',
  },
  bakeImage: {
    width: '100%',
    height: 200,
  },
  summaryImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginVertical: 10,
  },
  cardContent: {
    padding: 16,
  },
  bakeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  flourInfo: {
    fontSize: 14,
    color: '#6A6A6A',
  },
  addButton: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    backgroundColor: '#3C2F2F',
    width: 70,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex: 999,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    elevation: 5,
  },
  closeModal: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 999,
  },
  closeText: {
    fontSize: 20,
    color: '#4A4A4A',
    fontWeight: '700',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C2C2C',
    marginTop: 16,
    marginBottom: 8,
  },
  uploadPlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 14,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  saveButton: {
    backgroundColor: '#3C2F2F',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 24,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
