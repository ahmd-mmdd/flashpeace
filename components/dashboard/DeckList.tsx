import { Deck } from "@/types/deck";
import DeckCard from "./DeckCard";

type DeckListProps = {
  decks: Deck[];
  onDelete: (id: string) => void;
};

export default function DeckList({
  decks,
  onDelete,
}: DeckListProps) {
  if (decks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
        <p className="text-gray-500">
          Belum ada deck.
        </p>

        <p className="text-sm text-gray-400">
          Mulai buat deck pertamamu!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {decks.map((deck) => (
        <DeckCard
          key={deck.id}
          deck={deck}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}