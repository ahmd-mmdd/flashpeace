import Modal from "@/components/ui/Modal";

type CreateDeckModalProps = {
  isOpen: boolean;
  deckName: string;
  setDeckName: (value: string) => void;
  onClose: () => void;
  onCreate: () => void;
};

export default function CreateDeckModal({
  isOpen,
  deckName,
  setDeckName,
  onClose,
  onCreate,
}: CreateDeckModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title="Create New Deck"
      onClose={onClose}
    >
      <p className="text-sm text-gray-500">
        Masukkan nama deck yang ingin dibuat.
      </p>

      <input
        type="text"
        placeholder="Contoh: English Vocabulary"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onCreate();
          }
        }}
        autoFocus
        className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
      />

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={onCreate}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
        >
          Create
        </button>
      </div>
    </Modal>
  );
}