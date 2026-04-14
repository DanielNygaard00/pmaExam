import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ profileName }) {
  const navigation = useNavigation();

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel="General Tracker App home"
      accessibilityHint="Summary of your profile and daily data"
    >
      <Text
        style={styles.title}
        accessibilityRole="header"
        accessibilityLabel="General Tracker App"
      >
        📊 General Activity Tracker
      </Text>

      <Image
        style={styles.mainImage}
        source={{
          uri: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
        }}
        accessibilityRole="image"
        accessibilityLabel="Profile image"
        accessibilityHint="Decorative image for the profile"
      />

      {/* Card: Profile Name */}
      <View
        style={styles.card}
        accessible
        accessibilityRole="summary"
        accessibilityLabel="Profile name"
        accessibilityHint={
          profileName
            ? `Your profile name is ${profileName}`
            : "No profile name has been added yet"
        }
      >
        <Text style={styles.cardLabel}>Profile Name</Text>
        <Text style={styles.cardValue}>
          {profileName ? (
            profileName
          ) : (
            <Text
              style={styles.fallbackValue}
              accessibilityLabel="No profile name added yet"
            >
              No profile name added yet...
            </Text>
          )}
        </Text>
      </View>

      {/* Card: Metric Value */}
      <View
        style={styles.card}
        accessible
        accessibilityRole="summary"
        accessibilityLabel="Metric Value"
        accessibilityHint="Displays current metric value"
      >
        <Text style={styles.cardLabel}>📈 Metric Value</Text>
        <Text
          style={styles.cardValue}
          accessibilityLabel="Metric value 0"
        >
          0.0
        </Text>
      </View>

      {/* Card: Activity Today */}
      <View
        style={styles.card}
        accessible
        accessibilityRole="summary"
        accessibilityLabel="Activity count"
        accessibilityHint="Shows how many activities today"
      >
        <Text style={styles.cardLabel}>📋 Activity Count</Text>
        <Text
          style={styles.cardValue}
          accessibilityLabel="Activity count 0"
        >
          0
        </Text>
      </View>

      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('History')}
        accessibilityRole="button"
        accessibilityLabel="Open activity history"
      >
        <Text style={styles.historyButtonText}>View Activity History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3EB', 
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '800',
    color: '#2C2C2C', 
  },
  mainImage: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },

  // Card styling for each data point
  card: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#A46028', 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardLabel: {
    fontSize: 16,
    color: '#5A5A5A',
    marginBottom: 6,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  // style for when there is no catname given
  fallbackValue: {
    color: '#000000',
    fontSize: 13,
    opacity: 0.5
  },
  historyButton: {
    backgroundColor: '#B3541E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  historyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
