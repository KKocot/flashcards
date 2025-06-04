import { useEffect, useState } from "react";
import "./App.css";
import Flashcard from "./components/flashcard";
import FlashcardControls from "./components/flashcard-controls";
import ProgressBar from "./components/progress-bar";
import flashcardsData from "./data/flashcards.json";

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState<
    Array<{ question: string; answer: string }>
  >([]);

  useEffect(() => {
    // Load flashcards from JSON file
    setFlashcards(flashcardsData);
  }, []);

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Flashcards</h1>

      {flashcards.length > 0 ? (
        <>
          <ProgressBar
            current={currentCardIndex + 1}
            total={flashcards.length}
          />

          <Flashcard
            question={flashcards[currentCardIndex].question}
            answer={flashcards[currentCardIndex].answer}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />

          <FlashcardControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            onFlip={handleFlip}
            hasPrevious={currentCardIndex > 0}
            hasNext={currentCardIndex < flashcards.length - 1}
          />
        </>
      ) : (
        <p className="text-gray-600">Loading flashcards...</p>
      )}
    </div>
  );
}

export default App;
