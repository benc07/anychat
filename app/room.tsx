import React, { useEffect, useState } from "react";
import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList, StyleSheet } from "react-native";
import { Message } from "./index"
import { getMessages, sendMessage } from "@/utils/database";
import { UserName } from "@/utils/name";

const RoomPage = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await getMessages(id);
      console.debug(msgs)
      if (msgs) setMessages(Object.values(msgs));
    };

    fetchMessages();
  }, [id]);

  const handleSend = async () => {
    if (message.trim().length === 0) return;

    const newMessage: Message = {
      sender: UserName,
      content: message,
      time: Date.now(),
    };

    try {
      await sendMessage(id, newMessage); // send to Firebase
      setMessages([...messages, newMessage]); // update local state
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: String(name) }} />

      <FlatList
        data={messages.sort((a, b) => a.time - b.time)} // Sort messages by time ascending
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 5, marginVertical: 2, backgroundColor: "#eee", borderRadius: 5 }}>
            <Text style={{ fontWeight: "bold" }}>{item.sender}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
        style={{ flex: 1 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={handleSend}
            // TODO: submitBehavior="submit" not working -- use blurOnSubmit for now
            blurOnSubmit={false}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  messageItem: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 10,
    backgroundColor: "#e5e5ea",
    borderRadius: 10,
  },
  messageSender: {
    fontWeight: "bold",
    marginBottom: 2,
    color: "#333",
  },
  messageContent: {
    color: "#000",
  },
});

export default RoomPage;
