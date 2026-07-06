import { Flashcard } from "./flashcard";

export type Deck = {
  id: string;
  name: string;
  createdAt: string;
  cards: Flashcard[];
};