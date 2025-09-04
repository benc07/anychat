import { getDatabase, ref, set, push, get, child } from "firebase/database";
import { app } from "./firebase"
import { Message } from "@/app";

export const getAllRooms = async () => {
  const dbRef = ref(getDatabase(app));
  const snapshot = await get(child(dbRef, `rooms`));
  const list = snapshot.val();
  console.debug("get all rooms")
  return list
}

export const getMessages = async (id: string) => {
  const dbRef = ref(getDatabase(app));
  const roomRef = child(dbRef, `rooms/${id}`);
  const snapshot = await get(roomRef);

  console.debug("get all messages")
  console.debug(snapshot.val().messages)

  return snapshot.val().messages || [];
};

export const sendMessage = async (roomId: string, message: Message) => {
  try {
    const db = getDatabase(app);
    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    const newMessageRef = await push(messagesRef, message);
    console.debug("Message sent with ID:", newMessageRef.key);
    return newMessageRef.key;
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
