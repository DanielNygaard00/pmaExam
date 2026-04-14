import { View, Text, StyleSheet } from 'react-native';

export default function LogEntryCard({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.mainText}>Logged by: {item.personName}</Text>
      <Text style={styles.subText}>Value: {item.amount}</Text>
      <Text style={styles.subText}>Notes: {item.notes || 'No remarks'}</Text>
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
