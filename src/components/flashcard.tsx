"use client";

import { motion } from "framer-motion";

interface FlashcardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard = ({ question, answer, isFlipped, onFlip }: FlashcardProps) => {
  return (
    <div
      className="w-full max-w-md aspect-[4/3] perspective-1000 cursor-pointer mb-8"
      onClick={onFlip}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - Question */}
        <div
          className={`absolute w-full h-full bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center backface-hidden ${
            isFlipped ? "hidden" : ""
          }`}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Question:
          </h2>
          <p className="text-center text-gray-800 text-lg">{question}</p>
          <div className="mt-4 text-sm text-gray-500">
            Click to reveal answer
          </div>
        </div>

        {/* Back - Answer */}
        <div
          className={`absolute w-full h-full bg-emerald-50 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center backface-hidden ${
            !isFlipped ? "hidden" : ""
          }`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <h2 className="text-xl font-semibold text-emerald-700 mb-2">
            Answer:
          </h2>
          <p className="text-center text-gray-800 text-lg">{answer}</p>
          <div className="mt-4 text-sm text-gray-500">
            Click to see question
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;
