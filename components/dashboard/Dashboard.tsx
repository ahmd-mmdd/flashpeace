"use client";

import { useEffect, useState } from "react";
import { Deck } from "@/types/deck";
import DeckList from "./DeckList";

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
          <DeckList decks={decks} />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold">
              Create New Deck
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Masukkan nama deck yang ingin dibuat.
            </p>

            <input
              type="text"
              placeholder="Contoh: English Vocabulary"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateDeck();
                }
              }}
              autoFocus
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateDeck}
                className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}