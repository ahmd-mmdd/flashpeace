"use client";

import { useEffect, useState } from "react";
import { Deck } from "@/types/deck";

type DashboardProps = {
  username: string;
};

export default function Dashboard({ username }: DashboardProps) {
  // Ambil data dari localStorage saat pertama kali component dibuat
  const [decks, setDecks] = useState<Deck[]>(() => {
    if (typeof window === "undefined") return [];

    const savedDecks = localStorage.getItem("flashpeace-decks");
    return savedDecks ? JSON.parse(savedDecks) : [];
  });

  // Simpan setiap ada perubahan
  useEffect(() => {
    localStorage.setItem("flashpeace-decks", JSON.stringify(decks));
  }, [decks]);

  function handleCreateDeck() {
    const name = prompt("Nama deck:");

    if (!name?.trim()) return;

    const newDeck: Deck = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: new Date().toISOString(),
    };

    setDecks((prevDecks) => [...prevDecks, newDeck]);
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
            onClick={handleCreateDeck}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            + New Deck
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {decks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <p className="text-gray-500">
                Belum ada deck.
              </p>

              <p className="text-sm text-gray-400">
                Mulai buat deck pertamamu!
              </p>
            </div>
          ) : (
            decks.map((deck) => (
              <div
                key={deck.id}
                className="rounded-xl border border-gray-200 p-4 shadow-sm"
              >
                <h4 className="text-lg font-semibold">
                  {deck.name}
                </h4>

                <p className="text-sm text-gray-500">
                  0 Cards
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}