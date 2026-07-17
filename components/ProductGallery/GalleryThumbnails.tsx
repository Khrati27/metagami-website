"use client";

import Image from "next/image";
import { GalleryImage } from "./types";

interface Props {
  images: GalleryImage[];
  selected: number;
  title: string;
  onSelect: (index: number) => void;
}

export default function GalleryThumbnails({
  images,
  selected,
  title,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-col gap-3">

      {images.map((img, index) => (

        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`relative w-16 h-20 overflow-hidden border transition-all duration-300

          ${
            selected === index
              ? "border-black"
              : "border-metagami-border hover:border-black"
          }`}
        >

          <Image
            src={img.url}
            alt={img.alt || title}
            fill
            className="object-cover"
          />

        </button>

      ))}

    </div>
  );
}