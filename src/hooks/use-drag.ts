"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"

interface Position {
  x: number
  y: number
}

interface UseDragOptions {
  initialPosition?: Position
  disabled?: boolean
}

interface UseDragReturn {
  position: Position
  isDragging: boolean
  dragRef: React.RefObject<HTMLElement | null>
  resetPosition: () => void
}

const PADDING = 16

export function useDrag(options: UseDragOptions = {}): UseDragReturn {
  const { disabled = false } = options
  const dragRef = useRef<HTMLElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })
  const [initialMousePos, setInitialMousePos] = useState<Position>({ x: 0, y: 0 })


  const getInitialPosition = useCallback((): Position => {
    if (options.initialPosition) {
      return options.initialPosition
    }

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const elementWidth = dragRef.current?.offsetWidth || 400
    const elementHeight = dragRef.current?.offsetHeight || 288

    return {
      x: viewportWidth - elementWidth - PADDING * 2,
      y: viewportHeight - elementHeight - PADDING,
    }
  }, [options.initialPosition])

  const [position, setPosition] = useState<Position>(() => getInitialPosition())

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      if (!isDragging) {
        setPosition(getInitialPosition())
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [getInitialPosition, isDragging])

  useEffect(() => {
    if (dragRef.current) {
      setPosition(getInitialPosition())
    }
  }, [getInitialPosition])

  const constrainPosition = useCallback((newPosition: Position): Position => {
    if (!dragRef.current) return newPosition

    if (typeof window === "undefined") return newPosition

    const element = dragRef.current
    const elementRect = element.getBoundingClientRect()
    const elementWidth = elementRect.width
    const elementHeight = elementRect.height

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Restrict the position to the viewport with padding on all sides
    const minX = PADDING * 2
    const maxX = Math.max(minX, viewportWidth - elementWidth - PADDING * 2)
    const minY = PADDING
    const maxY = Math.max(minY, viewportHeight - elementHeight - PADDING)

    const constrainedX = Math.min(Math.max(newPosition.x, minX), maxX)
    const constrainedY = Math.min(Math.max(newPosition.y, minY), maxY)

    return {
      x: constrainedX,
      y: constrainedY,
    }
  }, [])

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (disabled || !dragRef.current) return

      const target = e.target as HTMLElement | null
      if (target && target.closest('[data-no-drag="true"]')) {
        return
      }

      e.preventDefault()
      setIsDragging(true)
      setDragStart(position)
      setInitialMousePos({ x: e.clientX, y: e.clientY })
    },
    [disabled, position],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - initialMousePos.x
      const deltaY = e.clientY - initialMousePos.y

      const newPosition = {
        x: dragStart.x + deltaX,
        y: dragStart.y + deltaY,
      }

      setPosition(constrainPosition(newPosition))
    },
    [isDragging, initialMousePos, dragStart, constrainPosition],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (disabled || !dragRef.current) return

      const target = e.target as HTMLElement | null
      if (target && target.closest('[data-no-drag="true"]')) {
        return
      }

      const touch = e.touches[0]
      setIsDragging(true)
      setDragStart(position)
      setInitialMousePos({ x: touch.clientX, y: touch.clientY })
    },
    [disabled, position],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return

      e.preventDefault()
      const touch = e.touches[0]
      const deltaX = touch.clientX - initialMousePos.x
      const deltaY = touch.clientY - initialMousePos.y

      const newPosition = {
        x: dragStart.x + deltaX,
        y: dragStart.y + deltaY,
      }

      setPosition(constrainPosition(newPosition))
    },
    [isDragging, initialMousePos, dragStart, constrainPosition],
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const resetPosition = useCallback(() => {
    setPosition(getInitialPosition())
  }, [getInitialPosition])

  useEffect(() => {
    const element = dragRef.current
    if (!element) return

    element.addEventListener("mousedown", handleMouseDown)
    element.addEventListener("touchstart", handleTouchStart, { passive: false })

    return () => {
      element.removeEventListener("mousedown", handleMouseDown)
      element.removeEventListener("touchstart", handleTouchStart)
    }
  }, [handleMouseDown, handleTouchStart])

  useEffect(() => {
    if (!isDragging) return

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  return {
    position,
    isDragging,
    dragRef,
    resetPosition,
  }
}
