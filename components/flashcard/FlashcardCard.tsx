import { Flashcard } from "@/types/flashcard";

type FlashcardCardProps = {
  card: Flashcard;
  onEdit: (card: Flashcard) => void;
  onDelete: (id: string) => void;
};

export default function FlashcardCard({
  card,
  onEdit,
  onDelete,
}: FlashcardCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Front
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(card)}
              className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-50 hover:text-blue-600"
              title="Edit Flashcard"
            >
              ✏️
            </button>

            <button
              onClick={() => onDelete(card.id)}
              className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
              title="Delete Flashcard"
            >
              🗑️
            </button>
          </div>
        </div>

        <h3 className="mt-2 text-lg font-semibold">
          {card.front}
        </h3>
      </div>

      <hr className="my-4" />

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
          Back
        </p>

        <p className="mt-2 text-gray-700">
          {card.back}
        </p>
      </div>
    </div>
  );
}