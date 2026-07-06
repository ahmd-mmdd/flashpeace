"use client";

import { useRouter } from "next/navigation";
import { Deck } from "@/types/deck";

type DeckCardProps = {
  deck: Deck;
  onDelete: (id: string) => void;
};

export default function DeckCard({
  deck,
  onDelete,
}: DeckCardProps) {
  const router = useRouter();

  function handleOpenDeck() {
    router.push(`/deck/${deck.id}`);
  }

  return (
    <div
      onClick={handleOpenDeck}
      className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
    >
      <div>
        <h4 className="text-lg font-semibold">
          {deck.name}
        </h4>

        <p className="text-sm text-gray-500">
          {deck.cards.length} Cards
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(deck.id);
        }}
        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
        title="Delete Deck"
      >
        🗑️
      </button>
    </div>
  );
}