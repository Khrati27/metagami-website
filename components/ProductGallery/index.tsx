"use client";

import {
  nextImageIndex,
  prevImageIndex,
} from "./utils";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import GalleryThumbnails from "./GalleryThumbnails";
import GalleryMainImage from "./GalleryMainImage";
import { useGallery } from "./useGallery";
import GalleryFullscreen from "./GalleryFullscreen";

import { GalleryImage } from "./types";

export default function ProductGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const {
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
} = useGallery(images.length);

  return (
    <>
      <div className="flex gap-5">

        {/* Thumbnail */}

        <GalleryThumbnails
  images={images}
  selected={selected}
  title={title}
  onSelect={setSelected}
/>

        {/* Main Image */}

        <GalleryMainImage
  image={images[selected]}
  title={title}
  zoom={zoom}
  position={position}
  onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd}
  onMouseMove={handleMouseMove}
  onMouseEnter={() => setZoom(true)}
  onMouseLeave={() => setZoom(false)}
  onClick={() => setFullscreen(true)}
/>
 

        

      </div>

      {/* Fullscreen */}

     <GalleryFullscreen
  open={fullscreen}
  image={images[selected]}
  title={title}
  onClose={() => setFullscreen(false)}
  onNext={nextImage}
  onPrev={prevImage}
/>
    </>
  );
}