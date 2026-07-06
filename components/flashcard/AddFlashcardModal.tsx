"use client";

type AddFlashcardModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  front: string;
  back: string;
  setFront: (value: string) => void;
  setBack: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function AddFlashcardModal({
  isOpen,
  isEditing,
  front,
  back,
  setFront,
  setBack,
  onClose,
  onSubmit,
}: AddFlashcardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold">
          {isEditing ? "Edit Flashcard" : "Add Flashcard"}
        </h2>

        <p className="mt-2 text-gray-500">
          {isEditing
            ? "Ubah isi flashcard."
            : "Tambahkan pertanyaan dan jawaban."}
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block font-medium">
              Front
            </label>

            <input
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="Contoh: Hello"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Back
            </label>

            <textarea
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="Contoh: Halo"
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            {isEditing ? "Save Changes" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}