import { v4 as uuidv4 } from 'uuid';

const adjectives: string[] = [
  "Swift", "Happy", "Brave", "Clever", "Sneaky", "Lazy", "Cool", "Fuzzy", "Jolly", "Mighty",
  "Silly", "Witty", "Crazy", "Bouncy", "Sleepy", "Shiny", "Loud", "Quiet", "Gentle", "Wild",
  "Bold", "Tiny", "Majestic", "Lucky", "Grumpy", "Cheerful", "Chilly", "Fiery", "Sassy", "Plucky",
  "Gloomy", "Wacky", "Zany", "Shy", "Radiant", "Breezy", "Fierce", "Jumpy", "Curious", "Mellow"
];

const nouns: string[] = [
  "Tiger", "Dragon", "Eagle", "Wizard", "Monkey", "Ninja", "Lion", "Panda", "Fox", "Shark",
  "Bear", "Wolf", "Falcon", "Otter", "Rabbit", "Giraffe", "Hawk", "Panther", "Leopard", "Squirrel",
  "Horse", "Elephant", "Raccoon", "Koala", "Dolphin", "Cheetah", "Penguin", "Turtle", "Badger", "Cougar",
  "Buffalo", "Camel", "Moose", "Sloth", "Owl", "Hedgehog", "Bat", "Lynx", "Crane", "Viper"
];

function generateUsername(): string {
  const adj: string = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun: string = nouns[Math.floor(Math.random() * nouns.length)];
  const id: string = uuidv4(); // UUID for uniqueness
  return `${adj}${noun}-${id}`;
}

// TODO: username generation from the server-side
export const UserName = generateUsername()
