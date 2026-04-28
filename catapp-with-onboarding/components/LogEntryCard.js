import { View, Text, StyleSheet } from 'react-native';

export default function LogEntryCard({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.mainText}>Activity: {item.personName}</Text>
      <Text style={styles.subText}>Weight: {item.amount}g</Text>
      <Text style={styles.subText}>Notes: {item.notes || 'No observations'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#A46028',
    borderWidth: 2,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  mainText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 6,
  },
  subText: {
    fontSize: 15,
    color: '#4A4A4A',
    marginBottom: 4,
  },
});
