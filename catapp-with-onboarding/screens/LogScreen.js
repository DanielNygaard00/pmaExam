import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LogScreen({ addLogEntry, profileName }) {
  const [personName, setPersonName] = useState('');
  const [amount, setAmount] = useState('0');
  const [notes, setNotes] = useState('');

  const saveEntry = () => {
    addLogEntry({
      personName: personName,
      amount: amount,
      notes: notes,
    });

    setPersonName('');
    setAmount('0');
    setNotes('');
    Alert.alert('Saved', 'Activity has been logged.');
  };

  return (
    <View 
      style={styles.container}
      accessible
      accessibilityRole="form"
      accessibilityLabel="Activity Log form"
    >
      <Text 
        style={styles.title}
        accessibilityRole="header"
      >
        Add New Activity
      </Text>

      <Text 
        style={styles.label}
        accessibilityLabel="Person name input label"
      >
        1. Person logging for {profileName || "Profile"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter person name"
        value={personName}
        onChangeText={setPersonName}
        returnKeyType="done"
        accessibilityLabel="Person name input"
        accessibilityHint="Double tap to enter the name of the person logging activity"
      />

      <Text 
        style={styles.label}
        accessibilityLabel="Value or amount input label"
      >
        2. Value / Amount
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter value"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        returnKeyType="done"
        accessibilityLabel="Value or amount input"
        accessibilityHint="Double tap to enter the numerical value of the activity"
      />

      <Text 
        style={styles.label}
        accessibilityLabel="Notes or remarks input label"
      >
        3. Notes / Remarks
      </Text>
      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Any notes about this entry"
        value={notes}
        onChangeText={setNotes}
        multiline
        returnKeyType="done"
        accessibilityLabel="Notes or remarks input"
        accessibilityHint="Double tap to enter any extra notes"
      />

      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={saveEntry}
        accessibilityRole="button"
        accessibilityLabel="Save activity entry"
        accessibilityHint="Double tap to save this activity log entry"
      >
        <Text style={styles.saveButtonText}>Save Activity Entry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3EB',
    padding: 24,
    justifyContent: 'center',
},
  title: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '800',
    color: '#2C2C2C',
  },
  label: {
    fontSize: 16,
    color: '#5A5A5A',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 2,
    borderColor: '#8C4A1E',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#2C2C2C',
    marginBottom: 16,
  },
  notesInput: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: '#B3541E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
