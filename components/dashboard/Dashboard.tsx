"use client";

import { useEffect, useState } from "react";
import { Deck } from "@/types/deck";
import DeckList from "./DeckList";
import CreateDeckModal from "./CreateDeckModal";
import Dialog from "@/components/ui/Dialog";

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

  // State untuk Dialog Delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("flashpeace-decks", JSON.stringify(decks));
  }, [decks]);

  function handleCreateDeck() {
    const trimmedName = deckName.trim();

    if (!trimmedName) {
      alert("Nama deck tidak boleh kosong.");
      return;
    }

    const isDuplicate = decks.some(
      (deck) => deck.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      alert("Nama deck sudah ada.");
      return;
    }

    const newDeck: Deck = {
      id: crypto.randomUUID(),
      name: trimmedName,
      createdAt: new Date().toISOString(),
    };

    setDecks((prevDecks) => [...prevDecks, newDeck]);

    setDeckName("");
    setIsModalOpen(false);
  }

  // Saat klik tombol delete
  function handleDeleteDeck(id: string) {
    setSelectedDeckId(id);
    setIsDeleteOpen(true);
  }

  // Saat klik tombol Delete di dialog
  function confirmDeleteDeck() {
    if (!selectedDeckId) return;

    setDecks((prevDecks) =>
      prevDecks.filter((deck) => deck.id !== selectedDeckId)
    );

    setSelectedDeckId(null);
    setIsDeleteOpen(false);
  }

  // Saat klik Cancel atau tombol X
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
    </div>
  );
}