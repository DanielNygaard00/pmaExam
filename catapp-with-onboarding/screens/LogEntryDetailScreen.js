import { StyleSheet, Text, View } from 'react-native';

export default function LogEntryDetailScreen({ route }) {
  const { entry, index } = route.params;

  return (
    <View style={styles.container}>
      <Text 
        style={styles.title}
        accessibilityRole="header"
      >
        Entry #{index + 1}
      </Text>

      <View 
        style={styles.card}
        accessible
        accessibilityLabel={`Details for log entry ${index + 1}`}
      >
        <Text style={styles.label}>Activity Type</Text>
        <Text style={styles.value}>{entry.personName || 'Unknown'}</Text>

        <Text style={styles.label}>Weight (grams)</Text>
        <Text style={styles.value}>{entry.amount || '0'}</Text>

        <Text style={styles.label}>Observations</Text>
        <Text style={styles.value}>{entry.notes || 'No observations'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3EB',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    color: '#2C2C2C',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#A46028',
    borderWidth: 2,
    borderRadius: 14,
    padding: 18,
  },
  label: {
    fontSize: 14,
    color: '#5A5A5A',
    textTransform: 'uppercase',
    marginTop: 8,
    marginBottom: 4,
    fontWeight: '700',
  },
  value: {
    fontSize: 18,
    color: '#2C2C2C',
    fontWeight: '600',
    marginBottom: 6,
  },
});
