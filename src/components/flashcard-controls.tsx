"use client";

import { ArrowLeft, ArrowRight, RotateCw, Trash } from "lucide-react";
import { Button } from "./ui/button";

interface FlashcardControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onFlip: () => void;
  onDelete: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const FlashcardControls = ({
  onPrevious,
  onNext,
  onFlip,
  onDelete,
  hasPrevious,
  hasNext,
}: FlashcardControlsProps) => {
  return (
    <div className="flex items-center justify-center gap-6 mb-4">
      <Button
        onClick={onPrevious}
        disabled={!hasPrevious}
        aria-label="Previous card"
      >
        <ArrowLeft className="w-6 h-6" />
      </Button>

      <Button onClick={onFlip} aria-label="Flip card">
        <RotateCw className="w-6 h-6" />
      </Button>
      <Button onClick={onDelete} aria-label="Delete card">
        <Trash className="w-6 h-6" />
      </Button>

      <Button onClick={onNext} disabled={!hasNext} aria-label="Next card">
        <ArrowRight className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default FlashcardControls;
