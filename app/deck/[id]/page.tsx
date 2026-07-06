"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Deck } from "@/types/deck";
import { Flashcard } from "@/types/flashcard";
import FlashcardList from "@/components/flashcard/FlashcardList";
import AddFlashcardModal from "@/components/flashcard/AddFlashcardModal";

export default function DeckDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [deck, setDeck] = useState<Deck | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] =
    useState<Flashcard | null>(null);

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    const savedDecks = localStorage.getItem("flashpeace-decks");

    if (!savedDecks) return;

    const decks: Deck[] = (JSON.parse(savedDecks) as Deck[]).map(
  (deck: Deck) => ({
    ...deck,
    cards: deck.cards ?? [],
  })
);

    const currentDeck = decks.find(
      (d) => d.id === params.id
    );

    if (currentDeck) {
      setDeck(currentDeck);
    }
  }, [params.id]);

  function saveDeck(updatedDeck: Deck) {
    const savedDecks = localStorage.getItem("flashpeace-decks");

    if (!savedDecks) return;

    const decks: Deck[] = JSON.parse(savedDecks);

    const updatedDecks = decks.map((d) =>
      d.id === updatedDeck.id ? updatedDeck : d
    );

    localStorage.setItem(
      "flashpeace-decks",
      JSON.stringify(updatedDecks)
    );

    setDeck(updatedDeck);
  }

  function handleCloseModal() {
    setFront("");
    setBack("");
    setEditingCard(null);
    setIsModalOpen(false);
  }

  function handleEditFlashcard(card: Flashcard) {
    setEditingCard(card);

    setFront(card.front);
    setBack(card.back);

    setIsModalOpen(true);
  }

  function handleDeleteFlashcard(cardId: string) {
    if (!deck) return;

    const confirmed = window.confirm(
      "Yakin ingin menghapus flashcard ini?"
    );

    if (!confirmed) return;

    const updatedDeck: Deck = {
      ...deck,
      cards: deck.cards.filter(
        (card) => card.id !== cardId
      ),
    };

    saveDeck(updatedDeck);
  }

  function handleSubmitFlashcard() {
    if (!deck) return;

    const trimmedFront = front.trim();
    const trimmedBack = back.trim();

    if (!trimmedFront || !trimmedBack) {
      alert("Front dan Back wajib diisi.");
      return;
    }

    if (editingCard) {
      const updatedDeck: Deck = {
        ...deck,
        cards: deck.cards.map((card) =>
          card.id === editingCard.id
            ? {
                ...card,
                front: trimmedFront,
                back: trimmedBack,
              }
            : card
        ),
      };

      saveDeck(updatedDeck);
      handleCloseModal();
      return;
    }

    const newCard: Flashcard = {
      id: crypto.randomUUID(),
      front: trimmedFront,
      back: trimmedBack,
      createdAt: new Date().toISOString(),
    };

    const updatedDeck: Deck = {
      ...deck,
      cards: [...deck.cards, newCard],
    };

    saveDeck(updatedDeck);
    handleCloseModal();
  }
    if (!deck) {
    return (
      <main className="mx-auto max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-red-600">
          Deck tidak ditemukan
        </h1>

        <button
          onClick={() => router.push("/")}
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
        >
          ← Kembali ke Dashboard
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <button
        onClick={() => router.push("/")}
        className="mb-6 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
      >
        ← Back
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            {deck.name}
          </h1>

          <p className="mt-2 text-gray-500">
            Created at{" "}
            {new Date(deck.createdAt).toLocaleDateString("id-ID")}
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCard(null);
            setFront("");
            setBack("");
            setIsModalOpen(true);
          }}
          className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          + Add Flashcard
        </button>
      </div>

      <div className="mt-8">
        <FlashcardList
          cards={deck.cards ?? []}
          onEdit={handleEditFlashcard}
          onDelete={handleDeleteFlashcard}
        />
      </div>

      <AddFlashcardModal
        isOpen={isModalOpen}
        isEditing={editingCard !== null}
        front={front}
        back={back}
        setFront={setFront}
        setBack={setBack}
        onClose={handleCloseModal}
        onSubmit={handleSubmitFlashcard}
      />
    </main>
  );
}