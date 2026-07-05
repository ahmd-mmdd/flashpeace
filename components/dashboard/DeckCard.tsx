import { Deck } from "@/types/deck";

type DeckCardProps = {
  deck: Deck;
  onDelete: (id: string) => void;
};

export default function DeckCard({
  deck,
  onDelete,
}: DeckCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4 shadow-sm">
      <div>
        <h4 className="text-lg font-semibold">
          {deck.name}
        </h4>

        <p className="text-sm text-gray-500">
          0 Cards
        </p>
      </div>

      <button
        onClick={() => onDelete(deck.id)}
        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
        title="Delete Deck"
      >
        🗑️
      </button>
    </div>
  );
}