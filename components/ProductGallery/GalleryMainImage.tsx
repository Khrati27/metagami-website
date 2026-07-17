"use client";

import Image from "next/image";
import { GalleryImage } from "./types";

interface Props {
  image: GalleryImage;
  title: string;
  zoom: boolean;
  position: {
    x: number;
    y: number;
  };

  onTouchStart: any;
  onTouchEnd: any;

  onMouseMove: any;
  onMouseEnter: any;
  onMouseLeave: any;

  onClick: () => void;
}

export default function GalleryMainImage({
  image,
  title,
  zoom,
  position,
  onTouchStart,
  onTouchEnd,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: Props) {

  return (

    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="relative flex-1 aspect-[3/4] bg-[#c8c8c8] border border-metagami-border overflow-hidden cursor-zoom-in"
    >

      <Image
        src={image.url}
        alt={image.alt || title}
        fill
        priority
        className="gallery-image object-cover transition-transform duration-200"
        style={{
          transform: zoom
            ? "scale(2)"
            : "scale(1)",

          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />

    </div>

  );

}