"use client";

import Image from "next/image";
import { GalleryImage } from "./types";

interface Props {
  open: boolean;
  image: GalleryImage;
  title: string;

  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GalleryFullscreen({
  open,
  image,
  title,
  onClose,
  onNext,
  onPrev,
}: Props) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/95 z-[9999] flex justify-center items-center p-8"
    >

      {/* Close */}

      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white text-3xl"
      >
        ✕
      </button>

      {/* Left */}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-8 text-white text-5xl"
      >
        ‹
      </button>

      {/* Right */}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-8 text-white text-5xl"
      >
        ›
      </button>

      <div
        className="relative w-full h-full max-w-6xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.url}
          alt={image.alt || title}
          fill
          className="object-contain"
        />
      </div>

    </div>
  );
}