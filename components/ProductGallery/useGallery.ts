"use client";

import { useEffect, useRef, useState } from "react";

export function useGallery(imageCount: number) {
  const [selected, setSelected] = useState(0);

  const [fullscreen, setFullscreen] = useState(false);

  const [zoom, setZoom] = useState(false);

  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const touchStart = useRef(0);

  function nextImage() {
    setSelected((prev) => (prev + 1) % imageCount);
  }

  function prevImage() {
    setSelected((prev) => (prev - 1 + imageCount) % imageCount);
  }

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function handleTouchStart(
    e: React.TouchEvent
  ) {
    touchStart.current = e.touches[0].clientX;
  }

  function handleTouchEnd(
    e: React.TouchEvent
  ) {
    const end = e.changedTouches[0].clientX;

    const diff = touchStart.current - end;

    if (Math.abs(diff) < 40) return;

    diff > 0 ? nextImage() : prevImage();
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") nextImage();

      if (e.key === "ArrowLeft") prevImage();

      if (e.key === "Escape") setFullscreen(false);
    }

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, []);

  return {
    selected,
    setSelected,

    fullscreen,
    setFullscreen,

    zoom,
    setZoom,

    position,

    nextImage,
    prevImage,

    handleMouseMove,
    handleTouchStart,
    handleTouchEnd,
  };
}