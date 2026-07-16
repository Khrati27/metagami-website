"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface GalleryImage {
  url: string;
  alt?: string;
}

export default function ProductGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const [selected, setSelected] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(false);

  const touchStart = useRef(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] border border-metagami-border bg-[#c8c8c8]" />
    );
  }

  function nextImage() {
    setSelected((prev) => (prev + 1) % images.length);
  }

  function prevImage() {
    setSelected((prev) => (prev - 1 + images.length) % images.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const end = e.changedTouches[0].clientX;
    const diff = touchStart.current - end;

    if (Math.abs(diff) < 40) return;

    if (diff > 0) nextImage();
    else prevImage();
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") nextImage();

      if (e.key === "ArrowLeft") prevImage();

      if (e.key === "Escape") setFullscreen(false);
    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <div className="flex gap-5">

        {/* Thumbnail */}

        <div className="flex flex-col gap-3">

          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
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

        {/* Main Image */}

        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onClick={() => setFullscreen(true)}
          className="relative flex-1 aspect-[3/4] bg-[#c8c8c8] border border-metagami-border overflow-hidden cursor-zoom-in"
        >

        <Image
  key={selected}
  src={images[selected].url}
  alt={images[selected].alt || title}
  fill
  priority
  className={`gallery-image object-cover transition-all duration-500

  ${
    zoom
      ? "scale-110"
      : "scale-100"
  }
  `}
/>

        </div>

      </div>

      {/* Fullscreen */}

      {fullscreen && (

        <div
          onClick={() => setFullscreen(false)}
          className="fixed inset-0 bg-black/95 z-[9999] flex justify-center items-center p-8"
        >

          {/* Close */}

          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-8 right-8 text-white text-3xl"
          >
            ✕
          </button>

          {/* Left */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-8 text-white text-5xl"
          >
            ‹
          </button>

          {/* Right */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
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
              src={images[selected].url}
              alt={images[selected].alt || title}
              fill
              className="object-contain"
            />

          </div>

        </div>

      )}
    </>
  );
}