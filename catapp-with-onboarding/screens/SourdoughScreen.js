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
import { useNavigation } from '@react-navigation/native';

export default function SourdoughScreen({ profileName }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [sourdoughs, setSourdoughs] = useState([
    {
      id: '1',
      name: 'LAVA DOUGH',
      age: '6 months',
      lastFed: '17. april 2026',
      flour: 'Durum wheat, Tipo 00',
      location: 'The kitchen table',
      image: 'https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg'
    }
  ]);

  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newFed, setNewFed] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newFlour, setNewFlour] = useState('');

  const name = profileName || '[name]';

  const handleEditPress = (item) => {
    setEditingId(item.id);
    setNewName(item.name);
    setNewFed(item.lastFed);
    setNewLocation(item.location);
    setNewFlour(item.flour);
    setModalVisible(true);
  };

  const handleAddNewPress = () => {
    setEditingId(null);
    setNewName('');
    setNewDate('');
    setNewFed('');
    setNewLocation('');
    setNewFlour('');
    setModalVisible(true);
  };

  const handleSaveSourdough = () => {
    if (newName.trim() === '') {
      Alert.alert("Error", "Please enter a name");
      return;
    }

    if (editingId) {
      // Update existing
      setSourdoughs(sourdoughs.map(s => s.id === editingId ? {
        ...s,
        name: newName.toUpperCase(),
        lastFed: newFed,
        flour: newFlour,
        location: newLocation
      } : s));
      Alert.alert("Success", "Sourdough updated!");
    } else {
      // Add new
      const newEntry = {
        id: Date.now().toString(),
        name: newName.toUpperCase(),
        age: 'New starter',
        lastFed: newFed || 'Just now',
        flour: newFlour || 'Not specified',
        location: newLocation || 'Kitchen',
        image: 'https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg'
      };
      setSourdoughs([newEntry, ...sourdoughs]);
      Alert.alert("Success", "Sourdough starter added!");
    }

    setModalVisible(false);
    setEditingId(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
           <Text style={styles.title} accessibilityRole="header">Welcome, {name}</Text>
           <View style={styles.levelBadge} accessibilityLabel="Baker level: Beginner baker">
              <Text style={styles.levelText}>Beginner baker</Text>
           </View>
        </View>

        {sourdoughs.map((item) => (
          <View key={item.id} style={styles.mainCard}>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.starterImage} 
                accessibilityLabel={`Sourdough starter jar: ${item.name}`}
              />
              <View style={styles.nameTag} accessibilityLabel={`Sourdough name: ${item.name}`}>
                <Text style={styles.nameTagText}>{item.name}</Text>
              </View>
              <View style={styles.locationTag} accessibilityLabel={`Stored at: ${item.location}`}>
                <Text style={styles.locationTagText}>{item.location}</Text>
              </View>
            </View>

            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.infoLabel}>Age:</Text>
                  <Text style={styles.infoValue}>{item.age}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.entryEditButton} 
                  onPress={() => handleEditPress(item)}
                  accessibilityRole="button"
                  accessibilityLabel={`Edit age for ${item.name}`}
                >
                  <Text style={styles.entryEditButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.infoLabel}>Feeded:</Text>
                  <Text style={styles.infoValue}>{item.lastFed}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.entryEditButton} 
                  onPress={() => handleEditPress(item)}
                  accessibilityRole="button"
                  accessibilityLabel={`Edit feeding date for ${item.name}`}
                >
                  <Text style={styles.entryEditButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.infoLabel}>Flour:</Text>
                  <Text style={styles.infoValue}>{item.flour}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.entryEditButton} 
                  onPress={() => handleEditPress(item)}
                  accessibilityRole="button"
                  accessibilityLabel={`Edit flour type for ${item.name}`}
                >
                  <Text style={styles.entryEditButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddNewPress}
        accessibilityRole="button"
        accessibilityLabel="Add sourdough entry"
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

      {/* Add Sourdough Modal */}
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

              <Text style={styles.modalLabel}>Name of sourdough:</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="What is the name of your sourdough?"
                accessibilityLabel="Sourdough name"
                value={newName}
                onChangeText={setNewName}
              />

              <Text style={styles.modalLabel}>Start date:</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="What date did you start your sourdough?"
                accessibilityLabel="Start date"
                value={newDate}
                onChangeText={setNewDate}
              />

              <Text style={styles.modalLabel}>Last feeded:</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="When was the last day you feeded it?"
                accessibilityLabel="Last feeding date"
                value={newFed}
                onChangeText={setNewFed}
              />

              <Text style={styles.modalLabel}>Location:</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Where in your house is it placed?"
                accessibilityLabel="Location"
                value={newLocation}
                onChangeText={setNewLocation}
              />

              <Text style={styles.modalLabel}>Flour:</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="What types of flour are used?"
                accessibilityLabel="Flour type"
                value={newFlour}
                onChangeText={setNewFlour}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.saveButton, { backgroundColor: '#8B7E74' }]}
                  onPress={() => setModalVisible(false)}
                  accessibilityRole="button"
                  accessibilityLabel="Cancel editing"
                >
                  <Text style={styles.saveButtonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={handleSaveSourdough}
                  accessibilityRole="button"
                  accessibilityLabel="Save sourdough"
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: '#C5B9AC',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2C2C2C',
    marginBottom: 8,
  },
  levelBadge: {
    backgroundColor: '#D1C4B5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#605030',
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 24,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  starterImage: {
    width: '100%',
    height: '100%',
  },
  nameTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  nameTagText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4A4A4A',
  },
  locationTag: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  locationTagText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  infoSection: {
    padding: 24,
    backgroundColor: '#E5E0DA',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2C2C2C',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#4A4A4A',
    fontWeight: '500',
  },
  entryEditButton: {
    backgroundColor: '#8B7E74',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'center',
  },
  entryEditButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
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
    fontSize: 14,
    fontWeight: '700',
    color: '#2C2C2C',
    marginTop: 12,
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 14,
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
