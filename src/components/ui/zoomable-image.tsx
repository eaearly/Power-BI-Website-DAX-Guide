"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ZoomIn, ZoomOut, RotateCcw, X } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}

export function ZoomableImage({ src, alt, className, caption }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 5;
  const ZOOM_STEP = 0.15;

  const handleOpen = () => {
    setIsOpen(true);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = () => setScale((p) => Math.min(p + ZOOM_STEP, MAX_SCALE));
  const handleZoomOut = () =>
    setScale((p) => {
      const n = Math.max(p - ZOOM_STEP, MIN_SCALE);
      if (n <= 1) setPosition({ x: 0, y: 0 });
      return n;
    });
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setScale((p) => {
      const n = Math.max(MIN_SCALE, Math.min(p + delta, MAX_SCALE));
      if (n <= 1) setPosition({ x: 0, y: 0 });
      return n;
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isOpen]);

  if (imgError) {
    return (
      <figure className="overflow-hidden rounded-lg border border-border bg-muted/30">
        <div className="flex h-48 w-full items-center justify-center bg-muted/50">
          <div className="text-center text-muted-foreground">
            <ZoomIn className="mx-auto mb-2 h-8 w-8 opacity-40" />
            <p className="text-sm font-medium">Image unavailable</p>
            <p className="mt-1 text-xs opacity-60">{alt}</p>
          </div>
        </div>
        {caption && (
          <figcaption className="px-3 py-2 text-xs text-muted-foreground text-center border-t border-border">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <>
      {/* Thumbnail — smaller, centered */}
      <figure
        className="group relative mx-auto max-w-md overflow-hidden rounded-lg border border-border bg-muted/30 transition-[box-shadow,border-color] hover:shadow-lg hover:border-primary/30 cursor-pointer"
        onClick={handleOpen}
      >
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02] ${className || ""}`}
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-black/20 group-hover:opacity-100">
            <div className="rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur-sm">
              <ZoomIn className="h-5 w-5 text-zinc-800" />
            </div>
          </div>
        </div>
        {caption && (
          <figcaption className="px-3 py-2 text-xs text-muted-foreground text-center border-t border-border">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* ─── Fullscreen viewer ─── */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "grid",
            placeItems: "center",
            backgroundColor: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(4px)",
          }}
          onClick={(e) => {
            // Close only when clicking the backdrop itself, not the image or toolbar
            if (e.target === e.currentTarget) handleClose();
          }}
          onWheel={handleWheel}
        >
          {/* Toolbar — fixed top-right */}
          <div style={{ position: "fixed", top: 16, right: 16, zIndex: 100000, display: "flex", gap: 8 }}>
            <div className="flex items-center gap-1 rounded-lg bg-black/60 p-1 backdrop-blur-sm border border-white/10">
              <button onClick={handleZoomOut} disabled={scale <= MIN_SCALE} className="rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed" title="Zoom out">
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="min-w-14 text-center text-xs font-mono text-white/80">{Math.round(scale * 100)}%</span>
              <button onClick={handleZoomIn} disabled={scale >= MAX_SCALE} className="rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed" title="Zoom in">
                <ZoomIn className="h-4 w-4" />
              </button>
              <div className="mx-1 h-4 w-px bg-white/20" />
              <button onClick={handleReset} className="rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white" title="Reset zoom">
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
            <button onClick={handleClose} className="rounded-lg bg-black/60 p-2 text-white/80 backdrop-blur-sm border border-white/10 transition-colors hover:bg-red-500/80 hover:text-white" title="Close (Esc)">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Hint */}
          {scale <= 1 && (
            <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 100000 }}
              className="rounded-full bg-black/50 px-4 py-2 text-xs text-white/60 backdrop-blur-sm border border-white/10"
            >
              Scroll to zoom · Click outside to close
            </div>
          )}

          {/* The image — grid child, auto-centered by place-items: center */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            draggable={false}
            onMouseDown={handleMouseDown}
            style={{
              maxWidth: "70vw",
              maxHeight: "70vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: 8,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              userSelect: "none",
              cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              transform: scale === 1 && position.x === 0 && position.y === 0
                ? "none"
                : `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transition: isDragging ? "none" : "transform 0.2s ease-out",
              transformOrigin: "center center",
            }}
          />

          {/* Caption */}
          {caption && (
            <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 100000, maxWidth: 500 }}
              className="rounded-lg bg-black/60 px-4 py-2.5 text-sm text-white text-center backdrop-blur-sm border border-white/10"
            >
              {caption}
            </div>
          )}
        </div>
      )}
    </>
  );
}
