import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface EventType {
  id: string;
  title: string;
  image: string; // URL to the event type image
}

const eventTypes: EventType[] = [
  { id: '1', title: 'Coffee', image: 'https://example.com/coffee.png' },
  { id: '2', title: 'Drinks', image: 'https://example.com/drinks.png' },
  { id: '3', title: 'Dinner', image: 'https://example.com/dinner.png' },
  { id: '4', title: 'Movie Night', image: 'https://example.com/movie.png' },
  { id: '5', title: 'Game Night', image: 'https://example.com/game.png' },
  // Add more event types here
];

const EventCard = ({ item, onSelect }: { item: EventType; onSelect: (id: string) => void }) => (
  <TouchableOpacity onPress={() => onSelect(item.id)} style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{item.title}</Text>
  </TouchableOpacity>
);

const ThirdScreen = () => {
  const handleSelectEvent = (id: string) => {
    // Handle user selection of event type (e.g., store the chosen ID)
    console.log('Selected event:', id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={eventTypes}
        renderItem={({ item }) => <EventCard item={item} onSelect={handleSelectEvent} />}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
        style={{ width: '100%', height: '100%', }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth} // Adjust based on card width for snapping effect
        snapToAlignment="center"
      />
    </View>
  );
};

const cardWidth = 300; // Adjust card width as needed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  card: {
    width: cardWidth,
    flex: 1,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  cardImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ThirdScreen;