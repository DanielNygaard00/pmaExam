import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LogEntryCard from '../components/LogEntryCard';
import { useNavigation } from '@react-navigation/native';


export default function HistoryScreen({ logEntries }) {
    const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text 
        style={styles.title}
        accessibilityRole="header"
      >
        Activity History
      </Text>
        <View style={styles.listWrapper}>
          {logEntries.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('LogEntryDetail', { entry: item, index })}
              accessibilityRole="button"
              accessibilityLabel={`Open details for entry ${index + 1}`}
              accessibilityHint="Double tap to see the full details of this log entry"
            >
              <LogEntryCard item={item} />
            </TouchableOpacity>
          ))}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3EB',
  },
  content: {
    padding: 18,
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2C2C2C',
    marginBottom: 16,
    textAlign: 'center',
  },
  listWrapper: {
    flex: 1,
    minHeight: 450,
    padding: 12,
  },
  emptyBox: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D5C8B6',
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#5A5A5A',
    fontSize: 15,
  },
});
