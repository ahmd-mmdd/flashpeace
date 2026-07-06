import { Flashcard } from "@/types/flashcard";
import FlashcardCard from "./FlashcardCard";

type FlashcardListProps = {
  cards: Flashcard[];
  onEdit: (card: Flashcard) => void;
  onDelete: (id: string) => void;
};

export default function FlashcardList({
  cards,
  onEdit,
  onDelete,
}: FlashcardListProps) {
  if (cards.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
        <h3 className="text-lg font-semibold">
          Belum ada flashcard
        </h3>

        <p className="mt-2 text-gray-500">
          Tambahkan flashcard pertamamu.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cards.map((card) => (
        <FlashcardCard
          key={card.id}
          card={card}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}