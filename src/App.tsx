import { useMemo, useState } from "react";
import "./App.css";
import Flashcard from "./components/flashcard";
import FlashcardControls from "./components/flashcard-controls";
import ProgressBar from "./components/progress-bar";
import flashcardsData from "./data/flashcards.json";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "./components/ui/button";

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [storedFlashcardsIds, setStoredFlashcardsIds] = useLocalStorage(
    "flashcardsIds",
    flashcardsData.map((card) => ({ ...card, deleted: false }))
  );
  const [storedLastCardIndex, setStoredLastCardIndex] = useLocalStorage(
    "lastCardIndex",
    0
  );

  const flashcardsWithIds = useMemo(() => {
    return storedFlashcardsIds.filter((card) => !card.deleted);
  }, [storedFlashcardsIds]);

  const handleNext = () => {
    if (storedLastCardIndex < flashcardsWithIds.length - 1) {
      setStoredLastCardIndex(storedLastCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (storedLastCardIndex > 0) {
      setStoredLastCardIndex(storedLastCardIndex - 1);
      setIsFlipped(false);
    }
  };
  const handleDelete = () => {
    const updatedFlashcards = flashcardsWithIds.map((card) => {
      if (card.id === flashcardsWithIds[storedLastCardIndex].id) {
        return { ...card, deleted: true };
      }
      return card;
    });
    setStoredFlashcardsIds(updatedFlashcards);
    if (storedLastCardIndex > 0) {
      setStoredLastCardIndex(storedLastCardIndex - 1);
    }
    setIsFlipped(false);
    if (updatedFlashcards.length === 0) {
      setStoredLastCardIndex(0);
    }
    if (storedLastCardIndex >= updatedFlashcards.length) {
      setStoredLastCardIndex(updatedFlashcards.length - 1);
    }
    if (updatedFlashcards.length === 0) {
      setStoredLastCardIndex(0);
    }
    if (updatedFlashcards.length === 0) {
      setStoredFlashcardsIds([]);
    }
    if (updatedFlashcards.length === 0) {
      setStoredLastCardIndex(0);
    }
  };
  const handleReset = () => {
    setStoredFlashcardsIds(
      flashcardsData.map((card) => ({ ...card, deleted: false }))
    );
    setStoredLastCardIndex(0);
    setIsFlipped(false);
  };
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col h-fit items-center justify-between">
      <h1 className="text-3xl font-bold mb-8">Flashcards</h1>

      {flashcardsWithIds.length > 0 ? (
        <>
          <FlashcardControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            onFlip={handleFlip}
            onDelete={handleDelete}
            hasPrevious={storedLastCardIndex > 0}
            hasNext={storedLastCardIndex < flashcardsWithIds.length - 1}
          />

          <Flashcard
            category={flashcardsWithIds[storedLastCardIndex].category}
            question={flashcardsWithIds[storedLastCardIndex].question}
            answer={flashcardsWithIds[storedLastCardIndex].answer}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
          <ProgressBar
            current={storedLastCardIndex + 1}
            total={flashcardsWithIds.length}
          />
        </>
      ) : (
        <p>No more flashcards</p>
      )}

      <Button onClick={handleReset} className="absolute bottom-4 right-4">
        Reset list
      </Button>
    </div>
  );
}

export default App;
