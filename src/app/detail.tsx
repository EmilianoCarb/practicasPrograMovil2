import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";

export default function Detail() {
  const { id, name, image } = useLocalSearchParams<{
    id: string;
    name: string;
    image: string;
  }>();

  const artist_data = { id, name, image };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageWrapper}>
        <Image 
          style={styles.image} 
          source={{ uri: artist_data.image }}
          testID={`img-${artist_data.name}`} 
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.badge}>ARTISTA LAST.FM</Text>
        <Text style={styles.name}>{artist_data.name}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.subtext}>
          ID de Referencia: {artist_data.id ?? "N/A"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: 320,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#E1E4E8',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  badge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D51007',
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#EAEAEA',
    marginVertical: 16,
  },
  subtext: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
  },
});