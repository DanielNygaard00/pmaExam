import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

export default function ProfileScreen({ 
  profileName, 
  setProfileName, 
  username, 
  setUsername, 
  experienceLevel, 
  setExperienceLevel,
  friends,
  setFriends
}) {
  const [tempName, setTempName] = useState(profileName);
  const [tempUsername, setTempUsername] = useState(username);
  const [tempLevel, setTempLevel] = useState(experienceLevel);

  const handleAddFriend = (friendId) => {
    setFriends(prevFriends => 
      prevFriends.map(f => f.id === friendId ? { ...f, status: 'added' } : f)
    );
  };

  const handleSave = () => {
    setProfileName(tempName);
    setUsername(tempUsername);
    setExperienceLevel(tempLevel);
    Alert.alert("Success", "Profile updated successfully!");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title} accessibilityRole="header">Profile</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="What is your name?"
            value={tempName}
            onChangeText={setTempName}
            accessibilityLabel="Name input"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="What name do you want others to see?"
            value={tempUsername}
            onChangeText={setTempUsername}
            accessibilityLabel="Username input"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Years of experience:</Text>
          <View style={styles.experienceButtons}>
            <TouchableOpacity 
              style={[styles.expButton, { backgroundColor: '#D1C4B5' }, tempLevel === 'Beginner' && styles.selectedLevel]}
              onPress={() => setTempLevel('Beginner')}
              accessibilityRole="button"
              accessibilityLabel="Beginner level, less than 1 year"
              accessibilityState={{ selected: tempLevel === 'Beginner' }}
            >
               <Text style={styles.expButtonTitle}>Beginner</Text>
               <Text style={styles.expButtonSub}>{"<"}1 year</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.expButton, { backgroundColor: '#E59A8D' }, tempLevel === 'Intermediate' && styles.selectedLevel]}
              onPress={() => setTempLevel('Intermediate')}
              accessibilityRole="button"
              accessibilityLabel="Intermediate level, 2 to 4 years"
              accessibilityState={{ selected: tempLevel === 'Intermediate' }}
            >
               <Text style={styles.expButtonTitle}>Intermediate</Text>
               <Text style={styles.expButtonSub}>2-4 year</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.expButton, { backgroundColor: '#D5C48B' }, tempLevel === 'Advanced' && styles.selectedLevel]}
              onPress={() => setTempLevel('Advanced')}
              accessibilityRole="button"
              accessibilityLabel="Advanced level, more than 4 years"
              accessibilityState={{ selected: tempLevel === 'Advanced' }}
            >
               <Text style={styles.expButtonTitle}>Advanced</Text>
               <Text style={styles.expButtonSub}>4+ year</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.saveProfileButton} 
          onPress={handleSave}
          accessibilityRole="button"
          accessibilityLabel="Save profile"
        >
          <Text style={styles.saveProfileButtonText}>Save Profile</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle} accessibilityRole="header">Add friends:</Text>
        <View style={styles.friendsList}>
          {friends.map((friend) => (
            <View key={friend.id} style={styles.friendCard}>
              <View style={styles.friendInfo}>
                <View style={styles.avatarPlaceholder} />
                <Text style={styles.friendName}>{friend.username}</Text>
              </View>
              <TouchableOpacity 
                onPress={() => friend.status === 'not_added' && handleAddFriend(friend.id)}
                disabled={friend.status === 'added'}
                accessibilityRole="button"
                accessibilityLabel={friend.status === 'added' ? `${friend.username} already added` : `Add ${friend.username} as friend`}
              >
                <Text style={[styles.addText, friend.status === 'added' && styles.addedText]}>
                  {friend.status === 'added' ? 'Added' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2C2C2C',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#E5E0DA',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#2C2C2C',
  },
  experienceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  expButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expButtonTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4A4A4A',
    marginBottom: 2,
  },
  expButtonSub: {
    fontSize: 10,
    color: '#4A4A4A',
    fontStyle: 'italic',
  },
  selectedLevel: {
    borderWidth: 2,
    borderColor: '#3C2F2F',
  },
  saveProfileButton: {
    backgroundColor: '#3C2F2F',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  saveProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2C2C2C',
    marginBottom: 16,
  },
  friendsList: {
    gap: 12,
  },
  friendCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E5E0DA',
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 16,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#C5B9AC',
    marginRight: 12,
  },
  friendName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2C2C2C',
  },
  addText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  addedText: {
    color: '#8B7E74',
    fontStyle: 'italic',
  },
});
