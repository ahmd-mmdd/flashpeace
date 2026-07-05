import { Deck } from "@/types/deck";

type DeckCardProps = {
  deck: Deck;
};

export default function DeckCard({ deck }: DeckCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 shadow-sm transition hover:shadow-md">
      <h4 className="text-lg font-semibold">
        {deck.name}
      </h4>

      <p className="text-sm text-gray-500">
        0 Cards
      </p>
    </div>
  );
}