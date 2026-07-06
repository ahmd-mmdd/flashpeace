"use client";

import { useEffect, useState } from "react";
import { Deck } from "@/types/deck";
import DeckList from "./DeckList";
import CreateDeckModal from "./CreateDeckModal";
import Dialog from "@/components/ui/Dialog";
import Toast from "@/components/ui/Toast";

type DashboardProps = {
  username: string;
};

export default function Dashboard({ username }: DashboardProps) {
  const [decks, setDecks] = useState<Deck[]>(() => {
    if (typeof window === "undefined") return [];

    const savedDecks = localStorage.getItem("flashpeace-decks");
    return savedDecks ? JSON.parse(savedDecks) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deckName, setDeckName] = useState("");

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);

  // Toast State
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    localStorage.setItem("flashpeace-decks", JSON.stringify(decks));
  }, [decks]);

  function showToast(
    message: string,
    type: "success" | "error"
  ) {
    setToastMessage(message);
    setToastType(type);
    setIsToastOpen(true);
  }

  function handleCreateDeck() {
    const trimmedName = deckName.trim();

    if (!trimmedName) {
      showToast("Nama deck tidak boleh kosong.", "error");
      return;
    }

    const isDuplicate = decks.some(
      (deck) => deck.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      showToast("Nama deck sudah ada.", "error");
      return;
    }

    const newDeck: Deck = {
  id: crypto.randomUUID(),
  name: trimmedName,
  createdAt: new Date().toISOString(),
  cards: [],
};

    setDecks((prev) => [...prev, newDeck]);

    setDeckName("");
    setIsModalOpen(false);

    showToast("Deck berhasil dibuat!", "success");
  }

  function handleDeleteDeck(id: string) {
    setSelectedDeckId(id);
    setIsDeleteOpen(true);
  }

  function confirmDeleteDeck() {
    if (!selectedDeckId) return;

    setDecks((prev) =>
      prev.filter((deck) => deck.id !== selectedDeckId)
    );

    setSelectedDeckId(null);
    setIsDeleteOpen(false);

    showToast("Deck berhasil dihapus.", "success");
  }

  function cancelDeleteDeck() {
    setSelectedDeckId(null);
    setIsDeleteOpen(false);
  }

  function handleCloseModal() {
    setDeckName("");
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          Halo, {username} 👋
        </h2>

        <p className="text-gray-500">
          Selamat datang di FlashPeace.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            📚 Your Decks
          </h3>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            + New Deck
          </button>
        </div>

        <div className="mt-4">
          <DeckList
            decks={decks}
            onDelete={handleDeleteDeck}
          />
        </div>
      </div>

      <CreateDeckModal
        isOpen={isModalOpen}
        deckName={deckName}
        setDeckName={setDeckName}
        onClose={handleCloseModal}
        onCreate={handleCreateDeck}
      />

      <Dialog
        isOpen={isDeleteOpen}
        title="Delete Deck"
        description="Apakah kamu yakin ingin menghapus deck ini?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeleteDeck}
        onCancel={cancelDeleteDeck}
      />

      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        type={toastType}
        onClose={() => setIsToastOpen(false)}
      />
    </div>
  );
}