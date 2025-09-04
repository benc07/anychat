import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet, SafeAreaView, } from "react-native";
import { Link } from 'expo-router';
import { getAllRooms } from "@/utils/database";

export interface Message {
  sender: string
  content: string
  time: number
}

export interface Room {
  id: string,
  name: string
  messages: Message[]
}

const HomePage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    async function effect() {
      const data = await getAllRooms();
      const roomsArray: Room[] = data
        ? Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as Omit<Room, "id">),
        }))
        : [];
      setRooms(roomsArray);
    }
    effect();
  }, []); return (

    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={rooms.filter(room =>
          room.name.toLowerCase().includes(query.toLowerCase())
        )}
        keyExtractor={(item) => item.id} // better to use id than index
        renderItem={({ item }) => (
          <Link
            style={styles.item}
            href={{ pathname: "/room", params: { id: item.id, name: item.name } }}
          >
            {item.name}
          </Link>
        )}
        keyboardShouldPersistTaps="handled"
      />    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchBar: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    margin: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  item: {
    padding: 15,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default HomePage;

