"use client";

import type React from "react";

import { useDrag } from "@/hooks/use-drag";

interface DraggableProps {
  children?: React.ReactNode;
  className?: string;
}

export function Draggable({ children, className = "" }: DraggableProps) {
  const { position, isDragging, dragRef } = useDrag();

  if (!children) {
    return null;
  }

  return (
    <div
      ref={dragRef as React.RefObject<HTMLDivElement>}
      className={`fixed select-none transition-shadow ${
        isDragging ? "shadow-2xl cursor-grabbing" : "shadow-lg cursor-move"
      } ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isDragging ? 1000 : 999,
      }}
    >
      <div className="flex flex-col items-center gap-2">{children}</div>
    </div>
  );
}
